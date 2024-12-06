import React from 'react';

export function NavigationControls({ onMove, visible }) {
  if (!visible) return null;

  const buttonStyle = {
    padding: '8px 16px',
    background: 'white',
    color: 'black',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '120px',
    fontSize: '14px'
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <button style={buttonStyle} onClick={() => onMove('forward')}>FORWARD</button>
      <button style={buttonStyle} onClick={() => onMove('back')}>BACK</button>
      <button style={buttonStyle} onClick={() => onMove('left')}>LEFT</button>
      <button style={buttonStyle} onClick={() => onMove('right')}>RIGHT</button>
      <button style={buttonStyle} onClick={() => onMove('up')}>UP</button>
      <button style={buttonStyle} onClick={() => onMove('down')}>DOWN</button>
    </div>
  );
}