import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
  KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8,
  KolamPattern9, KolamPattern10
} from '../assets/svg';
import useActivityDetection from '../hooks/useActivityDetection';

const AnimatedPolygonGrid = ({ darkMode = false }) => {
  const [shouldSpin, setShouldSpin] = useState(false);
  const { setInactivityCallback } = useActivityDetection(10000);
  const { scrollY } = useScroll();

  useEffect(() => {
    setInactivityCallback(() => {
      setShouldSpin(true);
      // Reset spinning after 3 seconds
      setTimeout(() => setShouldSpin(false), 3000);
    });
  }, [setInactivityCallback]);
  
  // Transform values for different patterns
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [360, 0]);
  const rotate3 = useTransform(scrollY, [0, 1000], [0, 180]);
  const rotate4 = useTransform(scrollY, [0, 1000], [180, 0]);
  
  const translateY1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const translateY2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const translateY3 = useTransform(scrollY, [0, 1000], [0, -25]);
  const translateY4 = useTransform(scrollY, [0, 1000], [0, 75]);
  
  const translateX1 = useTransform(scrollY, [0, 1000], [0, 30]);
  const translateX2 = useTransform(scrollY, [0, 1000], [0, -40]);
  const translateX3 = useTransform(scrollY, [0, 1000], [0, 20]);
  const translateX4 = useTransform(scrollY, [0, 1000], [0, -60]);

  const kolamPatterns = [
    {
      Component: KolamPattern1,
      rotate: rotate1,
      translateY: translateY1,
      translateX: translateX1,
      className: 'top-20 right-20',
      color: darkMode ? '#FB923C' : '#8B4513',
      size: 80,
    },
    {
      Component: KolamPattern2,
      rotate: rotate2,
      translateY: translateY2,
      translateX: translateX2,
      className: 'left-10',
      style: { top: '50%' },
      color: darkMode ? '#F97316' : '#A0522D',
      size: 60,
    },
    {
      Component: KolamPattern3,
      rotate: rotate3,
      translateY: translateY3,
      translateX: translateX3,
      className: 'bottom-20',
      style: { right: '25%' },
      color: darkMode ? '#60A5FA' : '#6B2224',
      size: 70,
    },
    {
      Component: KolamPattern4,
      rotate: rotate4,
      translateY: translateY4,
      translateX: translateX4,
      className: 'top-1/3 left-1/4',
      color: darkMode ? '#34D399' : '#783232',
      size: 65,
    },
    {
      Component: KolamPattern5,
      rotate: rotate1,
      translateY: translateY3,
      translateX: translateX2,
      className: 'top-16 left-16',
      color: darkMode ? '#A78BFA' : '#8B4513',
      size: 55,
    },
    {
      Component: KolamPattern6,
      rotate: rotate3,
      translateY: translateY1,
      translateX: translateX4,
      className: 'bottom-16 left-1/3',
      color: darkMode ? '#FB7185' : '#A0522D',
      size: 58,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {kolamPatterns.map((pattern, index) => (
        <motion.div
          key={index}
          className={`absolute ${pattern.className}`}
          style={{
            rotate: shouldSpin ? 360 : pattern.rotate,
            y: pattern.translateY,
            x: pattern.translateX,
            ...pattern.style
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: shouldSpin ? 360 : 0 
          }}
          transition={{
            duration: shouldSpin ? 1 : 1,
            delay: shouldSpin ? index * 0.1 : index * 0.2,
            ease: shouldSpin ? 'easeInOut' : 'easeOut',
            rotate: {
              duration: shouldSpin ? 1 : 0,
              repeat: shouldSpin ? 2 : 0
            }
          }}
        >
          <pattern.Component 
            size={pattern.size}
            color={pattern.color}
            opacity={darkMode ? 0.15 : 0.25}
          />
        </motion.div>
      ))}
      
      {/* Additional floating patterns for larger screens */}
      <motion.div
        className="absolute hidden lg:block"
        style={{
          top: '15%',
          right: '15%',
          rotate: shouldSpin ? 360 : rotate2,
          y: translateY3,
          x: translateX1,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: darkMode ? 0.1 : 0.2,
          rotate: shouldSpin ? 360 : 0
        }}
        transition={{ 
          delay: 0.6,
          rotate: {
            duration: shouldSpin ? 1.2 : 0,
            repeat: shouldSpin ? 2 : 0
          }
        }}
      >
        <KolamPattern7 
          size={50}
          color={darkMode ? '#FB923C' : '#6B2224'}
          opacity={darkMode ? 0.1 : 0.2}
        />
      </motion.div>
      
      <motion.div
        className="absolute hidden lg:block"
        style={{
          bottom: '15%',
          left: '15%',
          rotate: shouldSpin ? 360 : rotate1,
          y: translateY2,
          x: translateX3,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: darkMode ? 0.08 : 0.15,
          rotate: shouldSpin ? 360 : 0
        }}
        transition={{ 
          delay: 0.8,
          rotate: {
            duration: shouldSpin ? 1.5 : 0,
            repeat: shouldSpin ? 2 : 0
          }
        }}
      >
        <KolamPattern8 
          size={45}
          color={darkMode ? '#F97316' : '#783232'}
          opacity={darkMode ? 0.08 : 0.15}
        />
      </motion.div>

      <motion.div
        className="absolute hidden xl:block"
        style={{
          top: '60%',
          right: '35%',
          rotate: shouldSpin ? 360 : rotate4,
          y: translateY1,
          x: translateX2,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: darkMode ? 0.12 : 0.18,
          rotate: shouldSpin ? 360 : 0
        }}
        transition={{ 
          delay: 1.0,
          rotate: {
            duration: shouldSpin ? 0.8 : 0,
            repeat: shouldSpin ? 3 : 0
          }
        }}
      >
        <KolamPattern9 
          size={40}
          color={darkMode ? '#A78BFA' : '#8B4513'}
          opacity={darkMode ? 0.12 : 0.18}
        />
      </motion.div>

      <motion.div
        className="absolute hidden xl:block"
        style={{
          top: '35%',
          left: '60%',
          rotate: shouldSpin ? 360 : rotate3,
          y: translateY4,
          x: translateX4,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: darkMode ? 0.09 : 0.16,
          rotate: shouldSpin ? 360 : 0
        }}
        transition={{ 
          delay: 1.2,
          rotate: {
            duration: shouldSpin ? 1.1 : 0,
            repeat: shouldSpin ? 2 : 0
          }
        }}
      >
        <KolamPattern10 
          size={42}
          color={darkMode ? '#FB7185' : '#A0522D'}
          opacity={darkMode ? 0.09 : 0.16}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedPolygonGrid;