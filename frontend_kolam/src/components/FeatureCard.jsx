import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ 
  icon, 
  title, 
  subtitle, 
  onClick,
  className = "",
  index = 0,
  darkMode = false
}) => {
  return (
    <motion.button
      className={`
        w-full text-left p-6 rounded-2xl cursor-pointer border transition-all duration-300
        group ${className} ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-gray-700' 
            : 'bg-white border-gray-100 hover:border-primary hover:bg-gray-50'
        }
      `}
      style={{
        boxShadow: darkMode 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ 
        boxShadow: darkMode
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      whileTap={{ 
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
      aria-label={`${title}: ${subtitle}`}
    >
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <motion.div 
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: darkMode ? 'rgba(139, 69, 19, 0.2)' : 'rgba(139, 69, 19, 0.1)',
          }}
          whileHover={{ 
            backgroundColor: darkMode ? 'rgba(139, 69, 19, 0.3)' : 'rgba(139, 69, 19, 0.2)'
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div className="w-6 h-6" style={{ color: '#8B4513' }}>
            {icon}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <motion.h3 
            className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
              darkMode ? 'text-gray-100 group-hover:text-primary' : 'text-text group-hover:text-primary'
            }`}
            layoutId={`title-${index}`}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <motion.p 
              className={`text-sm leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-text/70'
              }`}
              layoutId={`subtitle-${index}`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        {/* Arrow Indicator - Similar to main CTA buttons */}
        <motion.div 
          className="flex-shrink-0 transition-colors duration-300"
          style={{ color: darkMode ? 'rgba(139, 69, 19, 0.8)' : 'rgba(139, 69, 19, 0.6)' }}
          whileHover={{ 
            color: '#8B4513'
          }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
      
      {/* Focus indicator for accessibility */}
      <motion.div 
        className="absolute inset-0 rounded-2xl border-2 opacity-0 pointer-events-none"
        style={{ borderColor: '#8B4513' }}
        initial={false}
        animate={{ opacity: 0 }}
        whileFocus={{ opacity: 1 }}
      />
    </motion.button>
  );
};

export default FeatureCard;