import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ExternalLink, Brain, Eye, Palette } from 'lucide-react';
import Navbar from '../components/Navbar';
import AnimatedPolygonGrid from '../components/AnimatedPolygonGrid';
import LeftInteractive from '../components/LeftInteractive';
import FeatureStack from '../components/FeatureStack';
import logoSvg from '../assets/images/logo.svg';

const Landing = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: false, margin: "-100px" });
  
  // Track scroll interaction with timeout
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      setHasScrolled(true);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set timeout to reset scroll state after 3 seconds of no scrolling
      scrollTimeout = setTimeout(() => {
        setHasScrolled(false);
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

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
      <Navbar darkMode={darkMode} />
      
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
      
      {/* Our Features Section */}
      <motion.section 
        ref={featuresRef}
        className={`relative z-10 py-16 px-8 lg:px-16 border-t transition-all duration-500 ${
          darkMode
            ? 'border-gray-700'
            : 'border-gray-200'
        }`}
        style={{
          background: darkMode 
            ? 'rgba(17, 24, 39, 0.85)' 
            : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: isInView ? 1 : 0.7, 
          y: isInView ? 0 : 30,
          scale: hasScrolled && isInView ? 1.02 : 1
        }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          scale: { duration: 0.3 }
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 30,
              scale: hasScrolled && isInView ? 1.05 : 1
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              scale: { duration: 0.3 }
            }}
          >
            <h2 className={`font-headings text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-[#780000]'
            }`}>
              Our Features
            </h2>
            <p className={`text-lg transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-[#a91b3d]'
            }`}>
              Discover the power of AI-enhanced Kolam pattern recognition and creation
            </p>
          </motion.div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Test Your Knowledge Feature */}
            <motion.div
              className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                darkMode
                  ? 'hover:bg-gray-700/50 border border-gray-600/30'
                  : 'hover:bg-white/60 border border-gray-300/30'
              }`}
              style={{
                background: darkMode 
                  ? 'rgba(31, 41, 55, 0.6)' 
                  : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                  : '0 8px 32px rgba(120, 0, 0, 0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
                rotateY: hasScrolled && isInView ? 5 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                rotateY: { duration: 0.4 }
              }}
              whileHover={{ y: -8, rotateY: 10 }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-red-900/50 text-red-400' 
                    : 'bg-[#780000]/10 text-[#780000]'
                }`}
                animate={{
                  rotate: hasScrolled && isInView ? [0, 10, -10, 0] : 0
                }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="w-8 h-8" />
              </motion.div>
              
              <h3 className={`font-headings text-xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-[#780000]'
              }`}>
                Test Your Knowledge
              </h3>
              
              <p className={`text-base leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Challenge yourself with interactive quizzes about Kolam patterns, cultural significance, and traditional designs. Learn while you play!
              </p>
              
              <div className={`mt-6 text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-red-400' : 'text-[#a91b3d]'
              }`}>
                Interactive Learning Experience
              </div>
            </motion.div>
            
            {/* AI Recognition Feature */}
            <motion.div
              className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                darkMode
                  ? 'hover:bg-gray-700/50 border border-gray-600/30'
                  : 'hover:bg-white/60 border border-gray-300/30'
              }`}
              style={{
                background: darkMode 
                  ? 'rgba(31, 41, 55, 0.6)' 
                  : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                  : '0 8px 32px rgba(120, 0, 0, 0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
                rotateY: hasScrolled && isInView ? -5 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8,
                rotateY: { duration: 0.4 }
              }}
              whileHover={{ y: -8, rotateY: -10 }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-red-900/50 text-red-400' 
                    : 'bg-[#780000]/10 text-[#780000]'
                }`}
                animate={{
                  scale: hasScrolled && isInView ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.6 }}
              >
                <Eye className="w-8 h-8" />
              </motion.div>
              
              <h3 className={`font-headings text-xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-[#780000]'
              }`}>
                Let AI Recognize
              </h3>
              
              <p className={`text-base leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Upload or draw Kolam patterns and let our advanced AI analyze and identify the design, providing cultural context and historical information.
              </p>
              
              <div className={`mt-6 text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-red-400' : 'text-[#a91b3d]'
              }`}>
                Smart Pattern Recognition
              </div>
            </motion.div>
            
            {/* Recreate/Complete Patterns Feature */}
            <motion.div
              className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                darkMode
                  ? 'hover:bg-gray-700/50 border border-gray-600/30'
                  : 'hover:bg-white/60 border border-gray-300/30'
              }`}
              style={{
                background: darkMode 
                  ? 'rgba(31, 41, 55, 0.6)' 
                  : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                  : '0 8px 32px rgba(120, 0, 0, 0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
                rotateY: hasScrolled && isInView ? 5 : 0
              }}
              transition={{ 
                duration: 0.6, 
                delay: 1.0,
                rotateY: { duration: 0.4 }
              }}
              whileHover={{ y: -8, rotateY: 10 }}
            >
              <motion.div 
                className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-red-900/50 text-red-400' 
                    : 'bg-[#780000]/10 text-[#780000]'
                }`}
                animate={{
                  rotate: hasScrolled && isInView ? [0, -15, 15, 0] : 0
                }}
                transition={{ duration: 0.8 }}
              >
                <Palette className="w-8 h-8" />
              </motion.div>
              
              <h3 className={`font-headings text-xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-[#780000]'
              }`}>
                Recreate & Complete
              </h3>
              
              <p className={`text-base leading-relaxed transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Practice creating Kolam patterns step-by-step or complete partial designs. Perfect your skills with guided tutorials and AI assistance.
              </p>
              
              <div className={`mt-6 text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-red-400' : 'text-[#a91b3d]'
              }`}>
                Hands-on Pattern Creation
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

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