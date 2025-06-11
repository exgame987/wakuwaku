
import React from 'react';
import { APP_NAME } from '../constants';
import { AppView } from '../types';
import { Button } from './Button';
import { StarIcon } from './icons/StarIcon';
import { FitnessIcon } from './icons/FitnessIcon';
import { GalleryIcon } from './icons/GalleryIcon';


interface HeaderProps {
  points: number;
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ points, currentView, setView }) => {
  const navButtonClass = (view: AppView) => 
    `font-medium px-4 py-2 rounded-md transition-colors ${
      currentView === view 
        ? 'bg-indigo-600 text-white' 
        : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <h1 
            className="text-3xl font-bold text-indigo-700 cursor-pointer"
            onClick={() => setView('home')}
            aria-label={`${APP_NAME} ホーム`}
          >
            {APP_NAME}
          </h1>
          <nav className="flex items-center space-x-4">
            <Button 
              onClick={() => setView('workout_selection')}
              variant={currentView.startsWith('workout') ? 'primary' : 'ghost'}
              size="md"
              leftIcon={<FitnessIcon className="w-5 h-5"/>}
              aria-label="ワークアウトページへ移動"
            >
              ワークアウト
            </Button>
            <Button 
              onClick={() => setView('gallery')}
              variant={currentView === 'gallery' || currentView === 'image_fullscreen' ? 'primary' : 'ghost'}
              size="md"
              leftIcon={<GalleryIcon className="w-5 h-5"/>}
              aria-label="ギャラリーページへ移動"
            >
              ギャラリー
            </Button>
            <div className="flex items-center bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-full shadow" aria-live="polite">
              <StarIcon className="w-6 h-6 mr-2 text-yellow-700" />
              <span>{points} ポイント</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
