# 3D Container Home Designer

A web-based 3D home designer application that allows users to design homes using standard 20ft shipping containers.

## Features

- **3D Container Models**: Standard 20ft shipping container dimensions (20' × 8' × 8.5")
- **Container Management**: Add, remove, and stack containers vertically
- **Window & Door Placement**: Three types - Sliding Glass Door, Fixed Window, and Insulated Entry Door
- **Slab Sizing**: Adjustable foundation slab with real-time visualization
- **Save/Load**: Store and retrieve designs from database
- **Interactive 3D Viewport**: Rotate, zoom, and pan camera controls

## Tech Stack

- **Frontend**: React.js, Three.js, @react-three/fiber, @react-three/drei
- **State Management**: Zustand
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   - Create `.env` file in the `server` directory
   - Add MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/container-home-designer
     PORT=5000
     ```

### Running the Application

Development mode (runs both client and server):
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Zustand state management
│   │   ├── utils/         # Utility functions
│   │   └── App.js         # Main app component
│   └── public/
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Express server
└── package.json          # Root package.json
```

## Usage

1. **Adding Containers**: Click "Add Container" to place a new 20ft container
2. **Positioning**: Use X, Y, Z inputs to position containers
3. **Stacking**: Increase Y coordinate to stack containers vertically
4. **Windows/Doors**: Select a type and click on container walls to place
5. **Slab**: Adjust width and depth sliders to size the foundation
6. **Save/Load**: Save your design with a name and load it later

## API Endpoints

- `GET /api/designs` - Get all saved designs
- `GET /api/designs/:id` - Get a specific design
- `POST /api/designs` - Save a new design
- `PUT /api/designs/:id` - Update an existing design
- `DELETE /api/designs/:id` - Delete a design

## License

MIT
