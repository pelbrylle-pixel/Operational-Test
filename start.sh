#!/bin/bash
# Quick Start Script for Task Manager Application
# This script starts both the Django backend and React frontend

echo "======================================================"
echo "  Task Manager Web App - Quick Start"
echo "======================================================"
echo ""

# Check if python is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

echo "Starting Task Manager Application..."
echo ""

# Start backend in background
echo "Starting Django Backend..."
cd backend
python3 manage.py runserver &
BACKEND_PID=$!
sleep 2

# Start frontend in background
echo "Starting React Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "======================================================"
echo "  Backend:  http://localhost:8000"
echo "  Frontend: http://localhost:3000"
echo "======================================================"
echo ""
echo "Servers running with PIDs:"
echo "  Backend:  $BACKEND_PID"
echo "  Frontend: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop the servers"

# Open the frontend in default browser
sleep 3
if command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
fi

# Wait for both processes
wait
