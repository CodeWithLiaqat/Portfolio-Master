import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '@/stores/theme';

export function NoiseFieldExperiment() {
  const meshRef = useRef<THREE.Mesh>(null);
  const theme = useThemeStore(s => s.theme);
  
  const colors = {
    aurum: new THREE.Color('#E8C47C'),
    iris: new THREE.Color('#8B93F8'),
    garnet: new THREE.Color('#D14D66')
  };

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: colors[theme] }
  }), []);

  // Update color when theme changes
  useFrame(() => {
    uniforms.uColor.value.lerp(colors[theme], 0.05);
  });

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    // Simple 2D noise fn
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      float elevation = snoise(vec2(modelPosition.x * 0.5 + uTime * 0.2, modelPosition.z * 0.5 + uTime * 0.2)) * 1.5;
      modelPosition.y += elevation;
      vElevation = elevation;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixStrength = (vElevation + 1.5) / 3.0;
      vec3 color = mix(vec3(0.0), uColor, mixStrength);
      float alpha = mixStrength * 0.8;
      
      // Fade edges
      float distToCenter = distance(vUv, vec2(0.5));
      alpha *= smoothstep(0.5, 0.2, distToCenter);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.4, 0, 0]}>
      <planeGeometry args={[15, 15, 64, 64]} />
      <shaderMaterial 
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        wireframe={true}
      />
    </mesh>
  );
}