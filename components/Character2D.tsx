'use client';

import { useEffect, useState } from 'react';
import { Character3DProps } from '@/types';

/**
 * 2D Character component that displays PNG images with animations
 */
export function Character2D({ modelPath, animationSpeed }: Character3DProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Convert model path to image path
  const imagePath = modelPath.replace('/models/', '/images/').replace('.glb', '.png');

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes breathe {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.01);
          }
        }
      `}</style>
      <div
        className="character-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      >
        <img
          src={imagePath}
          alt="Character"
          style={{
            maxWidth: '600px',
            maxHeight: '800px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
            animation: `breathe ${6 / animationSpeed}s ease-in-out infinite`,
          }}
        />
      </div>
    </>
  );
}
