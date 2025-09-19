import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Different navigation items based on current page
  const isLandingPage = location.pathname === '/';
  
  const landingNavItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Community', path: '/community' },
    { name: 'Contact', path: '/contact' }
  ];

  const appNavItems = [
    { name: 'Test Your Knowledge', path: '/test-your-knowledge' },
    { name: 'Recognize', path: '/ai-recognition' },
    { name: 'Recreate', path: '/recreate-patterns' }
  ];

  const navItems = isLandingPage ? landingNavItems : appNavItems;

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
          {/* Navigation Items - always centered */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Add Home link for non-landing pages */}
            {!isLandingPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0,
                  ease: 'easeOut'
                }}
                whileHover="hover"
                className="relative"
              >
                <Link
                  to="/"
                  className={`font-medium transition-colors duration-200 relative group block ${
                    isActive('/')
                      ? darkMode 
                        ? 'text-red-400' 
                        : 'text-primary'
                      : darkMode 
                        ? 'text-gray-200 hover:text-red-400' 
                        : 'text-text hover:text-primary'
                  }`}
                >
                  Home
                  {/* Smooth underline animation */}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5"
                    style={{
                      backgroundColor: darkMode ? '#ef4444' : '#500000'
                    }}
                    initial={{ width: isActive('/') ? '100%' : 0 }}
                    variants={{
                      hover: { width: '100%' }
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>
            )}
            
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: (index + (isLandingPage ? 0 : 1)) * 0.1,
                  ease: 'easeOut'
                }}
                whileHover="hover"
                className="relative"
              >
                <Link
                  to={item.path}
                  className={`font-medium transition-colors duration-200 relative group block ${
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
                    className="absolute -bottom-1 left-0 h-0.5"
                    style={{
                      backgroundColor: darkMode ? '#ef4444' : '#500000'
                    }}
                    initial={{ width: isActive(item.path) ? '100%' : 0 }}
                    variants={{
                      hover: { width: '100%' }
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={`md:hidden p-2 transition-colors duration-200 ${
              darkMode ? 'text-gray-200' : 'text-text'
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
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
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className={`md:hidden mt-4 py-4 border-t ${
              darkMode ? 'border-gray-700/20' : 'border-white/10'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Navigation Items */}
            <div className="space-y-4">
              {/* Add Home link for non-landing pages in mobile */}
              {!isLandingPage && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0 }}
                >
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-medium transition-colors duration-200 ${
                      isActive('/')
                        ? darkMode 
                          ? 'text-red-400' 
                          : 'text-primary'
                        : darkMode 
                          ? 'text-gray-200 hover:text-red-400' 
                          : 'text-text hover:text-primary'
                    }`}
                  >
                    Home
                  </Link>
                </motion.div>
              )}
              
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index + (isLandingPage ? 0 : 1)) * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-medium transition-colors duration-200 ${
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
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;