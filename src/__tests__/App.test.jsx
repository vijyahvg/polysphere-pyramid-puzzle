// src/__tests__/App.test.jsx
import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import App from '../App';
import { solvePuzzle, getUnusedPieces } from '../solver';

// Mocks
jest.mock('../solver', () => ({
  solvePuzzle: jest.fn(),
  getUnusedPieces: jest.fn(() => [])
}));

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children, onClick, ...props }) => (
    <div data-testid="canvas" onClick={onClick} {...props}>
      {children}
      <button>Canvas Click Simulation</button>
    </div>
  )
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    solvePuzzle.mockResolvedValue({
      success: true,
      allSolutions: [{ piece1: { piece: { spheres: [[0, 0, 0]] }, position: { x: 0, y: 0, z: 0 } } }]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Game State Management', () => {
    it('initializes with correct default state', () => {
      render(<App />);
      expect(screen.getByText('PYRAMID PUZZLE')).toBeInTheDocument();
    });

    it('transitions to game view when start button is clicked', () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start game/i });
      fireEvent.click(startButton);
      expect(screen.getAllByTestId('canvas')).toHaveLength(2);
    });
  });

  describe('Puzzle Solving', () => {
    it('handles successful solve', async () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start game/i });
      fireEvent.click(startButton);

      await act(async () => {
        fireEvent.click(screen.getByText('SOLVE'));
      });

      expect(solvePuzzle).toHaveBeenCalled();
    });

    it('handles solve with no solutions', async () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start game/i });
      fireEvent.click(startButton);

      solvePuzzle.mockResolvedValueOnce({ allSolutions: [], success: false });
      const alertMock = jest.spyOn(window, 'alert').mockImplementation();

      await act(async () => {
        fireEvent.click(screen.getByText('SOLVE'));
      });

      expect(alertMock).toHaveBeenCalled();
      alertMock.mockRestore();
    });

    it('handles solver error', async () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start game/i });
      fireEvent.click(startButton);

      solvePuzzle.mockRejectedValueOnce(new Error('Solver failed'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await act(async () => {
        fireEvent.click(screen.getByText('SOLVE'));
      });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Piece Management', () => {
    beforeEach(async () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start game/i });
      fireEvent.click(startButton);
    });

    it('handles piece selection and movement', () => {
      const canvas = screen.getAllByTestId('canvas')[0];
      fireEvent.click(canvas.querySelector('button'));

      ['FORWARD', 'BACK', 'LEFT', 'RIGHT', 'UP', 'DOWN'].forEach(direction => {
        const button = screen.getByText(direction);
        fireEvent.click(button);
      });
    });

    it('handles piece rotation and flipping', () => {
      const canvas = screen.getAllByTestId('canvas')[0];
      fireEvent.click(canvas.querySelector('button'));

      fireEvent.click(screen.getByText('Rotate'));
      fireEvent.click(screen.getByText('Flip'));
    });
  });

  describe('Solution Navigation', () => {
    it('handles keyboard navigation between solutions', async () => {
      render(<App />);
      const startButton = screen.getByRole('button', { name: /start game/i });
      fireEvent.click(startButton);

      solvePuzzle.mockResolvedValueOnce({
        success: true,
        allSolutions: [
          { piece1: { position: { x: 0, y: 0, z: 0 } } },
          { piece2: { position: { x: 1, y: 1, z: 1 } } }
        ]
      });

      await act(async () => {
        fireEvent.click(screen.getByText('SOLVE'));
      });

      fireEvent.keyDown(window, { key: 'ArrowRight' });
      fireEvent.keyDown(window, { key: 'ArrowLeft' });
    });
  });

  // Add cleanup
  afterAll(() => {
    jest.resetAllMocks();
  });
});