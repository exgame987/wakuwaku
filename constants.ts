
import { Workout, Illustration } from './types';

export const APP_NAME = "わくわくトレーニング";

// Workout Time Selection Constants
export const WORKOUT_DURATION_STEP_SECONDS = 30; // 15秒 -> 30秒
export const POINTS_PER_STEP = 1; // 1ステップあたりのポイント (1ステップ = 30秒)
export const MIN_WORKOUT_DURATION_STEPS = 1; // Minimum 1 step * 30s = 30 seconds
export const MAX_WORKOUT_DURATION_STEPS = 6; // Maximum 6 steps * 30s = 180 seconds (3 minutes)
export const DEFAULT_WORKOUT_DURATION_STEPS = 1; // Default to 1 step * 30s = 30 seconds

export const WORKOUTS_DATA: Omit<Workout, 'durationSeconds' | 'pointsAwarded'>[] = [
  {
    id: 'w1',
    name: '懸垂',
    description: '自分の体重を腕と背中の力で持ち上げる運動。主に広背筋や僧帽筋など、背中の広い範囲の筋肉を鍛えられます。',
    instructions: '自分の体重を腕と背中の力で持ち上げる運動。主に広背筋や僧帽筋など、背中の広い範囲の筋肉を鍛えられます。',
    image: 'https://illust8.com/wp-content/uploads/2022/06/kensui_training_16744.png'
  },
  {
    id: 'w2',
    name: 'プランク',
    description: 'うつ伏せで体を一直線に保つ体幹トレーニング。腹筋群を中心に、全身の筋肉を使い、姿勢の改善にも繋がります。',
    instructions: 'うつ伏せで体を一直線に保つ体幹トレーニング。腹筋群を中心に、全身の筋肉を使い、姿勢の改善にも繋がります。',
    image: 'https://illust8.com/wp-content/uploads/2022/06/push-ups_16739-768x591.png'
  },
  {
    id: 'w3',
    name: 'スクワット',
    description: '「キング・オブ・トレーニング」とも呼ばれ、下半身全体を効率よく鍛える運動。お尻や太ももの筋肉に効果的です。',
    instructions: '「キング・オブ・トレーニング」とも呼ばれ、下半身全体を効率よく鍛える運動。お尻や太ももの筋肉に効果的です。',
    image: 'https://illust8.com/wp-content/uploads/2022/06/training_squat_female_16623.png'
  },
  {
    id: 'w4',
    name: 'ヨガ',
    description: '呼吸とポーズ、瞑想を組み合わせ、心身のバランスを整える。柔軟性向上やリラックス効果、ストレス軽減が期待できます。',
    instructions: '呼吸とポーズ、瞑想を組み合わせ、心身のバランスを整える。柔軟性向上やリラックス効果、ストレス軽減が期待できます。',
    image: 'https://illust8.com/wp-content/uploads/2022/05/yoga_ki-pause_stretch_16535-768x689.png'
  }
];

export const ILLUSTRATIONS_DATA: Illustration[] = [
  { 
    id: 'gallery1', 
    name: 'チャイナドレス', 
    cost: 1, 
    thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140c35e878c738cqbug/f2644c2ecb0a4aa30b389b246f1effaf_high.webp', 
    fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140c35e878c738cqbug/f2644c2ecb0a4aa30b389b246f1effaf_high.webp' 
  },
  { 
    id: 'gallery2', 
    name: '浴衣', 
    cost: 1, 
    thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140blde878c73cb8r50/dd39ce67a0e84e76185df0859be24e6c_high.webp', 
    fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140blde878c73cb8r50/dd39ce67a0e84e76185df0859be24e6c_high.webp' 
  },
  { 
    id: 'gallery3', 
    name: 'バニーガール', 
    cost: 2, 
    thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140bdde878c738ckl4g/c20c67e389f7dd99d877c074fce33407_high.webp', 
    fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140bdde878c738ckl4g/c20c67e389f7dd99d877c074fce33407_high.webp' 
  },
  { 
    id: 'gallery4', 
    name: 'ビキニ', 
    cost: 3, 
    thumbnailUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140cgle878c73f1tehg/643e0352efa267be4c6d22211c87df24_high.webp', 
    fullImageUrl: 'https://image.cdn2.seaart.me/2025-06-10/d140cgle878c73f1tehg/643e0352efa267be4c6d22211c87df24_high.webp' 
  },
];

export const POINTS_STORAGE_KEY = 'fitArtRewardsPoints';
export const UNLOCKED_ILLUSTRATIONS_STORAGE_KEY = 'fitArtRewardsUnlocked';

// Sound Effect File Paths (assuming they are in public/sounds/ or a 'sounds' folder at the root)
// Changed to relative paths for GitHub Pages
export const SOUND_WORKOUT_START = 'sounds/workout-start.mp3';
export const SOUND_WORKOUT_COMPLETE = 'sounds/workout-complete.mp3';
export const SOUND_GALLERY_UNLOCK = 'sounds/gallery-unlock.mp3';