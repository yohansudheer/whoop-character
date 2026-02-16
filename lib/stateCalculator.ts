import { CharacterState, CharacterConfig, WhoopData } from '@/types';

/**
 * Calculates the character state based on Whoop recovery percentage
 * Primary driver is recovery %, with sleep as a secondary modifier
 */
export function calculateCharacterState(data: WhoopData): CharacterState {
  const { recovery } = data;

  // Map recovery percentage to character state
  if (recovery >= 80) return 'energetic';
  if (recovery >= 60) return 'good';
  if (recovery >= 40) return 'neutral';
  if (recovery >= 20) return 'tired';
  return 'exhausted';
}

/**
 * Gets the lighting color based on character state
 */
export function getLightingColor(state: CharacterState): string {
  const colorMap: Record<CharacterState, string> = {
    energetic: '#00ff88',   // Bright green
    good: '#88ccff',        // Soft blue
    neutral: '#ffffff',     // White
    tired: '#ffaa44',       // Orange
    exhausted: '#ff4444',   // Red
  };

  return colorMap[state];
}

/**
 * Gets the background color based on character state
 */
export function getBackgroundColor(state: CharacterState): string {
  const colorMap: Record<CharacterState, string> = {
    energetic: '#001a0f',   // Dark green
    good: '#0a1a2e',        // Dark blue
    neutral: '#1a1a1a',     // Neutral dark
    tired: '#2e1a0a',       // Dark orange
    exhausted: '#2e0a0a',   // Dark red
  };

  return colorMap[state];
}

/**
 * Gets the animation speed multiplier based on character state
 */
export function getAnimationSpeed(state: CharacterState): number {
  const speedMap: Record<CharacterState, number> = {
    energetic: 1.5,   // Fast breathing
    good: 1.2,
    neutral: 1.0,     // Normal
    tired: 0.7,
    exhausted: 0.4,   // Very slow
  };

  return speedMap[state];
}

/**
 * Gets the complete character configuration based on state and data
 */
export function getCharacterConfig(state: CharacterState, data: WhoopData): CharacterConfig {
  return {
    modelPath: `/models/character-${state}.glb`,
    eyeOpenness: data.sleepPerformance / 100,  // 0-1 range
    lightingColor: getLightingColor(state),
    backgroundColor: getBackgroundColor(state),
    animationSpeed: getAnimationSpeed(state),
  };
}

/**
 * Gets color for recovery stat bar based on recovery percentage
 */
export function getRecoveryColor(recovery: number): string {
  if (recovery >= 67) return '#00ff88';   // Green
  if (recovery >= 34) return '#ffaa44';   // Yellow/Orange
  return '#ff4444';                        // Red
}
