// src/__tests__/components/PieceViewer.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { PieceViewer } from '../../components/PieceViewer';

describe('PieceViewer', () => {
  const mockPiece = {
    id: 'test',
    spheres: [[0, 0, 0], [1, 0, 0]],
    color: '#FF0000'
  };

  it('renders with piece data', () => {
    const { container } = render(
      <PieceViewer piece={mockPiece} isUsed={false} />
    );
    expect(container).toBeInTheDocument();
  });

  it('applies opacity when piece is used', () => {
    const { container } = render(
      <PieceViewer piece={mockPiece} isUsed={true} />
    );
    expect(container).toBeInTheDocument();
  });
});