// Game Configuration - Easy to modify!
export const GAME_CONFIG = {
  // Canvas dimensions - HORIZONTAL layout
  canvas: {
    width: 800,
    height: 480
  },
  
  // Collectible targets - Change these to modify goals
  targets: [
    { char: 'و', required: 100, color: '#4A90E2', count: 0 },
    { char: 'م', required: 100, color: '#7ED321', count: 0 }
  ],
  
  // Distractor characters
  distractors: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د'],
  
  // Gameplay settings - HORIZONTAL movement
  gameplay: {
    scrollSpeed: 5,
    spawnInterval: 1200,
    targetSpawnChance: 0.6,
    laneWidth: 120,
    lanePositions: [120, 240, 360]  // Y positions for horizontal lanes
  },
  
  // Player settings - HORIZONTAL (left side)
  player: {
    startLane: 1,
    xPosition: 100,  // Player stays on left side
    width: 40,
    height: 60,
    groundY: 360,    // Y position where player stands on ground
    jumpForce: -15,  // Initial upward velocity when jumping
    gravity: 0.8,    // Gravity force pulling player down
    yVelocity: 0,    // Current vertical velocity
    isJumping: false // Whether player is currently jumping
  },
  
  // Visual settings
  colors: {
    background: '#c9a86a',
    ground: '#a88c5c',
    rock: '#696969',
    playerBody: '#8B4513',
    playerSkin: '#FFDCAC',
    distractor: '#666666'
  }
};