#!/bin/bash

echo "🔍 Verifying 3D Container Home Designer File Structure..."
echo ""

files=(
  ".gitignore"
  "package.json"
  "README.md"
  "FEATURES.md"
  "USAGE_GUIDE.md"
  "ACCEPTANCE_CRITERIA.md"
  "QUICKTEST.md"
  "start.sh"
  "test-application.sh"
  "client/package.json"
  "client/src/App.js"
  "client/src/App.css"
  "client/src/components/Scene.js"
  "client/src/components/Container.js"
  "client/src/components/WindowDoor.js"
  "client/src/components/Slab.js"
  "client/src/components/ControlPanel.js"
  "client/src/components/ControlPanel.css"
  "client/src/store/useStore.js"
  "client/src/utils/constants.js"
  "server/package.json"
  "server/.env"
  "server/server.js"
  "server/models/Design.js"
  "server/routes/designs.js"
)

missing=0
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - MISSING"
    missing=$((missing + 1))
  fi
done

echo ""
if [ $missing -eq 0 ]; then
  echo "✅ All files present!"
  echo ""
  echo "📊 Project Statistics:"
  echo "   - Total Files: ${#files[@]}"
  echo "   - React Components: $(ls -1 client/src/components/*.js 2>/dev/null | wc -l)"
  echo "   - Backend Routes: $(ls -1 server/routes/*.js 2>/dev/null | wc -l)"
  echo "   - Documentation: $(ls -1 *.md 2>/dev/null | wc -l)"
  echo ""
  echo "🚀 Ready to run: npm run dev"
else
  echo "❌ $missing file(s) missing!"
  exit 1
fi
