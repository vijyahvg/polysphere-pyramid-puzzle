export const rotate90Degrees = (coords) => {
    return coords.map(([x, y, z]) => [-z, y, x]);
  };
  
  export const flip = (coords) => {
    return coords.map(([x, y, z]) => [-x, y, z]);
  };
  
  export const rotateHorizontal = (coords) => {
    return coords.map(([x, y, z]) => [x, 0, z]);
  };
  
  export const normalizeCoordinates = (coords) => {
    const minX = Math.min(...coords.map(([x]) => x));
    const minY = Math.min(...coords.map(([_, y]) => y));
    const minZ = Math.min(...coords.map(([__, ___, z]) => z));
    
    return coords.map(([x, y, z]) => [
      x - minX,
      y - minY,
      z - minZ
    ]);
  };