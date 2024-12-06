// src/__tests__/components/controls/UndoRedoControls.test.jsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { UndoRedoControls } from '../../../components/controls/UndoRedoControls';

describe('UndoRedoControls', () => {
  const mockProps = {
    onUndo: jest.fn(),
    onRedo: jest.fn(),
    canUndo: true,
    canRedo: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders undo and redo buttons', () => {
    render(<UndoRedoControls {...mockProps} />);
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Redo')).toBeInTheDocument();
  });

  it('disables buttons when actions are not available', () => {
    render(<UndoRedoControls {...mockProps} canUndo={false} canRedo={false} />);
    expect(screen.getByText('Undo')).toBeDisabled();
    expect(screen.getByText('Redo')).toBeDisabled();
  });

  it('calls handlers when buttons are clicked', () => {
    render(<UndoRedoControls {...mockProps} />);
    
    fireEvent.click(screen.getByText('Undo'));
    expect(mockProps.onUndo).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Redo'));
    expect(mockProps.onRedo).toHaveBeenCalledTimes(1);
  });
});