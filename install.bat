@echo off
title Event Mart - Install Dependencies
color 0B

echo.
echo ========================================
echo   EVENT MART - INSTALL DEPENDENCIES
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js is installed
node --version
npm --version
echo.

echo ========================================
echo   INSTALLING BACKEND DEPENDENCIES
echo ========================================
echo.

cd /d "%~dp0backend"

if not exist "package.json" (
    echo [ERROR] Backend package.json not found!
    pause
    exit /b 1
)

echo Installing backend packages...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend installation failed!
    pause
    exit /b 1
)

echo [SUCCESS] Backend dependencies installed!
echo.

echo ========================================
echo   INSTALLING FRONTEND DEPENDENCIES
echo ========================================
echo.

cd /d "%~dp0frontend"

if not exist "package.json" (
    echo [ERROR] Frontend package.json not found!
    pause
    exit /b 1
)

echo Installing frontend packages...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Frontend installation failed!
    pause
    exit /b 1
)

echo [SUCCESS] Frontend dependencies installed!
echo.

cd /d "%~dp0"

echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo All dependencies have been installed successfully.
echo.
echo Next steps:
echo 1. Run 'start.bat' to start both servers
echo 2. Visit http://localhost:5174 to use the application
echo.

pause
