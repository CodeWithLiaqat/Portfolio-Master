import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// ─── Individual scene variants ──────────────────────────────────────────────

function ShardCluster({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    groupRef.current.rotation.x += delta * 0.06;
  });

  const shards = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], scale: 1.0, detail: 0 },
    { pos: [1.4, 0.6, -0.4] as [number, number, number], scale: 0.55, detail: 0 },
    { pos: [-1.2, -0.5, 0.3] as [number, number, number], scale: 0.45, detail: 0 },
    { pos: [0.5, -1.2, 0.8] as [number, number, number], scale: 0.35, detail: 0 },
    { pos: [-0.6, 1.0, -0.6] as [number, number, number], scale: 0.3, detail: 0 },
  ], []);

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <Float key={i} speed={1.2 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.3}>
          <mesh position={s.pos} scale={s.scale}>
            <icosahedronGeometry args={[1, s.detail]} />
            <MeshTransmissionMaterial
              color={color}
              transmission={0.92}
              thickness={0.5}
              roughness={0.05}
              chromaticAberration={0.08}
              anisotropy={0.3}
              envMapIntensity={1.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function WireframeSplit({ accentColor }: { accentColor: string }) {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    if (solidRef.current) solidRef.current.rotation.y += delta * 0.18;
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group>
      {/* Left half: solid transmission */}
      <Float speed={1.0} floatIntensity={0.25}>
        <mesh ref={solidRef} position={[-0.7, 0, 0]}>
          <octahedronGeometry args={[1.4, 0]} />
          <MeshTransmissionMaterial
            color={color}
            transmission={0.85}
            thickness={0.6}
            roughness={0.1}
            chromaticAberration={0.06}
          />
        </mesh>
        {/* Right half: wireframe */}
        <mesh ref={wireRef} position={[0.7, 0, 0]}>
          <octahedronGeometry args={[1.4, 0]} />
          <meshBasicMaterial color={color} wireframe opacity={0.7} transparent />
        </mesh>
      </Float>
    </group>
  );
}

function PolishedMonolith({ accentColor }: { accentColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={0.8} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshTransmissionMaterial
          color={color}
          transmission={0.88}
          thickness={0.9}
          roughness={0.02}
          chromaticAberration={0.12}
          anisotropy={0.5}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function GlassGrid({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.08;
    groupRef.current.rotation.y += delta * 0.12;
  });

  const grid = useMemo(() => {
    const items = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        items.push([x * 1.1, y * 1.1, 0] as [number, number, number]);
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {grid.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.8, 0.8, 0.08]} />
          <MeshTransmissionMaterial
            color={color}
            transmission={0.9}
            thickness={0.1}
            roughness={0.08}
            chromaticAberration={0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleAssembly({ accentColor }: { accentColor: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const color = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  const { positions } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
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
        color={color}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}

// ─── MobileCeramic — variants 6 (iOS cool) and 7 (Android warm) ─────────────

function MobileCeramic({ emissiveColor }: { emissiveColor: string }) {
  const slabRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!slabRef.current) return;
    slabRef.current.rotation.y += delta * 0.09;
    slabRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <>
      {/* Crisp emissive rim — cool or warm depending on platform */}
      <pointLight position={[2.2, 1.8, 1.5]} intensity={4.0} color={emissiveColor} />
      <pointLight position={[-2.0, -1.5, 0.8]} intensity={1.2} color={emissiveColor} />
      <Float speed={0.55} floatIntensity={0.12}>
        <mesh ref={slabRef}>
          {/* capsuleGeometry: radius, length, capSegments, radialSegments */}
          <capsuleGeometry args={[0.62, 1.3, 6, 20]} />
          <meshPhysicalMaterial
            color="#F2EEE5"
            roughness={0.05}
            metalness={0.08}
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
          />
        </mesh>
      </Float>
    </>
  );
}

// ─── Scene wrapper with variant selection ────────────────────────────────────

function SceneContent({ variant, accentColor }: { variant: number; accentColor: string }) {
  // Variants 6 and 7 are the MobileCeramic pair — handle before cycling 1–5
  const isNative = variant === 6 || variant === 7;
  const v = isNative ? variant : ((variant - 1) % 5) + 1;
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 4, 4]} intensity={0.8} />
      {!isNative && <pointLight position={[-3, 2, 2]} intensity={0.4} color={accentColor} />}
      {v === 1 && <ShardCluster accentColor={accentColor} />}
      {v === 2 && <WireframeSplit accentColor={accentColor} />}
      {v === 3 && <PolishedMonolith accentColor={accentColor} />}
      {v === 4 && <GlassGrid accentColor={accentColor} />}
      {(v === 0 || v === 5) && <ParticleAssembly accentColor={accentColor} />}
      {v === 6 && <MobileCeramic emissiveColor="#B8D4FF" />}
      {v === 7 && <MobileCeramic emissiveColor="#FFD0A0" />}
    </>
  );
}

// ─── Public export ───────────────────────────────────────────────────────────

export function CoverScene({ variant = 1, accentColor = '#8B93F8' }: {
  variant?: number;
  accentColor?: string;
}) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <SceneContent variant={variant} accentColor={accentColor} />
    </Canvas>
  );
}
