import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TopControls } from '../../../components/controls/TopControls';

describe('TopControls', () => {
  const mockProps = {
    onReset: jest.fn(),
    onSolve: jest.fn(),
    onBackToHome: jest.fn(),
    isSolving: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all buttons', () => {
    render(<TopControls {...mockProps} />);
    
    expect(screen.getByText('SOLVE')).toBeInTheDocument();
    expect(screen.getByText('RESET')).toBeInTheDocument();
    expect(screen.getByText('BACK TO HOME')).toBeInTheDocument();
  });

  it('disables solve button when solving', () => {
    render(<TopControls {...mockProps} isSolving={true} />);
    
    expect(screen.getByText('SOLVING...')).toBeDisabled();
  });

  it('calls appropriate handlers when buttons are clicked', () => {
    render(<TopControls {...mockProps} />);
    
    fireEvent.click(screen.getByText('SOLVE'));
    expect(mockProps.onSolve).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('RESET'));
    expect(mockProps.onReset).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('BACK TO HOME'));
    expect(mockProps.onBackToHome).toHaveBeenCalledTimes(1);
  });
});
