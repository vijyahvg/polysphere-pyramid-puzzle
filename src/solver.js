// solver.js
const PYRAMID_LAYERS = [
    { y: 0, size: 5 }, // Bottom layer (5x5)
    { y: 1, size: 4 }, // Layer 1 (4x4)
    { y: 2, size: 3 }, // Layer 2 (3x3)
    { y: 3, size: 2 }, // Layer 3 (2x2)
    { y: 4, size: 1 }  // Top layer (1x1)
  ];
  
  // Cache for piece orientations
  const orientationsCache = new Map();
  
  const toFloat = (value) => {
    return parseFloat(Number(value).toFixed(1));
  };
  
  const normalizeCoords = (coords) => {
    const minX = Math.min(...coords.map(([x]) => x));
    const minY = Math.min(...coords.map(([_, y]) => y));
    const minZ = Math.min(...coords.map(([__, ___, z]) => z));
    return coords.map(([x, y, z]) => [
      toFloat(x - minX),
      toFloat(y - minY),
      toFloat(z - minZ)
    ]);
  };
  
  const coordsToString = (coords) => {
    return normalizeCoords(coords)
      .sort(([x1, y1, z1], [x2, y2, z2]) => x1 - x2 || y1 - y2 || z1 - z2)
      .map(coord => coord.join(','))
      .join('|');
  };
  
  const getAllOrientations = (piece) => {
    if (piece.spheres.length === 1) return [piece];
  
    const cacheKey = coordsToString(piece.spheres);
    if (orientationsCache.has(cacheKey)) {
      return orientationsCache.get(cacheKey);
    }
  
    const orientations = new Set();
    let current = [...piece.spheres];
  
    // Try all rotations and flips
    for (let flip = 0; flip < 2; flip++) {
      for (let rot = 0; rot < 4; rot++) {
        orientations.add(coordsToString(current));
        // Rotate 90 degrees around Y axis
        current = current.map(([x, y, z]) => [toFloat(-z), y, toFloat(x)]);
      }
      // Flip horizontally
      current = current.map(([x, y, z]) => [toFloat(-x), y, z]);
    }
  
    const result = Array.from(orientations).map(str => ({
      ...piece,
      spheres: str.split('|').map(coord => coord.split(',').map(Number))
    }));
  
    orientationsCache.set(cacheKey, result);
    return result;
  };
  
  const createPyramidGrid = () => {
    const grid = new Set();
    PYRAMID_LAYERS.forEach(layer => {
      const offset = (5 - layer.size) / 2;
      for (let x = 0; x < layer.size; x++) {
        for (let z = 0; z < layer.size; z++) {
          const gridX = toFloat((offset + x) * 0.8);
          const gridY = toFloat(layer.y * 0.8);
          const gridZ = toFloat((offset + z) * 0.8);
          grid.add(`${gridX},${gridY},${gridZ}`);
        }
      }
    });
    return grid;
  };
  
  const doesPieceFit = (piece, position, occupiedPositions, pyramidGrid) => {
    for (const [dx, dy, dz] of piece.spheres) {
      const x = toFloat(position.x + dx);
      const y = toFloat(position.y + dy);
      const z = toFloat(position.z + dz);
      const posKey = `${x},${y},${z}`;
      
      if (!pyramidGrid.has(posKey) || occupiedPositions.has(posKey)) {
        return false;
      }
    }
    return true;
  };
  
  const findEmptyPosition = (pyramidGrid, occupiedPositions) => {
    for (const pos of pyramidGrid) {
      if (!occupiedPositions.has(pos)) {
        const [x, y, z] = pos.split(',').map(Number);
        return { x, y, z };
      }
    }
    return null;
  };
  
  const findAllSolutions = async (placedPieces, unusedPieces, onProgress, onSolutionFound) => {
    const pyramidGrid = createPyramidGrid();
    const allSolutions = [];
    let attempts = 0;
    
    const solve = async (solution, pieces, occupied) => {
      attempts++;
      
      if (attempts % 1000 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
        onProgress?.({
          attempts,
          piecesLeft: pieces.length,
          occupiedPositions: occupied.size,
          totalPositions: pyramidGrid.size,
          solutions: allSolutions.length
        });
      }
  
      if (pieces.length === 0) {
        const newSolution = JSON.parse(JSON.stringify(solution));
        allSolutions.push(newSolution);
        console.log('Found solution:', allSolutions.length);
        // Call callback with the new solution immediately
        onSolutionFound?.(newSolution, allSolutions.length - 1);
        return;
      }
  
      const emptyPos = findEmptyPosition(pyramidGrid, occupied);
      if (!emptyPos) return;
  
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const orientations = getAllOrientations(piece);
  
        for (const orientation of orientations) {
          if (doesPieceFit(orientation, emptyPos, occupied, pyramidGrid)) {
            const id = `${piece.id}_${attempts}`;
            solution[id] = { 
              piece: { ...orientation, id: piece.id, color: piece.color }, 
              position: emptyPos 
            };
  
            const newOccupied = new Set(occupied);
            orientation.spheres.forEach(([dx, dy, dz]) => {
              const posKey = `${toFloat(emptyPos.x + dx)},${toFloat(emptyPos.y + dy)},${toFloat(emptyPos.z + dz)}`;
              newOccupied.add(posKey);
            });
  
            const remainingPieces = [...pieces.slice(0, i), ...pieces.slice(i + 1)];
            await solve(solution, remainingPieces, newOccupied);
  
            delete solution[id];
          }
        }
      }
    };
  
    try {
      const initialOccupied = new Set();
      const initialSolution = { ...placedPieces };
  
      // Process placed pieces
      Object.values(placedPieces).forEach(({ piece, position }) => {
        piece.spheres.forEach(([dx, dy, dz]) => {
          const posKey = `${toFloat(position.x + dx)},${toFloat(position.y + dy)},${toFloat(position.z + dz)}`;
          initialOccupied.add(posKey);
        });
      });
  
      // Sort pieces by size (largest first)
      const sortedPieces = [...unusedPieces].sort((a, b) => b.spheres.length - a.spheres.length);
  
      await solve(initialSolution, sortedPieces, initialOccupied);
      return allSolutions;
    } catch (error) {
      console.error('Solver error:', error);
      return allSolutions;
    }
  };

  const solvePuzzle = async (placedPieces, unusedPieces, onProgress) => {
  return new Promise((resolve) => {
    let solutions = [];
    let attempts = 0;
    const pyramidGrid = createPyramidGrid();

    const handleSolutionFound = (solution, index) => {
      solutions.push(solution);
      // Call onProgress with updated solution count
      onProgress?.({
        attempts: attempts,
        piecesLeft: 0,
        occupiedPositions: pyramidGrid.size,
        totalPositions: pyramidGrid.size,
        solutions: solutions.length,
        currentSolution: solution  // Add the current solution to progress
      });
    };

    findAllSolutions(
      placedPieces, 
      unusedPieces, 
      (progress) => {
        attempts = progress.attempts; // Update attempts count
        onProgress?.(progress);
      }, 
      handleSolutionFound
    )
    .then(() => {
      resolve({
        currentSolution: solutions[0] || null,
        allSolutions: solutions,
        totalSolutions: solutions.length
      });
    });
  });
};
  
  const getUnusedPieces = (usedPieceIds, allPieces) => 
    allPieces.filter(piece => !usedPieceIds.has(piece.id));
  
  export {
    PYRAMID_LAYERS,
    solvePuzzle,
    getUnusedPieces
  };