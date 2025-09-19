# PowerShell script to start Kolam Application
# Run this with: powershell -ExecutionPolicy Bypass -File start.ps1

Write-Host "🎨 Starting Kolam Learning Platform..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Error: Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if docker-compose is available
try {
    docker-compose --version | Out-Null
} catch {
    Write-Host "❌ Error: docker-compose is not installed." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Create necessary directories
Write-Host "📁 Creating necessary directories..." -ForegroundColor Yellow
@('uploads', 'generated_images', 'models', 'logs') | ForEach-Object {
    if (!(Test-Path $_)) {
        New-Item -ItemType Directory -Path $_ | Out-Null
    }
}

# Copy environment file if it doesn't exist
if (!(Test-Path '.env')) {
    Write-Host "📋 Creating .env file from .env.docker..." -ForegroundColor Yellow
    Copy-Item '.env.docker' '.env'
    Write-Host "⚠️  Please update the API keys in .env file for full functionality" -ForegroundColor Yellow
}

# Build and start services
Write-Host "🔧 Building and starting services..." -ForegroundColor Cyan
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
Write-Host "⏳ Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Check if application is ready
Write-Host "🔍 Checking application status..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:80/health" -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Application is running successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Frontend: http://localhost" -ForegroundColor White
        Write-Host "🔌 Backend API: http://localhost:8000" -ForegroundColor White
        Write-Host "📊 Grafana: http://localhost:3000 (admin/admin)" -ForegroundColor White
        Write-Host "🔍 OpenSearch: http://localhost:9200" -ForegroundColor White
        Write-Host ""
        Write-Host "To stop the application, run: docker-compose down" -ForegroundColor Magenta
    }
} catch {
    Write-Host "❌ Application failed to start. Check logs with: docker-compose logs" -ForegroundColor Red
}

Read-Host "Press Enter to exit"