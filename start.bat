@echo off
REM Quick Start Script for Task Manager Application
REM This script starts both the Django backend and React frontend

echo.
echo ====================================================
echo   Task Manager Web App - Quick Start
echo ====================================================
echo.

REM Check if python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo Error: npm is not installed or not in PATH
    exit /b 1
)

echo Starting Task Manager Application...
echo.

REM Start backend in a new window
echo Starting Django Backend...
start /d "%~dp0backend" cmd /k "python manage.py runserver"
timeout /t 2 /nobreak

REM Start frontend in a new window
echo Starting React Frontend...
start /d "%~dp0frontend" cmd /k "npm run dev"

echo.
echo ====================================================
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:3000
echo ====================================================
echo.
echo The application will open in your browser shortly.
echo Close the command windows to stop the servers.

REM Open the frontend in default browser
timeout /t 3 /nobreak
start http://localhost:3000
