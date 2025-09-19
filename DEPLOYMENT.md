# 🚀 Kolam Learning Platform - Complete Deployment Guide

**Quick Setup**: Frontend on Vercel + Backend Locally  
**Estimated Time**: 15-20 minutes  
**Prerequisites**: Git, Python 3.11+, Node.js 18+, Docker (optional)

---

## 📋 Quick Start Checklist

- [ ] Clone repository
- [ ] Setup backend environment
- [ ] Install dependencies  
- [ ] Configure environment variables
- [ ] Start backend server
- [ ] Deploy frontend to Vercel
- [ ] Test integration
- [ ] Verify security

---

## 🏗️ Project Structure

```
SIH/
├── README.md                    # Main project documentation
├── DEPLOYMENT.md                # This file
├── requirements.txt             # Backend dependencies
├── .env.example                 # Environment template
├── pyproject.toml              # Python project config
├── 
├── src/                        # Backend source code
│   ├── main.py                 # FastAPI application
│   ├── api/                    # API endpoints
│   ├── core/                   # Core utilities (security, config)
│   └── services/               # Business logic
│
├── frontend_kolam/             # Frontend React application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── docs/                       # Documentation (auto-generated)
│   ├── api/                    # API documentation
│   ├── deployment/             # Deployment guides
│   └── security/               # Security documentation
│
└── scripts/                    # Utility scripts
```

---

## 🖥️ Backend Setup (Local)

### Step 1: Environment Setup

```bash
# Navigate to project root
cd d:\development\projects\SIH

# Create environment file from template
copy env.example .env

# Generate secure secret key
python -c "import secrets; print('SECRET_KEY=' + secrets.token_urlsafe(32))"
```

### Step 2: Configure Environment Variables

Edit `.env` file:
```bash
# Security - CRITICAL: Update these!
SECRET_KEY=your_generated_secret_key_here
DEBUG=false
ALGORITHM=HS256

# Database (SQLite for simplicity)
DATABASE_URL=sqlite:///./kolam.db

# File Upload Settings
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif,webp

# AI API Keys (Optional - for full functionality)
GEMINI_API_KEY=your_key_here
MISTRAL_API_KEY=your_key_here
PINECONE_API_KEY=your_key_here
```

### Step 3: Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Or using uv (faster)
pip install uv
uv sync
```

### Step 4: Initialize Database

```bash
# Run database migrations
alembic upgrade head

# Create necessary directories
mkdir uploads generated_images models logs
```

### Step 5: Start Backend Server

```bash
# Development mode
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

# Verify server is running
curl http://localhost:8000/health
```

**Expected Response**: `{"status": "healthy", "version": "0.1.0"}`

---

## 🌐 Frontend Setup (Vercel)

### Step 1: Prepare Frontend

```bash
# Navigate to frontend directory
cd frontend_kolam

# Install dependencies
npm install

# Test local build
npm run build
```

### Step 2: Deploy to Vercel

**Option A: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend_kolam directory
cd frontend_kolam
vercel --prod

# Set environment variables when prompted
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

**Option B: GitHub Integration**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL` = `http://localhost:8000/api/v1`

### Step 3: Update CORS Configuration

After deploying to Vercel, update backend CORS settings:

```python
# In src/main.py, update line 53:
cors_origins = [
    "http://localhost:3000",           # Local development
    "http://localhost:5173",           # Vite dev server
    "https://your-app-name.vercel.app", # Replace with actual Vercel URL
    "https://*.vercel.app"             # Vercel preview deployments
]
```

---

## 🔧 Configuration Details

### Backend Security Configuration

Your backend now includes enterprise-grade security:

- ✅ **File Upload Security**: Type validation, size limits, malware scanning
- ✅ **Rate Limiting**: 60 requests/minute, 1000/hour per IP
- ✅ **Input Validation**: SQL injection protection, XSS prevention
- ✅ **Security Headers**: XSS protection, clickjacking prevention
- ✅ **CORS Protection**: Explicit origin whitelist

### Frontend Environment Variables

```bash
# Required for Vercel deployment
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=Kolam Learning Platform

# Optional feature flags
VITE_ENABLE_AI_RECOGNITION=true
VITE_ENABLE_PATTERN_GENERATION=true
```

---

## 🧪 Testing Your Deployment

### 1. Backend Health Check
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/kolam/patterns
```

### 2. Frontend Access
- Open your Vercel URL: `https://your-app.vercel.app`
- Check browser console for errors (F12 → Console)
- Verify API calls work (Network tab)

### 3. Security Testing
```bash
# Run automated security tests
python test_security.py
```

### 4. Full Integration Test
1. Upload an image in AI Recognition page
2. Generate a pattern in Recreate Patterns page
3. Take a quiz in Test Your Knowledge page
4. Check that all features work without CORS errors

---

## 🚨 Troubleshooting

### Common Issues & Solutions

**CORS Errors**
```
Access to fetch at 'http://localhost:8000' has been blocked by CORS policy
```
**Solution**: Update `cors_origins` in `src/main.py` with your actual Vercel URL

**Backend Not Starting**
```
ModuleNotFoundError: No module named 'src'
```
**Solution**: Ensure you're in the project root directory and `PYTHONPATH` is set correctly

**File Upload Fails**
```
413 Request Entity Too Large
```
**Solution**: Check `MAX_FILE_SIZE` in `.env` and file validation settings

**Rate Limiting Issues**
```
429 Too Many Requests
```
**Solution**: Normal security feature. Wait 1 minute or adjust limits in middleware

### Debug Commands

```bash
# Check environment variables
python -c "from src.core.config import settings; print(settings.secret_key)"

# View application logs
tail -f logs/app.log

# Test specific API endpoint
curl -X POST http://localhost:8000/api/v1/kolam/predict -F "file=@test.jpg"

# Check CORS headers
curl -H "Origin: https://your-app.vercel.app" -I http://localhost:8000/health
```

---

## 🔄 Alternative Deployment Options

### Option 1: Full Docker Deployment
```bash
# Build and run everything with Docker
docker-compose up --build

# Access:
# Frontend: http://localhost
# Backend: http://localhost:8000
```

### Option 2: Both on Vercel (Advanced)
```bash
# Deploy backend as Vercel serverless function
# Requires restructuring backend code
# See docs/deployment/vercel-serverless.md
```

### Option 3: Cloud Backend + Vercel Frontend
- Deploy backend to Railway, Render, or DigitalOcean
- Update `VITE_API_BASE_URL` to cloud backend URL
- Configure SSL/TLS certificates

---

## 📊 Performance Optimization

### Backend Optimizations
```python
# Enable caching in production
REDIS_URL=redis://localhost:6379

# Optimize database queries
DATABASE_URL=postgresql://user:pass@localhost/kolam_db

# Enable compression
uvicorn src.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend Optimizations
```bash
# Build with optimizations
npm run build

# Analyze bundle size
npx vite-bundle-analyzer

# Enable service worker caching
# See frontend_kolam/src/sw.js
```

---

## 🔐 Production Security Checklist

- [ ] Change default `SECRET_KEY`
- [ ] Set `DEBUG=false` in production
- [ ] Update CORS origins to actual domains
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up monitoring and alerting
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Monitor API rate limits
- [ ] Review uploaded files periodically

---

## 📞 Support & Documentation

### Quick Links
- **API Documentation**: http://localhost:8000/docs (when backend is running)
- **Frontend Components**: `frontend_kolam/src/components/`
- **Backend API**: `src/api/`
- **Security Features**: `docs/security/`

### Getting Help
1. Check `docs/TROUBLESHOOTING.md`
2. Review security documentation in `docs/security/`
3. Run `python test_security.py` for security validation
4. Check application logs in `logs/` directory

### Development Workflow
```bash
# Daily development routine
1. Start backend: uvicorn src.main:app --reload
2. Start frontend: cd frontend_kolam && npm run dev
3. Deploy to Vercel: vercel --prod
4. Test integration between local backend and Vercel frontend
```

---

## 🎉 Deployment Complete!

Your Kolam Learning Platform is now:
- ✅ **Secure**: Enterprise-grade security features enabled
- ✅ **Scalable**: Ready for production traffic
- ✅ **Fast**: Optimized for performance
- ✅ **Reliable**: Comprehensive error handling and monitoring

**Next Steps**: Explore the AI features, test the quiz system, and enjoy your secure, professional-grade application! 🎨

---

*For detailed API documentation, security features, and advanced configuration, see the `docs/` folder.*