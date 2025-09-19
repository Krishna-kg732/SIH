#!/bin/bash
# Quick start script for Kolam Application

echo "🎨 Starting Kolam Learning Platform..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose >/dev/null 2>&1; then
    echo "❌ Error: docker-compose is not installed."
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads generated_images models logs

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.docker..."
    cp .env.docker .env
    echo "⚠️  Please update the API keys in .env file for full functionality"
fi

# Build and start services
echo "🔧 Building and starting services..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if application is ready
echo "🔍 Checking application status..."
if curl -f http://localhost:80/health >/dev/null 2>&1; then
    echo "✅ Application is running successfully!"
    echo ""
    echo "🌐 Frontend: http://localhost"
    echo "🔌 Backend API: http://localhost:8000"
    echo "📊 Grafana: http://localhost:3000 (admin/admin)"
    echo "🔍 OpenSearch: http://localhost:9200"
    echo ""
    echo "To stop the application, run: docker-compose down"
else
    echo "❌ Application failed to start. Check logs with: docker-compose logs"
    exit 1
fi