import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import useStore from '../store/useStore';
import Container from './Container';
import Slab from './Slab';

const Scene = () => {
  const containers = useStore((state) => state.containers);
  
  return (
    <Canvas
      shadows
      camera={{ position: [30, 30, 30], fov: 60 }}
      style={{ background: '#1a1a2e' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      <Slab />
      
      {containers.map((container) => (
        <Container key={container.id} container={container} />
      ))}
      
      <Grid
        args={[100, 100]}
        cellSize={5}
        cellThickness={0.5}
        cellColor="#6f6f6f"
        sectionSize={10}
        sectionThickness={1}
        sectionColor="#9d4b4b"
        fadeDistance={400}
        fadeStrength={1}
        followCamera={false}
        position={[0, -4.75, 0]}
      />
      
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={200}
        maxPolarAngle={Math.PI / 2 - 0.1}
      />
      
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default Scene;
