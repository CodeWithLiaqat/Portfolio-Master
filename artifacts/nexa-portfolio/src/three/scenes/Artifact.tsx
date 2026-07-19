import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/stores/scene';
import { useThemeStore } from '@/stores/theme';
import { easing } from 'maath';

export function Artifact() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const coreRef = useRef<THREE.PointLight>(null);
  
  const act = useSceneStore(s => s.act);
  const theme = useThemeStore(s => s.theme);
  const pointer = useSceneStore(s => s.pointer);

  const themeColors = {
    aurum: new THREE.Color('#E8C47C'),
    iris: new THREE.Color('#8B93F8'),
    garnet: new THREE.Color('#D14D66')
  };

  const targetColor = themeColors[theme];

  // Procedural geometry base
  const geometry = new THREE.IcosahedronGeometry(2, 0);

  useFrame((state, delta) => {
    if (!meshRef.current || !coreRef.current || !materialRef.current) return;

    // Base Idle rotation
    meshRef.current.rotation.y += delta * 0.05;
    meshRef.current.rotation.x += delta * 0.02;
    
    // Parallax based on pointer
    const targetX = (pointer.x * Math.PI) * 0.05;
    const targetY = (pointer.y * Math.PI) * 0.05;
    
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;

    // Color interpolation
    easing.dampC(coreRef.current.color, targetColor, 0.25, delta);

    // Act-based transformations
    let targetPos = new THREE.Vector3(0, 0, 0);
    let targetScale = new THREE.Vector3(1, 1, 1);
    let targetTransmission = 1;
    let targetThickness = 1.2;

    switch(act) {
      case 1: // ARRIVAL - Centered, Idle
        targetPos.set(0, 0, 0);
        targetScale.set(1, 1, 1);
        break;
      case 2: // SIGNAL - Drifts Left
        targetPos.set(-4, 0, 0);
        targetScale.set(0.8, 0.8, 0.8);
        targetThickness = 2.5;
        break;
      case 3: // FORGE - Right side, smaller
        targetPos.set(4, 0, 0);
        targetScale.set(0.6, 0.6, 0.6);
        break;
      case 4: // GALLERY - Recedes to deep bokeh
        targetPos.set(0, 0, -10);
        targetScale.set(1.5, 1.5, 1.5);
        break;
      case 5: // CONSTELLATION - Scattered (simulated by scaling down and hiding core)
        targetPos.set(0, 0, 0);
        targetScale.set(0.2, 0.2, 0.2);
        targetTransmission = 0.2;
        break;
      case 6: // ARCHIVE - Faint caustics
        targetPos.set(0, -2, -5);
        targetScale.set(0.5, 0.5, 0.5);
        targetTransmission = 0.5;
        break;
      case 7: // BEACON - Follows Cursor X
        targetPos.set(pointer.x * 5, 2, -2);
        targetScale.set(1.2, 1.2, 1.2);
        targetThickness = 3;
        break;
    }

    easing.damp3(meshRef.current.position, targetPos, 0.5, delta);
    easing.damp3(meshRef.current.scale, targetScale, 0.5, delta);
    easing.damp(materialRef.current, 'transmission', targetTransmission, 0.5, delta);
    easing.damp(materialRef.current, 'thickness', targetThickness, 0.5, delta);
    
    // Core light position tracks mesh
    coreRef.current.position.copy(meshRef.current.position);
    coreRef.current.intensity = act === 5 ? 0.2 : 2;
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} geometry={geometry}>
          <MeshTransmissionMaterial
            ref={materialRef}
            transmission={1}
            thickness={1.2}
            roughness={0.12}
            ior={1.5}
            chromaticAberration={0.04}
            backside
            color="#ffffff"
          />
        </mesh>
      </Float>
      
      <pointLight ref={coreRef} intensity={2} distance={10} decay={2} />
    </group>
  );
}
