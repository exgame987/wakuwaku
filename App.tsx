
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Workout, Illustration } from './types';
import { 
  WORKOUTS_DATA as BASE_WORKOUTS_DATA, 
  ILLUSTRATIONS_DATA, 
  POINTS_STORAGE_KEY, 
  UNLOCKED_ILLUSTRATIONS_STORAGE_KEY, 
  APP_NAME,
  SOUND_WORKOUT_START,
  SOUND_WORKOUT_COMPLETE,
  SOUND_GALLERY_UNLOCK
} from './constants';
import { Header } from './components/Header';
import { WorkoutSelector } from './components/WorkoutSelector';
import { WorkoutInProgress } from './components/WorkoutInProgress';
import { GalleryView } from './components/GalleryView';
import { FullScreenImageView } from './components/FullScreenImageView';
import { Button } from './components/Button';
import { FitnessIcon } from './components/icons/FitnessIcon';
import { GalleryIcon } from './components/icons/GalleryIcon';
import { playSound } from './utils/soundUtils';


// Prepare full workout data by ensuring all fields are present, even if some are overridden later
const WORKOUTS_DATA: Workout[] = BASE_WORKOUTS_DATA.map(baseWorkout => ({
  ...baseWorkout,
  durationSeconds: 0, // Will be overridden by user selection
  pointsAwarded: 0,   // Will be overridden by user selection
}));


const App: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [unlockedIllustrationIds, setUnlockedIllustrationIds] = useState<Set<string>>(new Set());
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [viewingIllustration, setViewingIllustration] = useState<Illustration | null>(null);
  const [showWorkoutCompleteMessage, setShowWorkoutCompleteMessage] = useState<string | null>(null);

  // Load state from localStorage on initial mount
  useEffect(() => {
    const storedPoints = localStorage.getItem(POINTS_STORAGE_KEY);
    if (storedPoints) {
      setPoints(JSON.parse(storedPoints));
    }
    const storedUnlockedIds = localStorage.getItem(UNLOCKED_ILLUSTRATIONS_STORAGE_KEY);
    if (storedUnlockedIds) {
      setUnlockedIllustrationIds(new Set(JSON.parse(storedUnlockedIds)));
    }
  }, []);

  // Save points to localStorage
  useEffect(() => {
    localStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(points));
  }, [points]);

  // Save unlocked illustrations to localStorage
  useEffect(() => {
    localStorage.setItem(UNLOCKED_ILLUSTRATIONS_STORAGE_KEY, JSON.stringify(Array.from(unlockedIllustrationIds)));
  }, [unlockedIllustrationIds]);

  const handleSelectWorkout = useCallback((baseWorkout: Omit<Workout, 'durationSeconds' | 'pointsAwarded'>, duration: number, pointsToAward: number) => {
    const workoutToStart: Workout = {
      ...baseWorkout,
      durationSeconds: duration,
      pointsAwarded: pointsToAward,
    };
    playSound(SOUND_WORKOUT_START);
    setActiveWorkout(workoutToStart);
    setCurrentView('workout_active');
  }, []);

  const handleWorkoutComplete = useCallback((pointsAwarded: number) => {
    setPoints(prev => prev + pointsAwarded);
    playSound(SOUND_WORKOUT_COMPLETE);
    setActiveWorkout(null);
    setCurrentView('workout_selection');
    setShowWorkoutCompleteMessage(`おめでとうございます！${pointsAwarded}ポイント獲得しました！`);
    setTimeout(() => setShowWorkoutCompleteMessage(null), 3000);
  }, []);
  
  const handleWorkoutCancel = useCallback(() => {
    setActiveWorkout(null);
    setCurrentView('workout_selection');
  }, []);

  const handleUnlockIllustration = useCallback((illustration: Illustration) => {
    if (points >= illustration.cost && !unlockedIllustrationIds.has(illustration.id)) {
      setPoints(prev => prev - illustration.cost);
      setUnlockedIllustrationIds(prev => new Set(prev).add(illustration.id));
      playSound(SOUND_GALLERY_UNLOCK);
      setViewingIllustration(illustration); // Optionally view immediately
      setCurrentView('image_fullscreen');
    }
  }, [points, unlockedIllustrationIds]);

  const handleViewIllustration = useCallback((illustration: Illustration) => {
    setViewingIllustration(illustration);
    setCurrentView('image_fullscreen');
  }, []);

  const handleCloseFullScreenImage = useCallback(() => {
    setViewingIllustration(null);
    setCurrentView('gallery');
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-10rem)]">
            <img 
              src="https://image.cdn2.seaart.me/2025-06-10/d1403m5e878c73c99qog/c9035b2143475b0fd3d6ebaed96867ea_high.webp" 
              alt="フィットネスアートのモチベーションを高める画像" 
              className="w-full max-w-2xl aspect-square mx-auto rounded-lg shadow-xl mb-8 object-cover"
            />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{APP_NAME}へようこそ！</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              ワークアウトを完了してポイントを獲得し、そのポイントを使ってギャラリーの美しいデジタルイラストをアンロックしましょう。
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row">
              <Button onClick={() => setCurrentView('workout_selection')} variant="primary" size="lg" leftIcon={<FitnessIcon/>}>
                ワークアウト開始
              </Button>
              <Button onClick={() => setCurrentView('gallery')} variant="secondary" size="lg" leftIcon={<GalleryIcon/>}>
                ギャラリーを見る
              </Button>
            </div>
          </div>
        );
      case 'workout_selection':
        // Pass only base workout data to WorkoutSelector
        return <WorkoutSelector workouts={BASE_WORKOUTS_DATA} onSelectWorkout={handleSelectWorkout} />;
      case 'workout_active':
        if (!activeWorkout) {
          setCurrentView('workout_selection'); 
          return null;
        }
        return <WorkoutInProgress workout={activeWorkout} onComplete={handleWorkoutComplete} onCancel={handleWorkoutCancel} />;
      case 'gallery':
        return (
          <GalleryView
            illustrations={ILLUSTRATIONS_DATA}
            unlockedIllustrationIds={unlockedIllustrationIds}
            currentPoints={points}
            onUnlockIllustration={handleUnlockIllustration}
            onViewIllustration={handleViewIllustration}
          />
        );
      case 'image_fullscreen':
        if (!viewingIllustration) {
          setCurrentView('gallery'); 
          return null;
        }
        return <FullScreenImageView illustration={viewingIllustration} onClose={handleCloseFullScreenImage} />;
      default:
        return <div className="text-center p-8">ページが見つかりません。</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header points={points} currentView={currentView} setView={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showWorkoutCompleteMessage && (
          <div 
            className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-[1000] transition-opacity duration-300"
            role="alert"
            aria-live="assertive"
          >
            {showWorkoutCompleteMessage}
          </div>
        )}
        {renderView()}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
