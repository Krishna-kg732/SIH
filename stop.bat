@echo off
REM Stop script for Kolam Application on Windows

echo 🛑 Stopping Kolam Learning Platform...

REM Stop and remove containers
docker-compose down --remove-orphans

REM Optional: Remove volumes (uncomment if you want to reset data)
REM echo 🗑️  Removing volumes...
REM docker-compose down -v

REM Optional: Remove images (uncomment if you want to save space)
REM echo 🗑️  Removing images...
REM for /f %%i in ('docker images -q "sih*"') do docker rmi %%i

echo ✅ Application stopped successfully!
pause