import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import heroVideoPlaceholder from '../assets/images/hero-video-placeholder.svg';

const LeftInteractive = ({ darkMode = false }) => {
  const handlePlayClick = () => {
    console.log('Play video clicked - TODO: Implement video player');
  };

  return (
    <div className="relative h-full min-h-screen flex items-center justify-center p-8 lg:p-16">
      {/* Dot Grid Background */}
      <div className={`absolute inset-0 dot-grid-bg opacity-40 transition-opacity duration-300 ${
        darkMode ? 'opacity-20' : 'opacity-40'
      }`}></div>
      
      {/* Video Container */}
      <motion.div 
        className="relative z-10 group cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onClick={handlePlayClick}
      >
        {/* Video Placeholder */}
        <div className={`relative overflow-hidden rounded-2xl transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`} style={{
          boxShadow: darkMode 
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}>
          <img 
            src={heroVideoPlaceholder}
            alt="Kolam demonstration video placeholder"
            className={`w-full h-auto min-w-[300px] min-h-[225px] sm:min-w-[400px] sm:min-h-[300px] object-cover transition-opacity duration-300 ${
              darkMode ? 'opacity-80' : 'opacity-100'
            }`}
          />
          
          {/* Play Button Overlay */}
          <motion.div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              darkMode 
                ? 'bg-black bg-opacity-40 group-hover:bg-opacity-50' 
                : 'bg-black bg-opacity-20 group-hover:bg-opacity-30'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className={`rounded-full p-4 transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800 bg-opacity-90' 
                  : 'bg-white bg-opacity-90'
              }`}
              style={{
                backdropFilter: 'blur(4px)',
                boxShadow: darkMode 
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              whileHover={{ 
                backgroundColor: darkMode ? 'rgba(31, 41, 55, 1)' : 'rgba(255, 255, 255, 1)'
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Play 
                className={`w-8 h-8 ml-1 transition-colors duration-300 ${
                  darkMode ? 'text-red-400' : 'text-primary'
                }`}
                fill="currentColor"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Interactive Glow Effect */}
        <motion.div 
          className="absolute rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            inset: '-1rem',
            background: darkMode 
              ? 'linear-gradient(to right, rgba(251, 146, 60, 0.2), rgba(249, 115, 22, 0.2))'
              : 'linear-gradient(to right, rgba(139, 69, 19, 0.2), rgba(160, 82, 45, 0.2))'
          }}
          initial={false}
        />
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