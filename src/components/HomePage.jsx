import React from 'react';

const HomePage = ({ onStartGame }) => {
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(45deg, #000000, #1a1a2e)',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    contentWrapper: {
      maxWidth: '800px',
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2.5rem',
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(10px)',
      padding: '3rem',
      borderRadius: '20px',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
    },
    title: {
      fontSize: '4.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #4a90e2, #87ceeb)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      margin: 0,
      letterSpacing: '2px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
    subtitle: {
      fontSize: '1.6rem',
      color: '#87ceeb',
      textAlign: 'center',
      margin: '-1rem 0 1rem 0',
      fontWeight: '300',
    },
    startButton: {
      padding: '1.2rem 3.5rem',
      fontSize: '1.4rem',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)',
    },
    howToPlayContainer: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '2rem',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    howToPlayTitle: {
      fontSize: '2rem',
      marginBottom: '1.5rem',
      color: '#4a90e2',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.2rem',
      color: '#e0e0e0',
      padding: '0.5rem',
      transition: 'transform 0.3s ease',
    },
    bullet: {
      width: '10px',
      height: '10px',
      backgroundColor: '#4a90e2',
      borderRadius: '50%',
      marginRight: '1rem',
      boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)',
    },
    footer: {
      marginTop: '1.5rem',
      color: '#87ceeb',
      fontSize: '1rem',
      textAlign: 'center',
      fontStyle: 'italic',
    }
  };

  const buttonHoverEffect = (e) => {
    const btn = e.target;
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = '0 6px 20px rgba(74, 144, 226, 0.4)';
    btn.style.backgroundColor = '#357abd';
  };

  const buttonLeaveEffect = (e) => {
    const btn = e.target;
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 4px 15px rgba(74, 144, 226, 0.3)';
    btn.style.backgroundColor = '#4a90e2';
  };

  const listItemHoverEffect = (e) => {
    e.target.style.transform = 'translateX(10px)';
  };

  const listItemLeaveEffect = (e) => {
    e.target.style.transform = 'translateX(0)';
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div>
          <h1 style={styles.title}>PYRAMID PUZZLE</h1>
          <p style={styles.subtitle}>A 3D Challenge of Strategy and Spatial Thinking</p>
        </div>
        
        <button 
          style={styles.startButton} 
          onClick={onStartGame}
          onMouseEnter={buttonHoverEffect}
          onMouseLeave={buttonLeaveEffect}
        >
          Start Game
        </button>

        <div style={styles.howToPlayContainer}>
          <h2 style={styles.howToPlayTitle}>How to Play</h2>
          <ul style={styles.list}>
            {[
              'Select and place pieces to build a pyramid',
              'Rotate and flip pieces to fit them perfectly',
              'Use navigation controls to position pieces',
              'Complete the pyramid using all pieces'
            ].map((text, index) => (
              <li 
                key={index} 
                style={styles.listItem}
                onMouseEnter={listItemHoverEffect}
                onMouseLeave={listItemLeaveEffect}
              >
                <span style={styles.bullet}></span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p style={styles.footer}>
          Press ESC key anytime during the game to restart
        </p>
      </div>
    </div>
  );
};

export default HomePage;