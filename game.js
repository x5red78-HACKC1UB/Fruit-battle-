//Canvas
const canvas = document.getElementById('Battleground');
const ctx = canvas.getContext('2d');

//=======================================================//
//======================IMAGES===========================//
//=======================================================//

const soundBeamImage = new Image();
soundBeamImage.src = 'sound z.svg';

//The actual player image
const playerImage = new Image();
playerImage.src = 'regular.svg';

const enemyImage = new Image();
enemyImage.src = 'Base.svg';

const randomenemyimage = new Image();
randomenemyimage.src = 'random.svg';

const flameZbullets = new Image();
flameZbullets.src = "flame bullets.svg"

const flameZbulletkaboom = new Image();
flameZbulletkaboom.src = "flame explosion.svg"

const flameXbullet = new Image();
flameXbullet.src = "flamex.svg";

const iceZneedle = new Image();
iceZneedle.src = "iceneedle.svg";

const shatterediceZ = new Image();
shatterediceZ.src = "iceshatter.svg";

//.               __________      _______________.         ----------------
//|              |                      |.                /
//|.             ___________            |                 \
//|.             |                      |.                  ________________
//|__________    ____________           |.                                  \
//.                                                                         /
//.     n.                                                __________________                 
// //Knockback
let knockback = 5;

// Last place da mouse was
let lastAngle = 0;

// Mouse in window???!?!?!?!??! (grug see mouse)
let mouseInsideCanvas = true;

// uh the tutorial didn't explain this tbh (bro)
let soundBeam = null;

// just read lol
let showImageBar = true;

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

// sound X 
let xMoveActive = false;
let xMoveTimer = 0;

let playerHue = 0;
//sound C
let cMoveActive = false;
let cMoveTimer = 0;

let orbitCircles = [];
let flashyCircle = null;
//Sound cooldowns
let soundcooldownZ = 0;

let soundcooldownX = 0;
let soundcooldownC = 0;
//Sound V
let soundVon = false;

let soundVTimer = 0;
let soundcooldownV = 0;
let soundVExploded = false;
let centerofSoundV = { x: 0, y: 0 };
let stars = [];
//Flame Z
let flameZActive = false;
let flameZTimer = 0;

let flameZCooldown = 0;

let flamexon = false;
let flamexcooldown = 0;
let flamextime = 0;
// Flame C 
let flameCActive = false;
let flameCduration = 0;
let flameCCooldown = 0;

let flameParticles = [];
//Flame V
let flamevon=false;
let flamevcooldown=0;

 let flamevdestruction=null;

 let icezcooldown=0;
 let icezactive=false;
 let icezduration=0;
 let iceZslow= 0;
 let icexcooldown=0;
 let icexactive=false;
 let repeatingicex=0;
 let xLines = [];
 
 //My fuctions!

// My radomizer!
const multiplyrandom = (x, y) => Math.round((Math.random()*(x * y))+1);
// ice z slow. x is the percentage of the slow and y is enemy speed
const slowpercent = (x,y) => (x/100)*y


//Player
const playerWidth = 40;
const playerHeight = 40;
const speed = 5;


const soundBeams = [];
const flameBullets = [];
const flamexProjectiles = [];
const iceBullets=[];

//HTML STUFF :D

// how to play
const tutorial = document.getElementById("tutorial");
const closetutorial = document.getElementById("closeTutorial");
const howtoplay = document.getElementById("howtoplay");

// Hide and show how to play button
howtoplay.addEventListener("click", () => {
  tutorial.classList.remove("hidden");
});
closetutorial.addEventListener("click", () => {
  tutorial.classList.add("hidden");
});

// Player facing mouse code
const keys = {};

//This is kinda long to explain, but when the mouse leaves the canvas the player would just stare at the last angle so this detects if the mouse is in the game.
canvas.addEventListener('mouseenter', () => {
  mouseInsideCanvas = true;
  console.log('Mouse inside the canvas')
});

canvas.addEventListener('mouseleave', () => {
  mouseInsideCanvas = false;
  console.log('Mouse not in canvas')
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



//Screen resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

//=======================================================//
//======================TOOLBAR===========================//yes, imma reuse im not manually doing this for everything
//=======================================================//


const imageBar = [
  { name: 'flame', src: 'flame.svg', img: new Image(), x: 50, y: 20 },
  { name: 'sound', src: 'backdrop1.svg', img: new Image(), x: 120, y: 20 },
  { name: 'ice', src: 'costume2.svg', img: new Image(), x: 190, y: 20 },
  { name: 'gravity', src: 'costume1.svg', img: new Image(), x: 260, y: 20 }
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
  spawnEnemy1();  // self-explainatory(plz say i spelled that right)
  gameLoop();
  console.log('Menu good');
});

// I used to think this was just for smooth movement, but I slowly realize this is just the entire game.
function gameLoop() {
  //=======================================================//
//======================Player Movement===========================//
//=======================================================//

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
  // enemy image(just another square)
  enemies.forEach(enemy => {
    if (enemy.img.complete) {
      ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // the text above the enemy that says hp
    ctx.fillStyle = 'black';
    ctx.font = '14px Comic Sans MS';
    ctx.fillText('HP: ' + enemy.hp, enemy.x, enemy.y - 5);
  });

  // WARNING: EVERYTHING FROM 174 to 253 IS JUST ABT LINES, AHHHHHHHH I HATE LINES THEIR BORING, JUST LINES AND LINES.

  //Every single move in the entire game.(dont imma use my format)

  // x move animation
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
    ctx.strokeStyle = `hsl(${(Date.now() / 10) % 360}, 100%, 50%)`;
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
  ctx.strokeStyle = `hsl(${(Date.now() / 10) % 360}, 100%, 50%)`; // flashy colors
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


  // Basically c move start-up animation
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
      ctx.fillStyle = `hsl(${(Date.now() / 10) % 360}, 100%, 50%)`;
      ctx.fill();


      if (circle.radius <= 0 && !flashyCircle) {
        flashyCircle = { radius: 0, growing: true };
      }
    });

    // Animate circle ●(like the actual attack)

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
      ctx.fillStyle = `hsla(${(Date.now() / 5) % 360}, 100%, 50%, 0.4)`; // colorful fill
      ctx.fill();
      ctx.strokeStyle = `hsl(${(Date.now() / 5) % 360}, 100%, 50%)`; // outline
      ctx.lineWidth = 6;
      ctx.stroke();
      enemies.forEach(enemy => {
        for (let i = enemies.length - 1; i >= 0; i--) {
          enemydeathrip(i, enemies, canvas, ctx);
        }
        const ex = enemy.x + enemy.width / 2;
        const ey = enemy.y + enemy.height / 2;
        const dist = Math.sqrt((ex - centerX) ** 2 + (ey - centerY) ** 2);

        if (dist < flashyCircle.radius) {
          // stops damage from hitting 60 times a second bc, just too juch to handle
          if (Date.now() - enemy.lastHitTime > 80) {
            console.log('c move hitting')
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
          // So the enemy stays in the game
          enemystayinboundsplzz(enemy, canvas)
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
  
  

  if (soundVon) {
    // Draw orb so you see it
    const color = (Date.now() / 20) % 360; //so i just learned that %360 is th 359 colors
    ctx.fillStyle = `hsla(${color}, 100%, 50%, 0.4)`;
    ctx.beginPath();
    ctx.arc(centerofSoundV.x, centerofSoundV.y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Pull enemies
    enemies.forEach(enemy => {
      const ex = enemy.x + enemy.width / 2;
      const ey = enemy.y + enemy.height / 2;
      const dx = centerofSoundV.x - ex;
      const dy = centerofSoundV.y - ey;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        enemy.x += dx / dist * 4.5;//}
        //} speed & streength of sucking
        enemy.y += dy / dist * 4.5;//}
        console.log('enemy pulled')
      }
    });

    // Stars!
    stars.forEach(star => {
      const starx = centerofSoundV.x - star.x;
      const stary = centerofSoundV.y - star.y;
      const stardistance = Math.sqrt(starx * starx + stary * stary);

      // Move star toward center
      star.x += starx / stardistance * star.speed;
      star.y += stary / stardistance * star.speed;

     //ooh color stars!
      const hue = (Date.now() / 10 + star.x) % 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

      // 
      ctx.beginPath();
      ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
      ctx.fill();

      // 
      enemies.forEach(enemy => {
        const enemyx = enemy.x + enemy.width / 2;
        const enemyy = enemy.y + enemy.height / 2;
        const starandenemyx = star.x - enemyx;
        const starandenemyy = star.y - enemyy;
        const starandenemydistance = Math.sqrt(starandenemyx * starandenemyx + starandenemyy * starandenemyy);

        
        if (starandenemydistance< enemy.width / 2) {
          for (let i = enemies.length - 1; i >= 0; i--) {
            enemydeathrip(i, enemies, canvas, ctx);
          }
          if (!star.lastHitTime || Date.now() - star.lastHitTime > 400) {
            enemy.hp -= 2;
            enemy.hp = Math.round(enemy.hp);
            star.lastHitTime = Date.now();
          }
          enemy.hp = Math.max(0, enemy.hp);//basically says when enemy hp is 0 it can't go any lower


        }
      });
    });


    //FAHHHHHHH
    soundVTimer--;
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemydeathrip(i, enemies, canvas, ctx);
    }
    if (soundVTimer <= 80 && !soundVExploded) {
      soundVExploded = true;

      enemies.forEach(enemy => {
        const enemyx = enemy.x + enemy.width / 2;
        const enemyy = enemy.y + enemy.height / 2;
        const enemyandcenterx = enemyx - centerofSoundV.x;
        const enemyandcentery = enemyy - centerofSoundV.y;
        const enemyandcenterdistance = Math.sqrt(enemyandcenterx * enemyandcenterx + enemyandcentery * enemyandcentery);

        if (enemyandcenterdistance < 400) {//dmg blast radius
          enemy.hp -= 210
          enemy.hp = Math.max(0, enemy.hp);
          enemy.x += enemyx / enemyandcenterdistance * 50;
          enemy.y += enemyy / enemyandcenterdistance * 50;
          enemystayinboundsplzz(enemy, canvas)
        }
      });

      ctx.beginPath();
      ctx.arc(centerofSoundV.x, centerofSoundV.y, 400, 0, Math.PI * 2);//visual blast radius
      ctx.fillStyle = 'rgba(255, 200, 0, 0.5)';
      ctx.fill();
    }

    
    if (soundVTimer <= 0) {
      soundVon = false;
      stars = [];
      soundVExploded = false;
      soundcooldownV = 300;
    }
  }
  //end of sound moves

  // Flame Z
  if (flameZActive) {
    // Death checker
    for (let i = enemies.length - 1; i >= 0; i--) {
      enemydeathrip(i, enemies, canvas, ctx);
    }

    // Bullet stats here(loong day)
    if (flameZTimer % 10 === 0) {
      flameBullets.push({
        x: playerX + playerWidth / 2,
        y: playerY + playerHeight / 2,
        angle: lastAngle,
        speed: 8,
        exploded: false,
        alpha: 1
      });
    }


    flameBullets.forEach((bullet, index) => {
      if (!bullet.exploded) {
        // Draw bullet
        ctx.drawImage(flameZbullets, bullet.x - 8, bullet.y - 8, 16, 16);
        

        bullet.x += Math.cos(bullet.angle) * bullet.speed;
        bullet.y += Math.sin(bullet.angle) * bullet.speed;
        // touching with player???
        enemies.forEach(enemy => {
          const enemyx = enemy.x + enemy.width / 2;
          const enemyy = enemy.y + enemy.height / 2;
          const distance = Math.sqrt((bullet.x - enemyx) ** 2 + (bullet.y - enemyy) ** 2);

          if (distance < enemy.width / 2) {   
            bullet.exploded = true;
            enemy.hp -= 15;               
            enemy.hp = Math.max(0, enemy.hp);
          }

        });
      } else {
        // Explosion....
        ctx.globalAlpha = bullet.alpha;
        ctx.drawImage(flameZbulletkaboom, bullet.x - 16, bullet.y - 16, 32, 32);
        ctx.globalAlpha = 1;

        // disappear
        bullet.alpha -= 0.05;
        if (bullet.alpha <= 0) {
          flameBullets.splice(index, 1);
        }
      }
    });
    flameZTimer--;


  }
  if (flameZTimer <= 0) {
    flameZActive = false;
    flameBullets.length = 0;
  }

  if (flamexon) {
    flamextime--;
    for (let i = flamexProjectiles.length - 1; i >= 0; i--) {
      const proj = flamexProjectiles[i];

      if (!proj.exploded) {
        //wally west speed
        proj.x += Math.cos(proj.angle) * proj.speed;
        proj.y += Math.sin(proj.angle) * proj.speed;

        // 
       ctx.drawImage(flameXbullet, proj.x - proj.size / 2, proj.y - proj.size / 2, proj.size, proj.size);

       
        enemies.forEach(enemy => {
          //btw enemyx and y are like hitboxes(kinda)
          const enemyx = enemy.x + enemy.width / 2;
          const enemyy = enemy.y + enemy.height / 2;
          const distance = Math.sqrt((proj.x - enemyx) ** 2 + (proj.y - enemyy) ** 2);

          if (distance < enemy.width / 2) {
            proj.exploded = true;
            enemy.hp -= 125; // beeg damage
            enemy.hp = Math.max(0, enemy.hp);
          }
        });
      } else {
       
        ctx.globalAlpha = proj.alpha;
        ctx.drawImage(flameZbulletkaboom, proj.x - 64, proj.y - 64, 128, 128);
        ctx.globalAlpha = 1;
            
          }

enemies.forEach(enemy => {
          const enemyx = enemy.x + enemy.width / 2;
          const enemyy = enemy.y + enemy.height / 2;
          const distance = Math.sqrt((proj.x - enemyx) ** 2 + (proj.y - enemyy) ** 2);

          if (distance < 64) {
            enemy.hp -= 3; // damage
            enemy.hp = Math.max(0, enemy.hp);
          }
        });

        proj.alpha -= 0.05;
        if (proj.alpha <= 0) {
          flamexProjectiles.splice(i, 1);
        }
      }
    }
  
  if (flamextime <= 0) {
    flamexon = false;
  }
  

if (flameCActive) {
  const centerX = playerX + playerWidth / 2;
  const centerY = playerY + playerHeight / 2;

 
  for (let i = 0; i < 8; i++) {
    flameParticles.push({
      x: centerX,
      y: centerY,
      angle: lastAngle + (Math.random() - 0.5) * 0.6, // spread circle illusion cool right, ok maybe not
      speed: 6 + Math.random() * 2,
      radius: 8 + Math.random() * 4,
      alpha: 1,
      life: 40 // circle li3fespan
    });
  }


  flameParticles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.03;
    p.life--;

    // Draw particles :3
    ctx.fillStyle = `rgba(255, ${100 + Math.random()*155}, 0, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    
    enemies.forEach(enemy => {
      const enemyx = enemy.x + enemy.width / 2;
      const enemyy = enemy.y + enemy.height / 2;
      const distance = Math.sqrt((p.x - enemyx) ** 2 + (p.y - enemyy) ** 2);

      if (distance < enemy.width / 2) {
     //So flame C doesn't absolutly destroy the enmy
        if (Date.now() - enemy.lastHitTime > 75) {
          enemy.hp -= 8; 
          enemy.hp = Math.max(0, enemy.hp);
          enemy.lastHitTime = Date.now();
        }

        enemy.x += Math.cos(p.angle) * (knockback / 1.2);
        enemy.y += Math.sin(p.angle) * (knockback / 1.2);
      }
    });

    
    if (p.life <= 0 || p.alpha <= 0) {
      flameParticles.splice(i, 1);
    }
  });


  flameCduration--;
  if (flameCduration <= 0) flameCActive = false;
}




if (flamevon && flamevdestruction) {
  const e = flamevdestruction;

  if (!e.exploded) {
    
    e.x += Math.cos(e.angle) * e.speed;
    e.y += Math.sin(e.angle) * e.speed;

    
    ctx.fillStyle = `rgba(255, 100, 0, ${e.alpha})`;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius*e.size, 0, Math.PI * 2);
    ctx.fill();

    // Collision:D
    enemies.forEach(enemy => {
      const ex = enemy.x + enemy.width / 2;
      const ey = enemy.y + enemy.height / 2;
      const dist = Math.sqrt((e.x - ex) ** 2 + (e.y - ey) ** 2);
      const enemyHitBox = Math.max(enemy.width, enemy.height) / 2;

      if (dist < e.radius + enemyHitBox) {
        enemy.hp -= 250; 
          enemy.hp = Math.max(0, enemy.hp);
        e.exploded = true;
        e.growing = 6; 
        e.radius = 60*e.size; 
      }
    });
  } else {
    // like the actual explosion
    e.radius += e.growing; 
    e.alpha -= 0.02;      

    ctx.fillStyle = `rgba(255, 150, 0, ${e.alpha})`;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    ctx.fill();

    
    enemies.forEach(enemy => {
      const enemyx = (enemy.x + enemy.width / 2);
      const enemyy = (enemy.y + enemy.height / 2);
      const distance = Math.sqrt((e.x - enemyx) ** 2 + (e.y - enemyy) ** 2);

      if (distance < e.radius*e.size) {
        if (Date.now() - enemy.lastHitTime > 100) {
          enemy.hp -= 30; 
          enemy.hp = Math.max(0, enemy.hp);
          enemy.lastHitTime = Date.now();
        }
      }
    });

    // End 
    if (e.alpha <= 0) {
      flamevon= false;
      flamevdestruction = null;
    }
  }
}

//end of flame moves

 
//3 HOURS ON ONE MOVE
// Ice Z 
if (icezactive) {

  icezduration--;

  
  if (icezduration <= 0) {
    icezactive = false;
    iceBullets.length = 0;
  }

  // ice destruction i like it it looks cool
  if (icezduration % 50 === 0) {
    iceBullets.push({
      x: playerX + playerWidth / 2,
      y: playerY + playerHeight / 2,
      angle: lastAngle,
      speed: 7,
      exploded: false,
      alpha: 1
    });
  }

  iceBullets.forEach((bullet, index) => {
    if (!bullet.exploded) {

      ctx.drawImage(iceZneedle, bullet.x - 8, bullet.y - 8, 16, 16);

      bullet.x += Math.cos(bullet.angle) * bullet.speed;
      bullet.y += Math.sin(bullet.angle) * bullet.speed;

      

    } else {
      ctx.globalAlpha = bullet.alpha;
      ctx.drawImage(shatterediceZ, bullet.x - 16, bullet.y - 16, 32, 32);
      ctx.globalAlpha = 1;

      bullet.alpha -= 0.05;
      if (bullet.alpha <= 0) {
        iceBullets.splice(index, 1);
      }
    }
  });
}




for (let i = iceBullets.length - 1; i >= 0; i--) {
  const bullet = iceBullets[i];

  if (!bullet.exploded) {

    // draw ice x using the ice z img
    ctx.drawImage(iceZneedle, bullet.x - 8, bullet.y - 8, 16, 16);

    
    bullet.x += Math.cos(bullet.angle) * bullet.speed;
    bullet.y += Math.sin(bullet.angle) * bullet.speed;

    // Collision with all enemies
    for (let e = enemies.length - 1; e >= 0; e--) {
      const enemy = enemies[e];

      const enemyx = enemy.x + enemy.width / 2;
      const enemyy = enemy.y + enemy.height / 2;
      const distance = Math.hypot(bullet.x - enemyx, bullet.y - enemyy);

      if (distance < enemy.width / 2) {
        bullet.exploded = true;

        // Damage
        enemy.hp -= 25;
        if (enemy.hp < 0) enemy.hp = 0;

        // Slow
        if (enemy.isSlowed) {
          enemy.isSlowed = true;
          enemy.slowTimer = 450;

          const slowplz = slowpercent(40, enemy.baseSpeed);
          enemy.speed = enemy.baseSpeed - slowplz;
        }

       
      }
    }

  } else {

    // Explosion fade(low taper fade)
    ctx.globalAlpha = bullet.alpha;
    ctx.drawImage(shatterediceZ, bullet.x - 16, bullet.y - 16, 32, 32);
    ctx.globalAlpha = 1;

    bullet.alpha -= 0.05;
    if (bullet.alpha <= 0) {
      iceBullets.splice(i, 1);
    }
  }
}


// satisfying ice spread
if (repeatingicex > 0) {

  
  for (let i = 0; i < 5; i++) {
let a = +15*repeatingicex
    iceZX1(a);
   
  }
  repeatingicex--;
   
}



function iceZX1(a) {
  iceBullets.push({
    x: playerX + playerWidth / 2,
    y: playerY + playerHeight / 2,
    angle: a,
    speed: 12,
    exploded: false,
    alpha: 1
  });
}
 


if (icexactive && icexcooldown <= 0) {
  repeatingicex = 100;
  icexcooldown = 240;
  icexactive = false;
}




  

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
    beam.hue = (beam.hue + 2) % 360; // C0LORS!

    if (beam.alpha <= 0) {
      soundBeams.splice(index, 1);
      return;
    }

    const drawX = beam.x + Math.cos(beam.angle) * beam.distance;//}
    //                                                             } trigonomtry nonsense
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
    ctx.globalCompositeOperation = 'source-over'; 
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


  updateEnemies();
for (let i = enemies.length - 1; i >= 0; i--) { 
  enemydeathrip(i, enemies, canvas, ctx); 
}
  // Text of what fruit u have
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Active Fruit: ' + getActiveFruitName(), 20, canvas.height - 30);


//=======================================================//
//====================Cooldowns:)===========================//
//=======================================================//

if (icexcooldown > 0){ 
  icexcooldown--;
}
if (icezcooldown > 0){ 
  icezcooldown--;
}
if (flamevcooldown > 0){ 
  flamevcooldown--;
}
if (flameCCooldown > 0){ 
  flameCCooldown--;
}
if (flamexcooldown > 0) {
    flamexcooldown--;
  }

  if (flameZCooldown > 0) {
    flameZCooldown--;
  }

  if (soundcooldownV > 0){
     soundcooldownV--;
  }
  if (soundcooldownC > 0) {
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

//=======================================================//
//======================Collision(over time i realized i don't have to do these ahahahahahahahah, and yes idc abt this message being centered)===========================//
//=======================================================//


//beam touching the enemy
function checkBeamCollisions() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemydeathrip(i, enemies, canvas, ctx);
  }
  soundBeams.forEach(beam => {
    enemies.forEach(enemy => {
      const enemyx = enemy.x + enemy.width / 2;
      const enemyy = enemy.y + enemy.height / 2;
      // trigonometry nonsense
      const soundzx = beam.x + Math.cos(beam.angle) * beam.distance;
      const soundzy = beam.y + Math.sin(beam.angle) * beam.distance;

      const totalx = soundzx - enemyx;
      const totaly = soundzy - enemyy;
      const distance = Math.sqrt(totalx * totalx + totaly * totaly);
// this isn't completely nessesary but why not
      const now = Date.now();

      if (distance < enemy.width / 2) {
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
            enemy.x += (dxFromPlayer / distFromPlayer) * knockback / 0.8;
            enemy.y += (dyFromPlayer / distFromPlayer) * knockback / 0.8;
          }
          enemystayinboundsplzz(enemy, canvas)
        }
      }
    });
  });
}

//lines touch i think.
function checkXLineCollisions() {
  const now = Date.now();
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemydeathrip(i, enemies, canvas, ctx);
  }
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
      const lengthSq = dx * dx + dy * dy;
      let t = ((ex - startX) * dx + (ey - startY) * dy) / lengthSq;
      t = Math.max(0, Math.min(1, t));
      const closestX = startX + t * dx;
      const closestY = startY + t * dy;
      const dist = Math.sqrt((ex - closestX) ** 2 + (ey - closestY) ** 2);
      // same thing as the beam
      if (dist < enemy.width / 2) {
        if (now - enemy.lastHitTime > 50) {
          enemy.hp -= 8;
          enemy.hp = Math.max(0, enemy.hp);
          enemy.lastHitTime = now;
        }

        // Knockback always on collision
        const dxFromPlayer = ex - (playerX + playerWidth / 2);
        const dyFromPlayer = ey - (playerY + playerHeight / 2);
        const distFromPlayer = Math.sqrt(dxFromPlayer * dxFromPlayer + dyFromPlayer * dyFromPlayer);

        if (distFromPlayer > 0) {
          enemy.x += (dxFromPlayer / distFromPlayer) * (knockback / 1.4);
          enemy.y += (dyFromPlayer / distFromPlayer) * (knockback / 1.4);
        }
        enemystayinboundsplzz(enemy, canvas)
      }
    });
  });
}
//just experimenting with functions

function activateFlames() {
  if (!flameCActive && flameCCooldown <= 0) {
    flameCActive = true;
    flameCduration =240; 
    flameCCooldown = 420;
  }
}
function puredestruction(){
  if (!flamevon && flamevcooldown <= 0) {
    flamevon = true;
    flamevcooldown = 400; // cooldown frames
    flamevdestruction = {
      x: playerX + playerWidth / 2,
      y: playerY + playerHeight / 2,
      angle: lastAngle,
      speed: 3,
      radius: 30,  
      exploded: false,
      growing: 0,   
      alpha: 1,
      size: 4,
    };
  }
}

//=======================================================//
//======================Enemies=========================//
//======================================================//


//enemy stats!
const enemies = [];
function spawnEnemy1() {
  enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 50,
    height: 50,
    hp: 500,
    maxhp: 500,
    speed:1.4,
    baseSpeed: 1.4,
    img: enemyImage,
    lastHitTime: 0,
    isSlowed:false,
    slowTimer:0,
  
  
  });
}
function spawnEnemy2() {
  const goons = multiplyrandom(1,4)
  for (let i = 0; i < goons; i++) {
  spawnEnemy1();
    }


enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 60,
    height: 60,
    hp: 900,
    maxhp: 900,
    speed:0.9,
    baseSpeed: 0.9,
    img: enemyImage,
    lastHitTime: 0,
    isSlowed:false,
    slowTimer:0,
  });
}

function spawnrandom() {
  const randomHP = multiplyrandom(1,1200)
  const randomSpeed = multiplyrandom(1,3.5)
  enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 40,
    height: 40, 
    hp: randomHP,
    maxhp: randomHP,
    speed:randomSpeed,
    baseSpeed: randomSpeed,
    img: randomenemyimage,
    lastHitTime: 0,
    isSlowed:false,
    slowTimer:0,
  });
}
//TASK MANGER!
function enemydeathrip(enemyIndex, enemies, canvas, ctx) {
  const enemy = enemies[enemyIndex];
  //wait keep him in......
  enemystayinboundsplzz(enemy, canvas);
  // Alr, now take him out.
  if (enemy.hp <= 0) {
    enemies.splice(enemyIndex, 1);
    return;
  }
  
  
}



//Enemy movement
function updateEnemies() {
  enemies.forEach(enemy => {
    if (enemy.isSlowed) {
  enemy.slowTimer--;

  if (enemy.slowTimer <= 0) {
    enemy.isSlowed = false;
    enemy.speed = enemy.baseSpeed;
  }
}

    const distancebetweenplayerandenemyx = playerX - enemy.x;
    const distancebetweenplayerandenemyy = playerY - enemy.y;
    const distancebetweenplayerandenemy = Math.sqrt(distancebetweenplayerandenemyx * distancebetweenplayerandenemyx + distancebetweenplayerandenemyy * distancebetweenplayerandenemyy);
    if (distancebetweenplayerandenemy > 0) {
      enemy.x += (distancebetweenplayerandenemyx / distancebetweenplayerandenemy) * enemy.speed;
      enemy.y += (distancebetweenplayerandenemyy / distancebetweenplayerandenemy) * enemy.speed;
    }
    enemystayinboundsplzz(enemy, canvas)
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

function enemystayinboundsplzz(enemy, canvas) {

  if (enemy.x < 0) enemy.x = 0;

  if (enemy.y < 0) enemy.y = 0;

  if (enemy.x + enemy.width > canvas.width) {
    enemy.x = canvas.width - enemy.width;
  }

  if (enemy.y + enemy.height > canvas.height) {
    enemy.y = canvas.height - enemy.height;
  }
}




// Key listeners
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;
   if (key === "x" && iceSelected&& icexcooldown<=0){
    icexactive= true;
     }
  if (key === "z" && iceSelected&& icezcooldown<=0){
    icezactive= true;
    icezduration=180;
    icezcooldown=250;
    
  }
  if (key === 'v' && flameSelected && flamevcooldown <= 0) {
  puredestruction();
}

  if (key === 'c' && flameSelected && flameCCooldown <= 0) {
  activateFlames();
}

  if (key === 'x' && flameSelected && flamexcooldown <= 0) {
    //  one fast Fireball
    flamexon = true;
    flamextime = 60;
    flamexProjectiles.push({
      x: playerX + playerWidth / 2,
      y: playerY + playerHeight / 2,
      angle: lastAngle,
      speed: 40,
      exploded: false,
      alpha: 1,
      size:35,
    });
flamexcooldown=200;
  }

  if (key === 'z' && flameSelected && !flameZActive && flameZCooldown <= 0) {
    flameZActive = true;
    flameZTimer = 100;       // how long the move lasts (frames)
    flameZCooldown = 180;
    flameBullets.push({
      x: playerX + playerWidth / 2,
      y: playerY + playerHeight / 2,
      angle: lastAngle,
      speed: 16,
      exploded: false,
      alpha: 1,
    });
  }

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
    soundcooldownX = 360;
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
    soundcooldownZ = 210;
  }

  // hue hue hue
  //purple guy spawning simulator

  if (key === "1") {
    spawnEnemy1();
    console.log("enemy created out of nothing")
  }

  if (key === "2") {
    spawnrandom();
    console.log("enemy created out of nothing")
  }

   if (key === "3") {
    spawnEnemy2();
    console.log("enemy created out of nothing")
  }
});

document.addEventListener('fullscreenchange', () => {
  resizeCanvas();
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

// fruit selection

function handleImageClick(name) {
  flameSelected = 0;
  soundSelected = 0;
  gravitySelected = 0;
  iceSelected = 0;
  switch (name) {
    case 'flame':
      flameSelected = 1;
      console.log('Flame fruit activated');
      break;
    case 'sound':
      soundSelected = 1;
      console.log('Sound fruit activated')
      break;
    case 'ice':
      iceSelected = 1;
      console.log('Ice fruit activated')
      break;
    case 'gravity':
      gravitySelected = 1;
      console.log('Gravity fruit activated')
      break;
  }
}
// What fruit you have :)
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


// 24hrs!