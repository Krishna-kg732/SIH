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
    return "START GAME";
  };

  const getSubtitleText = () => {
    return "Choose your level and begin your Kolam learning journey";
  };

  return (
    <div className={`backdrop-blur-md rounded-2xl p-8 border text-center transition-colors duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/80 border-gray-200/50 shadow-lg'
    }`}>
      {/* Icon and Title */}
      <div className="mb-6">
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-300 to-red-400 flex items-center justify-center mx-auto mb-4"
          style={{
            boxShadow: '0 0 30px rgba(210, 180, 140, 0.3)'
          }}
          animate={{ 
            boxShadow: [
              '0 0 30px rgba(210, 180, 140, 0.3)',
              '0 0 40px rgba(210, 180, 140, 0.5)',
              '0 0 30px rgba(210, 180, 140, 0.3)'
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Zap className="w-8 h-8 text-red-800" />
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
        className="group relative bg-gradient-to-r from-red-400 to-red-500 text-red-900 font-bold text-xl px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        style={{
          boxShadow: '0 10px 30px rgba(210, 180, 140, 0.3)'
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 15px 40px rgba(210, 180, 140, 0.4)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 10 
        }}
      >
        {/* Background Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        {/* Button Content */}
        <div className="relative flex items-center justify-center space-x-3">
          <Play className="w-6 h-6 fill-current" />
          <span>{getButtonText()}</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          initial={false}
        />
      </motion.button>

      {/* Additional Info */}
      <div className={`mt-6 flex items-center justify-center space-x-6 text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
          <span>5 Levels Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-sky-300"></div>
          <span>Cultural Learning</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-violet-300"></div>
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
            className="bg-gradient-to-r from-red-300 to-red-400 h-2 rounded-full"
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