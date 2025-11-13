@echo off
title Event Mart - Start with MongoDB
color 0A

echo.
echo ========================================
echo   EVENT MART - MONGODB VERSION
echo ========================================
echo.

REM Check MongoDB installation
where mongod >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MongoDB is not installed or not in PATH!
    echo.
    echo Options:
    echo 1. Install MongoDB Community Edition
    echo 2. Use MongoDB Atlas (cloud database)
    echo 3. Continue with in-memory database
    echo.
    choice /C 123 /N /M "Choose option (1/2/3): "
    
    if errorlevel 3 goto INMEMORY
    if errorlevel 2 goto ATLAS
    if errorlevel 1 goto INSTALL
)

echo [1/5] MongoDB is installed
mongod --version | findstr /C:"version"
echo.

echo [2/5] Starting MongoDB Service...
net start MongoDB >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Starting MongoDB manually...
    start "MongoDB Server" cmd /k "mongod --dbpath="%~dp0backend\data\db""
    timeout /t 3 /nobreak >nul
)
echo MongoDB is running
echo.

:CONTINUE
echo [3/5] Starting Backend Server...
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo [4/5] Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo [5/5] Opening Application...
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   SERVERS STARTED - MONGODB MODE
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5174
echo MongoDB:  localhost:27017
echo Database: eventmart_ecommerce
echo.
echo ========================================
echo   LOGIN CREDENTIALS
echo ========================================
echo.
echo ADMIN:
echo   Email: admin@eventmart.com
echo   Password: admin123
echo.
echo USER:
echo   Email: rahul@example.com
echo   Password: user123
echo.
echo VENDOR:
echo   Email: vendor1@example.com
echo   Password: vendor123
echo.
echo ========================================
echo.

start http://localhost:5174
echo Application opened in browser!
echo.
pause
exit

:INSTALL
echo.
echo ========================================
echo   MONGODB INSTALLATION GUIDE
echo ========================================
echo.
echo 1. Visit: https://www.mongodb.com/try/download/community
echo 2. Download MongoDB Community Edition for Windows
echo 3. Run the installer
echo 4. Choose "Complete" installation
echo 5. Install MongoDB as a Service
echo 6. Install MongoDB Compass (optional GUI)
echo.
echo After installation, run this batch file again.
echo.
pause
exit

:ATLAS
echo.
echo ========================================
echo   MONGODB ATLAS SETUP
echo ========================================
echo.
echo 1. Visit: https://www.mongodb.com/cloud/atlas/register
echo 2. Create a free account
echo 3. Create a new cluster (Free tier)
echo 4. Get your connection string
echo 5. Update .env file with your connection string:
echo    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventmart
echo.
echo After setup, run this batch file again.
echo.
pause
exit

:INMEMORY
echo.
echo Continuing with in-memory database...
echo.
goto CONTINUE
