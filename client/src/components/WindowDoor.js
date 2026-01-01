import React from 'react';
import * as THREE from 'three';

const WindowDoor = ({ windowDoor, containerId, containerDimensions }) => {
  const getPosition = () => {
    const { wall, offset } = windowDoor;
    const { width, depth } = containerDimensions;
    
    switch (wall) {
      case 'front':
        return [offset, 0, depth / 2 + 0.05];
      case 'back':
        return [offset, 0, -depth / 2 - 0.05];
      case 'left':
        return [-width / 2 - 0.05, 0, offset];
      case 'right':
        return [width / 2 + 0.05, 0, offset];
      default:
        return [0, 0, 0];
    }
  };
  
  const getRotation = () => {
    const { wall } = windowDoor;
    switch (wall) {
      case 'left':
        return [0, Math.PI / 2, 0];
      case 'right':
        return [0, -Math.PI / 2, 0];
      case 'back':
        return [0, Math.PI, 0];
      default:
        return [0, 0, 0];
    }
  };
  
  const getColor = () => {
    switch (windowDoor.type) {
      case 'sliding-glass':
        return '#87ceeb';
      case 'fixed-window':
        return '#add8e6';
      case 'entry-door':
        return '#8b4513';
      default:
        return '#cccccc';
    }
  };
  
  return (
    <group position={getPosition()} rotation={getRotation()}>
      <mesh>
        <boxGeometry args={[windowDoor.width, windowDoor.height, 0.2]} />
        <meshStandardMaterial
          color={getColor()}
          transparent={windowDoor.type.includes('window') || windowDoor.type.includes('glass')}
          opacity={windowDoor.type.includes('window') || windowDoor.type.includes('glass') ? 0.6 : 1}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
      
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(windowDoor.width, windowDoor.height, 0.2)]} />
        <lineBasicMaterial color="#000000" />
      </lineSegments>
    </group>
  );
};

export default WindowDoor;
