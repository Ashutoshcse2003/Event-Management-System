@echo off
title Event Mart - Restart Servers
color 0E

echo.
echo ========================================
echo   RESTARTING EVENT MART SERVERS
echo ========================================
echo.

echo Step 1: Stopping existing servers...
call "%~dp0stop.bat"

echo.
echo Step 2: Starting servers again...
timeout /t 2 /nobreak >nul

call "%~dp0start.bat"
