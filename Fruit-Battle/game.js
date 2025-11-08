const canvas = document.getElementById('Battleground');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'lightgreen';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const playerImage = new Image();
playerImage.src = 'regular.svg';
playerImage.onload = () => {
  ctx.drawImage(playerImage, 100, 100, 50, 50); // x, y, width, height
};



