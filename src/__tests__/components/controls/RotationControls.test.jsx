import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RotationControls } from '../../../components/controls/RotationControls';

describe('RotationControls', () => {
  const mockProps = {
    onRotate: jest.fn(),
    onFlip: jest.fn(),
    visible: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when not visible', () => {
    const { container } = render(
      <RotationControls {...mockProps} visible={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders rotation and flip buttons when visible', () => {
    render(<RotationControls {...mockProps} />);
    
    expect(screen.getByText('Rotate')).toBeInTheDocument();
    expect(screen.getByText('Flip')).toBeInTheDocument();
  });

  it('calls handlers when buttons are clicked', () => {
    render(<RotationControls {...mockProps} />);
    
    fireEvent.click(screen.getByText('Rotate'));
    expect(mockProps.onRotate).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Flip'));
    expect(mockProps.onFlip).toHaveBeenCalledTimes(1);
  });
});
