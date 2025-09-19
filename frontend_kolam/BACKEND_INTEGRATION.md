# Backend-Frontend Integration Guide

This document provides comprehensive instructions for integrating the Kolam Vision frontend with the FastAPI backend.

## 🏗️ Architecture Overview

```
Frontend (React + Vite)  ←→  Backend (FastAPI + Python)
├── Pages                    ├── API Endpoints
│   ├── Landing              │   ├── /kolam/*
│   ├── AIRecognition        │   ├── /learning/*
│   ├── RecreatePatterns     │   └── /auth/*
│   └── ...                  ├── Services
└── Services                 │   ├── AI Services
    └── apiService.js        │   ├── Learning Service
                             │   └── Auth Service
                             └── Database
                                 └── SQLite/PostgreSQL
```

## 🚀 Quick Setup

### 1. Environment Configuration

Create `.env` file in the frontend root:

```bash
# Copy from .env.example
cp .env.example .env

# Edit with your backend URL
VITE_API_BASE_URL=http://localhost:8000
VITE_ENV=development
VITE_ENABLE_AI_FEATURES=true
```

### 2. Backend Requirements

Ensure your FastAPI backend is running with CORS enabled:

```python
# In your FastAPI main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. Start Development Servers

```bash
# Terminal 1: Backend
cd backend
uvicorn src.main:app --reload

# Terminal 2: Frontend
cd frontend_kolam
npm run dev
```

## 📡 API Integration Points

### 1. Kolam AI Recognition (`/pages/AIRecognition.jsx`)

**Endpoint**: `POST /kolam/predict`

**Frontend Implementation**:
```javascript
// File upload for Kolam recognition
const handleAnalysis = async (file) => {
  try {
    const result = await apiService.predictKolam(file);
    setAnalysisResult(result);
  } catch (error) {
    console.error('Analysis failed:', error);
  }
};
```

**Expected Backend Response**:
```json
{
  "label": "Traditional Pulli Kolam",
  "confidence": 92.5,
  "design_principle": "This is a beautiful traditional dot-based Kolam pattern..."
}
```

**Required Backend Changes**:
- Implement file upload handling
- Return structured response with pattern details
- Add proper error handling for invalid files

### 2. AI Recreation Service (`/pages/RecreatePatterns.jsx`)

**Endpoint**: `POST /kolam/knowledge`

**Frontend Implementation**:
```javascript
// Text-to-Kolam generation
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const result = await apiService.generateKolamFromDescription(inputValue, true);
    setGeneratedResult(result);
  } catch (error) {
    console.error('Generation failed:', error);
  }
};
```

**Expected Backend Response**:
```json
{
  "explanation": "Based on your description, I've created...",
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAA..." // or null
}
```

**Required Backend Changes**:
- Process natural language descriptions
- Generate or retrieve relevant Kolam patterns
- Return base64 encoded images
- Handle generation failures gracefully

### 3. Learning/Quiz System (`/pages/TestYourKnowledge.jsx`)

**Endpoints**: 
- `GET /learning/questions`
- `POST /learning/quiz/start`
- `POST /learning/quiz/{session_id}/answer`

**Frontend Implementation**:
```javascript
// Quiz session management
const startQuiz = async (category, difficulty) => {
  try {
    const session = await apiService.startQuizSession(category, difficulty, 10);
    setQuizSession(session);
  } catch (error) {
    console.error('Failed to start quiz:', error);
  }
};
```

**Required Backend Changes**:
- Implement quiz session management
- Store user progress and scores
- Provide question randomization
- Calculate and track accuracy

## 🔧 API Service Architecture

The frontend uses a centralized API service (`src/services/apiService.js`) for all backend communication:

```javascript
// Example usage in components
import apiService from '../services/apiService';

// In component
const fetchData = async () => {
  try {
    const data = await apiService.predictKolam(file);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Available Methods:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `predictKolam(file)` | `POST /kolam/predict` | Upload and analyze Kolam images |
| `generateKolamFromDescription(query)` | `POST /kolam/knowledge` | Generate Kolam from text |
| `getTriviaQuestions(params)` | `GET /learning/questions` | Fetch quiz questions |
| `startQuizSession(category, difficulty)` | `POST /learning/quiz/start` | Start new quiz |
| `submitQuizAnswer(sessionId, answer)` | `POST /learning/quiz/{id}/answer` | Submit quiz answers |

## 🔒 Authentication Integration

### Current State
- Frontend components are ready for authentication
- No authentication currently implemented
- User state management prepared

### Implementation Required

1. **Backend**: Implement JWT authentication endpoints
2. **Frontend**: Add auth context and protected routes

```javascript
// Planned auth structure
const authContext = {
  user: null,
  login: async (credentials) => {},
  logout: () => {},
  register: async (userData) => {}
};
```

## 🎨 Component Structure

### Page Components
- **Landing** (`/`): Main landing page with navigation to features
- **AIRecognition** (`/ai-recognition`): Image upload and pattern recognition
- **RecreatePatterns** (`/pattern-recreation`): Text-to-Kolam generation
- **TestYourKnowledge** (`/test-your-knowledge`): Learning and quiz interface
- **Levels** (`/levels`): Game progression interface
- **StartGame** (`/start-game`): Game initialization

### Shared Components
- **Navbar**: Navigation with responsive design
- **AnimatedPolygonGrid**: Decorative background animations
- **FeatureStack**: Feature showcase components
- **Modal**: Reusable modal dialogs

## 🐛 Error Handling

### Frontend Error Handling
```javascript
// Standardized error handling in apiService
try {
  const result = await apiService.someMethod();
  return result;
} catch (error) {
  if (error.status === 404) {
    // Handle not found
  } else if (error.status === 500) {
    // Handle server error
  }
  throw error; // Re-throw for component handling
}
```

### Expected Backend Error Responses
```json
{
  "detail": "Error message",
  "status_code": 400,
  "type": "validation_error"
}
```

## 📊 Data Flow

### 1. Kolam Recognition Flow
```
User uploads image → Frontend validates → API call to /kolam/predict → 
Backend processes → ML model analyzes → Response with pattern details → 
Frontend displays results
```

### 2. Kolam Generation Flow
```
User enters description → Frontend validates → API call to /kolam/knowledge → 
Backend processes text → AI generates/retrieves pattern → Response with image → 
Frontend displays generated Kolam
```

### 3. Quiz Flow
```
User starts quiz → API creates session → Frontend fetches questions → 
User answers → API validates → Score calculated → Progress saved → 
Results displayed
```

## 🔍 Testing Integration

### Manual Testing Checklist

#### AI Recognition Page
- [ ] File upload works
- [ ] Drag and drop functions
- [ ] Loading states display
- [ ] Results show properly
- [ ] Error handling works

#### AI Recreation Page
- [ ] Text input accepts descriptions
- [ ] Generate button triggers API call
- [ ] Loading animation shows
- [ ] Results display correctly
- [ ] Clear function works

#### Quiz System
- [ ] Questions load from backend
- [ ] Answer submission works
- [ ] Score calculation accurate
- [ ] Progress saves correctly

### API Testing Commands

```bash
# Test Kolam prediction
curl -X POST "http://localhost:8000/kolam/predict" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test-kolam.jpg"

# Test Kolam generation
curl -X POST "http://localhost:8000/kolam/knowledge" \
  -H "Content-Type: application/json" \
  -d '{"query": "Create a lotus Kolam", "generate_image": true}'

# Test quiz questions
curl -X GET "http://localhost:8000/learning/questions?limit=5"
```

## 🚀 Deployment Considerations

### Environment Variables
```bash
# Production .env
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_ENV=production
```

### Build Process
```bash
# Frontend build
npm run build

# Serve static files
npm run preview
```

### CORS Configuration
```python
# Production CORS settings
allow_origins=[
    "https://your-frontend-domain.com",
    "https://kolam-vision.netlify.app"  # Example
]
```

## 📝 Development Notes

### Completed Optimizations
- ✅ Removed unused imports and dependencies
- ✅ Centralized API service
- ✅ Standardized error handling
- ✅ Component structure optimization
- ✅ Environment configuration
- ✅ TypeScript-ready structure

### Pending Backend Integration
- ⏳ File upload implementation
- ⏳ AI model integration
- ⏳ Quiz system backend
- ⏳ User authentication
- ⏳ Database setup
- ⏳ Image processing pipeline

### Next Steps
1. Start backend server with CORS configuration
2. Test each API endpoint individually
3. Implement file upload handling
4. Add proper error boundaries
5. Set up user authentication
6. Add loading states and optimistic updates
7. Implement offline functionality

## 🆘 Troubleshooting

### Common Issues

**CORS Errors**
```
Solution: Ensure backend CORS middleware includes frontend URL
```

**API Connection Failed**
```
Solution: Check VITE_API_BASE_URL in .env file
```

**File Upload Issues**
```
Solution: Verify backend accepts multipart/form-data
```

**Environment Variables Not Working**
```
Solution: Restart dev server after .env changes
```

---

For additional support, refer to the backend API documentation and ensure all endpoints match the expected interface defined in this guide.