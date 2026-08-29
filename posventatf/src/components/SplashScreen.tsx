import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveAppView } from '../types';

interface SplashScreenProps {
  onSelectView: (view: ActiveAppView) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onSelectView }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTap = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // After animation finishes, navigate to owner portal
    setTimeout(() => {
      onSelectView('owner_portal');
    }, 1200); // 1.2s duration to match the animation
  };

  return (
    <div 
      className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center select-none cursor-pointer"
      onClick={handleTap}
    >
      <AnimatePresence>
        {!isAnimating && (
          <motion.div 
            className="text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-sm mb-8 animate-pulse font-sans tracking-widest uppercase">
              Toca para iniciar
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Logo that scales out */}
      <motion.div
        className="absolute flex items-center justify-center"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          isAnimating 
            ? { scale: 100, opacity: 0 } 
            : { scale: 1, opacity: 1 }
        }
        transition={{ 
          duration: 1.2, 
          ease: [0.64, 0.04, 0.35, 1] // Custom cubic-bezier for a dramatic zoom effect
        }}
      >
        <img 
          src="/logo-tf.png" 
          alt="Tierra Firme Logo" 
          className="w-48 md:w-64 object-contain"
          onError={(e) => {
            // Fallback if the user hasn't added the logo yet
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = '/icon.svg';
          }}
        />
      </motion.div>
    </div>
  );
};

