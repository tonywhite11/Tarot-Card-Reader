import { GoogleGenAI } from "@google/genai";
import { DrawnTarotCard } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("CRITICAL: API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const modelName = 'gemini-2.5-flash-preview-04-17';

const generateContentWithRetries = async (prompt: string, maxRetries = 3) => {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      attempts++;
      console.error(`Error fetching reading (Attempt ${attempts}/${maxRetries}):`, error);
      if (attempts >= maxRetries) {
        let errorMessage = "An unknown error occurred while generating the reading after multiple retries.";
        if (error instanceof Error) {
          errorMessage = `Error generating reading: ${error.message}. Please check your API key and network connection, or try again later.`;
        }
        return errorMessage;
      }
      // Optional: implement exponential backoff here
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // Simple linear backoff
    }
  }
  return "Failed to generate reading after multiple retries."; // Should be caught by the loop's error handling
};


export const getIndividualCardReading = async (card: DrawnTarotCard, positionContext: string): Promise<string> => {
  const orientation = card.isReversed ? "reversed" : "upright";
  const relevantMeaning = card.isReversed ? card.fullMeaningReversed : card.fullMeaningUpright;
  const relevantKeywords = card.isReversed ? card.keywordsReversed.join(', ') : card.keywordsUpright.join(', ');

 const prompt = `
You are a mystical Tarot expert. The user is performing a three-card spread.
They have just revealed the "${card.name}" card, which is ${orientation}. This card is in the position representing "${positionContext}".

Card Details:
- Name: ${card.name}
- Orientation: ${orientation}
- Position Context: ${positionContext}
- Keywords associated: ${relevantKeywords}
- Core Meaning for this orientation: ${relevantMeaning}

Concisely explain the essence of this single card and its immediate implication for the user based on its position and orientation.
Summarize the meaning in 1 short, clear sentence (no more than 50 words). Be concise and direct.
Do not greet the user. Directly provide the interpretation for this one card.
Example for The Fool (upright) as 'The Situation': "An exhilarating new beginning is upon you, urging you to take a leap of faith."
`;

  const result = await generateContentWithRetries(prompt);
  return result ?? "An error occurred while generating the card reading.";
};

export const getOverallTarotReading = async (
  card1: DrawnTarotCard, reading1: string | null,
  card2: DrawnTarotCard, reading2: string | null,
  card3: DrawnTarotCard, reading3: string | null
): Promise<string> => {
  
  const formatCardInfo = (card: DrawnTarotCard, reading: string | null, position: string) => {
    const orientation = card.isReversed ? "reversed" : "upright";
    // Use provided individual reading if available, otherwise fall back to core meaning
    const meaningSummary = reading && !reading.toLowerCase().includes("error") 
                           ? reading 
                           : (card.isReversed ? card.fullMeaningReversed : card.fullMeaningUpright);
    return `Card for "${position}": "${card.name}" (${orientation}). Summary: ${meaningSummary}`;
  };

  const cardInfo1 = formatCardInfo(card1, reading1, "The Core Situation");
  const cardInfo2 = formatCardInfo(card2, reading2, "The Action or Challenge");
  const cardInfo3 = formatCardInfo(card3, reading3, "The Outcome or Guidance");

  const prompt = `
You are a mystical Tarot reader providing a synthesized three-card reading.
The user has drawn the following cards:
1. ${cardInfo1}
2. ${cardInfo2}
3. ${cardInfo3}

Please provide a cohesive and insightful overall reading that synthesizes these three cards, considering their positions.
Weave them into a short narrative or guidance for the user (around 3-5 sentences).
Focus on a positive or constructive outlook. Avoid just listing the cards again; focus on their combined message.
Start the reading directly with the insight.
Example: "Your current path of new beginnings (Card 1) calls for decisive action and willpower (Card 2), leading to a triumphant outcome if you stay true to your course (Card 3). Trust your inner strength."
`;
  const result = await generateContentWithRetries(prompt);
  return result ?? "An error occurred while generating the overall tarot reading.";
};
