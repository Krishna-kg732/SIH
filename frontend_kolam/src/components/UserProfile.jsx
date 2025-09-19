import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Target } from 'lucide-react';

const UserProfile = ({ userData, darkMode = false }) => {
  const { username, currentLevel, currentAccuracy, avatar } = userData;

  return (
    <div className={`rounded-2xl p-6 border transition-colors duration-300 ${
      darkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white border-gray-200/50 shadow-sm'
    }`}>
      {/* Avatar and Username Section */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Avatar */}
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: '#F9F2E9', border: '2px solid #780000' }}
          whileHover={{ 
            scale: 1.05
          }}
          transition={{ duration: 0.3 }}
        >
          {avatar ? (
            <img 
              src={avatar} 
              alt={`${username}'s avatar`}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8" style={{ color: '#780000' }} />
          )}
        </motion.div>

        {/* Username */}
        <div>
          <h2 className={`font-headings text-2xl font-semibold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-text'
          }`}>
            {username}
          </h2>
          <p className={`text-sm transition-colors duration-300 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Knowledge Seeker
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4">
        <h3 className={`font-medium text-sm uppercase tracking-wider transition-colors duration-300 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Current Progress
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Current Level */}
          <motion.div
            className={`rounded-xl p-4 border transition-colors duration-300 ${
              darkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}
                style={{ backgroundColor: darkMode ? 'rgba(120, 0, 0, 0.2)' : 'rgba(120, 0, 0, 0.1)' }}
              >
                <Trophy className="w-5 h-5" style={{ color: '#780000' }} />
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wide transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Current Level
                </p>
                <p className={`text-xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {currentLevel}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Accuracy */}
          <motion.div
            className={`rounded-xl p-4 border transition-colors duration-300 ${
              darkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center`}
                style={{ backgroundColor: darkMode ? 'rgba(169, 27, 61, 0.2)' : 'rgba(169, 27, 61, 0.1)' }}
              >
                <Target className="w-5 h-5" style={{ color: '#a91b3d' }} />
              </div>
              <div>
                <p className={`text-xs uppercase tracking-wide transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Accuracy
                </p>
                <p className={`text-xl font-bold transition-colors duration-300`}
                  style={{ color: '#a91b3d' }}
                >
                  {currentAccuracy}%
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Level Progress</span>
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Level {currentLevel}/5</span>
          </div>
          <div className={`w-full rounded-full h-2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: '#780000' }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentLevel / 5) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;