import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import AnimatedPolygonGrid from '../components/AnimatedPolygonGrid';
import LeftInteractive from '../components/LeftInteractive';
import FeatureStack from '../components/FeatureStack';
import logoSvg from '../assets/images/logo.svg';

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLearnMore = () => {
    console.log('Learn more about Kolams clicked - TODO: Implement navigation or modal');
  };

  const handleGetStarted = () => {
    console.log('Get Started clicked - TODO: Implement navigation to main app');
  };

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-background'
    }`}>
      {/* Background Decorative Elements */}
      <AnimatedPolygonGrid darkMode={darkMode} />
      
      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        <div className="h-screen flex flex-col lg:flex-row">
          
          {/* Left Section - Interactive Area */}
          <motion.section 
            className="lg:w-1/2 relative z-10"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <LeftInteractive darkMode={darkMode} />
          </motion.section>
          
          {/* Right Section - Content */}
          <motion.section 
            className="lg:w-1/2 relative z-10 flex flex-col justify-center p-8 lg:p-16"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="max-w-xl">
              
              {/* Main Heading */}
              <motion.h1 
                className={`font-headings text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-text'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              >
                <span className={darkMode ? 'text-red-400' : 'text-primary'}>Kolam</span> Vision
              </motion.h1>
              
              {/* Tagline */}
              <motion.p 
                className={`text-xl md:text-2xl font-medium mb-4 text-balance transition-colors duration-300 ${
                  darkMode ? 'text-red-400' : 'text-primary'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                From Dots to Designs - Rediscover Kolams with AI
              </motion.p>
              
              {/* Description */}
              <motion.p 
                className={`text-lg mb-8 leading-relaxed text-balance transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-text/80'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                Cultural preservation through AI digitization. Experience the beauty and tradition 
                of Kolam art in a modern digital format through interactive learning and pattern recognition.
              </motion.p>
              
              {/* Feature Cards */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
              >
                <FeatureStack darkMode={darkMode} />
              </motion.div>
              
              {/* Call to Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
              >
                <motion.button
                  className={`group px-6 py-3 rounded-xl font-medium text-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl ${
                    darkMode
                      ? 'bg-red-800 hover:bg-red-700 text-white'
                      : 'btn-primary'
                  }`}
                  onClick={handleGetStarted}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
                
                <motion.button
                  className={`group px-6 py-3 border-2 rounded-xl font-medium text-lg transition-all duration-300 flex items-center gap-3 hover:shadow-lg ${
                    darkMode
                      ? 'border-red-400 text-red-400 hover:bg-red-400 hover:text-gray-900'
                      : 'btn-outline'
                  }`}
                  onClick={handleLearnMore}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  Learn more about Kolams
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </main>
      
      {/* Footer with Logo */}
      <motion.footer 
        className={`relative z-10 py-8 px-8 lg:px-16 border-t transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logoSvg} alt="Kolambian Logo" className="h-8 w-auto mr-3" />
              <span className={`text-lg font-display font-semibold transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-text'
              }`}>
                Kolam Vision
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className={`text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-text/60'
              }`}>
                © 2025 Kolam Vision. Preserving tradition through technology.
              </p>
              
              <div className="flex space-x-6">
                <a 
                  href="#privacy" 
                  className={`text-sm transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-red-400' 
                      : 'text-text/60 hover:text-primary'
                  }`}
                >
                  Privacy Policy
                </a>
                <a 
                  href="#terms" 
                  className={`text-sm transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-red-400' 
                      : 'text-text/60 hover:text-primary'
                  }`}
                >
                  Terms of Service
                </a>
                <a 
                  href="#contact" 
                  className={`text-sm transition-colors duration-200 ${
                    darkMode 
                      ? 'text-gray-400 hover:text-red-400' 
                      : 'text-text/60 hover:text-primary'
                  }`}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Landing;