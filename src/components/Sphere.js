import React from 'react';

export function Sphere({ position, color }) {
  return (
    <group position={position}>
      {/* Inner sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Outline sphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial 
          color="black"
          transparent
          opacity={0.2}
          side={2}
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>
    </group>
  );
}