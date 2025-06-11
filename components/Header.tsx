
import React from 'react';
import { APP_NAME } from '../constants';
import { AppView } from '../types';
import { Button } from './Button';
import { HeartIcon } from './icons/HeartIcon'; // Changed from StarIcon
import { FitnessIcon } from './icons/FitnessIcon';
import { GalleryIcon } from './icons/GalleryIcon';


interface HeaderProps {
  points: number;
  currentView: AppView;
  setView: (view: AppView) => void;
}

export const Header: React.FC<HeaderProps> = ({ points, currentView, setView }) => {
  // navButtonClass is no longer used as Buttons are used directly

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <h1
            onClick={() => setView('home')}
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded" // Changed to orange
            aria-label={`${APP_NAME} ホームに移動`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setView('home');
              }
            }}
          >
            <img
              src="https://github.com/exgame987/wakuwaku/blob/main/img/wakutore.png?raw=true"
              alt={`${APP_NAME} ロゴ`}
              className="h-12 sm:h-14 object-contain"
            />
          </h1>
          <nav className="flex items-center space-x-2"> {/* Reduced space for icon-only buttons */}
            <Button
              onClick={() => setView('workout_selection')}
              variant={currentView.startsWith('workout') ? 'primary' : 'ghost'}
              size="md" // Keep size for adequate click area
              className="p-2" // Adjust padding for icon-only
              leftIcon={<FitnessIcon className="w-6 h-6"/>} // Ensure icon size is prominent
              aria-label="ワークアウトページへ移動"
            >
              {/* Text removed */}
            </Button>
            <Button
              onClick={() => setView('gallery')}
              variant={currentView === 'gallery' || currentView === 'image_fullscreen' ? 'primary' : 'ghost'}
              size="md" // Keep size for adequate click area
              className="p-2" // Adjust padding for icon-only
              leftIcon={<GalleryIcon className="w-6 h-6"/>} // Ensure icon size is prominent
              aria-label="ギャラリーページへ移動"
            >
              {/* Text removed */}
            </Button>
            <div className="flex items-center bg-pink-500 text-white font-semibold px-4 py-2 rounded-full shadow ml-2" aria-live="polite"> {/* Pink theme for points */}
              <HeartIcon className="w-6 h-6 mr-2 text-white" /> {/* HeartIcon and white text for icon color */}
              <span>{points} Pt</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};