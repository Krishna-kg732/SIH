import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
  KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8,
  KolamPattern9, KolamPattern10
} from '../assets/svg';
import Navbar from '../components/Navbar';
import UserProfile from '../components/UserProfile';
import PreviousAttempts from '../components/PreviousAttempts';
import GameAction from '../components/GameAction';
import useActivityDetection from '../hooks/useActivityDetection';

const TestYourKnowledge = () => {
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  const [shouldSpin, setShouldSpin] = useState(false);
  const { setInactivityCallback } = useActivityDetection(12000);

  useEffect(() => {
    setInactivityCallback(() => {
      setShouldSpin(true);
      // Reset spinning after 4 seconds
      setTimeout(() => setShouldSpin(false), 4000);
    });
  }, [setInactivityCallback]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // Mock user data - TODO: Replace with real API data
  const mockUserData = {
    username: "User",
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
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-background via-white to-[#f5f0e7]'
    }`}>
      {/* Background Kolam Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
          KolamPattern5, KolamPattern6
        ].map((PatternComponent, i) => (
          <motion.div
            key={`bg-pattern-${i}`}
            className="absolute opacity-5"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${10 + (i * 15)}%`,
            }}
            animate={{
              x: [0, 25, 0],
              y: [0, -20, 0],
              rotate: shouldSpin ? [0, 360] : [0, 120, 240, 360],
            }}
            transition={{
              duration: shouldSpin ? 1.5 : 30 + Math.random() * 15,
              repeat: shouldSpin ? 3 : Infinity,
              ease: shouldSpin ? "easeInOut" : "linear",
              delay: shouldSpin ? i * 0.25 : i * 3,
            }}
          >
            <PatternComponent 
              size={70 + Math.random() * 40}
              color={darkMode ? "#FB923C" : "#780000"}
              opacity={0.12}
            />
          </motion.div>
        ))}
        
        {/* Additional floating patterns */}
        {[...Array(5)].map((_, i) => {
          const PatternComponent = [
            KolamPattern7, KolamPattern8, KolamPattern9, KolamPattern10,
            KolamPattern1
          ][i % 5];
          return (
            <motion.div
              key={`float-pattern-${i}`}
              className="absolute opacity-3"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
                rotate: shouldSpin ? [0, 360] : [0, -180, 0],
              }}
              transition={{
                duration: shouldSpin ? 1.2 : 35 + Math.random() * 20,
                repeat: shouldSpin ? 2 : Infinity,
                ease: shouldSpin ? "easeInOut" : "linear",
                delay: shouldSpin ? Math.random() * 2 : Math.random() * 15,
              }}
            >
              <PatternComponent 
                size={30 + Math.random() * 20}
                color={darkMode ? "#A78BFA" : "#a91b3d"}
                opacity={0.1}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <Navbar darkMode={darkMode} />
      
      {/* Main Dashboard Content */}
      <main className="pt-20 min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-8">
          
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className={`font-headings text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-text'
            }`}>
              Test Your <span className={darkMode ? 'text-red-400' : 'text-primary'}>Knowledge</span>
            </h1>
            <p className={`text-lg transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
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