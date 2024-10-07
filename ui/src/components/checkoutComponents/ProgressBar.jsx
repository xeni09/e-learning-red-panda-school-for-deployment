import React from 'react';

const ProgressBar = ({ step, setStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className={`flex-1 border-t-2 ${step >= 1 ? 'border-[var(--color-yellow)]' : 'border-gray-300'}`} />
        <div
          className={`px-4 py-2 rounded-full cursor-pointer ${step >= 1 ? 'bg-[var(--color-yellow)] text-white' : 'bg-gray-300 text-gray-600'}`}
          onClick={() => setStep(1)}
        >
          1
        </div>
        <div className={`flex-1 border-t-2 ${step >= 2 ? 'border-[var(--color-yellow)]' : 'border-gray-300'}`} />
        <div
          className={`px-4 py-2 rounded-full cursor-pointer ${step >= 2 ? 'bg-[var(--color-yellow)] text-white' : 'bg-gray-300 text-gray-600'}`}
          onClick={() => setStep(2)}
        >
          2
        </div>
        <div className={`flex-1 border-t-2 ${step >= 3 ? 'border-[var(--color-yellow)]' : 'border-gray-300'}`} />
        <div
          className={`px-4 py-2 rounded-full cursor-pointer ${step >= 3 ? 'bg-[var(--color-yellow)] text-white' : 'bg-gray-300 text-gray-600'}`}
          onClick={() => setStep(3)}
        >
          3
        </div>
        <div className="flex-1 border-t-2 border-gray-300" />
      </div>
    </div>
  );
};

export default ProgressBar;
