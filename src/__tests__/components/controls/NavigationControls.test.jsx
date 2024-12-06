// src/__tests__/components/controls/NavigationControls.test.jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { NavigationControls } from '../../../components/controls/NavigationControls';

describe('NavigationControls', () => {
  const mockOnMove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when not visible', () => {
    const { container } = render(
      <NavigationControls onMove={mockOnMove} visible={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders all direction buttons when visible', () => {
    render(<NavigationControls onMove={mockOnMove} visible={true} />);
    
    const buttons = ['FORWARD', 'BACK', 'LEFT', 'RIGHT', 'UP', 'DOWN'];
    buttons.forEach(direction => {
      expect(screen.getByText(direction)).toBeInTheDocument();
    });
  });

  it('calls onMove with correct direction for each button', () => {
    render(<NavigationControls onMove={mockOnMove} visible={true} />);
    
    const directions = [
      ['FORWARD', 'forward'],
      ['BACK', 'back'],
      ['LEFT', 'left'],
      ['RIGHT', 'right'],
      ['UP', 'up'],
      ['DOWN', 'down']
    ];

    directions.forEach(([buttonText, expectedDirection]) => {
      fireEvent.click(screen.getByText(buttonText));
      expect(mockOnMove).toHaveBeenCalledWith(expectedDirection);
    });
  });
});