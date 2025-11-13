@echo off
title Event Mart - Full Stack Application
color 0A

echo.
echo ========================================
echo   EVENT MART - FULL STACK STARTER
echo ========================================
echo.
echo Starting Backend and Frontend Servers...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Checking Node.js version...
node --version
echo.

echo [2/4] Starting Backend Server...
echo Backend will run on http://localhost:5000
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo [3/4] Starting Frontend Server...
echo Frontend will run on http://localhost:5174
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo [4/4] Servers Starting...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   SERVERS STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5174
echo Test API: http://localhost:5174/test-api
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
echo Press any key to open the application in browser...
pause >nul

start http://localhost:5174

echo.
echo Application opened in browser!
echo.
echo To stop servers, close the Backend and Frontend terminal windows.
echo.
pause
