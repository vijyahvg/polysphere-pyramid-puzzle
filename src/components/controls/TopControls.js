import React from 'react';

export function TopControls({ onReset, onSolve, isSolving, onBackToHome }) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px',
      zIndex: 1000
    }}>
      <button style={{
        padding: '8px 24px',
        background: '#4a90e2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: isSolving ? 'not-allowed' : 'pointer',
        opacity: isSolving ? 0.7 : 1
      }} 
      onClick={onSolve}
      disabled={isSolving}
      >
        {isSolving ? 'SOLVING...' : 'SOLVE'}
      </button>
      <button style={{
        padding: '8px 24px',
        background: '#F44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }} onClick={onReset}>
        RESET
      </button>
      <button style={{
        padding: '8px 24px',
        background: '#333333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px'
      }} onClick={onBackToHome}>
        BACK TO HOME
      </button>
    </div>
  );
}