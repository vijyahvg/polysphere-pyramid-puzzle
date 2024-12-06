import React from 'react';
import { render, screen } from '@testing-library/react';
import { SolutionCounter } from '../../../components/status/SolutionCounter';

describe('SolutionCounter', () => {
  it('renders nothing when not visible', () => {
    const { container } = render(
      <SolutionCounter isVisible={false} currentIndex={0} totalSolutions={5} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('displays solution count when visible', () => {
    render(
      <SolutionCounter isVisible={true} currentIndex={2} totalSolutions={5} />
    );
    expect(screen.getByText('Solution 3 of 5')).toBeInTheDocument();
  });
});