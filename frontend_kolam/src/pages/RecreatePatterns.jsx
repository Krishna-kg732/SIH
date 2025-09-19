import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Trophy, Target, Lock, Unlock, RotateCcw, Check, 
  Play, Pause, Home, ArrowLeft, Lightbulb, Eye, Palette 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RecreatePatterns = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userProgress, setUserProgress] = useState({
    completedLevels: [],
    currentLevel: 1,
    accuracy: 0,
    username: 'Player'
  });
  const [selectedTool, setSelectedTool] = useState('draw');
  const [brushSize, setBrushSize] = useState(3);
  const [showPattern, setShowPattern] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [selectedModalLevel, setSelectedModalLevel] = useState(null);

  // Level data with patterns and difficulty
  const levels = [
    {
      id: 1,
      name: "Simple Dots",
      difficulty: "Beginner",
      pattern: "simple_dots",
      description: "Connect 4 dots to form a basic square pattern",
      maxScore: 100
    },
    {
      id: 2,
      name: "Cross Pattern",
      difficulty: "Easy",
      pattern: "cross",
      description: "Create a traditional cross Kolam with 6 dots",
      maxScore: 150
    },
    {
      id: 3,
      name: "Flower Design",
      difficulty: "Medium",
      pattern: "flower",
      description: "Draw a beautiful flower pattern with 8 dots",
      maxScore: 200
    },
    {
      id: 4,
      name: "Geometric Maze",
      difficulty: "Hard",
      pattern: "maze",
      description: "Complete a complex geometric maze pattern",
      maxScore: 250
    },
    {
      id: 5,
      name: "Master Pattern",
      difficulty: "Expert",
      pattern: "master",
      description: "Create an intricate traditional Kolam design",
      maxScore: 300
    }
  ];

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('kolamProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
      setCurrentLevel(progress.currentLevel);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress) => {
    localStorage.setItem('kolamProgress', JSON.stringify(newProgress));
    setUserProgress(newProgress);
  }, []);

  // Canvas drawing logic
  const startDrawing = useCallback((e) => {
    if (selectedTool !== 'draw') return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }, [selectedTool]);

  const draw = useCallback((e) => {
    if (!isDrawing || selectedTool !== 'draw') return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#780000';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }, [isDrawing, selectedTool, brushSize]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
  };

  // Draw dot grid
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridSize = 40;
    
    ctx.fillStyle = '#666666';
    for (let x = gridSize; x < canvas.width; x += gridSize) {
      for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      drawGrid();
    }
  }, [drawGrid]);

  // Level completion logic
  const checkCompletion = () => {
    // Simulate pattern validation
    const completionScore = Math.floor(Math.random() * 100) + 50;
    setScore(completionScore);
    
    if (completionScore >= 70) {
      setIsCompleted(true);
      const newCompletedLevels = [...userProgress.completedLevels];
      if (!newCompletedLevels.includes(currentLevel)) {
        newCompletedLevels.push(currentLevel);
      }
      
      const newProgress = {
        ...userProgress,
        completedLevels: newCompletedLevels,
        currentLevel: Math.min(currentLevel + 1, 5),
        accuracy: Math.round((newCompletedLevels.length / 5) * 100)
      };
      saveProgress(newProgress);
    }
  };

  // Level navigation
  const goToLevel = (levelId) => {
    if (levelId <= userProgress.currentLevel || userProgress.completedLevels.includes(levelId - 1)) {
      setCurrentLevel(levelId);
      setIsCompleted(false);
      setScore(0);
      clearCanvas();
    }
  };

  // Get level state
  const getLevelState = (levelId) => {
    if (userProgress.completedLevels.includes(levelId)) return 'completed';
    if (levelId === userProgress.currentLevel) return 'current';
    if (levelId <= userProgress.currentLevel) return 'available';
    return 'locked';
  };

  // Level modal component
  const LevelModal = ({ level, onClose, onReplay, onViewStats }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold text-[#1E1E1E] mb-4">{level.name}</h3>
        <p className="text-[#666666] mb-6">{level.description}</p>
        <div className="flex gap-4">
          <button
            onClick={onReplay}
            className="flex-1 bg-[#780000] text-white py-3 rounded-xl font-semibold hover:bg-[#5a0000] transition-colors"
          >
            Replay Level
          </button>
          <button
            onClick={onViewStats}
            className="flex-1 border-2 border-[#780000] text-[#780000] py-3 rounded-xl font-semibold hover:bg-[#780000] hover:text-white transition-all"
          >
            View Stats
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F9F2E9]">
      <Navbar />
      
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#780000]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-[#F9F2E9] transition-colors"
            >
              <Home className="w-6 h-6 text-[#780000]" />
            </button>
            <h1 className="text-3xl font-bold text-[#1E1E1E]">Kolam Vision</h1>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-lg font-semibold text-[#1E1E1E]">{userProgress.username}</p>
              <p className="text-sm text-[#666666]">Level {userProgress.currentLevel} • {userProgress.accuracy}% Complete</p>
            </div>
            <div className="w-12 h-12 bg-[#780000] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Level Map */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#780000]/20">
              <h2 className="text-2xl font-bold text-[#1E1E1E] mb-6">Level Progress</h2>
              
              {/* Zigzag Level Path */}
              <div className="relative h-96">
                {levels.map((level, index) => {
                  const state = getLevelState(level.id);
                  const x = index % 2 === 0 ? 20 : 180;
                  const y = 60 + (index * 60);
                  
                  return (
                    <div key={level.id}>
                      {/* Connecting Line */}
                      {index > 0 && (
                        <svg
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                          style={{ zIndex: 1 }}
                        >
                          <line
                            x1={index % 2 === 1 ? 20 + 30 : 180 + 30}
                            y1={60 + ((index - 1) * 60) + 30}
                            x2={x + 30}
                            y2={y + 30}
                            stroke={state === 'locked' ? '#555' : '#780000'}
                            strokeWidth={state === 'current' ? 5 : 4}
                            strokeDasharray={state === 'locked' ? '5,5' : 'none'}
                            className={state === 'current' ? 'animate-pulse' : ''}
                          />
                        </svg>
                      )}
                      
                      {/* Level Node */}
                      <motion.button
                        style={{ left: x, top: y, zIndex: 2 }}
                        className={`absolute w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                          state === 'completed'
                            ? 'bg-white text-[#780000] border-2 border-[#780000] shadow-lg shadow-yellow-300/50'
                            : state === 'current'
                            ? 'bg-white text-[#780000] border-2 border-[#780000] animate-pulse shadow-lg shadow-[#780000]/50'
                            : state === 'available'
                            ? 'bg-white text-[#780000] border-2 border-[#780000] hover:scale-110'
                            : 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                        }`}
                        whileHover={state !== 'locked' ? { scale: 1.1 } : { x: [0, -5, 5, 0] }}
                        whileTap={state !== 'locked' ? { scale: 0.95 } : {}}
                        onClick={() => {
                          if (state === 'completed') {
                            setSelectedModalLevel(level);
                            setShowLevelModal(true);
                          } else if (state === 'available' || state === 'current') {
                            goToLevel(level.id);
                          }
                        }}
                        disabled={state === 'locked'}
                        title={state === 'locked' ? 'Complete previous level to unlock' : level.name}
                      >
                        {state === 'locked' ? <Lock className="w-6 h-6" /> : level.id}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
              
              {/* Start Game Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToLevel(userProgress.currentLevel)}
                className="w-full mt-6 bg-[#780000] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5a0000] transition-colors shadow-lg"
              >
                {userProgress.completedLevels.length === 0 ? 'Start Game' : 'Continue Playing'}
              </motion.button>
            </div>
          </div>

          {/* Drawing Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#780000]/20">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E1E1E]">
                    Level {currentLevel}: {levels[currentLevel - 1]?.name}
                  </h2>
                  <p className="text-[#666666]">{levels[currentLevel - 1]?.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-[#780000]" />
                  <span className="text-lg font-semibold text-[#1E1E1E]">{score}/100</span>
                </div>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-[#1E1E1E]">Brush Size:</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-20 accent-[#780000]"
                  />
                  <span className="text-sm text-[#666666]">{brushSize}px</span>
                </div>
                
                <button
                  onClick={() => setShowPattern(!showPattern)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    showPattern 
                      ? 'bg-[#780000] text-white' 
                      : 'border-2 border-[#780000] text-[#780000] hover:bg-[#780000] hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  {showPattern ? 'Hide Pattern' : 'Show Pattern'}
                </button>
                
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2 rounded-lg border-2 border-[#780000] text-[#780000] hover:bg-[#780000] hover:text-white transition-all font-semibold"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Clear
                </button>
                
                <button
                  onClick={checkCompletion}
                  className="px-6 py-2 bg-[#780000] text-white rounded-lg hover:bg-[#5a0000] transition-colors font-semibold"
                >
                  <Check className="w-4 h-4 inline mr-2" />
                  Check Pattern
                </button>
              </div>

              {/* Canvas */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="border-2 border-[#780000]/20 rounded-xl bg-[#F9F2E9] cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                
                {/* Pattern Overlay */}
                {showPattern && (
                  <div className="absolute inset-0 bg-[#780000]/10 rounded-xl flex items-center justify-center">
                    <div className="text-[#780000] font-semibold bg-white px-4 py-2 rounded-lg">
                      Pattern Guide Active
                    </div>
                  </div>
                )}
              </div>

              {/* Completion Message */}
              <AnimatePresence>
                {isCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-6 bg-green-50 border-2 border-green-300 rounded-xl text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Level Completed!</h3>
                    <p className="text-green-700 mb-4">Score: {score}/100</p>
                    <button
                      onClick={() => goToLevel(currentLevel + 1)}
                      disabled={currentLevel >= 5}
                      className="px-6 py-3 bg-[#780000] text-white rounded-xl font-semibold hover:bg-[#5a0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentLevel >= 5 ? 'All Levels Complete!' : 'Next Level'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Level Modal */}
      <AnimatePresence>
        {showLevelModal && selectedModalLevel && (
          <LevelModal
            level={selectedModalLevel}
            onClose={() => setShowLevelModal(false)}
            onReplay={() => {
              goToLevel(selectedModalLevel.id);
              setShowLevelModal(false);
            }}
            onViewStats={() => {
              // Handle view stats
              setShowLevelModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecreatePatterns;