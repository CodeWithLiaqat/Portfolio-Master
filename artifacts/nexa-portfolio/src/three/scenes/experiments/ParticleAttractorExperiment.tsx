import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '@/stores/theme';

export function ParticleAttractorExperiment() {
  const pointsRef = useRef<THREE.Points>(null);
  const theme = useThemeStore(s => s.theme);
  
  const COUNT = 1000;
  
  const { positions, initialPositions } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const initPos = new Float32Array(COUNT * 3);
    for(let i = 0; i < COUNT * 3; i++) {
      const val = (Math.random() - 0.5) * 10;
      pos[i] = val;
      initPos[i] = val;
    }
    return { positions: pos, initialPositions: initPos };
  }, []);

  const themeColors = {
    aurum: new THREE.Color('#E8C47C'),
    iris: new THREE.Color('#8B93F8'),
    garnet: new THREE.Color('#D14D66')
  };

  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    
    // Update color
    materialRef.current.color.lerp(themeColors[theme], 0.1);

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    // Center point oscillates slightly
    const cx = Math.sin(time * 0.5) * 2;
    const cy = Math.cos(time * 0.4) * 2;
    const cz = Math.sin(time * 0.3) * 2;

    for(let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      let x = positions[ix];
      let y = positions[iy];
      let z = positions[iz];

      const dx = cx - x;
      const dy = cy - y;
      const dz = cz - z;
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

      // Attract to center, but repel if too close
      const force = dist < 2 ? -0.05 : 0.02;

      positions[ix] += dx * force + Math.sin(time + x) * 0.01;
      positions[iy] += dy * force + Math.cos(time + y) * 0.01;
      positions[iz] += dz * force + Math.sin(time + z) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={0.05} 
        color={themeColors.aurum}
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}