import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameAction = ({ currentLevel, darkMode = false }) => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    // Navigate to start game page
    navigate('/start-game');
  };

  const getButtonText = () => {
    return "CHOOSE LEVEL";
  };

  const getSubtitleText = () => {
    return "Choose your level and begin your Kolam learning journey";
  };

  return (
    <div className={`rounded-2xl p-8 border text-center transition-colors duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white border-gray-200/50 shadow-sm'
    }`}>
      {/* Icon and Title */}
      <div className="mb-6">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#780000' }}
          whileHover={{ scale: 1.05 }}
          transition={{ 
            duration: 0.3
          }}
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className={`font-display text-2xl font-bold mb-2 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Ready for the Challenge?
        </h3>
        <p className={`transition-colors duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {getSubtitleText()}
        </p>
      </div>

      {/* Main CTA Button */}
      <motion.button
        onClick={handleStartGame}
        className="group relative text-white font-bold text-xl px-8 py-4 rounded-xl overflow-hidden transition-all duration-300"
        style={{ backgroundColor: '#780000' }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: '#8B0000'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 10 
        }}
      >
        
        {/* Button Content */}
        <div className="relative flex items-center justify-center space-x-3">
          <Play className="w-6 h-6 fill-current" />
          <span>{getButtonText()}</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          initial={false}
        />
      </motion.button>

      {/* Additional Info */}
      <div className={`mt-6 flex items-center justify-center space-x-6 text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#780000' }}></div>
          <span>5 Levels Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#a91b3d' }}></div>
          <span>Cultural Learning</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8B4513' }}></div>
          <span>Pattern Recognition</span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overall Progress</span>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{Math.min(currentLevel, 5)}/5 Levels</span>
        </div>
        <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className="h-2 rounded-full"
            style={{ backgroundColor: '#780000' }}
            initial={{ width: 0 }}
            animate={{ width: `${(Math.min(currentLevel, 5) / 5) * 100}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameAction;