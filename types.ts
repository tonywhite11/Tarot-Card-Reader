export interface TarotCardData {
  id: string;
  name: string;
  imageKeywords: string; // Maintained for potential fallback or other uses, but imageData will be primary
  imageData: string; // Base64 encoded image string
  keywordsUpright: string[];
  keywordsReversed: string[];
  fullMeaningUpright: string;
  fullMeaningReversed: string;
  // Optional: Meanings specific to positions if we implement them later
  // meaningPast?: string;
  // meaningPresent?: string;
  // meaningFuture?: string;
}

export interface DrawnTarotCard extends TarotCardData {
  isReversed: boolean;
}

// For a three-card spread
export type ThreeCardSpread = [DrawnTarotCard | null, DrawnTarotCard | null, DrawnTarotCard | null];
export type RevealedStates = [boolean, boolean, boolean];
export type IndividualReadings = [string | null, string |null, string | null];

export type GameStage = 
  | "initial"
  | "cardsDrawn"
  | "revealingCard1"
  | "card1Done"
  | "revealingCard2"
  | "card2Done"
  | "revealingCard3"
  | "card3Done"
  | "generatingOverall"
  | "overallDone"
  | "error";
