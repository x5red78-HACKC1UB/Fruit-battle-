const canvas = document.getElementById('Battleground');
const ctx = canvas.getContext('2d');
//Player stats
let playerX = 70;
let playerY = 70;
const playerWidth = 40;
const playerHeight = 40;
const speed = 10;
//Track da keys!
const keys ={};

//The actual player image
const playerImage = new Image();
playerImage.src = 'regular.svg';
//Screen resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
//Smooth movement loop
function gameLoop(){
  // Keep updating position
  if (keys['arrowup'] || keys['w']) playerY -= speed;
  if (keys['arrowdown'] || keys['s']) playerY += speed;
  if (keys['arrowleft'] || keys['a']) playerX -= speed;
  if (keys['arrowright'] || keys['d']) playerX += speed;

  // The background
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw player if it's loaded
  if (playerImage.complete) {
    ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight);
  }

requestAnimationFrame(gameLoop);
}
playerImage.onload = () => {
  resizeCanvas();
  gameLoop();
};

// Key listeners
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});



//Movement and its controls
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case'Arrowup':
    playerY -= speed;
      break;
    case 'ArrowDown':
      playerY += speed;
      break;
    case 'ArrowLeft':
      playerX -= speed;
      break;
    case 'ArrowRight':
      playerX += speed;
      break;
  }

resizeCanvas();
});
