# Kolam Vision - Frontend Application

A modern React application for AI-powered Kolam pattern recognition, generation, and cultural learning platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
frontend_kolam/
├── src/
│   ├── pages/           # Application pages/routes
│   ├── components/      # Reusable UI components
│   ├── services/        # API and external services
│   ├── constants/       # Theme and configuration
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── assets/         # Static assets (images, SVGs)
├── public/             # Public static files
└── docs/              # Documentation
```

## 🎯 Key Features

### 🤖 AI-Powered Recognition
- **Image Upload**: Drag-and-drop Kolam image analysis
- **Pattern Recognition**: ML-powered pattern identification
- **Cultural Insights**: Traditional design principles and meanings

### 🎨 AI Recreation Service
- **Text-to-Kolam**: Natural language description to pattern generation
- **Interactive Interface**: Clean, minimal design for easy use
- **Real-time Generation**: AI-powered Kolam creation

### 📚 Learning Platform
- **Interactive Quizzes**: Test knowledge of Kolam traditions
- **Progress Tracking**: User learning journey
- **Cultural Education**: Deep dive into Kolam history and significance

### 🎮 Interactive Games
- **Pattern Recreation**: Draw and match traditional patterns
- **Level Progression**: Structured learning path
- **Skill Assessment**: Accuracy and completion tracking

## 🔌 Backend Integration

**📖 See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for complete integration guide**

The frontend communicates with a FastAPI backend through a centralized API service:

```javascript
import apiService from './services/apiService';

// Example usage
const result = await apiService.predictKolam(imageFile);
const pattern = await apiService.generateKolamFromDescription(text);
```

### Required Backend Endpoints
- `POST /kolam/predict` - Image recognition
- `POST /kolam/knowledge` - Text-to-pattern generation  
- `GET /learning/questions` - Quiz questions
- `POST /learning/quiz/start` - Quiz sessions

## 🎨 Design System

### Color Palette
- **Primary**: #780000 (Deep Red)
- **Accent**: #A91B3D (Burgundy) 
- **Background**: #F9F2E9 (Warm Cream)
- **Text**: #2C2C2C (Charcoal)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Components
All components follow consistent design patterns with:
- Responsive design (mobile-first)
- Accessibility compliance
- Smooth animations (Framer Motion)
- Theme-based styling (TailwindCSS)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:8000  # Backend API URL
VITE_ENV=development                     # Environment
VITE_ENABLE_AI_FEATURES=true            # Feature flags
```

## 🧩 API Service Architecture

Centralized API communication through `src/services/apiService.js`:

- **Error Handling**: Consistent error patterns
- **Request Configuration**: Automatic headers and base URL
- **Type Safety**: Structured request/response interfaces
- **Environment Aware**: Configurable endpoints

## 📱 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Landing | Home page with feature overview |
| `/ai-recognition` | AIRecognition | Upload and analyze Kolam images |
| `/pattern-recreation` | RecreatePatterns | AI-powered Kolam generation |
| `/test-your-knowledge` | TestYourKnowledge | Quiz and learning interface |
| `/levels` | Levels | Game progression system |
| `/start-game` | StartGame | Interactive Kolam drawing |

## 🔧 Technical Details

### Dependencies
- **React 18** - UI Framework
- **Vite** - Build tool and dev server  
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon system
- **React Router** - Client-side routing

### Code Quality
- **ESLint** - Code linting
- **Clean Architecture** - Organized file structure
- **Component Isolation** - Reusable UI components
- **Custom Hooks** - Shared logic extraction

## 🚀 Deployment

### Build Process
```bash
npm run build     # Creates dist/ folder
npm run preview   # Test production build locally
```

### Environment Setup
1. Configure production API URL in `.env`
2. Ensure backend CORS allows frontend domain
3. Deploy static files to CDN/hosting service

## 📊 Performance

### Optimizations Implemented
- ✅ Code splitting with React.lazy
- ✅ Image optimization and lazy loading
- ✅ Minimal bundle size
- ✅ Efficient re-renders with proper state management
- ✅ Caching strategies for API calls

## 🧪 Testing Integration

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for:
- API endpoint testing
- Manual testing checklists  
- Error scenario handling
- Performance benchmarking

## 📄 License

Part of the Kolam Vision project for cultural preservation through AI technology.

---

**🔗 Quick Links:**
- [Backend Integration Guide](./BACKEND_INTEGRATION.md) - Complete setup instructions
- [Component Documentation](./src/components/) - Individual component guides
- [API Service](./src/services/apiService.js) - Backend communication layer