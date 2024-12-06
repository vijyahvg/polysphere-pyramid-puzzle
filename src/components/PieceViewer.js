import React from 'react';

export function PieceViewer({ piece, isUsed }) {
  const materialProps = isUsed ? {
    opacity: 0.3,
    transparent: true,
  } : {};

  return (
    <group>
      {piece.spheres.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial 
            color={piece.color}
            metalness={0.8}
            roughness={0.1}
            emissive={piece.color}
            emissiveIntensity={0.2}
            {...materialProps}
          />
        </mesh>
      ))}
    </group>
  );
}