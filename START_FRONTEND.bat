@echo off
echo ========================================
echo Starting Frontend Server (React/Vite)
echo ========================================
cd frontend

echo Installing/Updating dependencies...
call npm install

echo.
echo ========================================
echo Starting development server...
echo ========================================
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause

