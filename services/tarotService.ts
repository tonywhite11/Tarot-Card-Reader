import { TAROT_DECK } from '../constants';
import { DrawnTarotCard, ThreeCardSpread } from '../types';

export const drawThreeCards = (): ThreeCardSpread => {
  const deckCopy = [...TAROT_DECK];
  const drawnCards: DrawnTarotCard[] = [];

  if (deckCopy.length < 3) {
    throw new Error("Not enough cards in the deck to draw three unique cards.");
  }

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * deckCopy.length);
    const card = deckCopy.splice(randomIndex, 1)[0]; // Remove card from deckCopy to ensure uniqueness
    const isReversed = Math.random() < 0.10; // 10% chance of being reversed
    drawnCards.push({ ...card, isReversed });
  }
  
  return drawnCards as ThreeCardSpread; // We know it will have 3 cards
};
