import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, Lock, Play, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

const Levels = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleBackToTestKnowledge = () => {
    navigate('/test-your-knowledge');
  };

  const handleStartLevel = (level) => {
    // TODO: Navigate to actual game with specific level
    console.log(`Starting level ${level}`);
  };

  const levels = [
    { id: 1, title: 'Basic Patterns', difficulty: 'Beginner', isUnlocked: true, stars: 3 },
    { id: 2, title: 'Geometric Shapes', difficulty: 'Beginner', isUnlocked: true, stars: 2 },
    { id: 3, title: 'Cultural Symbols', difficulty: 'Intermediate', isUnlocked: true, stars: 1 },
    { id: 4, title: 'Complex Designs', difficulty: 'Intermediate', isUnlocked: false, stars: 0 },
    { id: 5, title: 'Master Kolams', difficulty: 'Advanced', isUnlocked: false, stars: 0 },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return darkMode ? 'text-emerald-300' : 'text-emerald-700';
      case 'Intermediate': return darkMode ? 'text-amber-300' : 'text-amber-700';
      case 'Advanced': return darkMode ? 'text-rose-300' : 'text-rose-700';
      default: return darkMode ? 'text-gray-300' : 'text-gray-700';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-amber-50 via-white to-gray-50'
    }`}>
      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <button
              onClick={handleBackToTestKnowledge}
              className={`inline-flex items-center space-x-2 text-sm mb-6 transition-colors duration-300 hover:scale-105 ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            
            <h1 className={`font-display text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Choose Your <span className={darkMode ? 'text-amber-300' : 'text-amber-700'}>Level</span>
            </h1>
            <p className={`text-lg transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Progress through Kolam patterns from basic to advanced designs
            </p>
          </motion.div>

          {/* Levels Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 ${
                  level.isUnlocked
                    ? darkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                      : 'bg-white/80 border-gray-200/50 hover:bg-white hover:border-amber-200 shadow-lg hover:shadow-xl'
                    : darkMode 
                      ? 'bg-gray-800/50 border-gray-700/50' 
                      : 'bg-gray-100/50 border-gray-300/50'
                } ${level.isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                whileHover={level.isUnlocked ? { y: -5 } : {}}
                onClick={() => level.isUnlocked && handleStartLevel(level.id)}
              >
                {/* Level Number & Lock */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300 ${
                    level.isUnlocked
                      ? darkMode 
                        ? 'bg-amber-500/20 text-amber-300' 
                        : 'bg-amber-200/50 text-amber-800'
                      : darkMode 
                        ? 'bg-gray-700/50 text-gray-500' 
                        : 'bg-gray-200/50 text-gray-500'
                  }`}>
                    {level.isUnlocked ? level.id : <Lock className="w-5 h-5" />}
                  </div>
                  
                  {/* Stars */}
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= level.stars
                            ? 'text-amber-400 fill-amber-400'
                            : darkMode ? 'text-gray-600' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Level Info */}
                <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                  level.isUnlocked
                    ? darkMode ? 'text-white' : 'text-gray-800'
                    : darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {level.title}
                </h3>

                <p className={`text-sm mb-4 transition-colors duration-300 ${getDifficultyColor(level.difficulty)}`}>
                  {level.difficulty}
                </p>

                {/* Action Button */}
                {level.isUnlocked ? (
                  <motion.button
                    className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                      darkMode 
                        ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' 
                        : 'bg-amber-200/50 text-amber-800 hover:bg-amber-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span className="font-medium">Play Level</span>
                  </motion.button>
                ) : (
                  <div className={`w-full text-center py-2 px-4 rounded-lg transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700/30 text-gray-500' : 'bg-gray-200/50 text-gray-500'
                  }`}>
                    <span className="text-sm">Complete previous levels</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Levels;