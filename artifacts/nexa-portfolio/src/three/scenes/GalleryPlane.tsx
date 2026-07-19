import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/scene';
import { easing } from 'maath';
import displacementFragSrc from '../materials/displacement.glsl?raw';

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Unique gradient color per project slug
const PROJECT_COLORS: Record<string, [string, string]> = {
  'luminary-ai':       ['#6B7FFF', '#1A1A3F'],
  'maison-calloway':   ['#E8C47C', '#3A2A10'],
  'apex-finance':      ['#4BFFB5', '#0A2A20'],
  'the-correspondent': ['#FF6B6B', '#2A0F0F'],
  'vela':              ['#7CF4E8', '#0A2A28'],
  'fractional':        ['#C47CF8', '#1A0A30'],
};

/**
 * Floating plane with displacement + RGB-shift shader — visible on Portfolio page
 * when a project row is hovered. Tracks the cursor in world space.
 */
export function GalleryPlane() {
  const planeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const hoveredProject = useSceneStore(s => s.hoveredProject);
  const pointer = useSceneStore(s => s.pointer);

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uHover:   { value: 0 },
    uMouse:   { value: new THREE.Vector2(0, 0) },
    uColor1:  { value: new THREE.Color('#6B7FFF') },
    uColor2:  { value: new THREE.Color('#1A1A3F') },
  }), []);

  // Fragment shader — uses procedural gradient (no image texture needed)
  const fragmentShader = `
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p); vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }

    void main() {
      vec2 uv = vUv;

      // Displacement driven by noise + hover
      float n = noise(uv * 4.0 + uTime * 0.12);
      float disp = uHover * n * 0.06;
      uv += vec2(disp);

      // Base gradient
      vec3 color = mix(uColor2, uColor1, uv.y + sin(uv.x * 3.14 + uTime * 0.3) * 0.2);

      // RGB micro-shift on hover
      float shift = uHover * 0.012;
      float r = mix(uColor2.r, uColor1.r, uv.y + shift);
      float b = mix(uColor2.b, uColor1.b, uv.y - shift);
      color = vec3(r, color.g, b);

      // Scanlines for texture
      float scan = sin(uv.y * 120.0) * 0.04 + 0.96;
      color *= scan;

      // Edge vignette + alpha
      vec2 centered = uv - 0.5;
      float vignette = 1.0 - dot(centered * 1.4, centered * 1.4);
      float alpha = smoothstep(0.0, 0.3, vignette) * uHover;

      gl_FragColor = vec4(color, alpha * 0.9);
    }
  `;

  useFrame((state, delta) => {
    if (!planeRef.current || !materialRef.current) return;

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.1);

    const isHovered = hoveredProject !== null;
    const targetHover = isHovered ? 1 : 0;
    uniforms.uHover.value += (targetHover - uniforms.uHover.value) * 0.08;

    // Move plane to follow cursor (mapped to world space assuming z=0 plane at distance ~6)
    const targetX = pointer.x * 4;
    const targetY = pointer.y * 2.5;
    easing.damp3(planeRef.current.position, [targetX + 2, targetY - 0.5, 2], 0.12, delta);

    // Update colors for hovered project
    if (hoveredProject && PROJECT_COLORS[hoveredProject]) {
      const [c1, c2] = PROJECT_COLORS[hoveredProject];
      uniforms.uColor1.value.lerp(new THREE.Color(c1), 0.1);
      uniforms.uColor2.value.lerp(new THREE.Color(c2), 0.1);
    }

    materialRef.current.uniforms = uniforms;
    materialRef.current.needsUpdate = false;
  });

  // Don't render if completely faded out
  if (uniforms.uHover.value < 0.01 && !hoveredProject) return null;

  return (
    <mesh ref={planeRef} position={[4, 0, 2]}>
      <planeGeometry args={[3, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERT}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
