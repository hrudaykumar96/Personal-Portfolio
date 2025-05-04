import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-75 fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-lg">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 opacity-30"></div>

        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-t-white border-solid rounded-full animate-spin"></div>
      </div>

      <p className="mt-4 text-lg text-gray-50 font-medium animate-pulse">
        Loading Please wait...
      </p>
    </div>
  );
};

export default Loader;