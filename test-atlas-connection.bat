@echo off
title Test MongoDB Atlas Connection
color 0B

echo.
echo ========================================
echo   MONGODB ATLAS CONNECTION TEST
echo ========================================
echo.

cd /d "%~dp0backend"

echo [INFO] Testing connection to MongoDB Atlas...
echo.

REM Create a simple test script
(
echo import mongoose from 'mongoose';
echo import dotenv from 'dotenv';
echo dotenv.config^(^);
echo.
echo const testConnection = async ^(^) =^> {
echo   try {
echo     console.log^('Connecting to MongoDB Atlas...'^);
echo     const conn = await mongoose.connect^(process.env.MONGODB_URI^);
echo     console.log^('\n✅ SUCCESS! Connected to MongoDB Atlas'^);
echo     console.log^(`📊 Database: ${conn.connection.name}`^);
echo     console.log^(`🌍 Host: ${conn.connection.host}`^);
echo     console.log^(`📡 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`^);
echo     console.log^('\nCollections in database:'^);
echo     const collections = await conn.connection.db.listCollections^(^).toArray^(^);
echo     if ^(collections.length === 0^) {
echo       console.log^('  ^(Empty - will be created when first document is inserted^)'^);
echo     } else {
echo       collections.forEach^(c =^> console.log^(`  - ${c.name}`^)^);
echo     }
echo     await mongoose.connection.close^(^);
echo     console.log^('\n✅ Connection test completed successfully!'^);
echo     process.exit^(0^);
echo   } catch ^(error^) {
echo     console.error^('\n❌ CONNECTION FAILED!'^);
echo     console.error^('Error:', error.message^);
echo     console.log^('\nPossible issues:'^);
echo     console.log^('1. Check your internet connection'^);
echo     console.log^('2. Verify MongoDB Atlas cluster is running'^);
echo     console.log^('3. Check IP whitelist in Atlas ^(allow 0.0.0.0/0 for testing^)'^);
echo     console.log^('4. Verify username and password in connection string'^);
echo     process.exit^(1^);
echo   }
echo };
echo.
echo testConnection^(^);
) > test-connection.mjs

node test-connection.mjs

set TEST_RESULT=%ERRORLEVEL%

del test-connection.mjs >nul 2>&1

echo.
if %TEST_RESULT% EQU 0 (
    echo ========================================
    echo   CONNECTION SUCCESSFUL!
    echo ========================================
    echo.
    echo Your MongoDB Atlas cluster is ready!
    echo You can now run: start.bat
    echo.
) else (
    echo ========================================
    echo   CONNECTION FAILED
    echo ========================================
    echo.
    echo Please check:
    echo 1. Internet connection
    echo 2. MongoDB Atlas dashboard
    echo 3. Network access settings
    echo.
)

pause
