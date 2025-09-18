import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award } from 'lucide-react';

const PreviousAttempts = ({ attempts, darkMode = false }) => {
  const hasAttempts = attempts && attempts.length > 0;

  // Helper function to get accuracy color
  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return darkMode ? 'text-emerald-300' : 'text-emerald-700';
    if (accuracy >= 60) return darkMode ? 'text-red-300' : 'text-red-700';
    return darkMode ? 'text-rose-300' : 'text-rose-700';
  };

  // Helper function to get accuracy background
  const getAccuracyBg = (accuracy) => {
    if (accuracy >= 80) return darkMode ? 'bg-emerald-500/20' : 'bg-emerald-200/30';
    if (accuracy >= 60) return darkMode ? 'bg-red-500/20' : 'bg-red-200/30';
    return darkMode ? 'bg-rose-500/20' : 'bg-rose-200/30';
  };

  return (
    <div className={`rounded-2xl p-6 border h-full transition-colors duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white border-gray-200/50 shadow-sm'
    }`}>
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          darkMode ? 'bg-slate-500/20' : 'bg-slate-200/30'
        }`}>
          <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`} />
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
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                {/* Level and Date */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Level {attempt.level}
                    </p>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{attempt.date}</span>
                    </div>
                  </div>
                </div>

                {/* Accuracy Badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAccuracyBg(attempt.accuracy)} ${getAccuracyColor(attempt.accuracy)}`}>
                  {attempt.accuracy}%
                </div>
              </div>

              {/* Progress Bar for this attempt */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className={`h-1.5 rounded-full ${
                      attempt.accuracy >= 80 
                        ? 'bg-green-400' 
                        : attempt.accuracy >= 60 
                          ? 'bg-red-400' 
                          : 'bg-red-600'
                    }`}
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
            className="w-full mt-4 py-3 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-xl transition-colors duration-300 text-sm"
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
          <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-500" />
          </div>
          <h4 className="text-gray-400 font-medium mb-2">
            No attempts yet
          </h4>
          <p className="text-gray-500 text-sm">
            Start your first knowledge test to see your progress here
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PreviousAttempts;