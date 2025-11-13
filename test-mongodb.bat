@echo off
title MongoDB Connection Test
color 0E

echo.
echo ========================================
echo   TESTING MONGODB CONNECTION
echo ========================================
echo.

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] MongoDB is not installed!
    pause
    exit /b 1
)

echo [1/3] Checking MongoDB installation...
mongod --version | findstr /C:"version"
echo.

echo [2/3] Testing MongoDB connection...
echo.

REM Try to connect to MongoDB
mongo --eval "db.version()" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] MongoDB is running and accessible
    echo.
    echo Showing databases:
    mongo --quiet --eval "db.getMongo().getDBNames()"
    echo.
    echo Checking eventmart_ecommerce database:
    mongo eventmart_ecommerce --quiet --eval "db.getCollectionNames()"
) else (
    echo [WARNING] MongoDB is not running or not accessible
    echo.
    echo Please start MongoDB:
    echo 1. Run 'setup-mongodb.bat' first
    echo 2. Or start MongoDB service manually
)

echo.
echo [3/3] Backend environment check...
cd /d "%~dp0backend"

if exist ".env" (
    echo [SUCCESS] .env file found
    findstr /C:"MONGODB_URI" .env
) else (
    echo [WARNING] .env file not found!
)

echo.
echo ========================================
echo   TEST COMPLETE
echo ========================================
echo.

pause
