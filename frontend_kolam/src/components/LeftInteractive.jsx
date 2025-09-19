import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import splashScreen from '../assets/images/SplashScreen.gif';

const LeftInteractive = ({ darkMode = false }) => {
  const [gifKey, setGifKey] = useState(0);

  // Force GIF to restart when component mounts
  useEffect(() => {
    setGifKey(prev => prev + 1);
  }, []);

  return (
    <div className="relative h-full min-h-screen flex items-center justify-center p-4 sm:p-8 lg:p-16 overflow-hidden">
      {/* Dot Grid Background */}
      <div className={`absolute inset-0 dot-grid-bg opacity-40 transition-opacity duration-300 ${
        darkMode ? 'opacity-20' : 'opacity-40'
      }`}></div>
      
      {/* Video Container */}
      <motion.div 
        className="relative z-10 w-fit mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Kolam Splash Screen GIF */}
        <div className={`relative overflow-hidden rounded-2xl transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`} style={{
          boxShadow: darkMode 
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          width: '550px',
          height: '550px'
        }}>
          <img
            key={gifKey}
            src={`${splashScreen}?t=${gifKey}`}
            alt="Kolam splash screen animation"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              darkMode ? 'opacity-90' : 'opacity-100'
            }`}
            style={{
              width: '550px',
              height: '550px'
            }}
            loading="eager"
            decoding="async"
            onLoad={() => {
              // Ensure the GIF starts playing from the beginning
              console.log('GIF loaded and ready to play');
            }}
          />
        </div>
        
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-10 left-10 hidden md:block"
        style={{ 
          color: darkMode 
            ? 'rgba(251, 146, 60, 0.3)' 
            : 'rgba(139, 69, 19, 0.3)' 
        }}
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="w-3 h-3 rounded-full transition-colors duration-300" style={{ backgroundColor: 'currentColor' }}></div>
      </motion.div>
      
      <motion.div 
        className="absolute right-10 hidden md:block"
        style={{ 
          top: '25%',
          color: darkMode 
            ? 'rgba(249, 115, 22, 0.3)' 
            : 'rgba(160, 82, 45, 0.3)' 
        }}
        animate={{ 
          x: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      >
        <div className="w-2 h-2 rounded-full transition-colors duration-300" style={{ backgroundColor: 'currentColor' }}></div>
      </motion.div>
    </div>
  );
};

export default LeftInteractive;