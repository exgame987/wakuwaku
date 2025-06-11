import React, { useState, useEffect } from 'react';
import { Workout } from '../types';
import { Button } from './Button';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { StarIcon } from './icons/StarIcon';
import { ClockIcon } from './icons/ClockIcon';
import { 
  WORKOUT_DURATION_STEP_SECONDS, 
  POINTS_PER_STEP, 
  MIN_WORKOUT_DURATION_STEPS, 
  MAX_WORKOUT_DURATION_STEPS,
  DEFAULT_WORKOUT_DURATION_STEPS
} from '../constants';

interface DurationSelectionModalProps {
  workout: Omit<Workout, 'durationSeconds' | 'pointsAwarded'>;
  onStart: (duration: number, points: number) => void;
  onCancel: () => void;
}

export const DurationSelectionModal: React.FC<DurationSelectionModalProps> = ({ workout, onStart, onCancel }) => {
  const [currentSteps, setCurrentSteps] = useState(DEFAULT_WORKOUT_DURATION_STEPS);

  const currentDuration = currentSteps * WORKOUT_DURATION_STEP_SECONDS;
  const currentPoints = currentSteps * POINTS_PER_STEP;

  const incrementSteps = () => {
    setCurrentSteps(prev => Math.min(prev + 1, MAX_WORKOUT_DURATION_STEPS));
  };

  const decrementSteps = () => {
    setCurrentSteps(prev => Math.max(prev - 1, MIN_WORKOUT_DURATION_STEPS));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4"
        onClick={onCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="duration-modal-title"
    >
      <div 
        className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="duration-modal-title" className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 text-center">
          {workout.name} - 時間設定
        </h2>
        
        <div className="mb-6 text-center">
          <p className="text-lg text-gray-700 mb-2">ワークアウトの時間を選択してください。</p>
          <div className="flex items-center justify-center space-x-4 my-4">
            <Button
              onClick={decrementSteps}
              disabled={currentSteps <= MIN_WORKOUT_DURATION_STEPS}
              variant="secondary"
              size="md"
              aria-label="時間を減らす"
              className="p-3"
            >
              <MinusIcon className="w-5 h-5" />
            </Button>
            <div 
                className="text-3xl sm:text-4xl font-bold text-indigo-600 w-28 text-center"
                aria-live="polite"
            >
                {currentDuration}秒
            </div>
            <Button
              onClick={incrementSteps}
              disabled={currentSteps >= MAX_WORKOUT_DURATION_STEPS}
              variant="secondary"
              size="md"
              aria-label="時間を増やす"
              className="p-3"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">({MIN_WORKOUT_DURATION_STEPS * WORKOUT_DURATION_STEP_SECONDS}秒 から {MAX_WORKOUT_DURATION_STEPS * WORKOUT_DURATION_STEP_SECONDS}秒まで)</p>
        </div>

        <div className="mb-8 p-4 bg-indigo-50 rounded-lg text-center">
          <div className="flex items-center justify-center text-xl sm:text-2xl font-semibold text-green-600">
            <StarIcon className="w-6 h-6 mr-2 text-yellow-500" />
            獲得予定ポイント: {currentPoints}
          </div>
          <div className="flex items-center justify-center text-md sm:text-lg text-gray-600 mt-1">
            <ClockIcon className="w-5 h-5 mr-2 text-gray-500" />
            選択中の時間: {currentDuration}秒
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => onStart(currentDuration, currentPoints)} 
            variant="primary" 
            size="lg"
            className="w-full"
          >
            この設定で開始
          </Button>
          <Button 
            onClick={onCancel} 
            variant="ghost" 
            size="lg"
            className="w-full"
          >
            キャンセル
          </Button>
        </div>
      </div>
    </div>
  );
};
