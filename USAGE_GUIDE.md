# 3D Container Home Designer - Usage Guide

## Quick Start

### Prerequisites
- Node.js v16 or higher
- Docker (for MongoDB)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

1. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

2. **Start MongoDB** (if not already running):
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and frontend (port 3000).

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## Step-by-Step Tutorial

### Tutorial 1: Creating Your First Container Home

#### Step 1: Add a Container
1. Look at the right control panel
2. Find the "Container Management" section
3. Click the blue "Add Container" button
4. A container will appear in the 3D viewport at position (0, 0, 0)

#### Step 2: Navigate the 3D View
- **Rotate**: Left-click and drag
- **Zoom**: Scroll wheel up/down
- **Pan**: Right-click and drag

#### Step 3: Add More Containers
1. Click "Add Container" again
2. The new container will also appear at (0, 0, 0) - overlapping the first
3. Select the new container by clicking it in the 3D view (it will turn blue)

#### Step 4: Position the Second Container
1. With the second container selected (blue), find the "Position (ft)" section
2. Change the X value to `22` (to place it next to the first container)
3. The container moves in real-time as you type

#### Step 5: Stack a Container
1. Add another container
2. Select it (click on it)
3. Set Y to `8.5` (one container height)
4. Set X to `0` to stack it on top of the first container

#### Step 6: Add Windows and Doors
1. Select a container by clicking it
2. In the "Windows & Doors" section, select "Sliding Glass Door"
3. Choose wall: "Front"
4. Set Offset to `0`
5. Click "Place Window/Door"
6. The door appears on the front wall of your container!

#### Step 7: Adjust the Foundation Slab
1. Find the "Foundation Slab" section
2. Adjust the width slider to `50` feet
3. Adjust the depth slider to `30` feet
4. The gray concrete slab resizes in real-time

#### Step 8: Save Your Design
1. Scroll to the "Save/Load" section
2. Click "Save Design"
3. Enter a name: "My First Container Home"
4. Click "Save"
5. You'll see a success message

### Tutorial 2: Advanced Multi-Container Design

#### Creating a 2×2 Container Complex

1. **Add 4 containers**
2. **Position them in a grid**:
   - Container 1: X=0, Y=0, Z=0
   - Container 2: X=22, Y=0, Z=0
   - Container 3: X=0, Y=0, Z=10
   - Container 4: X=22, Y=0, Z=10

3. **Add entry doors to each**:
   - Select each container
   - Add "Insulated Entry Door" to different walls
   - Vary the offset positions

4. **Add windows for lighting**:
   - Select each container
   - Add multiple "Fixed Window" elements
   - Place on different walls
   - Use offset to space them out

5. **Set a large slab**:
   - Width: 60 feet
   - Depth: 40 feet

6. **Save the design**:
   - Name it "Container Complex 2x2"

### Tutorial 3: Two-Story Container Home

1. **Create the first floor**:
   - Add 2 containers side by side
   - Container 1: X=-11, Y=0, Z=0
   - Container 2: X=11, Y=0, Z=0

2. **Create the second floor**:
   - Add 2 more containers
   - Container 3: X=-11, Y=8.5, Z=0
   - Container 4: X=11, Y=8.5, Z=0

3. **Add first floor features**:
   - Sliding glass doors on front (Z-positive side)
   - Entry door on one side
   - Fixed windows on back

4. **Add second floor features**:
   - Fixed windows all around
   - Consider door placement for interior stairs

5. **Foundation**:
   - Width: 45 feet
   - Depth: 25 feet

## Detailed Feature Guide

### Container Selection
- **Click** a container in the 3D view to select it
- Selected containers turn **blue** with a glow effect
- Only one container can be selected at a time
- The position controls show coordinates for the selected container

### Position System
- **X-axis**: Left (-) to Right (+)
- **Y-axis**: Down (-) to Up (+)
- **Z-axis**: Back (-) to Front (+)
- Origin (0,0,0) is at the center of the scene
- Y=0 is ground level (top of slab)
- Recommended stacking: Y increments of 8.5 (container height)

### Window/Door Placement
1. **Select a container** first
2. **Choose type**:
   - Sliding Glass Door: Best for main entrances, transparent blue
   - Fixed Window: For natural light, transparent light blue
   - Insulated Entry Door: Solid entry door, brown

3. **Choose wall**:
   - Front: Z-positive side
   - Back: Z-negative side  
   - Left: X-negative side
   - Right: X-positive side

4. **Set offset**: Distance from center of wall
   - Positive offset: Move right (front/back) or forward (left/right)
   - Negative offset: Move left (front/back) or backward (left/right)
   - Range: -8 to +8 feet typically

5. **Place**: Click "Place Window/Door"

### Managing Placed Windows/Doors
- The "Placed Items" list shows all windows/doors on the selected container
- Click the **× button** to remove an item
- Items move with the container when repositioned

### Foundation Slab
- **Width**: East-West dimension (X-axis)
- **Depth**: North-South dimension (Z-axis)  
- **Range**: 20-100 feet for both
- **Purpose**: Visual foundation for your design
- **Position**: Automatically centered below containers

### Design Statistics
- **Containers**: Total count in your design
- **Total Floor Area**: Containers × 160 sq ft each
- **Slab Area**: Width × Depth

### Saving Designs
1. Click "Save Design"
2. Enter a unique name
3. Click "Save" button
4. Design is stored in MongoDB
5. Includes:
   - All container positions
   - All windows and doors
   - Slab dimensions
   - Creation timestamp

### Loading Designs
1. Click "Load Design"
2. Browse the list of saved designs
3. See name and creation date
4. Click "Load" on any design
5. Your current design is replaced
6. All elements restore exactly as saved

### Exporting Designs
- Click "Export JSON"
- Downloads a .json file
- Contains complete design data
- Can be used for:
  - Backup
  - Sharing
  - Documentation
  - Import (future feature)

### Clearing the Canvas
- Click "Clear All"
- Removes all containers
- Resets slab to default (40×20)
- Does NOT delete saved designs
- Use to start fresh

## Camera Controls Reference

| Action | Mouse | Result |
|--------|-------|--------|
| Rotate | Left-click + drag | Orbit around scene |
| Zoom In | Scroll up | Move camera closer |
| Zoom Out | Scroll down | Move camera farther |
| Pan | Right-click + drag | Move view sideways |
| Reset | Double-click | Return to home position |

## Tips & Best Practices

### Design Tips
1. **Start with the slab**: Set your foundation size first
2. **Plan your layout**: Sketch on paper before building
3. **Use the grid**: Grid lines help with alignment
4. **Stack carefully**: Use Y=8.5 increments exactly
5. **Name logically**: Use descriptive design names

### Performance Tips
1. **Reasonable container count**: 20-30 containers max for smooth performance
2. **Save frequently**: Save different design iterations
3. **Use zoom**: Zoom in for detailed window placement
4. **Clear when starting over**: Don't accumulate unused designs

### Common Patterns
1. **Linear layout**: Containers in a row (change X only)
2. **L-shape**: Corner arrangements
3. **Square**: 2×2 or larger grids
4. **Tower**: Stacking 3-4 high
5. **Compound**: Multiple wings

### Window/Door Placement Tips
1. **Doors at ground level**: Place on Y=0 containers
2. **Windows for light**: Spread evenly
3. **Privacy**: Fewer windows on private areas
4. **Airflow**: Opposite wall windows
5. **Offset for spacing**: Use ±3 to ±5 for multiple windows

## Troubleshooting

### Problem: Container won't select
- **Solution**: Click directly on the container mesh, not the edges

### Problem: Windows appear in wrong location
- **Solution**: Check wall selection and offset value
- **Tip**: Offset is relative to wall center

### Problem: Containers overlap
- **Solution**: Adjust X, Y, or Z coordinates
- **Tip**: 20ft spacing for side-by-side (X-axis)

### Problem: Can't see my containers
- **Solution**: Zoom out (scroll down) or rotate view
- **Tip**: Look for orange rectangular shapes

### Problem: Save/Load not working
- **Solution**: Check backend server is running
- **Check**: `docker ps | grep mongodb`
- **Restart**: `docker start mongodb`

### Problem: Performance issues
- **Solution**: Reduce container count
- **Solution**: Close other browser tabs
- **Solution**: Use Chrome or Firefox

## Keyboard Shortcuts

Currently, the application uses mouse controls only. Future versions may include:
- `Delete` key to remove selected container
- `Ctrl+S` to save
- `Ctrl+Z` to undo
- `Arrow keys` for nudging containers

## Design Examples & Dimensions

### Tiny Home (1 container)
- 1 container: 20' × 8' = 160 sq ft
- Slab: 25' × 15' = 375 sq ft
- Add: 1 door, 2 windows

### Small House (2 containers)
- 2 containers side-by-side: 40' × 8' = 320 sq ft
- Slab: 45' × 15' = 675 sq ft
- Add: 2 doors, 4-6 windows

### Medium House (4 containers)
- 4 containers (2×2 layout): 640 sq ft
- Slab: 45' × 20' = 900 sq ft
- Add: 4 doors, 8-12 windows

### Two-Story (4 containers)
- 2 containers × 2 levels = 640 sq ft
- Slab: 45' × 15' = 675 sq ft
- Add: 2 doors (ground), 8 windows

### Large Complex (8+ containers)
- Mixed layout: 1280+ sq ft
- Slab: 60' × 40' = 2400 sq ft
- Multiple doors and windows

## Support & Resources

### Files Included
- `README.md` - Project overview
- `FEATURES.md` - Complete feature list
- `USAGE_GUIDE.md` - This file
- `start.sh` - Quick start script
- `test-application.sh` - Test runner

### Need Help?
1. Check browser console for errors (F12)
2. Verify MongoDB is running
3. Check server logs
4. Review feature documentation

### Contributing
This is an MVP (Minimum Viable Product). Future enhancements welcome!

## Advanced Usage

### Direct Database Access
```bash
# Connect to MongoDB
docker exec -it mongodb mongosh

# Use the database
use container-home-designer

# List all designs
db.designs.find()

# Find by name
db.designs.find({name: "My Design"})
```

### API Testing
```bash
# Get all designs
curl http://localhost:5000/api/designs

# Get specific design
curl http://localhost:5000/api/designs/:id

# Save design (POST with JSON body)
curl -X POST http://localhost:5000/api/designs \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","containers":[],"slabDimensions":{"width":40,"depth":20}}'
```

### Environment Variables
Create `.env` in server directory:
```
MONGODB_URI=mongodb://localhost:27017/container-home-designer
PORT=5000
```

Create `.env` in client directory:
```
REACT_APP_API_URL=http://localhost:5000
```

## FAQ

**Q: Can I rotate containers?**  
A: Not in the current version. All containers face the same direction.

**Q: Can I see inside containers?**  
A: No, this version shows exterior only.

**Q: How many containers can I add?**  
A: No hard limit, but 20-30 is recommended for performance.

**Q: Can I share designs with others?**  
A: Export as JSON and share the file. Import feature coming soon.

**Q: Does it calculate costs?**  
A: Not yet. Future feature planned.

**Q: Can I change container colors?**  
A: Not currently. All containers are orange-brown with blue selection highlight.

**Q: Is there mobile support?**  
A: Basic support exists but desktop is recommended for best experience.

**Q: Can I print my design?**  
A: Use browser's print function (Ctrl+P) to print the viewport.

---

**Happy Designing! 🏗️🏠**
