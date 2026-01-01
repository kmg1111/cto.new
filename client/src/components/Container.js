import React, { useRef } from 'react';
import * as THREE from 'three';
import useStore from '../store/useStore';
import WindowDoor from './WindowDoor';

const Container = ({ container }) => {
  const meshRef = useRef();
  const selectedContainer = useStore((state) => state.selectedContainer);
  const selectContainer = useStore((state) => state.selectContainer);
  const isSelected = selectedContainer === container.id;
  
  const containerWidth = 20;
  const containerHeight = 8.5;
  const containerDepth = 8;
  
  const handleClick = (e) => {
    e.stopPropagation();
    selectContainer(container.id);
  };
  
  return (
    <group position={container.position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[containerWidth, containerHeight, containerDepth]} />
        <meshStandardMaterial
          color={isSelected ? '#4a90e2' : '#c45911'}
          metalness={0.6}
          roughness={0.4}
          emissive={isSelected ? '#4a90e2' : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>
      
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(containerWidth, containerHeight, containerDepth)]} />
        <lineBasicMaterial color={isSelected ? '#ffffff' : '#333333'} linewidth={2} />
      </lineSegments>
      
      {container.windowsDoors && container.windowsDoors.map((wd) => (
        <WindowDoor
          key={wd.id}
          windowDoor={wd}
          containerId={container.id}
          containerDimensions={{ width: containerWidth, height: containerHeight, depth: containerDepth }}
        />
      ))}
    </group>
  );
};

export default Container;
