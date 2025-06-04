import React, { useEffect } from 'react';
import { DrawnTarotCard } from '../types';
import { CARD_BACK_IMAGE_DATA } from '../constants';
import { speak } from '../utils/speech'; // <-- Add this import

interface TarotCardDisplayProps {
  card: DrawnTarotCard | null;
  isRevealed: boolean;
  onCardClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const TarotCardDisplay: React.FC<TarotCardDisplayProps> = ({ card, isRevealed, onCardClick, isDisabled, isLoading }) => {
  const cardToShow = isRevealed && card ? card.imageData : CARD_BACK_IMAGE_DATA;
  const altText = isRevealed && card ? card.name : "Tarot card back";

  // Speak the card meaning when revealed
  useEffect(() => {
    if (isRevealed && card) {
      const meaning = card.isReversed ? card.fullMeaningReversed : card.fullMeaningUpright;
      speak(`${card.name}. ${meaning}`);
    }
  }, [isRevealed, card]);

  return (
    // ...existing JSX...
    // (no changes needed below)
    <div
      className={`relative flex flex-col items-center p-2 sm:p-3 bg-slate-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-purple-500/40 transition-all duration-300 ease-in-out ${isDisabled && isRevealed ? 'opacity-70' : 'cursor-pointer hover:shadow-purple-400/50 hover:scale-105'
        } ${isRevealed && card?.isReversed ? 'transform hover:scale-105' : ''}`}
      onClick={!isDisabled ? onCardClick : undefined}
      role="button"
      aria-label={isRevealed && card ? `Revealed card: ${card.name} ${card.isReversed ? '(Reversed)' : ''}` : "Click to reveal card"}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
          onCardClick();
        }
      }}
    >
      <div className={`transition-transform duration-700 ease-out ${isRevealed && card?.isReversed ? 'rotate-180' : ''} w-full aspect-[3/5]`}>
        <img
          src={cardToShow}
          alt={altText}
          className="w-full h-full object-contain rounded-md shadow-md border-2 border-amber-400/50"
        />
         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-300"></div>
            </div>
        )}
      </div>
      {isRevealed && card && (
        <div className={`absolute bottom-2 left-2 right-2 p-1 bg-black/70 rounded-b-md ${card.isReversed ? 'transform rotate-180 bottom-auto top-2 rounded-t-md rounded-b-none' : ''}`}>
          <h3 className={`text-center text-xs sm:text-sm font-semibold text-amber-200 tracking-tight`}>
            {card.name}
          </h3>
          {card.isReversed && <p className="text-center text-xs text-purple-300">(R)</p>}
        </div>
      )}
    </div>
  );
};

export default TarotCardDisplay;