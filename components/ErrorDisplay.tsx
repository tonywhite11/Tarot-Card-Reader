
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-6 p-4 bg-red-700/80 border border-red-500 text-white rounded-lg shadow-md">
      <p className="font-semibold">An Error Occurred:</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
