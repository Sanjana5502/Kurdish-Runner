import { GAME_CONFIG } from '../config/gameConfig';

export function spawnCollectible(state) {
  const lane = Math.floor(Math.random() * 3);
  const y = GAME_CONFIG.gameplay.lanePositions[lane];
  const useTarget = Math.random() < GAME_CONFIG.gameplay.targetSpawnChance;
  
  let character, isTarget, color;
  
  if (useTarget) {
    // Find targets that still need collection
    const availableTargets = state.targets.filter(t => t.count < t.required);
    
    if (availableTargets.length > 0) {
      const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
      character = target.char;
      color = target.color;
      isTarget = true;
    } else {
      // All targets collected, spawn distractor
      character = GAME_CONFIG.distractors[Math.floor(Math.random() * GAME_CONFIG.distractors.length)];
      color = GAME_CONFIG.colors.distractor;
      isTarget = false;
    }
  } else {
    // Spawn distractor
    character = GAME_CONFIG.distractors[Math.floor(Math.random() * GAME_CONFIG.distractors.length)];
    color = GAME_CONFIG.colors.distractor;
    isTarget = false;
  }
  
  state.collectibles.push({
    x: GAME_CONFIG.canvas.width + 50,  // Spawn from RIGHT side
    y,
    char: character,
    isTarget,
    color,
    radius: 25
  });
  
  return state;
}