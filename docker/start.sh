#!/bin/bash
set -e

echo "Starting Kolam Application..."

# Wait for database to be ready
echo "Waiting for database..."
while ! curl -f http://postgres:5432 2>/dev/null; do
  echo "Database not ready, waiting..."
  sleep 2
done

echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
cd /app
uv run alembic upgrade head

# Create uploads directory if it doesn't exist
mkdir -p /app/uploads /app/generated_images

echo "Starting services with supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf