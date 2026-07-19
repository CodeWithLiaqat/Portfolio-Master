import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { Artifact } from './scenes/Artifact';
import { useSceneStore } from '@/stores/scene';
import { useEffect, useState } from 'react';
import { getGPUTier } from 'detect-gpu';

export function ArtifactCanvas() {
  const setPointer = useSceneStore(s => s.setPointer);
  const [tier, setTier] = useState<number | null>(null);

  useEffect(() => {
    getGPUTier().then(res => setTier(res.tier));
    
    const handlePointer = (e: MouseEvent) => {
      setPointer((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    
    window.addEventListener('mousemove', handlePointer);
    return () => window.removeEventListener('mousemove', handlePointer);
  }, [setPointer]);

  if (tier !== null && tier <= 1) return null; // Fallback

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        frameloop="demand"
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <Artifact />

        {tier && tier >= 2 && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.85} intensity={1.5} mipmapBlur />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
