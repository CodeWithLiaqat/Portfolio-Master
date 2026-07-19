import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '@/stores/theme';

export function ProceduralRingExperiment() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const theme = useThemeStore(s => s.theme);

  const themeColors = {
    aurum: new THREE.Color('#E8C47C'),
    iris: new THREE.Color('#8B93F8'),
    garnet: new THREE.Color('#D14D66')
  };

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    const scale = 1 + Math.sin(time * 2) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);

    materialRef.current.color.lerp(themeColors[theme], 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.5, 16, 100]} />
      <meshBasicMaterial 
        ref={materialRef}
        wireframe 
        color={themeColors.aurum}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}