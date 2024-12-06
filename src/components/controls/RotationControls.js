import React from 'react';

export function RotationControls({ onRotate, onFlip, visible }) {
  if (!visible) return null;

  const buttonStyle = {
    padding: '8px 16px',
    background: 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '120px',
    fontSize: '14px',
    margin: '5px'
  };

  return (
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 1000
    }}>
      <button style={buttonStyle} onClick={onRotate}>Rotate</button>
      <button style={buttonStyle} onClick={onFlip}>Flip</button>
    </div>
  );
}