import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Camera, Puzzle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from './FeatureCard';

const FeatureStack = ({ darkMode = false }) => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Test Your Knowledge and Learn",
      subtitle: "",
      action: () => navigate('/test-your-knowledge')
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Let AI Recognize Your Kolam",
      subtitle: "",
      action: () => navigate('/ai-recognition')
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Recreate or Complete Patterns",
      subtitle: "",
      action: () => navigate('/pattern-recreation')
    }
  ];

  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6 w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ x: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            subtitle={feature.subtitle}
            onClick={feature.action}
            index={index}
            className="h-24 flex items-center"
            darkMode={darkMode}
          />
        </motion.div>
      ))}
      
      {/* Connecting Lines Between Cards */}
      <motion.div 
        className="absolute left-6 w-px hidden lg:block"
        style={{
          top: '6rem',
          bottom: '6rem',
          background: 'linear-gradient(to bottom, rgba(139, 69, 19, 0.2), rgba(160, 82, 45, 0.2), rgba(139, 69, 19, 0.2))'
        }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

export default FeatureStack;