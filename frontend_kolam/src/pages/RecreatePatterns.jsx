import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import apiService from '../services/apiService';
import { 
  KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
  KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8,
  KolamPattern9, KolamPattern10
} from '../assets/svg';

// Hand-drawn decorative SVG components
const LeafBranch = ({ className, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    style={style}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 50 Q30 30 50 35 Q70 40 80 20" />
    <path d="M35 40 Q40 35 45 40" />
    <path d="M25 55 Q30 50 35 55" />
    <path d="M55 45 Q60 40 65 45" />
    <path d="M65 55 Q70 50 75 55" />
  </svg>
);

const HashGrid = ({ className, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    style={style}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M30 20 L30 80" />
    <path d="M70 20 L70 80" />
    <path d="M20 30 L80 30" />
    <path d="M20 70 L80 70" />
  </svg>
);

// Custom Kolam Loading Spinner
const KolamLoader = ({ className, color = "#FFFFFF" }) => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 101 101" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  >
    <g opacity="0.8">
      <path d="M51.5771 1.12308L64.0771 25.6231" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.6563" y1="50.6435" x2="39.0205" y2="25.659" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M39.0762 25.6233L51.6556 1.06416" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.3265" y1="50.664" x2="63.9624" y2="25.6795" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M51.5766 51.1229L64.0765 74.123" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.6563" y1="99.2589" x2="39.0205" y2="74.2744" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M39.0762 74.1232L51.5762 50.6232" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M52.0763 99.1229L63.9633 74.2948" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="51.0199" y1="50.2745" x2="26.0354" y2="62.9103" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="1.44105" y1="51.8947" x2="26.4256" y2="39.2589" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M26.5767 39.123L51.0768 50.623" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M2.07713 52.1232L25.5771 63.1232" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M99.6362 49.6592L75.0773 63.6232" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M52.0781 50.123L75.0422 38.6436" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M75.0765 38.6232L99.5765 49.623" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M52.0781 51.1232L75.0217 63.5872" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </g>
  </motion.svg>
);

const RecreatePatterns = () => {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const resultsRef = useRef(null);

  // Auto-scroll to results when image is generated
  useEffect(() => {
    if (generatedResult && resultsRef.current) {
      const timeout = setTimeout(() => {
        resultsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
      }, 500); // Slightly longer delay to ensure smooth animation completion
      
      return () => clearTimeout(timeout);
    }
  }, [generatedResult]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsGenerating(true);
    
    try {
      console.log('🎨 Starting pattern generation...', {
        prompt: inputValue,
        apiEndpoint: 'https://kartikeya.me/api/v1/kolam/knowledge'
      });
      
      // Use the centralized API service with the official API
      const result = await apiService.generateKolamFromDescription(inputValue, true);
      console.log('✅ Generation result:', result);
      
      // Handle successful response - only store the image
      setGeneratedResult({
        image_base64: result.image_base64 || result.image || null,
        error: false
      });
    } catch (error) {
      console.error('❌ Error generating design:', error);
      
      // Handle different types of errors with specific messages
      let errorMessage = "Sorry, there was an error generating your design. Please try again.";
      if (error.message.includes('404')) {
        errorMessage = "API endpoint not found. Please check the service configuration.";
      } else if (error.message.includes('500')) {
        errorMessage = "Server error occurred while generating the pattern. Please try again later.";
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.message.includes('timeout')) {
        errorMessage = "Request timed out. The pattern generation is taking longer than expected. Please try again.";
      }
      
      setGeneratedResult({
        image_base64: null,
        error: true,
        errorMessage: errorMessage
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setGeneratedResult(null);
    // Optionally scroll back to top when clearing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen transition-colors duration-300" 
         style={{ backgroundColor: '#F5F1EB' }}>
      
      {/* Navigation */}
      <Navbar darkMode={false} />
      
      {/* Animated Kolam Pattern Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Kolam Patterns with automatic slow animations */}
        {[
          { Component: KolamPattern1, position: 'top-16 left-16', duration: 45, delay: 0 },
          { Component: KolamPattern2, position: 'top-20 right-20', duration: 55, delay: 5 },
          { Component: KolamPattern3, position: 'top-1/3 left-1/4', duration: 35, delay: 10 },
          { Component: KolamPattern4, position: 'top-1/2 right-16', duration: 40, delay: 15 },
          { Component: KolamPattern5, position: 'bottom-1/3 left-20', duration: 50, delay: 20 },
          { Component: KolamPattern6, position: 'bottom-20 right-1/4', duration: 60, delay: 25 },
          { Component: KolamPattern7, position: 'top-3/4 left-1/3', duration: 42, delay: 30 },
          { Component: KolamPattern8, position: 'bottom-1/4 right-1/3', duration: 38, delay: 35 },
        ].map(({ Component, position, duration, delay }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position} opacity-[0.12]`}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              y: [-10, 10, -10],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          >
            <Component 
              size={60 + (index % 3) * 15}
              color="#A67C52"
              opacity={0.6}
            />
          </motion.div>
        ))}
        
        {/* Corner decorative elements with slow rotation */}
        {[
          { Component: KolamPattern9, position: 'top-4 left-4', rotation: [0, 180], duration: 80 },
          { Component: KolamPattern10, position: 'top-4 right-4', rotation: [0, -180], duration: 70 },
          { Component: KolamPattern1, position: 'bottom-4 left-4', rotation: [180, 360], duration: 75 },
          { Component: KolamPattern2, position: 'bottom-4 right-4', rotation: [-180, 0], duration: 85 },
        ].map(({ Component, position, rotation, duration }, index) => (
          <motion.div
            key={`corner-${index}`}
            className={`absolute ${position} opacity-[0.15]`}
            animate={{
              rotate: rotation,
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 8,
            }}
          >
            <Component 
              size={40}
              color="#A67C52"
              opacity={0.8}
            />
          </motion.div>
        ))}
        
        {/* Floating particles with subtle movement */}
        {[...Array(6)].map((_, index) => {
          const PatternComponent = [KolamPattern3, KolamPattern4, KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8][index];
          return (
            <motion.div
              key={`particle-${index}`}
              className="absolute opacity-[0.08]"
              style={{
                left: `${15 + (index % 3) * 25}%`,
                top: `${20 + Math.floor(index / 3) * 35}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-15, 15, -15],
                rotate: [0, 90, 180, 270, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 60 + index * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 12,
              }}
            >
              <PatternComponent 
                size={25 + index * 5}
                color="#A67C52"
                opacity={0.5}
              />
            </motion.div>
          );
        })}
        
        {/* Original leaf decorative elements for consistency */}
        <LeafBranch 
          className="absolute top-8 left-8 w-16 h-16 opacity-20"
          style={{ color: '#A67C52' }}
        />
        <LeafBranch 
          className="absolute top-8 right-8 w-16 h-16 opacity-20 transform scale-x-[-1]"
          style={{ color: '#A67C52' }}
        />
        <HashGrid 
          className="absolute bottom-16 right-16 w-8 h-8 opacity-15"
          style={{ color: '#A67C52' }}
        />
      </div>

      {/* Main Content */}
      <main className="pt-20 min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          
          {/* Centered Container */}
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-headings text-5xl md:text-6xl font-bold mb-8 tracking-wide"
              style={{ color: '#2C2C2C' }}
            >
              Let The AI Recreate
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="font-body text-xl md:text-2xl italic mb-16 leading-relaxed"
              style={{ color: '#6B7280' }}
            >
              Simply describe your idea, and let AI craft the design for you.
            </motion.p>

            {/* Input Area */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mb-8"
            >
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your vision... (e.g., 'Create a traditional Kolam with lotus petals and geometric patterns around a central mandala')"
                  className="w-full h-40 px-8 py-6 rounded-2xl border-4 border-[#2C2C2C] bg-white resize-none font-body text-lg leading-relaxed transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#2C2C2C]/20 focus:border-[#2C2C2C]"
                  style={{ 
                    color: '#2C2C2C',
                    boxShadow: '0 8px 25px rgba(44, 44, 44, 0.1)'
                  }}
                  disabled={isGenerating}
                />
                
                {/* Focus glow effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 focus-within:opacity-100"
                     style={{ 
                       boxShadow: '0 0 20px rgba(44, 44, 44, 0.2)',
                       background: 'transparent'
                     }}
                />
              </div>

              {/* Create Button */}
              <motion.button
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                className="mt-8 inline-flex items-center gap-3 px-12 py-4 rounded-full font-medium text-lg text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#8B4B4B',
                  boxShadow: '0 4px 15px rgba(139, 75, 75, 0.3)'
                }}
                whileHover={!isGenerating && inputValue.trim() ? { 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(139, 75, 75, 0.4)',
                  backgroundColor: '#7A4141'
                } : {}}
                whileTap={!isGenerating && inputValue.trim() ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              >
                {isGenerating ? (
                  <>
                    <KolamLoader color="#FFFFFF" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Create</span>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Progress Bar */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 w-full max-w-md mx-auto"
                >
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ 
                        background: 'linear-gradient(90deg, #8B4B4B, #A67C52, #8B4B4B)',
                        backgroundSize: '200% 100%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        width: ['0%', '70%', '100%']
                      }}
                      transition={{
                        backgroundPosition: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        width: {
                          duration: 8,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-2 text-sm italic"
                    style={{ color: '#6B7280' }}
                  >
                    Crafting your unique Kolam design...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Section */}
            {generatedResult && (
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-16 rounded-2xl border-2 border-[#A67C52] bg-white/80 backdrop-blur-sm overflow-hidden"
                style={{ boxShadow: '0 10px 25px rgba(166, 124, 82, 0.1)' }}
              >
                {generatedResult.image_base64 ? (
                  <div className="w-full">
                    <img
                      src={`data:image/png;base64,${generatedResult.image_base64}`}
                      alt="Generated Kolam Design"
                      className="w-full h-auto"
                    />
                  </div>
                ) : generatedResult.error ? (
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Palette className="w-8 h-8 text-red-600" />
                      <h3 className="text-2xl font-headings font-bold text-red-600">
                        Generation Error
                      </h3>
                    </div>
                    <p className="text-lg text-red-600 mb-6">
                      {generatedResult.errorMessage}
                    </p>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500 italic">Generated image will appear here</p>
                  </div>
                )}

                <div className="p-6 bg-white/90">
                  <button
                    onClick={handleClear}
                    className="w-full px-6 py-3 rounded-full border-2 border-[#8B4B4B] text-[#8B4B4B] font-medium transition-all duration-300 hover:bg-[#8B4B4B] hover:text-white"
                  >
                    Create Another
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecreatePatterns;