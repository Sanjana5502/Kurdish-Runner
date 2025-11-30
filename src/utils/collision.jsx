export function checkCollisions(state) {
  for (let i = state.collectibles.length - 1; i >= 0; i--) {
    const item = state.collectibles[i];
    const dx = state.player.x - item.x;
    const dy = state.player.y - item.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 40) {
      handleCollision(state, item);
      state.collectibles.splice(i, 1);
    }
  }
  
  return state;
}

function handleCollision(state, item) {
  if (item.isTarget) {
    const target = state.targets.find(t => t.char === item.char);
    if (target && target.count < target.required) {
      target.count++;
    }
  }
}