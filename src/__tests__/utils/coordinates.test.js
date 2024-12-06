// src/__tests__/utils/coordinates.test.js
import { rotate90Degrees, flip, rotateHorizontal, normalizeCoordinates } 
  from '../../utils/coordinates';

describe('Coordinate Utils', () => {
  const testCoords = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

  describe('rotate90Degrees', () => {
    it('rotates coordinates 90 degrees', () => {
      const result = rotate90Degrees(testCoords);
      expect(result).toEqual([[0, 0, 1], [0, 1, 0], [0, 0, -1]]);
    });
  });

  describe('flip', () => {
    it('flips coordinates', () => {
      const result = flip(testCoords);
      expect(result).toEqual([[-1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    });
  });

  describe('rotateHorizontal', () => {
    it('rotates coordinates horizontally', () => {
      const result = rotateHorizontal(testCoords);
      expect(result).toEqual([[1, 0, 0], [0, 0, 0], [0, 0, 1]]);
    });
  });

  describe('normalizeCoordinates', () => {
    it('normalizes coordinates to minimum values', () => {
      const result = normalizeCoordinates([[2, 2, 2], [3, 3, 3]]);
      expect(result).toEqual([[0, 0, 0], [1, 1, 1]]);
    });
  });
});