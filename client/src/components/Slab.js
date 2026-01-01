import React from 'react';
import useStore from '../store/useStore';

const Slab = () => {
  const slabDimensions = useStore((state) => state.slabDimensions);
  
  return (
    <mesh position={[0, -4.5, 0]} receiveShadow>
      <boxGeometry args={[slabDimensions.width, 0.5, slabDimensions.depth]} />
      <meshStandardMaterial
        color="#808080"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

export default Slab;
