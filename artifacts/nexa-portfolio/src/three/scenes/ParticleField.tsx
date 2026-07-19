import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useThemeStore } from '@/stores/theme';
import { useSceneStore } from '@/stores/scene';
import { easing } from 'maath';

// Curl noise helpers (simplified, GPU-free)
// NOTE: Must mirror GLSL `fract(sin(n)*43758.5)` — keep result in [0,1)
function hash(n: number): number {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v); // equivalent to GLSL fract(); output ∈ [0, 1)
}

function noise3(p: THREE.Vector3): number {
  const i = new THREE.Vector3(Math.floor(p.x), Math.floor(p.y), Math.floor(p.z));
  const f = new THREE.Vector3(p.x - i.x, p.y - i.y, p.z - i.z);
  const u = f.clone().multiply(f).multiply(new THREE.Vector3(3 - 2 * f.x, 3 - 2 * f.y, 3 - 2 * f.z));
  const n000 = hash(i.x + i.y * 57 + i.z * 113);
  const n100 = hash(i.x + 1 + i.y * 57 + i.z * 113);
  const n010 = hash(i.x + (i.y + 1) * 57 + i.z * 113);
  const n110 = hash(i.x + 1 + (i.y + 1) * 57 + i.z * 113);
  const n001 = hash(i.x + i.y * 57 + (i.z + 1) * 113);
  const n101 = hash(i.x + 1 + i.y * 57 + (i.z + 1) * 113);
  const n011 = hash(i.x + (i.y + 1) * 57 + (i.z + 1) * 113);
  const n111 = hash(i.x + 1 + (i.y + 1) * 57 + (i.z + 1) * 113);
  const r0 = THREE.MathUtils.lerp(THREE.MathUtils.lerp(n000, n100, u.x), THREE.MathUtils.lerp(n010, n110, u.x), u.y);
  const r1 = THREE.MathUtils.lerp(THREE.MathUtils.lerp(n001, n101, u.x), THREE.MathUtils.lerp(n011, n111, u.x), u.y);
  return THREE.MathUtils.lerp(r0, r1, u.z);
}

function curlNoise(p: THREE.Vector3, eps = 0.01): THREE.Vector3 {
  const dx = new THREE.Vector3(eps, 0, 0);
  const dy = new THREE.Vector3(0, eps, 0);
  const dz = new THREE.Vector3(0, 0, eps);
  const curlX = (noise3(p.clone().add(dy)) - noise3(p.clone().sub(dy))) / (2 * eps) 
              - (noise3(p.clone().add(dz)) - noise3(p.clone().sub(dz))) / (2 * eps);
  const curlY = (noise3(p.clone().add(dz)) - noise3(p.clone().sub(dz))) / (2 * eps) 
              - (noise3(p.clone().add(dx)) - noise3(p.clone().sub(dx))) / (2 * eps);
  const curlZ = (noise3(p.clone().add(dx)) - noise3(p.clone().sub(dx))) / (2 * eps) 
              - (noise3(p.clone().add(dy)) - noise3(p.clone().sub(dy))) / (2 * eps);
  return new THREE.Vector3(curlX, curlY, curlZ);
}

const THEME_COLORS = {
  aurum: new THREE.Color('#E8C47C'),
  iris:  new THREE.Color('#8B93F8'),
  garnet: new THREE.Color('#D14D66'),
};

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  speed?: number;
}

export function ParticleField({ count: countProp, radius = 6, speed = 0.18 }: ParticleFieldProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = countProp ?? (isMobile ? 1200 : 3000);

  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const theme = useThemeStore(s => s.theme);
  const act = useSceneStore(s => s.act);

  // Position and velocity buffers
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.3 + Math.random() * 0.7);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  const velocities = useMemo(() => new Float32Array(count * 3), [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  const targetColor = useRef(new THREE.Color(THEME_COLORS.aurum));

  // Act-based behavior targets
  const getActTarget = (i: number) => {
    switch (act) {
      case 5: {
        // Constellation — scatter into a loose sphere
        const angle = (i / count) * Math.PI * 2;
        const layer = Math.floor(i / (count / 5));
        return new THREE.Vector3(
          Math.cos(angle) * (3 + layer * 0.5),
          Math.sin(angle * 3) * 2,
          (Math.random() - 0.5) * 4
        );
      }
      case 7: {
        // Beacon — converge to origin with intensity
        return new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        );
      }
      default:
        return null;
    }
  };

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const dt = Math.min(delta, 0.05);

    // Color interpolation
    easing.dampC(materialRef.current.color, THEME_COLORS[theme], 0.25, delta);

    const p = new THREE.Vector3();
    const curl = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      p.set(arr[ix], arr[ix + 1], arr[ix + 2]);

      // Curl noise velocity
      const noiseP = p.clone().multiplyScalar(0.3).addScalar(state.clock.elapsedTime * 0.05);
      const c = curlNoise(noiseP);
      curl.copy(c).multiplyScalar(speed * dt);

      velocities[ix]     += curl.x;
      velocities[ix + 1] += curl.y;
      velocities[ix + 2] += curl.z;

      // Act-based attractor
      if (act === 7) {
        // Strong convergence to center in beacon act
        velocities[ix]     += -arr[ix] * 2 * dt;
        velocities[ix + 1] += -arr[ix + 1] * 2 * dt;
        velocities[ix + 2] += -arr[ix + 2] * 2 * dt;
      } else if (act === 5) {
        // Scatter orbit for constellation
        const angle = state.clock.elapsedTime * 0.1 + (i / count) * Math.PI * 2;
        const r = 3 + (i % 5) * 0.6;
        const tx = Math.cos(angle) * r;
        const ty = Math.sin(angle * 0.7) * 2;
        velocities[ix]     += (tx - arr[ix]) * dt * 0.5;
        velocities[ix + 1] += (ty - arr[ix + 1]) * dt * 0.5;
      } else {
        // Containment — keep within radius
        const dist = p.length();
        if (dist > radius) {
          velocities[ix]     += -arr[ix] * 0.5 * dt;
          velocities[ix + 1] += -arr[ix + 1] * 0.5 * dt;
          velocities[ix + 2] += -arr[ix + 2] * 0.5 * dt;
        }
      }

      // Damping
      velocities[ix]     *= 0.97;
      velocities[ix + 1] *= 0.97;
      velocities[ix + 2] *= 0.97;

      // Clamp velocity magnitude to prevent runaway values
      const vx = velocities[ix], vy = velocities[ix + 1], vz = velocities[ix + 2];
      const mag = Math.sqrt(vx * vx + vy * vy + vz * vz);
      const maxVel = 0.25;
      if (mag > maxVel) {
        const s = maxVel / mag;
        velocities[ix]     *= s;
        velocities[ix + 1] *= s;
        velocities[ix + 2] *= s;
      }

      arr[ix]     += velocities[ix];
      arr[ix + 1] += velocities[ix + 1];
      arr[ix + 2] += velocities[ix + 2];
    }

    posAttr.needsUpdate = true;

    // Opacity by act
    const targetOpacity = act === 4 ? 0 : act === 1 ? 0.3 : 0.7;
    materialRef.current.opacity += (targetOpacity - materialRef.current.opacity) * 0.05;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        color={THEME_COLORS[theme]}
        size={isMobile ? 0.025 : 0.018}
        sizeAttenuation
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
