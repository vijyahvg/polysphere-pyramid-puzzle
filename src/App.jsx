import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { solvePuzzle, getUnusedPieces } from './solver';
import { POLYSPHERE_PIECES } from './constants/pieces';
import { rotate90Degrees, flip } from './utils/coordinates';
import { usePyramidPositions } from './hooks/usePyramidPositions';

// Component imports
import HomePage from './components/HomePage';
import { Sphere } from './components/Sphere';
import { PieceViewer } from './components/PieceViewer';
import { TopControls } from './components/controls/TopControls';
import { NavigationControls } from './components/controls/NavigationControls';
import { RotationControls } from './components/controls/RotationControls';
import { UndoRedoControls } from './components/controls/UndoRedoControls';
import { SolverStatus } from './components/status/SolverStatus';
import { SolutionCounter } from './components/status/SolutionCounter';

function App() {
  // Game state management
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentPiece, setCurrentPiece] = useState(0);
  const [placedPieces, setPlacedPieces] = useState({});
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [activePiece, setActivePiece] = useState(null);
  const [usedPieces, setUsedPieces] = useState(new Set());
  const [rotations, setRotations] = useState({});
  const [placementHistory, setPlacementHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isSolving, setIsSolving] = useState(false);
  const [solverProgress, setSolverProgress] = useState(null);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [allSolutions, setAllSolutions] = useState([]);
  const [solutionsFound, setSolutionsFound] = useState(false);

  // Get pyramid positions using custom hook
  const pyramidPositions = usePyramidPositions();

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleBackToHome = () => {
    // Reset game state
    handleReset();
    // Navigate back to home
    setIsGameStarted(false);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
  
    const redoAction = redoStack[redoStack.length - 1];
    
    // Restore the piece
    setPlacedPieces(prev => ({
      ...prev,
      [redoAction.pieceId]: redoAction.pieceData
    }));
  
    // Add back to used pieces
    setUsedPieces(prev => new Set([...prev, redoAction.pieceType]));
  
    // Update history
    setPlacementHistory(prev => [...prev, {
      pieceId: redoAction.pieceId,
      pieceType: redoAction.pieceType
    }]);
  
    // Remove from redo stack
    setRedoStack(prev => prev.slice(0, -1));
  };
  
  const handleUndo = () => {
    if (placementHistory.length === 0) return;
  
    const lastAction = placementHistory[placementHistory.length - 1];
    
    // Save current state to redo stack before undoing
    setRedoStack(prev => [...prev, {
      pieceId: lastAction.pieceId,
      pieceType: lastAction.pieceType,
      pieceData: placedPieces[lastAction.pieceId]
    }]);
  
    // Remove the last placed piece
    setPlacedPieces(prev => {
      const newPieces = { ...prev };
      delete newPieces[lastAction.pieceId];
      return newPieces;
    });
  
    // Remove from used pieces
    setUsedPieces(prev => {
      const newUsed = new Set(prev);
      newUsed.delete(lastAction.pieceType);
      return newUsed;
    });
  
    // Update history
    setPlacementHistory(prev => prev.slice(0, -1));
    
    // Clear active piece if it was the undone piece
    if (activePiece === lastAction.pieceId) {
      setActivePiece(null);
    }
  };

  const handleMove = (direction) => {
    if (!activePiece || !placedPieces[activePiece]) return;

    setPlacedPieces(prev => {
      const piece = prev[activePiece];
      const newPosition = { ...piece.position };
      const moveStep = 0.8;

      switch (direction) {
        case 'forward':
        case 'back':
          const zStep = direction === 'forward' ? moveStep : -moveStep;
          newPosition.z = Math.round((newPosition.z + zStep) / moveStep) * moveStep;
          break;
        case 'left':
        case 'right':
          const xStep = direction === 'right' ? moveStep : -moveStep;
          newPosition.x = Math.round((newPosition.x + xStep) / moveStep) * moveStep;
          break;
        case 'up':
        case 'down':
          const yStep = direction === 'up' ? moveStep : -moveStep;
          newPosition.y = Math.round((newPosition.y + yStep) / moveStep) * moveStep;
          break;
        default:
          break;
      }


      // Validate position within pyramid bounds
      const layer = Math.round(newPosition.y / moveStep);
      const layerSize = 5 - layer;
      const maxOffset = (5 - layerSize) / 2 * moveStep;

      if (layer >= 0 && layer < 5) {
        newPosition.x = Math.max(maxOffset, Math.min((4 - maxOffset) * moveStep, newPosition.x));
        newPosition.z = Math.max(maxOffset, Math.min((4 - maxOffset) * moveStep, newPosition.z));
      }

      return {
        ...prev,
        [activePiece]: {
          ...piece,
          position: newPosition
        }
      };
    });
  };

// keyboard event handler for solution navigation
React.useEffect(() => {
  const handleKeyPress = (e) => {
    if (!solutionsFound || allSolutions.length === 0) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); // Prevent scrolling

      setCurrentSolutionIndex(prevIndex => {
        let nextIndex;
        if (e.key === 'ArrowRight') {
          nextIndex = (prevIndex + 1) % allSolutions.length;
        } else {
          nextIndex = prevIndex > 0 ? prevIndex - 1 : allSolutions.length - 1;
        }
        
        // Create a new solution that preserves manually placed pieces
        const newPlacedPieces = {
          ...placedPieces,  // Keep existing manually placed pieces
          ...allSolutions[nextIndex]  // Add solved pieces
        };

        // Update the pieces
        setPlacedPieces(newPlacedPieces);
        
        return nextIndex;
      });
    }
  };

  if (solutionsFound) {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }
}, [solutionsFound, allSolutions, placedPieces]); // Dependencies

  const handleSolve = async () => {
    setIsSolving(true);
    setSolverProgress(null);
    setAllSolutions([]);

    try {
      const unusedPieces = getUnusedPieces(usedPieces, POLYSPHERE_PIECES);
      const result = await solvePuzzle(
        placedPieces,
        unusedPieces,
        (progress) => {
          setSolverProgress(progress);
          if (progress.currentSolution) {
            setPlacedPieces(progress.currentSolution);
          }
        }
      );

      if (result && result.allSolutions.length > 0) {
        setAllSolutions(result.allSolutions);
        setCurrentSolutionIndex(0);
        setSolutionsFound(true);
        setPlacedPieces(result.allSolutions[0]);
      } else {
        alert('No solution found. Try different initial piece placements.');
      }
    } catch (error) {
      console.error('Solver error:', error);
    } finally {
      setIsSolving(false);
    }
  };

  const handleReset = () => {
    setPlacedPieces({});
    setActivePiece(null);
    setSelectedPiece(null);
    setCurrentPiece(0);
    setIsSolving(false);
    setSolverProgress(null);
    setSolutionsFound(false);
    setAllSolutions([]);
    setCurrentSolutionIndex(0);
    setUsedPieces(new Set());
    setRotations({});
    setPlacementHistory([]);
    setRedoStack([]);
  };

  const handleRotate = () => {
    if (!activePiece || !placedPieces[activePiece]) return;
    
    setPlacedPieces(prev => {
      const piece = prev[activePiece];
      const rotatedCoords = rotate90Degrees(piece.piece.spheres);
      
      return {
        ...prev,
        [activePiece]: {
          ...piece,
          piece: {
            ...piece.piece,
            spheres: rotatedCoords
          }
        }
      };
    });
  };

  const handleFlip = () => {
    if (!activePiece || !placedPieces[activePiece]) return;
    
    setPlacedPieces(prev => {
      const piece = prev[activePiece];
      const flippedCoords = flip(piece.piece.spheres);
      
      return {
        ...prev,
        [activePiece]: {
          ...piece,
          piece: {
            ...piece.piece,
            spheres: flippedCoords
          }
        }
      };
    });
  };

  const handlePieceSelect = () => {
    if (usedPieces.has(POLYSPHERE_PIECES[currentPiece].id)) {
      return;
    }

    const id = Date.now().toString();
    const piece = {
      ...POLYSPHERE_PIECES[currentPiece],
      spheres: POLYSPHERE_PIECES[currentPiece].spheres.map(([x, y, z]) => [x, 0, z])
    };

    setRedoStack([]);
    setPlacedPieces(prev => ({
      ...prev,
      [id]: {
        piece,
        position: { x: 0, y: 0, z: 0 }
      }
    }));
    
    setPlacementHistory(prev => [...prev, {
      pieceId: id,
      pieceType: POLYSPHERE_PIECES[currentPiece].id
    }]);

    setActivePiece(id);
    setSelectedPiece(currentPiece);
    setUsedPieces(prev => new Set([...prev, POLYSPHERE_PIECES[currentPiece].id]));
  };

  // If game hasn't started, show home page
  if (!isGameStarted) {
    return <HomePage onStartGame={handleStartGame} />;
  }

  // Game view
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', background: '#000000' }}>
      {/* Pieces Selection Side */}
      <div style={{ 
        width: '50%', 
        height: '100%', 
        position: 'relative', 
        borderRight: '1px solid #333333' 
      }}>
        <Canvas 
          style={{ background: '#000000' }} 
          camera={{ position: [6, 6, 10], fov: 50 }}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <group onClick={handlePieceSelect}>
            <PieceViewer 
              piece={POLYSPHERE_PIECES[currentPiece]}
              isUsed={usedPieces.has(POLYSPHERE_PIECES[currentPiece].id)}
            />
          </group>
          <OrbitControls />
        </Canvas>

        {/* Piece Navigation Controls */}
        <div style={{ 
          position: 'absolute', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          zIndex: 1000
        }}>
          <button 
            onClick={() => setCurrentPiece(prev => 
              prev > 0 ? prev - 1 : POLYSPHERE_PIECES.length - 1)}
            style={{
              padding: '0.5rem 2rem',
              background: '#ffffff',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPiece(prev => 
              (prev + 1) % POLYSPHERE_PIECES.length)}
            style={{
              padding: '0.5rem 2rem',
              background: '#ffffff',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Pyramid Building Side */}
      <div style={{ width: '100vw', height: '100vh', display: 'flex', background: '#000000' }}>
        <TopControls 
          onReset={handleReset}
          onSolve={handleSolve}
          isSolving={isSolving}
          onBackToHome={handleBackToHome} 
        />
        
        <SolutionCounter 
          isVisible={solutionsFound && allSolutions.length > 0}
          currentIndex={currentSolutionIndex} 
          totalSolutions={allSolutions.length}
        />

        <Canvas 
          style={{ background: '#000000' }} 
          camera={{ position: [8, 8, 8], fov: 50 }}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          
          {/* Pyramid Structure */}
          <group>
            {pyramidPositions.map((pos, i) => (
              <Sphere key={i} position={pos} color="#FFD700" />
            ))}
          </group>

          {/* Placed Pieces */}
          {Object.entries(placedPieces).map(([id, { piece, position }]) => (
            <group 
              key={id}
              position={[position.x, position.y, position.z]}
              rotation={[0, rotations[id]?.rotation * (Math.PI / 180) || 0, 0]}
              scale={[
                rotations[id]?.horizontal ? -1 : 1,
                rotations[id]?.vertical ? -1 : 1,
                1
              ]}
              onClick={() => setActivePiece(id)}
            >
              {piece.spheres.map((spherePos, idx) => (
                <Sphere
                  key={idx}
                  position={spherePos}
                  color={activePiece === id ? '#ffff00' : piece.color}
                />
              ))}
            </group>
          ))}
          <OrbitControls />
        </Canvas>

        {/* Game Controls */}
        <NavigationControls 
          onMove={handleMove}
          visible={activePiece !== null}
        />
        <RotationControls 
          onRotate={handleRotate}
          onFlip={handleFlip}
          visible={activePiece !== null}
        />
        <UndoRedoControls 
          onUndo={handleUndo}  
          onRedo={handleRedo}
          canUndo={placementHistory.length > 0}
          canRedo={redoStack.length > 0}
        />
        <SolverStatus 
          progress={solverProgress}
          isVisible={isSolving}
        />
      </div>
    </div>
  );
}

export default App;
