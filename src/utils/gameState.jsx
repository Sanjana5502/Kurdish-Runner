import { GAME_CONFIG } from '../config/gameConfig';

export function createInitialState() {
  return {
    player: {
      currentLane: GAME_CONFIG.player.startLane,
      y: GAME_CONFIG.gameplay.lanePositions[GAME_CONFIG.player.startLane],
      targetY: GAME_CONFIG.gameplay.lanePositions[GAME_CONFIG.player.startLane],
      x: GAME_CONFIG.player.xPosition
    },
    targets: GAME_CONFIG.targets.map(t => ({ ...t, count: 0 })),
    collectibles: [],
    rocks: generateRocks(),
    groundOffset: 0,
    isGameComplete: false,
    lastSpawnTime: 0
  };
}

function generateRocks() {
  const rocks = [];
  for (let i = 0; i < 12; i++) {
    rocks.push({
      x: Math.random() * GAME_CONFIG.canvas.width,
      y: Math.random() * GAME_CONFIG.canvas.height,
      radius: 15 + Math.random() * 20
    });
  }
  return rocks;
}

export function movePlayerUp(state) {
  if (state.player.currentLane > 0) {
    state.player.currentLane--;
    state.player.targetY = GAME_CONFIG.gameplay.lanePositions[state.player.currentLane];
  }
  return state;
}

export function movePlayerDown(state) {
  if (state.player.currentLane < GAME_CONFIG.gameplay.lanePositions.length - 1) {
    state.player.currentLane++;
    state.player.targetY = GAME_CONFIG.gameplay.lanePositions[state.player.currentLane];
  }
  return state;
}

export function updatePlayerPosition(state) {
  const diff = state.player.targetY - state.player.y;
  state.player.y += diff * 0.2;
  return state;
}

export function updateCollectibles(state) {
  state.collectibles.forEach(item => {
    item.x -= GAME_CONFIG.gameplay.scrollSpeed;  // Move LEFT
  });
  
  // Remove off-screen collectibles (left side)
  state.collectibles = state.collectibles.filter(item => item.x > -50);
  
  return state;
}

export function updateRocks(state) {
  state.rocks.forEach(rock => {
    rock.x -= GAME_CONFIG.gameplay.scrollSpeed;  // Move LEFT
    if (rock.x < -50) {
      rock.x = GAME_CONFIG.canvas.width + 50;
      rock.y = Math.random() * GAME_CONFIG.canvas.height;
    }
  });
  return state;
}

export function updateGround(state) {
  state.groundOffset += GAME_CONFIG.gameplay.scrollSpeed;
  if (state.groundOffset > 20) {
    state.groundOffset = 0;
  }
  return state;
}

export function checkWinCondition(state) {
  const allComplete = state.targets.every(target => target.count >= target.required);
  if (allComplete && !state.isGameComplete) {
    state.isGameComplete = true;
  }
  return state;
}