import React, { useRef, useEffect, useState } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import backgroundImage from '../../public/images/bg.png';

const Canvas = ({ gameState, onCanvasClick }) => {
  const canvasRef = useRef(null);
  const [bgImage, setBgImage] = useState(null);

  // Load background image
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setBgImage(img);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    draw(ctx, gameState);
  }, [gameState]);

  const draw = (ctx, state) => {
    // Ensure collectibles is an array
    const collectibles = Array.isArray(state.collectibles) ? state.collectibles : [];

    // Clear canvas
    ctx.fillStyle = GAME_CONFIG.colors.background;
    ctx.fillRect(0, 0, GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height);

    // Draw background image if loaded
    if (bgImage) {
      // Calculate dimensions to maintain aspect ratio
      const canvasAspect = GAME_CONFIG.canvas.width / GAME_CONFIG.canvas.height;
      const imgAspect = bgImage.width / bgImage.height;

      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas (relative to height)
        drawHeight = GAME_CONFIG.canvas.height;
        drawWidth = drawHeight * imgAspect;
        offsetX = (GAME_CONFIG.canvas.width - drawWidth) / 2;
      } else {
        // Image is taller than canvas (relative to width)
        drawWidth = GAME_CONFIG.canvas.width;
        drawHeight = drawWidth / imgAspect;
        offsetY = (GAME_CONFIG.canvas.height - drawHeight) / 2;
      }

      // Draw the background image
      ctx.drawImage(bgImage, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Draw semi-transparent overlay for better visibility
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height);

    // Ground pattern removed as requested

    // Draw collectibles
    collectibles.forEach(item => {
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#000';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.char, item.x, item.y);
    });
    
    // Draw player (running pose facing right)
    drawPlayer(ctx, state.player);
    
    // Draw UI
    drawUI(ctx, state);
    
    // Draw completion screen
    if (state.isGameComplete) {
      drawCompletionScreen(ctx);
    }
  };
  
  const drawPlayer = (ctx, player) => {
  const runCycle = Math.sin(Date.now() * 0.01) * 0.5;

  // Helper stroke style for cartoon outline
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000"; // black outline

  // ===== BODY =====
  ctx.fillStyle = GAME_CONFIG.colors.playerBody;
  ctx.beginPath();
  ctx.roundRect(player.x - 18, player.y - 35, 36, 55, 10);
  ctx.fill();
  ctx.stroke();

  // ===== HEAD =====
  ctx.fillStyle = GAME_CONFIG.colors.playerSkin;
  ctx.beginPath();
  ctx.arc(player.x, player.y - 60, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Eyes
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(player.x - 6, player.y - 63, 3, 0, Math.PI * 2);
  ctx.arc(player.x + 6, player.y - 63, 3, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = "#2E2E2E";
  ctx.beginPath();
  ctx.arc(player.x, player.y - 70, 20, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // ===== ARMS =====
  ctx.fillStyle = GAME_CONFIG.colors.playerBody;

  // Front arm
  ctx.save();
  ctx.translate(player.x + 20, player.y - 20);
  ctx.rotate(0.7 + runCycle * 0.8);
  ctx.beginPath();
  ctx.roundRect(0, 0, 10, 30, 5);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Back arm
  ctx.save();
  ctx.translate(player.x - 30, player.y - 15);
  ctx.rotate(-0.7 - runCycle * 0.8);
  ctx.beginPath();
  ctx.roundRect(0, 0, 10, 30, 5);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // ===== LEGS =====
  ctx.fillStyle = "#333"; // pant color

  // Front leg
  ctx.save();
  ctx.translate(player.x - 10, player.y + 20);
  ctx.rotate(-runCycle * 0.5);
  ctx.beginPath();
  ctx.roundRect(0, 0, 12, 35, 5);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Back leg
  ctx.save();
  ctx.translate(player.x + 2, player.y + 20);
  ctx.rotate(runCycle * 0.5);
  ctx.beginPath();
  ctx.roundRect(0, 0, 12, 35, 5);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // // Shoes
  // ctx.fillStyle = "#e63946";
  // ctx.beginPath();
  // ctx.roundRect(player.x - 14, player.y + 50, 15, 10, 4);
  // ctx.roundRect(player.x - 1, player.y + 50, 15, 10, 4);
  // ctx.fill();
  // ctx.stroke();
};

  // const drawPlayer = (ctx, player) => {
  //   // Body - facing right
  //   ctx.fillStyle = GAME_CONFIG.colors.playerBody;
    
  //   // Running pose (on ground)
  //   const runCycle = Math.sin(Date.now() * 0.01) * 0.3;
    
  //   // Body
  //   ctx.fillRect(player.x - 20, player.y - 30, 40, 60);
    
  //   // Head
  //   ctx.fillStyle = GAME_CONFIG.colors.playerSkin;
  //   ctx.beginPath();
  //   ctx.arc(player.x + 5, player.y - 45, 15, 0, Math.PI * 2);
  //   ctx.fill();
    
  //   // Arms - running animation
  //   ctx.fillStyle = GAME_CONFIG.colors.playerBody;
  //   // Front arm
  //   ctx.save();
  //   ctx.translate(player.x + 15, player.y - 10);
  //   ctx.rotate(Math.PI/4 + runCycle * 0.5);
  //   ctx.fillRect(0, 0, 8, 25);
  //   ctx.restore();
    
  //   // Back arm
  //   ctx.save();
  //   ctx.translate(player.x - 20, player.y);
  //   ctx.rotate(-Math.PI/4 - runCycle * 0.5);
  //   ctx.fillRect(0, 0, 8, 20);
  //   ctx.restore();
    
  //   // Legs - running animation
  //   // Front leg
  //   ctx.save();
  //   ctx.translate(player.x - 5, player.y + 30);
  //   ctx.rotate(-runCycle * 0.3);
  //   ctx.fillRect(0, 0, 10, 25);
  //   ctx.restore();
    
  //   // Back leg
  //   ctx.save();
  //   ctx.translate(player.x - 10, player.y + 30);
  //   ctx.rotate(-Math.PI/6 + runCycle * 0.3);
  //   ctx.fillRect(0, 0, 10, 20);
  //   ctx.restore();
  // };
  
  const drawUI = (ctx, state) => {
    // UI Panel - Top Left
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.fillRect(10, 10, 180, 140);
    ctx.strokeRect(10, 10, 180, 140);
    
    // Title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Kurdish Runner', 100, 35);
    
    // Subtitle
    ctx.font = '11px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Collect Targets', 100, 52);
    
    // Draw counters for each target
    state.targets.forEach((target, index) => {
      const y = 80 + (index * 35);
      const isComplete = target.count >= target.required;
      
      // Background box
      ctx.fillStyle = isComplete ? 'rgba(126, 211, 33, 0.3)' : '#eeeeee';
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 2;
      ctx.fillRect(20, y - 12, 160, 30);
      ctx.strokeRect(20, y - 12, 160, 30);
      
      // Character
      ctx.fillStyle = target.color;
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(target.char, 50, y + 6);
      
      // Counter
      ctx.fillStyle = isComplete ? '#FFD700' : '#333';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(`${target.count}/${target.required}`, 140, y + 6);
    });
  };
  
  const drawCompletionScreen = (ctx) => {
    // Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, GAME_CONFIG.canvas.width, GAME_CONFIG.canvas.height);
    
    // Level Complete text
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText('Level Complete!', 400, 200);
    ctx.fillText('Level Complete!', 400, 200);
    
    // Subtitle
    ctx.fillStyle = '#FFF';
    ctx.font = '24px Arial';
    ctx.fillText('All targets collected!', 400, 250);
    
    // Restart button
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(300, 280, 200, 50);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeRect(300, 280, 200, 50);
    
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Play Again', 400, 313);
  };
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      maxWidth: '55%',
      maxHeight: 'calc(100vh - 100px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.canvas.width}
        height={GAME_CONFIG.canvas.height}
        onClick={onCanvasClick}
        style={{
          border: '4px solid #8b4513',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default Canvas;