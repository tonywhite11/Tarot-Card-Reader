
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400"></div>
      <p className="mt-4 text-purple-300 text-lg">Consulting the spirits...</p>
    </div>
  );
};

export default LoadingSpinner;
