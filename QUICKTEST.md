# Quick Test Guide

## 1. Prerequisites Check
```bash
# Check Node.js
node --version  # Should be v16+

# Check npm
npm --version

# Check Docker
docker --version
```

## 2. Quick Test Commands

### Start MongoDB
```bash
docker ps | grep mongodb || docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Test Backend
```bash
cd server
npm start &
sleep 2
curl http://localhost:5000/api/designs
# Should return: []
pkill -f "node server"
cd ..
```

### Test Frontend Build
```bash
cd client
npm run build
# Should complete without errors
cd ..
```

## 3. Run Full Application
```bash
npm run dev
```

Then open: http://localhost:3000

## 4. Visual Test Checklist

1. [ ] 3D scene renders (dark background, grid visible)
2. [ ] Click "Add Container" - orange container appears
3. [ ] Click container - turns blue (selected)
4. [ ] Change X to 22 - container moves right
5. [ ] Click "Add Container" again
6. [ ] Change Y to 8.5 - container stacks on top
7. [ ] Select "Fixed Window" from dropdown
8. [ ] Click "Place Window/Door" - window appears
9. [ ] Adjust width slider - gray slab resizes
10. [ ] Click "Save Design", enter name, save
11. [ ] Click "Load Design" - see saved design
12. [ ] Rotate view (left-click drag)
13. [ ] Zoom (scroll wheel)
14. [ ] No errors in browser console (F12)

## Expected Result
✅ All 14 items should work perfectly
