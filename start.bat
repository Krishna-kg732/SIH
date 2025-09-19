@echo off
REM Quick start script for Kolam Application on Windows

echo 🎨 Starting Kolam Learning Platform...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Check if docker-compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: docker-compose is not installed.
    pause
    exit /b 1
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist uploads mkdir uploads
if not exist generated_images mkdir generated_images
if not exist models mkdir models
if not exist logs mkdir logs

REM Copy environment file if it doesn't exist
if not exist .env (
    echo 📋 Creating .env file from .env.docker...
    copy .env.docker .env
    echo ⚠️  Please update the API keys in .env file for full functionality
)

REM Build and start services
echo 🔧 Building and starting services...
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

REM Wait for services to be ready
echo ⏳ Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check if application is ready
echo 🔍 Checking application status...
curl -f http://localhost:80/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Application is running successfully!
    echo.
    echo 🌐 Frontend: http://localhost
    echo 🔌 Backend API: http://localhost:8000
    echo 📊 Grafana: http://localhost:3000 ^(admin/admin^)
    echo 🔍 OpenSearch: http://localhost:9200
    echo.
    echo To stop the application, run: docker-compose down
) else (
    echo ❌ Application failed to start. Check logs with: docker-compose logs
)

pause