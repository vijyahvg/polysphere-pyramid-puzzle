import React from 'react';

export function SolutionCounter({ isVisible, currentIndex, totalSolutions }) {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '140px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.8)',
      padding: '1rem',
      borderRadius: '4px',
      color: 'white',
      zIndex: 1000,
      textAlign: 'center'
    }}>
      <div>Solution {currentIndex + 1} of {totalSolutions}</div>
      <div style={{ fontSize: '0.8em', marginTop: '0.5em' }}>
        Use ← → arrow keys to cycle through solutions
      </div>
    </div>
  );
}