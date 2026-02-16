// Whoop Data Types
export interface WhoopData {
  recovery: number;         // 0-100
  sleepPerformance: number; // 0-100
  strain: number;           // 0-21
}

// Character State Types
export type CharacterState = 'energetic' | 'good' | 'neutral' | 'tired' | 'exhausted';

// Character Configuration
export interface CharacterConfig {
  modelPath: string;
  eyeOpenness: number;      // 0-1
  lightingColor: string;    // hex color
  backgroundColor: string;  // hex color
  animationSpeed: number;   // multiplier for breathing animation
}

// Complete Character State (stored in JSON)
export interface CharacterStateData {
  state: CharacterState;
  config: CharacterConfig;
  data: WhoopData;
  lastUpdated: string;      // ISO date string
}

// Component Props
export interface Character3DProps {
  modelPath: string;
  eyeOpenness: number;
  animationSpeed: number;
}

export interface SceneProps {
  config: CharacterConfig;
}

export interface StatBarsProps {
  recovery: number;
  sleep: number;
  strain: number;
}

export interface StatBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}
