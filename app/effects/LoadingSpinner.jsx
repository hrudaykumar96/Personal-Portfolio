import React from 'react';
import { useData } from '../context/contextProvider';

const LoadingSpinner = () => {

  const { theme } = useData();

  return (
    <div className={` ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex flex-col items-center justify-center bg-opacity-95`}>
      {/* Transparent Silver background overlay */}
      <div className="min-h-screen w-full rounded-lg shadow-xl flex flex-col items-center justify-center space-y-4 z-50 bg-opacity-95">
        {/* Spinner */}
        <div className={`border-t-4 ${theme === "dark" ? "border-teal-500" : "border-indigo-700"}  border-solid w-16 h-16 rounded-full animate-spin`}></div>
        {/* Simplified Loading Text */}
        <p className={` ${theme === "dark" ? "text-teal-400" : "text-indigo-700"}  text-lg`}>Loading Please Wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;