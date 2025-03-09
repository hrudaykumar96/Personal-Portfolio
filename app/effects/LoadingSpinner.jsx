import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      {/* Transparent Silver background overlay */}
      <div className="min-h-screen w-full rounded-lg shadow-xl flex flex-col items-center justify-center space-y-4 z-50" style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
        {/* Spinner */}
        <div className="border-t-4 border-teal-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        {/* Simplified Loading Text */}
        <p className="text-teal-400 text-lg">Loading Please Wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;