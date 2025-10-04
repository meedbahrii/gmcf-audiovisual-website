import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#1B1B1B] flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Simple Logo */}
        <div className="text-6xl font-bold text-[#B73239] tracking-wider">
          GMCF
        </div>
        
        {/* Simple Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-[#B73239]/20 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#B73239] h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Simple Loading Text */}
        <div className="text-[#F5F5F5] text-lg">
          Chargement...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;