import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import polygon1 from '../assets/polygons/polygon-1.svg';
import polygon2 from '../assets/polygons/polygon-2.svg';
import polygon3 from '../assets/polygons/polygon-3.svg';

const AnimatedPolygonGrid = ({ darkMode = false }) => {
  const { scrollY } = useScroll();
  
  // Transform values for different polygons
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [360, 0]);
  const rotate3 = useTransform(scrollY, [0, 1000], [0, 180]);
  
  const translateY1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const translateY2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const translateY3 = useTransform(scrollY, [0, 1000], [0, -25]);
  
  const translateX1 = useTransform(scrollY, [0, 1000], [0, 30]);
  const translateX2 = useTransform(scrollY, [0, 1000], [0, -40]);
  const translateX3 = useTransform(scrollY, [0, 1000], [0, 20]);

  const polygons = [
    {
      src: polygon1,
      rotate: rotate1,
      translateY: translateY1,
      translateX: translateX1,
      className: 'top-20 right-20',
      color: darkMode ? '#FB923C' : '#8B4513',
    },
    {
      src: polygon2,
      rotate: rotate2,
      translateY: translateY2,
      translateX: translateX2,
      className: 'left-10',
      style: { top: '50%' },
      color: darkMode ? '#F97316' : '#A0522D',
    },
    {
      src: polygon3,
      rotate: rotate3,
      translateY: translateY3,
      translateX: translateX3,
      className: 'bottom-20',
      style: { right: '25%' },
      color: darkMode ? '#60A5FA' : '#6B96B0',
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {polygons.map((polygon, index) => (
        <motion.div
          key={index}
          className={`absolute ${polygon.className}`}
          style={{
            rotate: polygon.rotate,
            y: polygon.translateY,
            x: polygon.translateX,
            color: polygon.color,
            ...polygon.style
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: index * 0.2,
            ease: 'easeOut',
          }}
        >
          <img 
            src={polygon.src} 
            alt={`Decorative polygon ${index + 1}`}
            className={`w-16 h-16 md:w-20 md:h-20 transition-opacity duration-300 ${
              darkMode ? 'opacity-20' : 'opacity-30'
            }`}
            style={{ filter: `hue-rotate(${index * 30}deg)` }}
          />
        </motion.div>
      ))}
      
      {/* Additional floating polygons for larger screens */}
      <motion.div
        className="absolute hidden lg:block"
        style={{
          top: '33.33%',
          left: '33.33%',
          color: darkMode ? '#FB923C' : '#8B4513',
          rotate: rotate2,
          y: translateY3,
          x: translateX1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: darkMode ? 0.1 : 0.2 }}
        transition={{ delay: 0.6 }}
      >
        <img 
          src={polygon1} 
          alt="Decorative polygon"
          className="w-12 h-12"
        />
      </motion.div>
      
      <motion.div
        className="absolute hidden lg:block"
        style={{
          bottom: '33.33%',
          right: '33.33%',
          color: darkMode ? '#F97316' : '#A0522D',
          rotate: rotate1,
          y: translateY2,
          x: translateX3,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: darkMode ? 0.08 : 0.15 }}
        transition={{ delay: 0.8 }}
      >
        <img 
          src={polygon3} 
          alt="Decorative polygon"
          className="w-14 h-14"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedPolygonGrid;