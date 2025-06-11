import React, { useState } from 'react';
import { Workout } from '../types';
import { Button } from './Button';
import { FitnessIcon } from './icons/FitnessIcon';
import { DurationSelectionModal } from './DurationSelectionModal';
import {
  WORKOUTS_DATA as BASE_WORKOUTS_DATA,
  WORKOUT_DURATION_STEP_SECONDS,
  POINTS_PER_STEP
} from '../constants';


interface WorkoutSelectorProps {
  workouts: Omit<Workout, 'durationSeconds' | 'pointsAwarded'>[];
  onSelectWorkout: (baseWorkout: Omit<Workout, 'durationSeconds' | 'pointsAwarded'>, duration: number, points: number) => void;
}

export const WorkoutSelector: React.FC<WorkoutSelectorProps> = ({ workouts, onSelectWorkout }) => {
  const [durationModalOpen, setDurationModalOpen] = useState(false);
  const [selectedWorkoutForModal, setSelectedWorkoutForModal] = useState<Omit<Workout, 'durationSeconds' | 'pointsAwarded'> | null>(null);

  const handleOpenDurationModal = (workout: Omit<Workout, 'durationSeconds' | 'pointsAwarded'>) => {
    setSelectedWorkoutForModal(workout);
    setDurationModalOpen(true);
  };

  const handleCloseDurationModal = () => {
    setDurationModalOpen(false);
    setSelectedWorkoutForModal(null);
  };

  const handleStartWorkoutWithDuration = (duration: number, points: number) => {
    if (selectedWorkoutForModal) {
      onSelectWorkout(selectedWorkoutForModal, duration, points);
      handleCloseDurationModal();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">ワークアウトを選択</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {workout.image && (
              <img src={workout.image} alt={workout.name} className="w-full h-48 object-contain bg-gray-100"/>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">{workout.name}</h3>
              <p className="text-gray-600 text-sm mb-3 h-16 overflow-y-auto">{workout.description}</p>
              <div className="flex justify-between items-center mb-4">
                {/* Static duration/points removed, will be dynamic */}
                <span className="text-sm text-gray-500">時間を選択</span>
                <span className="text-sm font-medium text-green-500">ポイント獲得</span>
              </div>
              <Button 
                onClick={() => handleOpenDurationModal(workout)} 
                variant="primary" 
                className="w-full"
                leftIcon={<FitnessIcon className="w-5 h-5"/>}
              >
                ワークアウト開始
              </Button>
            </div>
          </div>
        ))}
      </div>
      {durationModalOpen && selectedWorkoutForModal && (
        <DurationSelectionModal
          workout={selectedWorkoutForModal}
          onStart={handleStartWorkoutWithDuration}
          onCancel={handleCloseDurationModal}
        />
      )}
    </div>
  );
};