import React, { useState, useEffect, useCallback } from 'react';
import Canvas from './Canvas';
import GameInfo from './GameInfo';
import { GAME_CONFIG } from '../config/gameConfig';
import { 
  createInitialState, 
  movePlayerUp, 
  movePlayerDown,
  updatePlayerPosition,
  updateCollectibles,
  updateRocks,
  updateGround,
  checkWinCondition
} from '../utils/gameState';
import { spawnCollectible } from '../utils/spawner';
import { checkCollisions } from '../utils/collision';

const Game = () => {
  const [gameState, setGameState] = useState(createInitialState());
  
  // Handle keyboard input - UP/DOWN arrows for horizontal game
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setGameState(prevState => movePlayerUp({ ...prevState }));
      } else if (e.key === 'ArrowDown') {
        setGameState(prevState => movePlayerDown({ ...prevState }));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Handle canvas click - Top/Bottom for horizontal game
  const handleCanvasClick = useCallback((e) => {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (gameState.isGameComplete) {
      // Check if clicked restart button
      if (x > 300 && x < 500 && y > 280 && y < 330) {
        setGameState(createInitialState());
      }
      return;
    }
    
    // Move player based on click position (top/bottom half)
    if (y < GAME_CONFIG.canvas.height / 2) {
      setGameState(prevState => movePlayerUp({ ...prevState }));
    } else {
      setGameState(prevState => movePlayerDown({ ...prevState }));
    }
  }, [gameState.isGameComplete]);
  
  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      setGameState(prevState => {
        if (prevState.isGameComplete) return prevState;
        
        let newState = { ...prevState };
        const now = Date.now();
        
        // Spawn collectibles
        if (now - newState.lastSpawnTime > GAME_CONFIG.gameplay.spawnInterval) {
          newState = spawnCollectible(newState);
          newState.lastSpawnTime = now;
        }
        
        // Update game objects
        newState = updatePlayerPosition(newState);
        newState = updateCollectibles(newState);
        newState = updateRocks(newState);
        newState = updateGround(newState);
        
        // Check collisions
        newState = checkCollisions(newState);
        
        // Check win condition
        newState = checkWinCondition(newState);
        
        return newState;
      });
    };
    
    const intervalId = setInterval(gameLoop, 1000 / 60); // 60 FPS
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f5deb3, #d2b48c)',
      padding: '20px'
    }}>
      <GameInfo />
      <Canvas gameState={gameState} onCanvasClick={handleCanvasClick} />
      <div style={{ 
        marginTop: '15px', 
        color: '#654321', 
        fontSize: '14px',
        textAlign: 'center'
      }}>
        Use Arrow Keys (↑ ↓) or Click Top/Bottom to move between lanes
      </div>
    </div>
  );
};

export default Game;