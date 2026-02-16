'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Character3D } from './Character3D';
import { SceneProps } from '@/types';

/**
 * Three.js Scene wrapper that sets up the 3D environment and renders the character
 */
export function Scene({ config }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: config.backgroundColor }}
    >
      {/* Brighter ambient lighting to show colors */}
      <ambientLight intensity={1.2} />

      {/* Main directional light from front */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Spotlight with dynamic color based on character state */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        color={config.lightingColor}
        intensity={0.8}
        castShadow
      />

      {/* Additional fill lights from multiple angles */}
      <pointLight
        position={[-5, 5, -5]}
        intensity={0.8}
        color="#ffffff"
      />

      <pointLight
        position={[0, 5, 5]}
        intensity={0.6}
        color="#ffffff"
      />

      {/* Character model */}
      <Character3D
        modelPath={config.modelPath}
        eyeOpenness={config.eyeOpenness}
        animationSpeed={config.animationSpeed}
      />

      {/* Environment map for realistic reflections */}
      <Environment preset="city" background={false} blur={0.8} />

      {/* Camera controls - allow user to rotate view */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}      // Don't go below ground
        minPolarAngle={Math.PI / 2.5}   // Don't go too high
        autoRotate={false}
        autoRotateSpeed={0.5}
      />

      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </Canvas>
  );
}
