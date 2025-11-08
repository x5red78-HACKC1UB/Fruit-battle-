const canvas = document.getElementById('Battleground');
const ctx = canvas.getContext('2d');
//Player stats
let playerX = 70;
let playerY = 70;
const playerWidth = 40;
const playerHeight = 40;
const speed = 10;

//The actual player image
const playerImage = new Image();
playerImage.src = 'regular.svg';
//Screen resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // The background
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player if it's loaded
  if (playerImage.complete) {
    ctx.drawImage(playerImage, 70, 70, 40, 40);
  }
}

// Only draw after image is loaded
playerImage.onload = () => {
  resizeCanvas(); // Initial draw
  window.addEventListener('resize', resizeCanvas); // Redraw on resize
};
//Movement and its controls
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case'Arrowup':
    case'w':
    playerY -= speed;
      break;
    case 'ArrowDown':
    case 's':
      playerY += speed;
      break;
    case 'ArrowLeft':
    case 'a':
      playerX -= speed;
      break;
    case 'ArrowRight':
    case 'd':
      playerX += speed;
      break;
  }

drawScene();
});
