import React, { useState, useCallback, useEffect } from 'react';
import { ThreeCardSpread, RevealedStates, IndividualReadings, GameStage } from './types';
import { drawThreeCards } from './services/tarotService';
import { getIndividualCardReading, getOverallTarotReading } from './services/geminiService';
import TarotCardDisplay from './components/TarotCardDisplay';
import ReadingDisplay from './components/ReadingDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import { speak, pauseSpeech, resumeSpeech, stopSpeech } from './utils/speech';

const App: React.FC = () => {
  const initialCards: ThreeCardSpread = [null, null, null];
  const initialRevealed: RevealedStates = [false, false, false];
  const initialReadings: IndividualReadings = [null, null, null];

  const [drawnCards, setDrawnCards] = useState<ThreeCardSpread>(initialCards);
  const [revealedStates, setRevealedStates] = useState<RevealedStates>(initialRevealed);
  const [individualReadings, setIndividualReadings] = useState<IndividualReadings>(initialReadings);
  const [overallReading, setOverallReading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCardLoading, setIsCardLoading] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [error, setError] = useState<string | null>(null);
  const [gameStage, setGameStage] = useState<GameStage>("initial");
  const [allCardsSpoken, setAllCardsSpoken] = useState(false); // <-- Added for audio sequencing

  const cardPositionContexts = ["The Core Situation", "The Action or Challenge", "The Outcome or Guidance"];

  const resetGame = () => {
    setDrawnCards(initialCards);
    setRevealedStates(initialRevealed);
    setIndividualReadings(initialReadings);
    setOverallReading(null);
    setError(null);
    setIsLoading(false);
    setIsCardLoading([false, false, false]);
    setGameStage("initial");
    setAllCardsSpoken(false); // <-- Reset spoken state
  };

  // Stop audio on page unload/refresh
  useEffect(() => {
    window.addEventListener('beforeunload', stopSpeech);
    return () => {
      stopSpeech();
      window.removeEventListener('beforeunload', stopSpeech);
    };
  }, []);

  // Only play the overall reading after all cards have been spoken
useEffect(() => {
  if (overallReading && gameStage === "overallDone" && allCardsSpoken) {
    speak("Your Mystic Reading. " + overallReading);
  }
}, [overallReading, gameStage, allCardsSpoken]);

  // Stop audio when drawing a new spread
  const handleDrawSpread = useCallback(() => {
  stopSpeech();
  // Force voices to load (iOS workaround)
  window.speechSynthesis.getVoices();
  resetGame();
  setIsLoading(true);
  setError(null);
  try {
    const cards = drawThreeCards();
    setDrawnCards(cards);
    setGameStage("cardsDrawn");
  } catch (err) {
    console.error("Failed to draw cards:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred drawing cards.";
    setError(errorMessage);
    setGameStage("error");
  } finally {
    setIsLoading(false);
  }
}, []);

  const handleCardClick = useCallback(async (index: number) => {
  if (revealedStates[index] || !drawnCards[index] || isCardLoading[index] || isLoading) {
    return;
  }

  const newCardLoading = [...isCardLoading] as [boolean, boolean, boolean];
  newCardLoading[index] = true;
  setIsCardLoading(newCardLoading);
  setError(null);

  try {
    const card = drawnCards[index]!;
    const aiReading = await getIndividualCardReading(card, cardPositionContexts[index]);

    const newReadings = [...individualReadings] as IndividualReadings;
    if (aiReading.toLowerCase().includes("error generating reading")) {
      newReadings[index] = `Error: ${aiReading}`;
      setError(`An issue occurred while interpreting '${card.name}'. Please check logs or try again.`);
    } else {
      newReadings[index] = aiReading;
      // Call speak() directly after user interaction and after reading is ready
      speak(aiReading);
    }
    setIndividualReadings(newReadings);

    const newRevealedStates = [...revealedStates] as RevealedStates;
    newRevealedStates[index] = true;
    setRevealedStates(newRevealedStates);

  } catch (err) {
    console.error(`Failed to get reading for card ${index + 1}:`, err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
    setError(`Failed to get reading for ${drawnCards[index]?.name}: ${errorMessage}`);
    const newReadings = [...individualReadings] as IndividualReadings;
    newReadings[index] = "Error fetching reading.";
    setIndividualReadings(newReadings);
  } finally {
    const finalCardLoading = [...isCardLoading] as [boolean, boolean, boolean];
    finalCardLoading[index] = false;
    setIsCardLoading(finalCardLoading);
  }
}, [drawnCards, revealedStates, individualReadings, isCardLoading, isLoading, cardPositionContexts]);

  // Effect to trigger overall reading when all individual cards are revealed and have readings
  useEffect(() => {
    const allRevealed = revealedStates.every(r => r === true);
    const allReadingsDone = individualReadings.every(r => r !== null);

    if (allRevealed && allReadingsDone && !overallReading && !isLoading && gameStage !== "generatingOverall" && gameStage !== "overallDone") {
      const attemptOverallReading = async () => {
        if (!drawnCards[0] || !drawnCards[1] || !drawnCards[2]) return;
        setIsLoading(true);
        setGameStage("generatingOverall");
        setError(null);
        try {
          const reading = await getOverallTarotReading(
            drawnCards[0], individualReadings[0],
            drawnCards[1], individualReadings[1],
            drawnCards[2], individualReadings[2]
          );
          if (reading.toLowerCase().includes("error generating reading")) {
            setError(reading);
            setOverallReading("Could not generate a full reading at this time.");
          } else {
            setOverallReading(reading);
          }
          setGameStage("overallDone");
        } catch (err) {
          console.error("Failed to get overall tarot reading:", err);
          const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred for the overall reading.";
          setError(errorMessage);
          setGameStage("error");
        } finally {
          setIsLoading(false);
        }
      };
      attemptOverallReading();
    }
  }, [revealedStates, individualReadings, drawnCards, overallReading, isLoading, gameStage]);

  // Speak all card readings in order after all are revealed, then set allCardsSpoken
  useEffect(() => {
    const speakCardReadings = async () => {
      if (
        revealedStates.every(Boolean) &&
        individualReadings.every(r => r) &&
        !allCardsSpoken
      ) {
        for (let i = 0; i < 3; i++) {
          await speak(individualReadings[i]!);
        }
        setAllCardsSpoken(true);
      }
    };
    speakCardReadings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealedStates, individualReadings, allCardsSpoken]);

  // Only play the overall reading after all cards have been spoken
  useEffect(() => {
    if (overallReading && gameStage === "overallDone" && allCardsSpoken) {
      speak("Your Mystic Reading. " + overallReading);
    }
  }, [overallReading, gameStage, allCardsSpoken]);

  const renderCardSlots = () => {
    return drawnCards.map((card, index) => (
      <div key={card ? card.id + index : `empty-${index}`} className="flex flex-col items-center w-1/3 px-1 sm:px-2">
        <TarotCardDisplay
          card={card}
          isRevealed={revealedStates[index]}
          onCardClick={() => handleCardClick(index)}
          isDisabled={revealedStates[index] || isLoading || isCardLoading.some(l => l)}
          isLoading={isCardLoading[index]}
        />
        {revealedStates[index] && individualReadings[index] && (
          <div className={`mt-3 p-2 text-xs sm:text-sm rounded-md shadow ${individualReadings[index]?.toLowerCase().includes("error") ? 'bg-red-800/70' : 'bg-purple-700/50'} w-full max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-2`}>
            <p className="text-amber-100 leading-tight">{individualReadings[index]}</p>
            <button
              onClick={() => speak(individualReadings[index]!)}
              className="self-start px-2 py-1 bg-purple-400 text-white rounded hover:bg-purple-500 mt-2"
              aria-label="Play reading aloud"
            >
              🔊 Play
            </button>
          </div>
    )}
        {!revealedStates[index] && drawnCards[index] && (
          <p className="mt-2 text-purple-300 text-xs sm:text-sm italic h-6">{cardPositionContexts[index]}</p>
        )}
        {revealedStates[index] && drawnCards[index] && (
          <p className="mt-2 text-amber-200 text-xs sm:text-sm font-semibold h-6">{cardPositionContexts[index]}</p>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto max-w-4xl min-h-screen flex flex-col items-center justify-start py-8 px-2 sm:px-4 text-center">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-300 tracking-tight title-glow">
          Mystic Vision Three Card Spread
        </h1>
        <p className="text-lg sm:text-xl text-purple-300 mt-1 sm:mt-2">Unveil the threads of your destiny.</p>
      </header>

      <main className="w-full flex flex-col items-center">
        {/* Optional: Audio controls */}
        <div className="flex gap-2 mb-4">
          <button onClick={pauseSpeech} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-400">Pause Audio</button>
          <button onClick={resumeSpeech} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-400">Resume Audio</button>
          <button onClick={stopSpeech} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-400">Stop Audio</button>
        </div>

        {gameStage === "initial" && (
          <button
            onClick={handleDrawSpread}
            className="px-8 py-4 bg-amber-500 text-purple-900 font-bold text-xl rounded-lg shadow-xl hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Begin Your Reading
          </button>
        )}

        {(isLoading && gameStage !== "generatingOverall" && gameStage !== "initial") && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}

        {gameStage !== "initial" && drawnCards[0] && (
          <div className="flex justify-around w-full mb-4 sm:mb-6 animate-fadeIn">
            {renderCardSlots()}
          </div>
        )}

        {isCardLoading.some(l => l) && !isLoading && <p className="text-purple-200 my-2">Interpreting the card...</p>}

        {isLoading && gameStage === "generatingOverall" && <LoadingSpinner />}

        {overallReading && gameStage === "overallDone" && (
          <div className="mt-4 sm:mt-6 w-full max-w-2xl animate-fadeInUp">
            <ReadingDisplay reading={overallReading} />
          </div>
        )}

        {gameStage === "overallDone" && !isLoading && (
          <button
            onClick={handleDrawSpread}
            className="mt-8 px-6 py-3 bg-purple-600 text-amber-200 font-semibold text-lg rounded-lg shadow-lg hover:bg-purple-500 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400"
          >
            Draw Another Spread
          </button>
        )}
        {gameStage === "error" && !drawnCards[0] && (
          <button
            onClick={resetGame}
            className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-red-500 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
          >
            Try Again
          </button>
        )}
      </main>

      <footer className="mt-10 sm:mt-16 text-center text-xs sm:text-sm text-purple-400/70">
        <p>&copy; {new Date().getFullYear()} Mystic Vision Tarot. For entertainment purposes only.</p>
        <p>Images are illustrative placeholders. Card interpretations powered by Gemini API.</p>
      </footer>

      <style>{`
        .title-glow {
          text-shadow: 0 0 8px rgba(252, 211, 77, 0.7), 0 0 12px rgba(252, 211, 77, 0.5);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0; 
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2c1d42; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a78bfa;
        }
      `}</style>
    </div>
  );
};

export default App;