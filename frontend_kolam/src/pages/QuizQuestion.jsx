import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Home, RotateCcw, Grid3X3, Check, X } from 'lucide-react';
import { 
  KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
  KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8,
  KolamPattern9, KolamPattern10
} from '../assets/svg';
import useActivityDetection from '../hooks/useActivityDetection';

const QuizQuestion = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const [shouldSpin, setShouldSpin] = useState(false);
  const { setInactivityCallback } = useActivityDetection(12000);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userProgress, setUserProgress] = useState({
    currentLevel: 1,
    completedLevels: [],
    accuracy: 0
  });

  useEffect(() => {
    setInactivityCallback(() => {
      setShouldSpin(true);
      // Reset spinning after 4 seconds
      setTimeout(() => setShouldSpin(false), 4000);
    });
  }, [setInactivityCallback]);

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('kolamVisionProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Update progress when level is completed
  const updateUserProgress = (levelId) => {
    const newProgress = {
      ...userProgress,
      completedLevels: [...userProgress.completedLevels, parseInt(levelId)],
      currentLevel: Math.min(parseInt(levelId) + 1, 5),
      accuracy: 85 // You can calculate this based on answers
    };
    setUserProgress(newProgress);
    localStorage.setItem('kolamVisionProgress', JSON.stringify(newProgress));
  };

  // Question data structure - organized by level
  const quizData = {
    1: {
      emoji: '🟢',
      level: 'Level 1',
      difficulty: 'Beginner',
      questions: [
        {
          question: "What is the traditional name for the geometric patterns drawn in front of Indian homes?",
          options: ["Rangoli", "Kolam", "Mandala", "Alpana"],
          correctAnswer: 1
        },
        {
          question: "Which state in India is most famous for Kolam art?",
          options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
          correctAnswer: 1
        },
        {
          question: "What is the primary purpose of drawing Kolam?",
          options: ["Decoration only", "Religious and cultural significance", "Commercial art", "Modern art form"],
          correctAnswer: 1
        }
      ]
    },
    2: {
      emoji: '🟡',
      level: 'Level 2',
      difficulty: 'Easy',
      questions: [
        {
          question: "What material is traditionally used to draw Kolam?",
          options: ["Chalk powder", "Rice flour", "Colored sand", "Paint"],
          correctAnswer: 1
        },
        {
          question: "When are Kolams typically drawn?",
          options: ["Evening", "Afternoon", "Early morning", "Night"],
          correctAnswer: 2
        },
        {
          question: "What do the dots in Kolam represent?",
          options: ["Random decoration", "Grid system for patterns", "Stars", "Numbers"],
          correctAnswer: 1
        }
      ]
    },
    3: {
      emoji: '🟠',
      level: 'Level 3',
      difficulty: 'Medium',
      questions: [
        {
          question: "Which festival is associated with elaborate Kolam designs?",
          options: ["Diwali", "Holi", "Thai Pusam", "Pongal"],
          correctAnswer: 3
        },
        {
          question: "What is the significance of the center dot in Kolam?",
          options: ["Starting point", "Ending point", "No significance", "Center of universe"],
          correctAnswer: 0
        },
        {
          question: "How are complex Kolam patterns typically created?",
          options: ["Freehand drawing", "Using stencils", "Following dot grids", "Computer generated"],
          correctAnswer: 2
        }
      ]
    },
    4: {
      emoji: '🔴',
      level: 'Level 4',
      difficulty: 'Hard',
      questions: [
        {
          question: "What is the mathematical concept behind Kolam patterns?",
          options: ["Random curves", "Geometric symmetry", "Algebraic equations", "Calculus"],
          correctAnswer: 1
        },
        {
          question: "Which type of Kolam uses no dots as reference?",
          options: ["Pulli Kolam", "Sikku Kolam", "Kambi Kolam", "Neli Kolam"],
          correctAnswer: 1
        },
        {
          question: "What does 'Sikku' mean in Kolam terminology?",
          options: ["Dot", "Line", "Color", "Knot/Loop"],
          correctAnswer: 3
        }
      ]
    },
    5: {
      emoji: '🟣',
      level: 'Level 5',
      difficulty: 'Expert',
      questions: [
        {
          question: "Which mathematical principle is most evident in Kolam designs?",
          options: ["Fractals", "Topology", "Probability", "Statistics"],
          correctAnswer: 1
        },
        {
          question: "What is the advanced technique of drawing Kolam called?",
          options: ["Rangavalli", "Muggulu", "Pulli Kolam", "All of the above"],
          correctAnswer: 3
        },
        {
          question: "How do traditional Kolam artists ensure symmetry?",
          options: ["Measurements", "Mathematical formulas", "Visual balance and experience", "Computer aids"],
          correctAnswer: 2
        }
      ]
    }
  };

  const currentLevelData = quizData[levelId];
  const currentQuestionData = currentLevelData?.questions[currentQuestion];

  useEffect(() => {
    // Reset question state when level changes
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowFeedback(false);
  }, [levelId]);

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    setIsCorrect(optionIndex === currentQuestionData.correctAnswer);
    setShowFeedback(true);

    if (optionIndex === currentQuestionData.correctAnswer) {
      // Auto-advance to next question after 2 seconds
      setTimeout(() => {
        if (currentQuestion < 2) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedOption(null);
          setIsAnswered(false);
          setShowFeedback(false);
        } else {
          // Level completed - update progress and redirect to level selection
          updateUserProgress(levelId);
          navigate('/start-game');
        }
      }, 2000);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowFeedback(false);
  };

  const handleKeyPress = (e) => {
    if (!isAnswered) {
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < currentQuestionData.options.length) {
          handleOptionSelect(optionIndex);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isAnswered, currentQuestionData]);

  if (!currentLevelData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-[#f5f0e7] flex items-center justify-center">
        <div className="text-center text-[#2c2c2c]">
          <h2 className="text-2xl font-playfair mb-4">Level not found</h2>
          <button 
            onClick={() => navigate('/start-game')}
            className="px-6 py-3 bg-[#8b4513] text-white rounded-lg hover:bg-[#a0522d] transition-colors"
          >
            Return to Level Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-[#f5f0e7] relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Kolam Patterns */}
        {[
          KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
          KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8
        ].map((PatternComponent, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              rotate: shouldSpin ? [0, 360] : [0, 180, 360],
            }}
            transition={{
              duration: shouldSpin ? 1.2 : 15 + Math.random() * 10,
              repeat: shouldSpin ? 3 : Infinity,
              ease: shouldSpin ? "easeInOut" : "linear",
              delay: shouldSpin ? i * 0.15 : 0,
            }}
          >
            <PatternComponent 
              size={40 + Math.random() * 20}
              color="#8b4513"
              opacity={0.3}
            />
          </motion.div>
        ))}

        {/* Additional scattered patterns */}
        {[...Array(6)].map((_, i) => {
          const PatternComponent = [
            KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
            KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8,
            KolamPattern9, KolamPattern10
          ][i % 10];
          return (
            <motion.div
              key={`extra-${i}`}
              className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
                rotate: shouldSpin ? [0, 360] : [0, -90, 0],
              }}
              transition={{
                duration: shouldSpin ? 1 : 20 + Math.random() * 10,
                repeat: shouldSpin ? 2 : Infinity,
                ease: shouldSpin ? "easeInOut" : "linear",
                delay: shouldSpin ? Math.random() * 1.5 : Math.random() * 5,
              }}
            >
              <PatternComponent 
                size={30 + Math.random() * 15}
                color="#a0522d"
                opacity={0.2}
              />
            </motion.div>
          );
        })}

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-[#8b4513] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-[#8b4513]/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/start-game')}
            className="flex items-center gap-2 text-[#8b4513] hover:text-[#a0522d] transition-colors"
            aria-label="Return to level selection"
          >
            <ArrowLeft size={20} />
            <span className="font-inter">Back</span>
          </button>

          <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-1">
              <span className="text-2xl">{currentLevelData.emoji}</span>
              <h1 className="text-xl font-playfair text-[#2c2c2c]">{currentLevelData.level}</h1>
            </div>
            <p className="text-sm text-[#8b4513] font-inter">
              Question {currentQuestion + 1} of 3
            </p>
          </div>

          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Question Card */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#8b4513]/20"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-playfair text-[#2c2c2c] leading-relaxed text-center">
                {currentQuestionData.question}
              </h2>
            </motion.div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestionData.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                  className={`
                    p-6 rounded-xl border-2 transition-all duration-300 text-left font-inter
                    ${selectedOption === index 
                      ? isCorrect 
                        ? 'bg-green-500 text-white border-green-500' 
                        : 'bg-red-500 text-white border-red-500'
                      : selectedOption !== null && index === currentQuestionData.correctAnswer && isAnswered
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white/80 text-[#2c2c2c] border-[#8b4513]/30 hover:border-[#8b4513] hover:shadow-lg hover:shadow-[#8b4513]/20'
                    }
                    ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  whileHover={!isAnswered ? { y: -2, scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-[#8b4513]/20 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-lg">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Answer Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            >
              <motion.div
                className={`
                  bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl
                  ${isCorrect ? 'border-4 border-green-500' : 'border-4 border-red-500'}
                `}
                initial={{ y: 50 }}
                animate={{ y: 0 }}
              >
                <motion.div
                  className={`
                    w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                    ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
                  `}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {isCorrect ? (
                    <Check size={32} className="text-white" />
                  ) : (
                    <X size={32} className="text-white" />
                  )}
                </motion.div>

                <h3 className={`text-2xl font-playfair mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </h3>

                <p className="text-[#2c2c2c] font-inter mb-6">
                  {isCorrect 
                    ? currentQuestion < 2 
                      ? 'Moving to next question...' 
                      : 'Level completed! Returning to menu...'
                    : 'Try again!'
                  }
                </p>

                {!isCorrect && (
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleRetry}
                      className="flex items-center gap-2 px-4 py-2 bg-[#8b4513] text-white rounded-lg hover:bg-[#a0522d] transition-colors"
                    >
                      <RotateCcw size={16} />
                      Retry Level
                    </button>
                    <button
                      onClick={() => navigate('/start-game')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Grid3X3 size={16} />
                      Level Menu
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Home size={16} />
                      Home
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuizQuestion;