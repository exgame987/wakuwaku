
import React from 'react';
import { Illustration } from '../types';
import { GalleryItem } from './GalleryItem';

interface GalleryViewProps {
  illustrations: Illustration[];
  unlockedIllustrationIds: Set<string>;
  currentPoints: number;
  onUnlockIllustration: (illustration: Illustration) => void;
  onViewIllustration: (illustration: Illustration) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ 
  illustrations, 
  unlockedIllustrationIds, 
  currentPoints, 
  onUnlockIllustration,
  onViewIllustration
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">イラストギャラリー</h2>
      {illustrations.length === 0 ? (
        <p className="text-center text-gray-500">利用可能なイラストはまだありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {illustrations.map((illustration) => (
            <GalleryItem
              key={illustration.id}
              illustration={illustration}
              isUnlocked={unlockedIllustrationIds.has(illustration.id)}
              canAfford={currentPoints >= illustration.cost}
              onUnlock={() => onUnlockIllustration(illustration)}
              onView={() => onViewIllustration(illustration)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
