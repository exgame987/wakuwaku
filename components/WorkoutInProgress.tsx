
import React, { useState, useEffect, useCallback } from 'react';
import { Workout } from '../types';
import { Button } from './Button';

interface WorkoutInProgressProps {
  workout: Workout;
  onComplete: (pointsAwarded: number) => void;
  onCancel: () => void;
}

const AD_DURATION_SECONDS = 30;
// Placeholder video URL (e.g., a short, generic, royalty-free clip)
// Using a common placeholder video. Ideally, this would be an actual 30s ad.
const AD_VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";


export const WorkoutInProgress: React.FC<WorkoutInProgressProps> = ({ workout, onComplete, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(workout.durationSeconds);
  const [showAd, setShowAd] = useState(false);
  const [adTimeRemaining, setAdTimeRemaining] = useState(0);

  const memoizedOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    setTimeLeft(workout.durationSeconds);
    if (workout.durationSeconds >= AD_DURATION_SECONDS) {
      setShowAd(true);
      setAdTimeRemaining(AD_DURATION_SECONDS);
    } else {
      setShowAd(false);
      setAdTimeRemaining(0);
    }
  }, [workout]);

  useEffect(() => {
    if (showAd && adTimeRemaining > 0) {
      const adTimerId = setInterval(() => {
        setAdTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(adTimerId);
    } else if (showAd && adTimeRemaining === 0) {
      setShowAd(false); // Hide ad when its timer finishes
    }
  }, [showAd, adTimeRemaining]);

  useEffect(() => {
    if (timeLeft <= 0) {
      memoizedOnComplete(workout.pointsAwarded);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, workout.pointsAwarded, memoizedOnComplete]);

  const progressPercentage = ((workout.durationSeconds - timeLeft) / workout.durationSeconds) * 100;

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-2xl">
      <div className="bg-white/20 p-8 rounded-xl shadow-xl max-w-2xl w-full text-center">
        
        {showAd && (
          <div className="mb-6 bg-black/50 p-4 rounded-lg" aria-label="広告エリア">
            <video 
              src={AD_VIDEO_URL} 
              width="100%" 
              height="auto" 
              autoPlay 
              muted 
              loop={false} // Ad should play once
              playsInline // Important for iOS
              className="rounded"
              onError={(e) => console.error("Ad video error:", e)}
            >
              お使いのブラウザはビデオタグをサポートしていません。
            </video>
            <p className="text-sm mt-2 text-yellow-300">広告 (残り {adTimeRemaining} 秒)</p>
          </div>
        )}

        <h2 className="text-4xl font-bold mb-4">{workout.name}</h2>
        <p className="text-lg mb-6 opacity-90 leading-relaxed">{workout.instructions}</p>
        
        <div className="my-8" role="timer" aria-live="assertive" aria-atomic="true">
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
              {/* Background circle */}
              <circle
                className="text-white/30"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              {/* Progress circle */}
              <circle
                className="text-yellow-400"
                strokeWidth="10"
                strokeDasharray="283" // 2 * PI * 45
                strokeDashoffset={283 - (283 * progressPercentage) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-mono font-bold text-yellow-300">{timeLeft}</span>
            </div>
          </div>
           <p className="mt-2 text-xl">残り秒数</p>
        </div>

        <Button onClick={onCancel} variant="danger" size="lg" className="bg-white/20 hover:bg-white/30 text-white">
          ワークアウト中止
        </Button>
      </div>
    </div>
  );
};
