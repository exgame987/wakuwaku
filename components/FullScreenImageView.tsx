
import React from 'react';
import { Illustration } from '../types';
import { Button } from './Button';

interface FullScreenImageViewProps {
  illustration: Illustration;
  onClose: () => void;
}

export const FullScreenImageView: React.FC<FullScreenImageViewProps> = ({ illustration, onClose }) => {
  // Close on Escape key
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100] p-4"
      onClick={onClose} // Close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-image-title"
    >
      <div 
        className="bg-white p-4 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image/modal content
      >
        <img 
            src={illustration.fullImageUrl} 
            alt={illustration.name} 
            className="max-w-full max-h-[calc(90vh-80px)] object-contain rounded"
        />
        <h3 id="fullscreen-image-title" className="text-xl font-semibold text-gray-800 mt-3 text-center">{illustration.name}</h3>
        <Button 
          onClick={onClose} 
          variant="danger"
          className="absolute top-3 right-3"
          aria-label="全画面画像表示を閉じる"
        >
          &times;
        </Button>
      </div>
    </div>
  );
};
