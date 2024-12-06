// src/__tests__/components/Sphere.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import { Sphere } from '../../components/Sphere';

describe('Sphere', () => {
  it('renders with position and color', () => {
    const { container } = render(
      <Sphere position={[0, 0, 0]} color="#FF0000" />
    );
    expect(container).toBeInTheDocument();
  });
});