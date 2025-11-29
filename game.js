const canvas = document.getElementById('Battleground');
const ctx = canvas.getContext('2d');
// Sound Z Image
const soundBeamImage = new Image();
soundBeamImage.src = 'sound z.svg';
//Enemy image
const enemyImage =new Image();
enemyImage.src = 'Base.svg';
//Player stats & more!
// //Knockback
let knockback=5
// Last place da mouse was
let lastAngle=0
// Mouse in window???!?!?!?!??! (grug see mouse)
let mouseInsideCanvas = true;
// uh the tutorial didn't explain this tbh (bro)
let soundBeam = null;
// just read lol
let showImageBar=true;
// how wide and chunky the player is
let playerX = 50;
// I'm 6'1 stand on my money now i'm 6'1
let playerY = 50;
// YOU CHOSE FLAME?!?!?!?!?!?!?!?!(jk i expected that, you thought you were tuff)
let flameSelected = 0;
// the first fruit made in both versions
let soundSelected = 0;
// Ok, Timmy Tough Knuckles, Dangerous Dan, Scary Sammy.
let iceSelected = 0;
// Lowkey, you just wanna be different, why choose this?
let gravitySelected = 0;
//Literally just read it bro
let xMoveActive = false;
let xMoveTimer = 0;
let xLines = []; 
let playerHue = 0; 
let cMoveActive = false;
let cMoveTimer = 0; 
let orbitCircles = [];
let flashyCircle = null;
let soundcooldownZ=0;
let soundcooldownX=0;
let soundcooldownC=0;
let soundVon = false;
let soundVTimer = 0;
let soundcooldownV = 0;
let soundVExploded = false;
let centerofSoundV = { x: 0, y: 0 };
let stars = [];
const soundBeams = [];
const playerWidth = 40;
const playerHeight = 40;
const speed = 5;

//Track da keys!
const keys ={};

//Just an annoying gitch fix!
canvas.addEventListener('mouseenter', () => {
  mouseInsideCanvas = true;
});

canvas.addEventListener('mouseleave', () => {
  mouseInsideCanvas = false;
});


// Mouse tracking
let mouseX = 0;
let mouseY = 0;
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;

  // Check if mouse is inside 
  mouseInsideCanvas =
    mouseX >= 0 && mouseX <= canvas.width &&
    mouseY >= 0 && mouseY <= canvas.height;
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
//Toolbar and what it got in it
const imageBar =[
{ name: 'flame' ,src: 'flame.svg', img: new Image(), x:50, y:20},
{ name: 'sound' ,src: 'backdrop1.svg', img: new Image(), x:120, y:20 },
{ name: 'ice' ,src: 'costume2.svg', img: new Image(), x:190, y:20 },
{ name: 'gravity' ,src: 'costume1.svg', img: new Image(), x:260, y:20 }
]; 

canvas.addEventListener('click', (e) => {
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

// Main menu & start button
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('mainMenu').style.display = 'none';
  resizeCanvas();
  spawnEnemy();  // self-explainatory(plz say i spelled that right)
  gameLoop();
});
// I used to think this was just for smooth movement, but I slowly realize this is just the entire game.
function gameLoop(){
  // Keep updating position
  if (keys['arrowup'] || keys['w']) playerY -= speed;
  if (keys['arrowdown'] || keys['s']) playerY += speed;
  if (keys['arrowleft'] || keys['a']) playerX -= speed;
  if (keys['arrowright'] || keys['d']) playerX += speed;
if (playerX < 0) playerX = 0;
if (playerY < 0) playerY = 0;
if (playerX + playerWidth > canvas.width) playerX = canvas.width - playerWidth;
if (playerY + playerHeight > canvas.height) playerY = canvas.height - playerHeight;

// The background (nothing much to say)
ctx.fillStyle = 'lightgreen';
ctx.fillRect(0, 0, canvas.width, canvas.height);
// enemy's beautiful looks
enemies.forEach(enemy => {
if (enemy.img.complete) {
    ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
  }
// the text above the enemy
  ctx.fillStyle = 'black';
  ctx.font = '14px Comic Sans MS';
  ctx.fillText('HP: ' + enemy.hp, enemy.x, enemy.y - 5);
});
// WARNING: EVERYTHING FROM 174 to 253 IS JUST ABT LINES, AHHHHHHHH I HATE LINES THEIR BORING, JUST LINES AND LINES.
// x move 
if (xMoveActive) {
  playerHue = (playerHue + 40) % 360;
  // Spawn lines, lines, and more lines..................
  if (xLines.length === 0) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      xLines.push({
        angle,
        distance: 0,
        growing: true
      });
    }
  }
  // draw more lines!!!!!! 
  ctx.strokeStyle = `hsl(${(Date.now()/10)%360}, 100%, 50%)`; 
  ctx.lineWidth = 3;
// Lines?!?!?!?!?!?!?!?!?!?!?!?!?
  
xLines.forEach(line => {
    //when line growing,
    if (line.growing) {
      // it grows,
      line.distance += 10;
      // if line too long,
      if (line.distance > 150) line.growing = false;
    } else {
      //line shrink,
      line.distance -= 10;
      //until 0.
      if (line.distance <= 0) line.distance = 0;
    }
  const startX = playerX + playerWidth / 2;
  const startY = playerY + playerHeight / 2;
  const endX = startX + Math.cos(line.angle) * line.distance;
  const endY = startY + Math.sin(line.angle) * line.distance;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  });
}
// draw lines........ D:
  ctx.strokeStyle = `hsl(${(Date.now()/10)%360}, 100%, 50%)`; // flashy colors
  ctx.lineWidth = 6;
// when x clicked,
  xLines.forEach(line => {
// and line growing
    if (line.growing) {
      line.distance += 10;
      // if line too long
      if (line.distance > 150) line.growing = false;
    } else {
      // line shrink
      line.distance -= 10;
      if (line.distance <= 0) line.growing = true;
    }

    const startX = playerX + playerWidth / 2;
    const startY = playerY + playerHeight / 2;
    // trigonometry nonsense (imma mark all trigonometry with this)
    const endX = startX + Math.cos(line.angle) * line.distance;
    const endY = startY + Math.sin(line.angle) * line.distance;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
// Lines touching checker thing.
checkXLineCollisions();
// move time
  xMoveTimer--;
  // so if like, the timer runs out, you wouldn't believe if i said this, the move stops.
  if (xMoveTimer <= 0) {
    xMoveActive = false;
    xLines = [];
  }
  


// the only reason i put this is because it didn't realize i didn't define flashyCircle, and because of that it kept crashing my entire game.
if (flashyCircle) {
  flashyCircle.radius += 15;
}
// when c clicked,
if (cMoveActive) {
  // make center that circles rotate around
  const centerX = playerX + playerWidth / 2;
  const centerY = playerY + playerHeight / 2;

  // Animate small rotating circles,
  orbitCircles.forEach(circle => {
    // math the animation
    circle.angle += circle.speed;
    circle.radius = Math.max(0, circle.radius - 2); 
// some trigonometry nonsense 
    const x = centerX + Math.cos(circle.angle) * circle.radius;
    const y = centerY + Math.sin(circle.angle) * circle.radius;
  ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${(Date.now()/10)%360}, 100%, 50%)`;
    ctx.fill();

    // LET IT GROWWWWWWW(that was cringe ngl but i'll keep it in)
    if (circle.radius <= 0 && !flashyCircle) {
      flashyCircle = { radius: 0, growing: true };
    }
  });

  // Animate circle ●

  //when circle grow,
if (flashyCircle) {
  if (flashyCircle.growing) {
    // expand circle,
    flashyCircle.radius += 15;
    //if circle too big, circle no grow,
    if (flashyCircle.radius > 150) flashyCircle.growing = false;
  } else {
    //then circle shrink.
    flashyCircle.radius -= 15;
    if (flashyCircle.radius <= 0) flashyCircle = null;
  }
  ctx.beginPath();
  ctx.arc(centerX, centerY, flashyCircle.radius, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${(Date.now()/5)%360}, 100%, 50%, 0.4)`; // colorful fill
  ctx.fill();
  ctx.strokeStyle = `hsl(${(Date.now()/5)%360}, 100%, 50%)`; // outline
  ctx.lineWidth = 6;
  ctx.stroke();
  enemies.forEach(enemy => {
    const ex = enemy.x + enemy.width / 2;
    const ey = enemy.y + enemy.height / 2;
    const dist = Math.sqrt((ex - centerX) ** 2 + (ey - centerY) ** 2);

    if (dist < flashyCircle.radius) {
      // stops damage from hitting 60 times a second bc, just too juch to handle
      if (Date.now() - enemy.lastHitTime > 80) {
        enemy.hp -= 10; 
        enemy.hp = Math.max(0, enemy.hp);
        enemy.lastHitTime = Date.now();
      }

      // Knockback
      const dxFromPlayer = ex - centerX;
      const dyFromPlayer = ey - centerY;
      const distFromPlayer = Math.sqrt(dxFromPlayer * dxFromPlayer + dyFromPlayer * dyFromPlayer);

      if (distFromPlayer > 0) {
        enemy.x += (dxFromPlayer / distFromPlayer) * (knockback / 0.7); // pushy push in x-axis
        enemy.y += (dyFromPlayer / distFromPlayer) * (knockback / 0.7);//pushy push in y-axis
      }
    }
  });
}



  // Countdown
  cMoveTimer--;
  if (cMoveTimer <= 0) {
    cMoveActive = false;
    orbitCircles = [];
    flashyCircle = null;
  }
}
// Cooldown countdown
if (soundcooldownV > 0) soundcooldownV--;

if (soundVon) {
  // Draw orb so you see it
  const hue = (Date.now() / 20) % 360; //so i just learned that %360 is th 359 colors
ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.4)`; 
  ctx.beginPath();
  ctx.arc(centerofSoundV.x, centerofSoundV.y, 20, 0, Math.PI * 2);
  ctx.fill();

  // Pull enemies
  enemies.forEach(enemy => {
    const ex = enemy.x + enemy.width / 2;
    const ey = enemy.y + enemy.height / 2;
    const dx = centerofSoundV.x - ex;
    const dy = centerofSoundV.y - ey;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist > 5) {
      enemy.x += dx / dist * 2.5;//}
                               //} speed & streength of sucking
      enemy.y += dy / dist * 2.5;//}
    }
  });

  // Stars!
  stars.forEach(star => {
    const dx = centerofSoundV.x - star.x;
    const dy = centerofSoundV.y - star.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    star.x += dx / dist * star.speed;
    star.y += dy / dist * star.speed;
  const hue = (Date.now() / 10 + star.x) % 360; //so i love expaining this part, star.x makes it so the stars have variety
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Explosion moment
  soundVTimer--;
  if (soundVTimer <= 60 && !soundVExploded) {
    soundVExploded = true;

    enemies.forEach(enemy => {
      const ex = enemy.x + enemy.width / 2;
      const ey = enemy.y + enemy.height / 2;
      const dx = ex - centerofSoundV.x;
      const dy = ey - centerofSoundV.y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 400) {//dmg blast radius
        enemy.hp -= 300;
        enemy.x += dx / dist * 50;
        enemy.y += dy / dist * 50;
      }
    });

    ctx.beginPath();
    ctx.arc(centerofSoundV.x, centerofSoundV.y, 400, 0, Math.PI * 2);//visual blast radius
    ctx.fillStyle = 'rgba(255, 200, 0, 0.5)';
    ctx.fill();
  }

  // End move
  if (soundVTimer <= 0) {
    soundVon = false;
    stars = [];
    soundVExploded = false;
    soundcooldownV = 300; 
  }
}


// RAINBOW BARF BEAM
 soundBeams.forEach((beam, index) => {
  if (beam.delay > 0) {
    beam.delay--;
    return;
  }
//how far beam be going fr
  beam.distance += 15;
  // size scale for da beam
  beam.scale += 0.03;
  beam.alpha -= 0.02;
  //how fast da color changes(I should really make an epilepsy warning)
  beam.hue = (beam.hue + 2) % 360; // COLORS!

  if (beam.alpha <= 0) {
    soundBeams.splice(index, 1);
    return;
  }

  const drawX = beam.x + Math.cos(beam.angle) * beam.distance;//}
                                                              //  } trigonomtry nonsense
  const drawY = beam.y + Math.sin(beam.angle) * beam.distance;//}
  const beamLength = 120 * beam.scale;
  const beamWidth = 90 * beam.scale;

  // Draw og beam 
  ctx.save();
  ctx.globalAlpha = beam.alpha;
  ctx.translate(drawX, drawY);
  ctx.rotate(beam.angle);
  ctx.drawImage(soundBeamImage, 0, -beamWidth / 2, beamLength, beamWidth);
  ctx.globalCompositeOperation = 'source-atop';
  ctx.fillStyle = `hsla(${beam.hue}, 100%, 50%, ${beam.alpha})`;
  ctx.fillRect(0, -beamWidth / 2, beamLength, beamWidth);
  ctx.restore();
  ctx.globalCompositeOperation = 'source-over'; // reset blend mode
 });

checkBeamCollisions();
let angle = lastAngle; 

if (mouseInsideCanvas) {
  const dx = mouseX - (playerX + playerWidth / 2);
  const dy = mouseY - (playerY + playerHeight / 2);
  angle = Math.atan2(dy, dx);
  // store the latest angle so we can freeze it later
  lastAngle = angle;
}
// Player go weweweweweweweweeeeee!
  if (playerImage.complete) {
    ctx.save();
    ctx.translate(playerX + playerWidth / 2, playerY + playerHeight / 2);
    ctx.rotate(angle);
    ctx.drawImage(playerImage, -playerWidth / 2, -playerHeight / 2, playerWidth, playerHeight);
  
    if (xMoveActive) {
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = `hsla(${playerHue}, 100%, 50%, 0.6)`;
    ctx.fillRect(-playerWidth / 2, -playerHeight / 2, playerWidth, playerHeight);
    ctx.globalCompositeOperation = 'source-over';
    }
    ctx.restore();
  }
  

updateEnemies()

  // Text of what fruit u have
ctx.fillStyle = 'black';
ctx.font = '20px Arial';
ctx.fillText('Active Fruit: ' + getActiveFruitName(), 20, canvas.height - 30);

if (soundcooldownC > 0){
  soundcooldownC--;
}
if (soundcooldownX > 0) {
  soundcooldownX--;
}
if (soundcooldownZ > 0) {
  soundcooldownZ--;
}

  // TH3 END 0F THE GAM3L00P
drawImageBar();
requestAnimationFrame(gameLoop);
}
//beam touching the enemy
function checkBeamCollisions() {
  soundBeams.forEach(beam => {
    enemies.forEach(enemy => {
      const ex = enemy.x + enemy.width / 2;
      const ey = enemy.y + enemy.height / 2;
    // trigonometry nonsense
      const bx = beam.x + Math.cos(beam.angle) * beam.distance;
      const by = beam.y + Math.sin(beam.angle) * beam.distance;

      const dx = bx - ex;
      const dy = by - ey;
      const dist = Math.sqrt(dx*dx + dy*dy);

      const now = Date.now();

      if (dist < enemy.width / 2) {
        if (now - enemy.lastHitTime > 40) { // limit hits per enemy so the z move didn't do 2642.393939393023974567236424638 dmg (yes that's the actual dmg)
          let damage = 4;

          if (isTouchingPlayer(enemy)) {
            damage = 1; // touching = reduced damage
          }

          enemy.hp -= damage;
          enemy.hp = Math.round(enemy.hp);
          //so enemy hp doesn't fly into the negatives
          enemy.hp = Math.max(0, enemy.hp);
          enemy.lastHitTime = now;

          //Knockback effect
          const dxFromPlayer = enemy.x + enemy.width / 2 - (playerX + playerWidth / 2);
          const dyFromPlayer = enemy.y + enemy.height / 2 - (playerY + playerHeight / 2);
          const distFromPlayer = Math.sqrt(dxFromPlayer * dxFromPlayer + dyFromPlayer * dyFromPlayer);

          if (distFromPlayer > 0) {
            enemy.x += (dxFromPlayer / distFromPlayer) * knockback/0.8;
            enemy.y += (dyFromPlayer / distFromPlayer) * knockback/0.8;
          }
        }
      }
    });
  });
}
//lines touch i think.
function checkXLineCollisions() {
  const now = Date.now();
  enemies.forEach(enemy => {
    const ex = enemy.x + enemy.width / 2;
    const ey = enemy.y + enemy.height / 2;

    xLines.forEach(line => {
      const startX = playerX + playerWidth / 2;
      const startY = playerY + playerHeight / 2;
      const endX = startX + Math.cos(line.angle) * line.distance;
      const endY = startY + Math.sin(line.angle) * line.distance;

      const dx = endX - startX;
      const dy = endY - startY;
      const lengthSq = dx*dx + dy*dy;
      let t = ((ex - startX) * dx + (ey - startY) * dy) / lengthSq;
      t = Math.max(0, Math.min(1, t));
      const closestX = startX + t * dx;
      const closestY = startY + t * dy;
      const dist = Math.sqrt((ex - closestX)**2 + (ey - closestY)**2);
      // same thing as the beam
      if (dist < enemy.width/2) {
        if (now - enemy.lastHitTime > 75) {
          enemy.hp -= 11;
          enemy.hp = Math.max(0, enemy.hp);
          enemy.lastHitTime = now;
        }

        // Knockback always on collision
        const dxFromPlayer = ex - (playerX + playerWidth / 2);
        const dyFromPlayer = ey - (playerY + playerHeight / 2);
        const distFromPlayer = Math.sqrt(dxFromPlayer * dxFromPlayer + dyFromPlayer * dyFromPlayer);

        if (distFromPlayer > 0) {
          enemy.x += (dxFromPlayer / distFromPlayer) * (knockback/1.4);
          enemy.y += (dyFromPlayer / distFromPlayer) * (knockback/1.4);
        }
      }
    });
  });
}
//enemy stats!
const enemies=[];
function spawnEnemy(){
  enemies.push({
    x: Math.random()* canvas.width,
    y: Math.random()*canvas.height,
    width:50,
    height:50,
    hp:1000,
    maxhp:100,
    speed:1.9,
    img: enemyImage,
    lastHitTime: 0
  });
}

  

//Enemy movement
function updateEnemies(){
  enemies.forEach(enemy => {
    const dx= playerX-enemy.x;
    const dy= playerY-enemy.y;
    //Formula for distance here!(my math teacher taught me well)
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 0) {
      enemy.x += (dx / dist) * enemy.speed;
      enemy.y += (dy / dist) * enemy.speed;
    }
  });
}
// Enemy Collision w/player
function isTouchingPlayer(enemy) {
  return (
    enemy.x < playerX + playerWidth &&
    enemy.x + enemy.width > playerX &&
    enemy.y < playerY + playerHeight &&
    enemy.y + enemy.height > playerY
  );
}



// Key listeners
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;
  //Sound V I SPENT 2 HOURSSSSSS
  if (key === 'v' && soundSelected && !soundVon && soundcooldownV <= 0) {
  soundVon = true;
  soundVTimer = 180; 
  centerofSoundV.x = playerX + playerWidth / 2;
  centerofSoundV.y = playerY + playerHeight / 2;

  // spawn stars
  stars = [];
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 2 + Math.random() * 2
    });
  }
}

  // Sound C
if (key === 'c' && soundSelected && soundcooldownC <= 0) {
  cMoveActive = true;
  cMoveTimer = 250; // 
  orbitCircles = [];
  flashyCircle = null;

  // Spawn 4 orbiting circles
  for (let i = 0; i < 4; i++) {
    orbitCircles.push({
      angle: (Math.PI * 2 / 4) * i,
      radius: 130, // hwo far the circle start
      speed: 0.27   // spinny circle go weweweweweweweweweweeweweweweeweweweweweeweweweweweweweweeweweweweweweweeweweweweweweweweweeweweweweweweweweweweweweweweweeweweweweweweweweweweweeweweweweweweweweweweweweeweweweweweweweweeweweweweweweweweweweeweweweweweeweweweweweweweweeweweweweweeweweweweweeweweweweweweeweweweweweeweweweweweweweweew
    });
  }
  soundcooldownC = 480; 
}

//Sound x
if (key === 'x' && soundSelected && soundcooldownX <= 0) {
  xMoveActive = true;
  xMoveTimer = 150; 
   xLines = []; // reset lines
   soundcooldownX =360;
}
//sound z
if (key === 'z' && soundSelected && soundcooldownZ <= 0) {
  const angle = Math.atan2(
    mouseY - (playerY + playerHeight / 2),
    mouseX - (playerX + playerWidth / 2)
  );
// Sound z stats
  for (let i = 0; i < 30; i++) {
    soundBeams.push({
      x: playerX + playerWidth / 2,
      y: playerY + playerHeight / 2,
      angle: angle,
      distance: 0,
      scale: 0.5 + i * 0.03,
      alpha: 1,
      delay: i * 2,
       hue: i * 50
    });
  }
  soundcooldownZ= 210;
}
// hue hue hue



});
  
document.addEventListener('fullscreenchange', () => {
  resizeCanvas();
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
// What fruit you have
function getActiveFruitName() {
  if (flameSelected) return 'Flame';
  if (soundSelected) return 'Sound';
  if (iceSelected) return 'Ice';
  if (gravitySelected) return 'Gravity';
  return 'None';
}
playerImage.onload = () => {
  resizeCanvas();
};



