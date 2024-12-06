// src/components/controls/UndoRedoControls.jsx
import React from 'react';

export function UndoRedoControls({ onUndo, onRedo, canUndo, canRedo }) {
  const buttonStyle = {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '120px',
    fontSize: '14px',
    margin: '5px'
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '90%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 1000
    }}>
      <button
        style={{
          ...buttonStyle,
          background: canUndo ? '#FF4444' : '#888888',
          cursor: canUndo ? 'pointer' : 'not-allowed'
        }}
        onClick={onUndo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        style={{
          ...buttonStyle,
          background: canRedo ? '#4CAF50' : '#888888',
          cursor: canRedo ? 'pointer' : 'not-allowed'
        }}
        onClick={onRedo}
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  );
}