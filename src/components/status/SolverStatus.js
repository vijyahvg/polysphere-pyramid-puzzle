import React from 'react';

export function SolverStatus({ progress, isVisible }) {
  if (!isVisible || !progress) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.9)',
      padding: '1.5rem',
      borderRadius: '8px',
      color: 'white',
      zIndex: 1000,
      minWidth: '250px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{ fontSize: '1.4em', fontWeight: 'bold', marginBottom: '8px' }}>
        Solutions Found: {progress.solutions || 0}
      </div>
      <div style={{ fontSize: '1.1em', color: '#aaa' }}>
        Attempts: {progress.attempts?.toLocaleString()}
      </div>
      <div style={{ fontSize: '1.1em', color: '#aaa' }}>
        Pieces Left: {progress.piecesLeft}
      </div>
      <div style={{
        marginTop: '8px',
        padding: '8px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
        fontSize: '1em',
        color: '#4CAF50'
      }}>
        Solving in progress...
      </div>
    </div>
  );
}