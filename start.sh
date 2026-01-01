#!/bin/bash

echo "🚀 Starting 3D Container Home Designer..."

# Check if MongoDB is running
if ! docker ps | grep -q mongodb; then
  echo "📦 Starting MongoDB..."
  docker run -d -p 27017:27017 --name mongodb mongo:latest 2>/dev/null || docker start mongodb
  sleep 2
fi

echo "✅ MongoDB is running"

# Start the backend server
echo "🔧 Starting backend server..."
cd server && npm run dev &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Start the frontend
echo "🎨 Starting frontend..."
cd ../client && npm start &
CLIENT_PID=$!

echo "✅ Application started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
wait
