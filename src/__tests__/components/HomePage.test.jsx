// src/__tests__/components/HomePage.test.jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HomePage from '../../components/HomePage';

describe('HomePage', () => {
  const mockOnStartGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all main components', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      
      // Check title and subtitle
      expect(screen.getByText('PYRAMID PUZZLE')).toBeInTheDocument();
      expect(screen.getByText('A 3D Challenge of Strategy and Spatial Thinking')).toBeInTheDocument();
      
      // Check button
      expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
      
      // Check How to Play section
      expect(screen.getByText('How to Play')).toBeInTheDocument();
      
      // Check footer
      expect(screen.getByText(/Press ESC key/)).toBeInTheDocument();
    });

    it('renders all instruction items', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      
      const instructions = [
        'Select and place pieces to build a pyramid',
        'Rotate and flip pieces to fit them perfectly',
        'Use navigation controls to position pieces',
        'Complete the pyramid using all pieces'
      ];

      instructions.forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });
  });

  describe('Button Interactions', () => {
    it('calls onStartGame when button is clicked', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
      expect(mockOnStartGame).toHaveBeenCalledTimes(1);
    });

    it('applies hover effects to start button', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      const button = screen.getByRole('button', { name: /start game/i });
      
      // Test mouseEnter
      fireEvent.mouseEnter(button);
      expect(button).toHaveStyle({
        transform: 'scale(1.05)',
        boxShadow: '0 6px 20px rgba(74, 144, 226, 0.4)',
        backgroundColor: '#357abd'
      });

      // Test mouseLeave
      fireEvent.mouseLeave(button);
      expect(button).toHaveStyle({
        transform: 'scale(1)',
        boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
        backgroundColor: '#4a90e2'
      });
    });
  });

  describe('List Item Interactions', () => {
    it('applies hover effects to list items', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      const listItem = screen.getByText('Select and place pieces to build a pyramid');
      
      // Test mouseEnter
      fireEvent.mouseEnter(listItem);
      expect(listItem).toHaveStyle({
        transform: 'translateX(10px)'
      });

      // Test mouseLeave
      fireEvent.mouseLeave(listItem);
      expect(listItem).toHaveStyle({
        transform: 'translateX(0)'
      });
    });

    it('applies hover effects to all list items', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      
      const instructions = [
        'Select and place pieces to build a pyramid',
        'Rotate and flip pieces to fit them perfectly',
        'Use navigation controls to position pieces',
        'Complete the pyramid using all pieces'
      ];

      instructions.forEach(text => {
        const listItem = screen.getByText(text);
        
        fireEvent.mouseEnter(listItem);
        expect(listItem).toHaveStyle({
          transform: 'translateX(10px)'
        });

        fireEvent.mouseLeave(listItem);
        expect(listItem).toHaveStyle({
          transform: 'translateX(0)'
        });
      });
    });
  });

  describe('Styles and Layout', () => {
    it('applies correct styles to main containers', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      
      const container = screen.getByText('PYRAMID PUZZLE').closest('div');
      expect(container).toHaveStyle({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      });
    });

    it('applies correct styles to title and subtitle', () => {
      render(<HomePage onStartGame={mockOnStartGame} />);
      
      const title = screen.getByText('PYRAMID PUZZLE');
      expect(title).toHaveStyle({
        fontSize: '4.5rem',
        fontWeight: 'bold',
        textAlign: 'center'
      });

      const subtitle = screen.getByText('A 3D Challenge of Strategy and Spatial Thinking');
      expect(subtitle).toHaveStyle({
        fontSize: '1.6rem',
        color: '#87ceeb'
      });
    });
  });
});