@echo off
title Setup MongoDB Database
color 0B

echo.
echo ========================================
echo   MONGODB DATABASE SETUP
echo ========================================
echo.

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] MongoDB is not installed!
    echo.
    echo Please install MongoDB first:
    echo 1. Visit: https://www.mongodb.com/try/download/community
    echo 2. Download MongoDB Community Edition
    echo 3. Install and add to PATH
    echo.
    pause
    exit /b 1
)

echo [INFO] MongoDB is installed
mongod --version | findstr /C:"version"
echo.

REM Create data directory
echo Creating data directory...
if not exist "%~dp0backend\data\db" (
    mkdir "%~dp0backend\data\db"
    echo [SUCCESS] Created: backend\data\db
) else (
    echo [INFO] Data directory already exists
)
echo.

echo ========================================
echo   STARTING MONGODB
echo ========================================
echo.

REM Try to start MongoDB service
net start MongoDB >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] MongoDB Service started
    echo.
    goto SEED
)

REM If service not available, start manually
echo Starting MongoDB manually...
start "MongoDB Server" cmd /k "mongod --dbpath="%~dp0backend\data\db""
timeout /t 5 /nobreak >nul
echo.

:SEED
echo ========================================
echo   SEEDING DATABASE
echo ========================================
echo.

cd /d "%~dp0backend"

echo Running seed script...
node seed.js

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Database seeding failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo MongoDB is running on: localhost:27017
echo Database: eventmart_ecommerce
echo.
echo Collections created:
echo   - users (8 documents)
echo   - vendors (5 documents)
echo   - products (15 documents)
echo.
echo You can now run 'start-mongodb.bat' to start the application.
echo.

pause
