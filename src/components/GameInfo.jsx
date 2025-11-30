import React from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

const GameInfo = () => {
  const targetInfo = GAME_CONFIG.targets
    .map(t => `${t.required}x ${t.char}`)
    .join(' and ');
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ 
        color: '#8b4513', 
        margin: '10px 0', 
        fontSize: '2.5em',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        Kurdish Runner
      </h1>
      <div style={{ 
        color: '#654321', 
        marginBottom: '20px', 
        fontSize: '16px' 
      }}>
        Collect {targetInfo} to win!
      </div>
    </div>
  );
};

export default GameInfo;