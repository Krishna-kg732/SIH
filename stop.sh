#!/bin/bash
# Stop script for Kolam Application

echo "🛑 Stopping Kolam Learning Platform..."

# Stop and remove containers
docker-compose down --remove-orphans

# Optional: Remove volumes (uncomment if you want to reset data)
# echo "🗑️  Removing volumes..."
# docker-compose down -v

# Optional: Remove images (uncomment if you want to save space)
# echo "🗑️  Removing images..."
# docker rmi $(docker images -q "sih*")

echo "✅ Application stopped successfully!"