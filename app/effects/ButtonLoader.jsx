import React from 'react';

const ButtonLoader = () => {
  return (
    <button
      className="flex items-center justify-center px-6 py-3 bg-teal-500 text-white rounded-md focus:outline-none opacity-75 cursor-wait w-full"
      disabled
    >
      <div className="border-t-4 border-teal-300 border-solid w-6 h-6 rounded-full animate-spin mr-5"></div>
      <span>Please Wait...</span>
    </button>
  );
};

export default ButtonLoader;
