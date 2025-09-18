import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import PreviousAttempts from '../components/PreviousAttempts';
import GameAction from '../components/GameAction';

const TestYourKnowledge = () => {
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // Mock user data - TODO: Replace with real API data
  const mockUserData = {
    username: "Kushagra Chaudhary",
    currentLevel: 3,
    currentAccuracy: 82,
    avatar: null // Placeholder for avatar image
  };

  // Mock previous attempts data - TODO: Replace with real API data
  const mockAttempts = [
    {
      level: 1,
      accuracy: 85,
      date: "Sep 18, 2025"
    },
    {
      level: 2,
      accuracy: 79,
      date: "Sep 19, 2025"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-kolam-background via-white to-gray-50'
    }`}>
      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Dashboard Content */}
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-8">
          
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className={`font-display text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-kolam-text'
            }`}>
              Test Your <span className={darkMode ? 'text-red-400' : 'text-primary'}>Knowledge</span>
            </h1>
            <p className={`text-lg transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-kolam-muted'
            }`}>
              Challenge yourself with Kolam pattern recognition and cultural knowledge
            </p>
          </motion.div>

          {/* Dashboard Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* Left Column - User Profile */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <UserProfile userData={mockUserData} darkMode={darkMode} />
            </motion.div>

            {/* Right Column - Previous Attempts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PreviousAttempts attempts={mockAttempts} darkMode={darkMode} />
            </motion.div>

            {/* Full Width - Game Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <GameAction currentLevel={mockUserData.currentLevel} darkMode={darkMode} />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestYourKnowledge;