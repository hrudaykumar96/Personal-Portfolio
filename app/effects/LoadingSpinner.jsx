import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-70 z-50 backdrop-blur-md">
    
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full animate-bounce"
            style={{
              animationDelay: `${i * 0.3}s`,
              animationName: "bounceAndColorSlow",
              animationDuration: "4s", 
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            }}
          />
        ))}
      </div>

      <p className="mt-4 text-white text-sm font-medium animate-pulse">
        Loading...
      </p>

      <style>{`
        @keyframes bounceAndColorSlow {
          0%, 100% { background-color: white; transform: translateY(0); }
          16% { background-color: #1e293b; transform: translateY(-15%); }
          33% { background-color: #4f46e5; transform: translateY(0); }
          50% { background-color: white; transform: translateY(-15%); }
          66% { background-color: #1e293b; transform: translateY(0); }
          83% { background-color: #4f46e5; transform: translateY(-15%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;