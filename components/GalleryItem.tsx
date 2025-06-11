
import React from 'react';
import { Illustration } from '../types';
import { Button } from './Button';
import { LockIcon } from './icons/LockIcon';
import { StarIcon } from './icons/StarIcon';

interface GalleryItemProps {
  illustration: Illustration;
  isUnlocked: boolean;
  canAfford: boolean;
  onUnlock: () => void;
  onView: () => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ illustration, isUnlocked, canAfford, onUnlock, onView }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden relative transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1">
      <img 
        src={illustration.thumbnailUrl} 
        alt={illustration.name} 
        className={`w-full h-48 object-cover transition-all duration-300 ${!isUnlocked ? 'filter grayscale opacity-60' : 'group-hover:opacity-80'}`}
        aria-label={illustration.name}
      />
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
          <LockIcon className="w-12 h-12 text-white opacity-70 mb-2" aria-hidden="true" />
          <div className="flex items-center text-yellow-400 font-semibold text-lg mb-3">
            <StarIcon className="w-5 h-5 mr-1" aria-hidden="true"/> 
            {illustration.cost} ポイント
          </div>
          <Button 
            onClick={onUnlock} 
            disabled={!canAfford}
            variant={canAfford ? "success" : "secondary"}
            size="sm"
            className="w-full"
            aria-label={`${illustration.name}をアンロックする (${illustration.cost}ポイント必要)`}
          >
            {canAfford ? 'アンロック' : 'ポイント不足'}
          </Button>
        </div>
      )}
      {isUnlocked && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all duration-300 cursor-pointer"
          onClick={onView}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onView()}
          aria-label={`${illustration.name}を全画面表示`}
        >
          <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">全画面表示</span>
        </div>
      )}
      <div className="p-4">
        <h3 className={`text-lg font-semibold ${isUnlocked ? 'text-indigo-700' : 'text-gray-500'}`}>{illustration.name}</h3>
        {isUnlocked ? (
           <p className="text-sm text-green-600">アンロック済み</p>
        ) : (
          <p className="text-sm text-gray-400">ロック中</p>
        )}
      </div>
    </div>
  );
};
