import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Trophy, Target, Play, User } from 'lucide-react';

const StartGame = () => {
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState({
    currentLevel: 1,
    completedLevels: [],
    accuracy: 0,
    username: "Kushagra Chaudhary"
  });

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('kolamVisionProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
      // Initialize with some demo progress for testing
      const demoProgress = {
        currentLevel: 1,
        completedLevels: [],
        accuracy: 0,
        username: "Kushagra Chaudhary"
      };
      setUserProgress(demoProgress);
      localStorage.setItem('kolamVisionProgress', JSON.stringify(demoProgress));
    }
  }, []);

  // Level configuration for 10x6 grid system - 2x2 dot spacing rule
  // Each level is exactly 2 dots away horizontally AND vertically from the next
  const levels = [
    { id: 1, name: 'Level 1', difficulty: 'Beginner', gridPos: { row: 5, col: 2 } },   // grid[2,1] - Moved 1 column left from col 2
    { id: 2, name: 'Level 2', difficulty: 'Easy', gridPos: { row: 3, col: 4 } },       // grid[3,4] - 1 down, 3 right from level 1
    { id: 3, name: 'Level 3', difficulty: 'Medium', gridPos: { row: 5, col: 6 } },     // grid[5,6] - Moved 4 dots down from row 1
    { id: 4, name: 'Level 4', difficulty: 'Hard', gridPos: { row: 3, col: 8 } },       // grid[3,8] - 2 down, 2 right from original level 3
    { id: 5, name: 'Level 5', difficulty: 'Expert', gridPos: { row: 5, col: 10 } }     // grid[5,10] - Moved 4 dots down from row 1
  ];

  // Grid configuration for 10x6 system
  const gridConfig = {
    cols: 10,
    rows: 6,
    containerWidth: 900,
    containerHeight: 420,
    horizontalSpacing: 80,
    verticalSpacing: 70,
    startX: 80, // First column position
    startY: 70  // First row position
  };

  // Calculate pixel coordinates from grid position
  const getGridCoordinates = (gridPos) => {
    const x = gridConfig.startX + (gridPos.col - 1) * gridConfig.horizontalSpacing;
    const y = gridConfig.startY + (gridPos.row - 1) * gridConfig.verticalSpacing;
    return { x, y };
  };

  // Convert absolute pixel coordinates for fixed 600x360px container
  const getPosition = (pixelPos) => {
    // Direct pixel positioning for absolute layout
    return {
      x: pixelPos.x,
      y: pixelPos.y
    };
  };

  const getLevelState = (levelId) => {
    if (userProgress.completedLevels.includes(levelId)) {
      return 'completed';
    } else if (levelId === userProgress.currentLevel) {
      return 'current';
    } else {
      return 'locked';
    }
  };

  const handleLevelClick = (levelId) => {
    const state = getLevelState(levelId);
    if (state === 'locked') return;
    
    // Simulate completing a level for demo purposes
    if (state === 'current') {
      const newProgress = {
        ...userProgress,
        completedLevels: [...userProgress.completedLevels, levelId],
        currentLevel: Math.min(levelId + 1, 5),
        accuracy: 85
      };
      setUserProgress(newProgress);
      localStorage.setItem('kolamVisionProgress', JSON.stringify(newProgress));
    }
    
    console.log(`Starting level ${levelId}`);
  };

  const handleStartGame = () => {
    const nextLevel = userProgress.currentLevel;
    handleLevelClick(nextLevel);
  };

  // Create zigzag "W" pattern path between two levels using grid coordinates
  const createPath = (fromIndex, toIndex) => {
    const from = levels[fromIndex];
    const to = levels[toIndex];
    const fromCoords = getGridCoordinates(from.gridPos);
    const toCoords = getGridCoordinates(to.gridPos);
    
    const fromState = getLevelState(from.id);
    const toState = getLevelState(to.id);
    
    let pathState;
    if (fromState === 'completed' && toState !== 'locked') {
      pathState = 'completed';
    } else if (fromState === 'current' || (fromState === 'completed' && toState === 'current')) {
      pathState = 'active';
    } else {
      pathState = 'locked';
    }
    
    // Calculate gentle crests and peaks for 2x2 diagonal progression
    const deltaX = toCoords.x - fromCoords.x;
    const deltaY = toCoords.y - fromCoords.y;
    
    let waypoints;
    
    // Straight line for Level 1 → Level 2 connection
    if (fromIndex === 0) { // Level 1 to Level 2
      waypoints = [
        { x: fromCoords.x, y: fromCoords.y }, // Start point (Level 1)
        { x: toCoords.x, y: toCoords.y } // End point (Level 2)
      ];
    } 
    // Straight line for Level 2 → Level 3 connection
    else if (fromIndex === 1) { // Level 2 to Level 3
      waypoints = [
        { x: fromCoords.x, y: fromCoords.y }, // Start point (Level 2)
        { x: toCoords.x, y: toCoords.y } // End point (Level 3)
      ];
    }
    // Straight line for Level 4 → Level 5 connection
    else if (fromIndex === 3) { // Level 4 to Level 5
      waypoints = [
        { x: fromCoords.x, y: fromCoords.y }, // Start point (Level 4)
        { x: toCoords.x, y: toCoords.y } // End point (Level 5)
      ];
    } 
    else {
      // Standard subtle waypoints for other connections
      const crestHeight = 12; // Gentle crest/peak amplitude
      waypoints = [
        { x: fromCoords.x, y: fromCoords.y }, // Start point
        { 
          x: fromCoords.x + deltaX * 0.3, 
          y: fromCoords.y + deltaY * 0.2 - crestHeight // Create upward crest
        },
        { 
          x: fromCoords.x + deltaX * 0.7, 
          y: fromCoords.y + deltaY * 0.8 + crestHeight // Create downward peak
        },
        { x: toCoords.x, y: toCoords.y } // End point
      ];
    }
    
    // Convert waypoints to SVG polyline points string
    const pathPoints = waypoints.map(point => `${point.x},${point.y}`).join(' ');
    
    return {
      pathPoints,
      waypoints,
      state: pathState,
      delay: fromIndex * 0.3
    };
  };

  const paths = levels.slice(0, -1).map((_, index) => createPath(index, index + 1));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* App Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kolam Vision</h1>
              <p className="text-sm text-gray-600">Master the art of pattern recognition</p>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#780000' }}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{userProgress.username}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Trophy className="w-3 h-3" />
                      <span>Level {userProgress.currentLevel}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Target className="w-3 h-3" />
                      <span>{userProgress.accuracy}%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Map Container - light background with dot grid */}
        <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-8 lg:p-12">
            {/* Level Map - 10x6 Grid System (900x420px) */}
            <div className="relative mx-auto" style={{ width: '900px', height: '420px' }}>
              {/* Background Dot Grid - 10x6 grid with level positions skipped */}
              <div className="absolute inset-0" style={{ zIndex: 1 }}>
                {/* Generate 10x6 grid dots (60 total), skipping level positions */}
                {Array.from({ length: gridConfig.rows }).map((_, row) =>
                  Array.from({ length: gridConfig.cols }).map((_, col) => {
                    const gridRow = row + 1; // 1-indexed
                    const gridCol = col + 1; // 1-indexed
                    const coords = getGridCoordinates({ row: gridRow, col: gridCol });
                    
                    // Skip dots where level nodes will be placed
                    const isLevelPosition = levels.some(level => 
                      level.gridPos.row === gridRow && level.gridPos.col === gridCol
                    );
                    
                    if (isLevelPosition) return null;
                    
                    return (
                      <div
                        key={`dot-${row}-${col}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: '#ffb6c1',
                          opacity: 0.4,
                          left: `${coords.x}px`,
                          top: `${coords.y}px`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    );
                  })
                )}
              </div>

              {/* SVG for Zigzag Paths - 10x6 Grid coordinate system */}
              <svg className="absolute inset-0" width="900" height="420" style={{ zIndex: 5 }}>
                {paths.map((path, index) => (
                  <g key={`path-${index}`}>
                    {/* Zigzag Path using Polyline - Creates "W" pattern */}
                    <motion.polyline
                      points={path.pathPoints}
                      fill="none"
                      stroke={
                        path.state === 'completed' 
                          ? 'url(#completedGradient)' 
                          : path.state === 'active' 
                          ? '#780000' 
                          : '#9ca3af'
                      }
                      strokeWidth={path.state === 'active' ? '5' : '4'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={path.state === 'locked' ? '8,4' : '0'}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: path.state === 'locked' ? 0.3 : 1,
                        opacity: 1
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: path.delay,
                        ease: "easeOut"
                      }}
                    />
                    
                    {/* Animated flowing particles for active path (V or crest/peak) */}
                    {path.state === 'active' && path.waypoints && (
                      <motion.circle
                        r="3"
                        fill="#a91b3d"
                        initial={{ 
                          cx: path.waypoints[0].x,
                          cy: path.waypoints[0].y
                        }}
                        animate={{ 
                          cx: path.waypoints.map(p => p.x),
                          cy: path.waypoints.map(p => p.y)
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          times: path.waypoints.length === 2 
                            ? [0, 1] // Straight line (2 waypoints)
                            : path.waypoints.length === 3 
                            ? [0, 0.5, 1] // V pattern (3 waypoints)
                            : [0, 0.33, 0.67, 1] // Standard pattern (4 waypoints)
                        }}
                      />
                    )}
                  </g>
                ))}
                
                {/* Define gradients */}
                <defs>
                  <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#780000" />
                    <stop offset="100%" stopColor="#a91b3d" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Level Nodes - 10x6 Grid positioning */}
              {levels.map((level, index) => {
                const state = getLevelState(level.id);
                const { x, y } = getGridCoordinates(level.gridPos);
                
                return (
                  <motion.div
                    key={level.id}
                    className="absolute"
                    style={{
                      left: `${x - 32}px`,  // Subtract half width (32px) to center
                      top: `${y - 32}px`,   // Subtract half height (32px) to center
                      zIndex: 10
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.2 + 0.5, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {/* Level Node */}
                    <motion.button
                      onClick={() => handleLevelClick(level.id)}
                      disabled={state === 'locked'}
                      className={`
                        relative w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300
                        ${state === 'completed' 
                          ? 'bg-white border-red-900 text-red-900 shadow-lg cursor-pointer' 
                          : state === 'current'
                          ? 'bg-white border-red-800 text-red-800 shadow-xl cursor-pointer'
                          : 'bg-white border-gray-400 text-gray-500 cursor-not-allowed'
                        }
                      `}
                      whileHover={state !== 'locked' ? { 
                        scale: state === 'current' ? 1.15 : 1.1,
                        boxShadow: state === 'completed' 
                          ? "0 8px 20px rgba(120, 0, 0, 0.4)" 
                          : "0 8px 25px rgba(169, 27, 61, 0.4)"
                      } : { 
                        x: [-2, 2, -2, 2, 0],
                        transition: { duration: 0.5 }
                      }}
                      whileTap={state !== 'locked' ? { scale: 0.95 } : {}}
                    >
                      {state === 'locked' ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <span>{level.id}</span>
                      )}
                      
                      {/* Pulsing glow for current level */}
                      {state === 'current' && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: '#a91b3d', zIndex: -1 }}
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.1, 0.3]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* Subtle glow for completed levels */}
                      {state === 'completed' && (
                        <div 
                          className="absolute inset-0 rounded-full opacity-20" 
                          style={{ backgroundColor: '#780000', zIndex: -1 }} 
                        />
                      )}
                    </motion.button>

                    {/* Level Info - positioned below node */}
                    <motion.div 
                      className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 1, duration: 0.4 }}
                    >
                      <p className="font-bold text-gray-900 text-sm">{level.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{level.difficulty}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Start Game Button - bottom section with lighter background */}
          <div className="bg-gray-100 px-8 py-8 lg:px-12 lg:py-10 text-center border-t border-gray-200">
            <motion.button
              onClick={handleStartGame}
              className="text-white font-bold text-xl px-16 py-5 rounded-2xl shadow-lg transition-all duration-300 flex items-center space-x-4 mx-auto focus:outline-none focus:ring-4"
              style={{ 
                backgroundColor: '#780000',
                focusRingColor: 'rgba(120, 0, 0, 0.3)'
              }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: '#a91b3d'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <Play className="w-7 h-7 fill-current" />
              <span>START GAME</span>
            </motion.button>
            <motion.p 
              className="text-gray-700 mt-6 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.4 }}
            >
              Begin your journey with Level {userProgress.currentLevel}
            </motion.p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartGame;