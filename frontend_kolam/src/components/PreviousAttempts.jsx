import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award } from 'lucide-react';

const PreviousAttempts = ({ attempts, darkMode = false }) => {
  const hasAttempts = attempts && attempts.length > 0;

  // Helper function to get accuracy color
  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return '#780000';
    if (accuracy >= 60) return '#a91b3d';
    return '#8B4513';
  };

  // Helper function to get accuracy background
  const getAccuracyBg = (accuracy) => {
    if (accuracy >= 80) return darkMode ? 'rgba(120, 0, 0, 0.2)' : 'rgba(120, 0, 0, 0.1)';
    if (accuracy >= 60) return darkMode ? 'rgba(169, 27, 61, 0.2)' : 'rgba(169, 27, 61, 0.1)';
    return darkMode ? 'rgba(139, 69, 19, 0.2)' : 'rgba(139, 69, 19, 0.1)';
  };

  return (
    <div className={`rounded-2xl p-6 border h-full transition-colors duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white border-gray-200/50 shadow-sm'
    }`}>
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}
          style={{ backgroundColor: darkMode ? 'rgba(120, 0, 0, 0.2)' : 'rgba(120, 0, 0, 0.1)' }}
        >
          <TrendingUp className="w-5 h-5" style={{ color: '#780000' }} />
        </div>
        <div>
          <h3 className={`font-semibold text-lg transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Previous Attempts
          </h3>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Track your learning progress
          </p>
        </div>
      </div>

      {/* Content */}
      {hasAttempts ? (
        <div className="space-y-4">
          {attempts.map((attempt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl p-4 border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Level and Date */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: getAccuracyBg(attempt.accuracy) }}
                  >
                    <Award className="w-4 h-4" style={{ color: getAccuracyColor(attempt.accuracy) }} />
                  </div>
                  <div>
                    <p className={`font-medium transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Level {attempt.level}
                    </p>
                    <div className={`flex items-center space-x-1 text-xs transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Calendar className="w-3 h-3" />
                      <span>{attempt.date}</span>
                    </div>
                  </div>
                </div>

                {/* Accuracy Badge */}
                <div className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: getAccuracyBg(attempt.accuracy),
                    color: getAccuracyColor(attempt.accuracy)
                  }}
                >
                  {attempt.accuracy}%
                </div>
              </div>

              {/* Progress Bar for this attempt */}
              <div className="mt-3">
                <div className={`w-full rounded-full h-1.5 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ backgroundColor: getAccuracyColor(attempt.accuracy) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${attempt.accuracy}%` }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* View All Button */}
          <motion.button
            className={`w-full mt-4 py-3 border rounded-xl transition-colors duration-300 text-sm ${
              darkMode 
                ? 'text-gray-400 hover:text-white border-gray-600 hover:border-gray-500' 
                : 'text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400'
            }`}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            View All Attempts
          </motion.button>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: darkMode ? 'rgba(120, 0, 0, 0.2)' : 'rgba(120, 0, 0, 0.1)' }}
          >
            <TrendingUp className="w-8 h-8" style={{ color: '#780000' }} />
          </div>
          <h4 className={`font-medium mb-2 transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            No attempts yet
          </h4>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Start your first knowledge test to see your progress here
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PreviousAttempts;