import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Community', path: '/community' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 glass-effect border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/80 border-gray-700/20' : 'bg-white/80 border-white/10'
      }`}
      style={{ 
        backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottomColor: darkMode ? 'rgba(55, 65, 81, 0.2)' : 'rgba(255, 255, 255, 0.1)' 
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          {/* Centered Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
              >
                <Link
                  to={item.path}
                  className={`font-medium transition-colors duration-200 relative group ${
                    isActive(item.path)
                      ? darkMode 
                        ? 'text-red-400' 
                        : 'text-primary'
                      : darkMode 
                        ? 'text-gray-200 hover:text-red-400' 
                        : 'text-text hover:text-primary'
                  }`}
                >
                  {item.name}
                  {/* Smooth underline animation */}
                  <motion.div
                    className={`absolute -bottom-1 left-0 h-0.5 transition-colors duration-200 ${
                      isActive(item.path)
                        ? darkMode ? 'bg-red-400' : 'bg-primary'
                        : darkMode ? 'bg-red-400' : 'bg-primary'
                    }`}
                    initial={{ width: isActive(item.path) ? '100%' : 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className={`ml-8 p-2 rounded-xl transition-colors duration-200 ${
              darkMode 
                ? 'bg-gray-700 text-red-400 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden p-2 transition-colors duration-200 ${
              darkMode ? 'text-gray-200' : 'text-text'
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label="Open mobile menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;