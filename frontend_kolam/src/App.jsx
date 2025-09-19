import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TestYourKnowledge from './pages/TestYourKnowledge';
import StartGame from './pages/StartGame';
import Levels from './pages/Levels';
import QuizQuestion from './pages/QuizQuestion';
import AIRecognition from './pages/AIRecognition';
import RecreatePatterns from './pages/RecreatePatterns';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test-your-knowledge" element={<TestYourKnowledge />} />
        <Route path="/start-game" element={<StartGame />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/quiz/:levelId" element={<QuizQuestion />} />
        <Route path="/ai-recognition" element={<AIRecognition />} />
        <Route path="/recreate-patterns" element={<RecreatePatterns />} />
        <Route path="/pattern-recreation" element={<RecreatePatterns />} />
      </Routes>
    </Router>
  );
}

export default App;
