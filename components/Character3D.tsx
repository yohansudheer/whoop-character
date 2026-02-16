'use client';

import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Character3DProps } from '@/types';

/**
 * 3D Character component that renders the GLB model and handles idle animations
 */
export function Character3D({ modelPath, eyeOpenness, animationSpeed }: Character3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Load the 3D model (GLB format)
  // Note: This will show a warning until actual models are added
  let scene: THREE.Group | null = null;
  try {
    const gltf = useGLTF(modelPath);
    scene = gltf.scene;
  } catch (error) {
    // Model not found - will use placeholder geometry
    console.warn(`Model not found: ${modelPath}`);
  }

  // Idle animation: gentle breathing/bobbing effect
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      // Vertical bobbing (breathing effect)
      meshRef.current.position.y = Math.sin(time * animationSpeed) * 0.05;

      // Subtle rotation for more natural feel
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
    }
  });

  // If no model is loaded, render a placeholder
  if (!scene) {
    return (
      <group ref={meshRef}>
        {/* Placeholder: Simple humanoid shape */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 1, 0.3]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        {/* Placeholder text */}
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[1.5, 0.1, 0.1]} />
          <meshBasicMaterial color="#ff4444" />
        </mesh>
      </group>
    );
  }

  // Enhance materials with appropriate colors for each state
  const clonedScene = scene.clone();

  // Determine skin tone based on model path
  const getSkinTone = (path: string): string => {
    if (path.includes('energetic')) return '#ffdbcc'; // Healthy, rosy skin
    if (path.includes('good')) return '#f5d5c3';      // Normal healthy skin
    if (path.includes('neutral')) return '#e8c5b5';    // Standard skin
    if (path.includes('tired')) return '#d9b5a3';      // Paler skin
    if (path.includes('exhausted')) return '#c9a593';  // Very pale skin
    return '#e8c5b5'; // Default
  };

  const skinColor = getSkinTone(modelPath);

  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.material) {
        const material = mesh.material as THREE.MeshStandardMaterial;

        // Apply skin tone color
        material.color.setStyle(skinColor);

        // Add better material properties for visibility
        material.metalness = 0.05;
        material.roughness = 0.9;
        material.needsUpdate = true;
      }
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={clonedScene}
      scale={1.5}
      position={[0, -1, 0]}
    />
  );
}

// Preload models for better performance
// (will only work once actual models are added)
const modelPaths = [
  '/models/character-energetic.glb',
  '/models/character-good.glb',
  '/models/character-neutral.glb',
  '/models/character-tired.glb',
  '/models/character-exhausted.glb',
];

// Try to preload, but don't fail if models don't exist yet
modelPaths.forEach(path => {
  try {
    useGLTF.preload(path);
  } catch (error) {
    // Silently ignore - models will be added later
  }
});
