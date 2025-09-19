import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, X, CheckCircle, LucideZoomIn } from 'lucide-react';
import Navbar from '../components/Navbar';
import AnimatedPolygonGrid from '../components/AnimatedPolygonGrid';
import apiService from '../services/apiService';
import { 
  KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
  KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8,
  KolamPattern9, KolamPattern10
} from '../assets/svg';
import useActivityDetection from '../hooks/useActivityDetection';

const AIRecognition = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [shouldSpin, setShouldSpin] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);
  const [showLoadingPage, setShowLoadingPage] = useState(false);
  const { setInactivityCallback } = useActivityDetection(12000);

  // Activity detection for background animations
  useEffect(() => {
    setInactivityCallback(() => {
      setShouldSpin(true);
      setTimeout(() => setShouldSpin(false), 8000);
    });
  }, [setInactivityCallback]);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        handleAnalysis(file);
      }
    }
  }, []);

  // Handle file input change
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        handleAnalysis(file);
      }
    }
  };

  // AI analysis using real API
  const handleAnalysis = async (file) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await apiService.predictKolam(file);
      setAnalysisResult({
        pattern: result.label,
        confidence: Math.round(result.confidence),
        description: result.design_principle,
        elements: ['Traditional Pattern', 'Cultural Heritage', 'Geometric Design', 'Artistic Expression'],
        difficulty: 'Intermediate', // Backend doesn't provide this yet
        region: 'India' // Backend doesn't provide this yet
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisResult({
        pattern: 'Analysis Failed',
        confidence: 0,
        description: 'Unable to analyze the image. Please try again with a clear Kolam pattern image.',
        elements: ['Error'],
        difficulty: 'Unknown',
        region: 'Unknown'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle button actions
  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  const handleCaptureClick = () => {
    console.log('Camera capture functionality - TODO: Implement camera access');
  };

  const handleCreateClick = async () => {
    if (!uploadedFile) {
      alert('Please upload an image first');
      return;
    }

    setIsCreating(true);
    setShowLoadingPage(true);
    setCreationProgress(0);

    // Simulate backend processing with progress updates
    const progressSteps = [
      { progress: 20, message: 'Analyzing image patterns...' },
      { progress: 40, message: 'Identifying Kolam elements...' },
      { progress: 60, message: 'Generating enhanced design...' },
      { progress: 80, message: 'Applying traditional styling...' },
      { progress: 100, message: 'Finalizing creation...' }
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCreationProgress(progressSteps[i].progress);
    }

    // Simulate receiving processed image from backend
    setTimeout(() => {
      // Reset states after processing is complete
      setIsCreating(false);
      setShowLoadingPage(false);
      // In a real app, this is where you would handle the processed image
      console.log('Image processing completed successfully!');
    }, 1000);
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  // Prevent default drag behaviors
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.addEventListener(eventName, preventDefaults, false);
    });

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.removeEventListener(eventName, preventDefaults, false);
      });
    };
  }, []);

  // Loading Page Component
  if (showLoadingPage) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900' 
          : 'bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0]'
      }`}>
        {/* Background Decorative Elements */}
        <AnimatedPolygonGrid darkMode={darkMode} />

        {/* Loading Content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Loading Animation */}
            <div className="mb-8">
              <motion.div
                className="w-32 h-32 mx-auto flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <KolamPattern5 
                  size={128}
                  color={darkMode ? "#D97706" : "#780000"}
                  opacity={1}
                />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className={`w-full h-2 rounded-full mb-3 ${
                darkMode ? 'bg-gray-800' : 'bg-[#780000]/10'
              }`}>
                <motion.div
                  className={`h-full rounded-full ${
                    darkMode 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                      : 'bg-gradient-to-r from-[#780000] to-[#a91b3d]'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${creationProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-[#2c2c2c]/80'
              }`}>
                {creationProgress}% Complete
              </p>
            </div>

            {/* Status Text */}
            <motion.h2
              className={`text-3xl font-headings font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-[#2c2c2c]'
              }`}
              key={creationProgress}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Creating Your Kolam
            </motion.h2>
            
            <motion.p
              className={`text-lg ${
                darkMode ? 'text-gray-400' : 'text-[#2c2c2c]/70'
              }`}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {creationProgress >= 80 ? 'Finalizing creation...' :
               creationProgress >= 60 ? 'Applying traditional styling...' :
               creationProgress >= 40 ? 'Generating enhanced design...' :
               creationProgress >= 20 ? 'Identifying Kolam elements...' :
               'Analyzing image patterns...'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-[#faf9f7] to-[#f5f3f0]'
    }`}>
      {/* Background Decorative Elements */}
      <AnimatedPolygonGrid darkMode={darkMode} />
      
      {/* Floating Kolam Patterns */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => {
          const PatternComponent = [
            KolamPattern1, KolamPattern2, KolamPattern3, KolamPattern4,
            KolamPattern5, KolamPattern6, KolamPattern7, KolamPattern8
          ][i % 8];
          return (
            <motion.div
              key={i}
              className="absolute opacity-[0.03]"
              style={{
                left: `${10 + (i % 3) * 30}%`,
                top: `${15 + Math.floor(i / 3) * 25}%`,
              }}
              animate={{
                rotate: shouldSpin ? [0, 360] : [0, 120, 240, 360],
                scale: shouldSpin ? [1, 1.2, 1] : [1, 1.1, 1],
              }}
              transition={{
                duration: shouldSpin ? 2 : 35 + Math.random() * 10,
                repeat: shouldSpin ? 2 : Infinity,
                ease: shouldSpin ? "easeInOut" : "linear",
                delay: shouldSpin ? i * 0.3 : i * 4,
              }}
            >
              <PatternComponent 
                size={60 + Math.random() * 30}
                color={darkMode ? "#D97706" : "#780000"}
                opacity={0.08}
              />
            </motion.div>
          );
        })}
        
        {/* Corner decorative elements */}
        {[...Array(4)].map((_, i) => {
          const PatternComponent = [KolamPattern9, KolamPattern10, KolamPattern1, KolamPattern2][i];
          const positions = [
            { top: '5%', left: '5%' },
            { top: '5%', right: '5%' },
            { bottom: '5%', left: '5%' },
            { bottom: '5%', right: '5%' }
          ];
          return (
            <motion.div
              key={`corner-${i}`}
              className="absolute opacity-[0.04]"
              style={positions[i]}
              animate={{
                rotate: shouldSpin ? [0, 180] : [0, 90, 180, 270, 360],
                y: shouldSpin ? [-10, 10, -10] : [-5, 5, -5],
              }}
              transition={{
                duration: shouldSpin ? 1.5 : 40 + Math.random() * 20,
                repeat: shouldSpin ? 3 : Infinity,
                ease: shouldSpin ? "easeInOut" : "linear",
                delay: shouldSpin ? i * 0.4 : i * 5,
              }}
            >
              <PatternComponent 
                size={40 + Math.random() * 20}
                color={darkMode ? "#F59E0B" : "#780000"}
                opacity={0.1}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <Navbar darkMode={darkMode} />
      
      {/* Main Content */}
      <main className="pt-20 min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`font-headings text-5xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-[#2c2c2c]'
            }`}>
              Let The AI Recognize
            </h1>
            <p className={`font-body text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-[#2c2c2c]/80'
            }`}>
              Upload images and get AI-powered analysis of Kolam patterns
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div
              className={`relative w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                dragActive
                  ? darkMode 
                    ? 'border-orange-400 bg-orange-400/10' 
                    : 'border-[#780000] bg-[#780000]/5'
                  : uploadedFile
                    ? darkMode
                      ? 'border-green-400 bg-green-400/5'
                      : 'border-[#780000] bg-white'
                    : darkMode
                      ? 'border-gray-600 bg-gray-800/50 hover:border-orange-400 hover:bg-orange-400/5'
                      : 'border-[#780000]/30 bg-white hover:border-[#780000] hover:shadow-lg'
              }`}
              style={{
                boxShadow: uploadedFile 
                  ? darkMode 
                    ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 25px rgba(120, 0, 0, 0.1)'
                  : dragActive
                    ? darkMode
                      ? '0 15px 35px rgba(251, 146, 60, 0.2)'
                      : '0 15px 35px rgba(120, 0, 0, 0.15)'
                    : darkMode
                      ? '0 5px 15px rgba(0, 0, 0, 0.2)'
                      : '0 5px 15px rgba(120, 0, 0, 0.05)'
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={!uploadedFile ? handleUploadClick : undefined}
            >
              {/* Hidden file input */}
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />

              {/* Upload content */}
              {!uploadedFile ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: dragActive ? 1.1 : 1,
                      rotate: dragActive ? 5 : 0 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className={`w-16 h-16 mb-4 transition-colors duration-300 ${
                      dragActive
                        ? darkMode ? 'text-orange-400' : 'text-[#780000]'
                        : darkMode ? 'text-gray-400' : 'text-[#780000]/60'
                    }`} />
                  </motion.div>
                  <h3 className={`text-2xl font-headings font-semibold mb-2 transition-colors duration-300 ${
                    dragActive
                      ? darkMode ? 'text-orange-400' : 'text-[#780000]'
                      : darkMode ? 'text-gray-300' : 'text-[#2c2c2c]'
                  }`}>
                    {dragActive ? 'Drop your image here' : 'Upload Kolam Image'}
                  </h3>
                  <p className={`text-lg transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-[#2c2c2c]/60'
                  }`}>
                    Drag and drop or click to browse
                  </p>
                  <p className={`text-sm mt-2 transition-colors duration-300 ${
                    darkMode ? 'text-gray-500' : 'text-[#2c2c2c]/40'
                  }`}>
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 p-4">
                  {/* Clear button */}
                  <button
                    onClick={handleClearFile}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
                        : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                    }`}
                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Image preview */}
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Uploaded Kolam"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Analysis overlay */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                        />
                        <p className="text-lg font-semibold">Analyzing Pattern...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center mb-12"
          >
            {[
              { icon: Upload, label: 'Upload', action: handleUploadClick, disabled: false },
              { icon: Camera, label: 'Capture', action: handleCaptureClick, disabled: false },
              { icon: LucideZoomIn, label: isCreating ? 'Creating...' : 'Analyze', action: handleCreateClick, disabled: !uploadedFile || isCreating }
            ].map((button, index) => (
              <motion.button
                key={button.label}
                onClick={button.disabled ? undefined : button.action}
                disabled={button.disabled}
                className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                  button.disabled 
                    ? darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : darkMode
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white'
                      : 'bg-gradient-to-r from-[#780000] to-[#a91b3d] hover:from-[#a91b3d] hover:to-[#780000] text-white'
                }`}
                style={{
                  boxShadow: button.disabled 
                    ? 'none' 
                    : darkMode 
                      ? '0 4px 15px rgba(251, 146, 60, 0.3)' 
                      : '0 4px 15px rgba(120, 0, 0, 0.3)'
                }}
                whileHover={!button.disabled ? { 
                  scale: 1.05,
                  boxShadow: darkMode 
                    ? '0 8px 25px rgba(251, 146, 60, 0.4)' 
                    : '0 8px 25px rgba(120, 0, 0, 0.4)'
                } : {}}
                whileTap={!button.disabled ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + index * 0.1,
                  scale: { type: 'spring', stiffness: 400, damping: 10 }
                }}
              >
                {button.label === 'Creating...' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <button.icon className="w-6 h-6" />
                )}
                <span>{button.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Analysis Results */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700/30' 
                  : 'bg-white border-[#780000]/20'
              }`}
              style={{
                boxShadow: darkMode 
                  ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
                  : '0 10px 25px rgba(120, 0, 0, 0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className={`w-8 h-8 ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`} />
                <h3 className={`text-2xl font-headings font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-[#2c2c2c]'
                }`}>
                  Analysis Complete
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    darkMode ? 'text-orange-400' : 'text-[#780000]'
                  }`}>
                    Pattern Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className={`font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-[#2c2c2c]'
                      }`}>
                        Pattern: 
                      </span>
                      <span className={`ml-2 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-[#2c2c2c]/80'
                      }`}>
                        {analysisResult.pattern}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-[#2c2c2c]'
                      }`}>
                        Confidence: 
                      </span>
                      <span className={`ml-2 transition-colors duration-300 ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {analysisResult.confidence}%
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-[#2c2c2c]'
                      }`}>
                        Difficulty: 
                      </span>
                      <span className={`ml-2 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-[#2c2c2c]/80'
                      }`}>
                        {analysisResult.difficulty}
                      </span>
                    </div>
                    <div>
                      <span className={`font-medium transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-[#2c2c2c]'
                      }`}>
                        Region: 
                      </span>
                      <span className={`ml-2 transition-colors duration-300 ${
                        darkMode ? 'text-white' : 'text-[#2c2c2c]/80'
                      }`}>
                        {analysisResult.region}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    darkMode ? 'text-orange-400' : 'text-[#780000]'
                  }`}>
                    Pattern Elements
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.elements.map((element, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          darkMode ? 'bg-orange-400' : 'bg-[#780000]'
                        }`} />
                        <span className={`transition-colors duration-300 ${
                          darkMode ? 'text-gray-300' : 'text-[#2c2c2c]/80'
                        }`}>
                          {element}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200/20">
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-[#2c2c2c]/80'
                }`}>
                  {analysisResult.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AIRecognition;