export const POLYSPHERE_PIECES = [
    {
      id: 'A',  // First L-shape (7 spheres) - Red - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0], [1.6, 0, 0],
        [0, 0, 0.8],
        [0, 0, 1.6],
        [0, 0, 2.4],
        [0, 0, 3.2]
      ],
      color: '#FF0000'
    },
    {
      id: 'B',  // Rectangle (6 spheres) - Blue - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0], [1.6, 0, 0],
        [0, 0, 0.8], [0.8, 0, 0.8], [1.6, 0, 0.8]
      ],
      color: '#0000FF'
    },
    {
      id: 'C',  // Small L-shape (5 spheres) - Green - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0], [1.6, 0, 0],
        [0, 0, 0.8],
        [0, 0, 1.6]
      ],
      color: '#00FF00'
    },
    {
      id: 'D',  // Second L-shape (7 spheres) - Purple - FIXED
      spheres: [
        [0, 0, 0], [0.8, 0, 0],           // Top row
        [0, 0, 0.8],                       // Changed coordinate
        [0, 0, 1.6],                     
        [0, 0, 2.4],                     
        [0, 0, 3.2],
        [0.8, 0, 3.2]                      // Bottom right instead of overlapping
      ],
      color: '#800080'
    },
    {
      id: 'E',  // Square shape (4 spheres) - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0],
        [0, 0, 0.8], [0.8, 0, 0.8]
      ],
      color: '#FFA500'
    },
    {
      id: 'F',  // Z shape (5 spheres) - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0],
        [0.8, 0, 0.8],
        [0.8, 0, 1.6], [1.6, 0, 1.6]
      ],
      color: '#FFFF00'
    },
    {
      id: 'G',  // U shape (7 spheres) - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0], [1.6, 0, 0], [2.4, 0, 0],
        [0, 0, 0.8],
        [0, 0, 1.6],
        [2.4, 0, 0.8]
      ],
      color: '#FF69B4'
    },
    {
      id: 'H',  // T shape (5 spheres) - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0], [1.6, 0, 0],
        [0.8, 0, 0.8],
        [0.8, 0, 1.6]
      ],
      color: '#00FFFF'
    },
    {
      id: 'I',  // Line (2 spheres) - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0]
      ],
      color: '#8B4513'
    },
    {
      id: 'J',  // Line (2 spheres) - OK
      spheres: [
        [0, 0, 0], [0.8, 0, 0]
      ],
      color: '#4B0082'
    },
    {
      id: 'K',  // Bridge piece (4 spheres) - Fixed comment
      spheres: [
        [0, 0, 0], [0.8, 0, 0],
        [0, 0, 0.8], [0.8, 0, 0.8]
      ],
      color: '#32CD32'
    },
    {
      id: 'L',  // Top piece (1 sphere) - OK
      spheres: [
        [0, 0, 0]
      ],
      color: '#FF4500'
    }
  ];