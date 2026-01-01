#!/bin/bash

echo "🧪 Testing 3D Container Home Designer Application..."
echo ""

# Check if MongoDB is running
echo "1. Checking MongoDB..."
if docker ps | grep -q mongodb; then
  echo "   ✅ MongoDB is running"
else
  echo "   ❌ MongoDB is not running"
  echo "   Starting MongoDB..."
  docker start mongodb 2>/dev/null || docker run -d -p 27017:27017 --name mongodb mongo:latest
  sleep 2
fi

# Check backend dependencies
echo ""
echo "2. Checking backend dependencies..."
if [ -d "server/node_modules" ]; then
  echo "   ✅ Backend dependencies installed"
else
  echo "   ❌ Backend dependencies missing"
  exit 1
fi

# Check frontend dependencies
echo ""
echo "3. Checking frontend dependencies..."
if [ -d "client/node_modules" ]; then
  echo "   ✅ Frontend dependencies installed"
else
  echo "   ❌ Frontend dependencies missing"
  exit 1
fi

# Test backend API
echo ""
echo "4. Testing backend API..."
cd server
node server.js > /tmp/server-test.log 2>&1 &
SERVER_PID=$!
sleep 3

# Test API endpoint
RESPONSE=$(curl -s http://localhost:5000/api/designs)
if [ "$RESPONSE" = "[]" ] || [ ! -z "$RESPONSE" ]; then
  echo "   ✅ Backend API is responding"
else
  echo "   ❌ Backend API is not responding"
  cat /tmp/server-test.log
  kill $SERVER_PID
  exit 1
fi

# Clean up
kill $SERVER_PID
cd ..

# Test frontend build
echo ""
echo "5. Testing frontend build..."
cd client
npm run build > /tmp/client-build.log 2>&1
if [ $? -eq 0 ]; then
  echo "   ✅ Frontend builds successfully"
else
  echo "   ❌ Frontend build failed"
  tail -20 /tmp/client-build.log
  cd ..
  exit 1
fi
cd ..

echo ""
echo "✅ All tests passed!"
echo ""
echo "📋 Summary:"
echo "   - MongoDB: Running in Docker"
echo "   - Backend: Node.js/Express on port 5000"
echo "   - Frontend: React/Three.js on port 3000"
echo "   - Database: container-home-designer"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev"
echo ""
