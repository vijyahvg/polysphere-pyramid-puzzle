import React from 'react';
import { render, screen } from '@testing-library/react';
import { SolverStatus } from '../../../components/status/SolverStatus';

describe('SolverStatus', () => {
  const mockProgress = {
    solutions: 2,
    attempts: 1000,
    piecesLeft: 3
  };

  it('renders nothing when not visible', () => {
    const { container } = render(
      <SolverStatus isVisible={false} progress={mockProgress} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('displays solver progress when visible', () => {
    render(
      <SolverStatus isVisible={true} progress={mockProgress} />
    );
    expect(screen.getByText('Solutions Found: 2')).toBeInTheDocument();
    expect(screen.getByText('Attempts: 1,000')).toBeInTheDocument();
    expect(screen.getByText('Pieces Left: 3')).toBeInTheDocument();
  });
});