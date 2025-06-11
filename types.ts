export interface Workout {
  id: string;
  name: string;
  description: string;
  instructions: string;
  durationSeconds: number; // Will be set dynamically
  pointsAwarded: number; // Will be set dynamically
  image?: string;
}

export interface Illustration {
  id: string;
  name: string;
  cost: number;
  thumbnailUrl: string;
  fullImageUrl: string;
}

export type AppView = 'home' | 'workout_selection' | 'workout_active' | 'gallery' | 'image_fullscreen';