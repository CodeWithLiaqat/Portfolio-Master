import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/scene';
import { useThemeStore } from '@/stores/theme';
import causticsFragSrc from '../materials/caustics.glsl?raw';

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.999, 1.0);
}
`;

const THEME_COLORS = {
  aurum: new THREE.Color('#E8C47C'),
  iris:  new THREE.Color('#8B93F8'),
  garnet: new THREE.Color('#D14D66'),
};

/**
 * Full-screen caustics overlay — fades in during Act VI (Archive).
 * Rendered at depth 0.999 so it sits behind everything but the clear color.
 */
export function CausticsBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const act = useSceneStore(s => s.act);
  const theme = useThemeStore(s => s.theme);

  const uniforms = useMemo(() => ({
    uTime:        { value: 0 },
    uAccentColor: { value: THEME_COLORS.aurum.clone() },
    uIntensity:   { value: 0 },
  }), []);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    uniforms.uTime.value = state.clock.elapsedTime;

    // Fade in on act 6, fade out otherwise
    const targetIntensity = act === 6 ? 1 : 0;
    uniforms.uIntensity.value += (targetIntensity - uniforms.uIntensity.value) * 0.03;

    // Track theme color
    const targetColor = THEME_COLORS[theme];
    uniforms.uAccentColor.value.lerp(targetColor, 0.05);

    materialRef.current.uniforms = uniforms;
  });

  if (uniforms.uIntensity.value < 0.001 && act !== 6) return null;

  return (
    <mesh renderOrder={-1}>
      {/* Full-screen triangle that covers the clip-space quad */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERT}
        fragmentShader={causticsFragSrc}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
