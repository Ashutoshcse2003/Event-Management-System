@echo off
title Event Mart - Stop Servers
color 0C

echo.
echo ========================================
echo   STOPPING EVENT MART SERVERS
echo ========================================
echo.

echo Stopping Node.js processes on ports 5000 and 5174...
echo.

REM Kill processes on port 5000 (Backend)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do (
    echo Stopping Backend Server (Port 5000) - PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

REM Kill processes on port 5174 (Frontend)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5174" ^| find "LISTENING"') do (
    echo Stopping Frontend Server (Port 5174) - PID: %%a
    taskkill /F /PID %%a >nul 2>&1
)

REM Alternative: Kill all node.exe processes (use with caution)
REM taskkill /F /IM node.exe >nul 2>&1

echo.
echo ========================================
echo   SERVERS STOPPED SUCCESSFULLY!
echo ========================================
echo.

timeout /t 2 /nobreak >nul
