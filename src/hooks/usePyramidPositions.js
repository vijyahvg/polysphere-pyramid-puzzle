import { useMemo } from 'react';

export function usePyramidPositions() {
  return useMemo(() => {
    const createLayer = (size, yOffset) => {
      const spheres = [];
      const offset = (5 - size) / 2;
      
      for(let x = 0; x < size; x++) {
        for(let z = 0; z < size; z++) {
          spheres.push([
            (x + offset) * 0.8,
            yOffset * 0.8,
            (z + offset) * 0.8
          ]);
        }
      }
      return spheres;
    };

    return [
      ...createLayer(5, 0),  // Base layer (5x5)
      ...createLayer(4, 1),  // Second layer (4x4)
      ...createLayer(3, 2),  // Third layer (3x3)
      ...createLayer(2, 3),  // Fourth layer (2x2)
      ...createLayer(1, 4)   // Top layer (1x1)
    ];
  }, []);
}