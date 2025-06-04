
import React from 'react';

interface ReadingDisplayProps {
  reading: string;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading }) => {
  if (!reading) return null;

  return (
    <div className="mt-8 p-6 bg-purple-800/60 backdrop-blur-sm rounded-lg shadow-xl border border-purple-400/30">
      <h4 className="text-xl font-bold text-amber-300 mb-3">Your Mystic Reading:</h4>
      <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">{reading}</p>
    </div>
  );
};

export default ReadingDisplay;
