// src/__tests__/solver.test.js
import { solvePuzzle, getUnusedPieces } from '../solver';
import { POLYSPHERE_PIECES } from '../constants/pieces';

describe('Solver', () => {
  describe('getUnusedPieces', () => {
    it('returns all pieces when none are used', () => {
      const usedPieces = new Set();
      const result = getUnusedPieces(usedPieces, POLYSPHERE_PIECES);
      expect(result).toHaveLength(POLYSPHERE_PIECES.length);
    });

    it('excludes used pieces', () => {
      const usedPieces = new Set(['A', 'B']);
      const result = getUnusedPieces(usedPieces, POLYSPHERE_PIECES);
      expect(result).toHaveLength(POLYSPHERE_PIECES.length - 2);
      expect(result.find(p => p.id === 'A')).toBeUndefined();
      expect(result.find(p => p.id === 'B')).toBeUndefined();
    });
  });

  describe('solvePuzzle', () => {
    it('calls progress callback during solving', async () => {
      const mockCallback = jest.fn();
      const placedPieces = {};
      const unusedPieces = POLYSPHERE_PIECES.slice(0, 2);

      await solvePuzzle(placedPieces, unusedPieces, mockCallback);
      expect(mockCallback).toHaveBeenCalled();
    });
  });
});