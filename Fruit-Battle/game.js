const canvas = document.getElementById('Battleground');
const ctx = canvas.getContext('2d');

//Player stats & more!
let showImageBar=true;
let playerX = 50;
let playerY = 50;
let flameSelected = 0;
let soundSelected = 0;
let iceSelected = 0;
let gravitySelected = 0;
const playerWidth = 40;
const playerHeight = 40;
const speed = 5;

//Track da keys!
const keys ={};

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

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
//Toolbar & its contents
const imageBar =[
{ name: 'flame' ,src: 'flame.svg', img: new Image(), x:50, y:20},
{ name: 'sound' ,src: 'backdrop1.svg', img: new Image(), x:120, y:20 },
{ name: 'ice' ,src: 'costume2.svg', img: new Image(), x:190, y:20 },
{ name: 'gravity' ,src: 'costume1.svg', img: new Image(), x:260, y:20 }

];canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  if (!showImageBar) return;

  imageBar.forEach(item => {
    if (
      clickX >= item.x &&
      clickX <= item.x + 50 &&
      clickY >= item.y &&
      clickY <= item.y + 50
    ) {
      handleImageClick(item.name);
    }
  });
});

imageBar.forEach(item => item.img.src = item.src);
//Make toolbar
function drawImageBar() {
  if (!showImageBar) return;

  imageBar.forEach(item => {
    if (item.img.complete) {
      ctx.drawImage(item.img, item.x, item.y, 50, 50);
    }
  });
}
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

 // Calculates what angle player need to face mouse
  const dx = mouseX - (playerX + playerWidth / 2);
  const dy = mouseY - (playerY + playerHeight / 2);
  const angle = Math.atan2(dy, dx);

// Player go weweweweweweweweeeeee!
  if (playerImage.complete) {
    ctx.save();
    ctx.translate(playerX + playerWidth / 2, playerY + playerHeight / 2);
    ctx.rotate(angle);
    ctx.drawImage(playerImage, -playerWidth / 2, -playerHeight / 2, playerWidth, playerHeight);
    ctx.restore();
  }

  // Text of what fruit u have
ctx.fillStyle = 'black';
ctx.font = '20px Arial';
ctx.fillText('Active Fruit: ' + getActiveFruitName(), 20, canvas.height - 30);


  // makes image bar(again)
drawImageBar();
requestAnimationFrame(gameLoop);
}
playerImage.onload = () => {
  resizeCanvas();
  gameLoop();
};

// Main menu & start button
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('mainMenu').style.display = 'none';
  resizeCanvas();
  gameLoop();
});// 6 7!



// Key listeners
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;

  if (key === 'b') {
    showImageBar = !showImageBar;
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});
// Variables
function handleImageClick(name){
  flameSelected=0;
  soundSelected=0;
  gravitySelected=0;
  iceSelected=0;

  switch (name){
    case 'flame':
      flameSelected=1;
      console.log('Flame fruit activated');
      break;
      case 'sound':
        soundSelected=1;
        console.log('Sound fruit activated')
        break;
        case 'ice':
        iceSelected=1;
        console.log('Ice fruit activated')
        break;
        case 'gravity':
        gravitySelected=1;
        console.log('Gravity fruit activated')
        break;
  }
}
// Information on what fruit you have
function getActiveFruitName() {
  if (flameSelected) return 'Flame';
  if (soundSelected) return 'Sound';
  if (iceSelected) return 'Ice';
  if (gravitySelected) return 'Gravity';
  return 'None';
}







