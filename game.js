const img = new Image();
const brickDel = [9, 8, 8, 7, 7, 4, 4, 3, 3, 6];
const explosionCenter = [66, 65, 64, 63, 62, 63, 64, 65, 66, 1];
const explosionUp = [84, 83, 82, 81, 80, 81, 82, 83, 84, 1];
const explosionDown = [72, 71, 70, 69, 68, 69, 70, 71, 72, 1];
const explosionRight = [78, 77, 76, 75, 74, 75, 76, 77, 78, 1];
const explosionLeft = [90, 89, 88, 87, 86, 87, 88, 89, 90, 1];
const bombPics = [13, 14, 15, 14, 13, 14, 15, 14, 13, 14];
const botPics = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];
const world = document.getElementById('game');
const scoreBoard = document.getElementById("scoreboard");
const gameMenu = document.getElementById("menu");
const gameMenuLI = document.querySelectorAll(".list li");
const cheats = document.getElementById("cheats");
const fps = document.getElementById('fps');
const music = document.getElementById('music');
const effects = document.getElementById('effects');
const timediv = document.getElementById('time');
const scorediv = document.getElementById('score');
const livesdiv = document.getElementById('lives');
const leveldiv = document.getElementById('level');
const nextStage = document.getElementById("stage");
const header = document.getElementById("header2");
const title = document.getElementById("title");
const man = document.createElement('div');
const chars = document.getElementById("chars")
const bot1 = document.createElement('div');
const bot2 = document.createElement('div');
const bot3 = document.createElement('div');
const movementSpeed = 0.0625;
const botMovementSpeed = 0.04;
const frameLimit = 12;
const defaultFPS = 60;
const dir = ["up", "down", "left", "right"];
const baseMap = [
    [17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17],
    [17,  0,  0, 16,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 17],
    [17,  0, 17,  ,  17,   , 17,   , 17,   , 17,   , 17,   , 17],
    [17, 16,   ,  ,    ,   ,   ,   ,   0,   ,   ,   ,   ,   , 17],
    [17,   , 17,  ,  17,   , 17,   , 17,   , 17,   , 17,   , 17],
    [17,   ,   ,   ,   ,   ,   ,   ,   0,   ,   ,   ,   ,   , 17],
    [17,   , 17,   , 17,   , 17,   , 17,   , 17,   , 17,   , 17],
    [17,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 17],
    [17,   , 17,  ,  17,   , 17,   , 17,   , 17,   , 17,   , 17],
    [17,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 17],
    [17,   , 17,  ,  17,   , 17,   , 17,   , 17,   , 17,   , 17],
    [17,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 17],
    [17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17]
  ];
const walk = new Audio('static/sound/walking-1.wav');
const bombPlanted = new Audio('static/sound/bombplant.mp3');
const explosion = new Audio('static/sound/Bomb Explodes.wav');
const item = new Audio('static/sound/Item Get.wav');
const gogo = new Audio('static/sound/letsgo.mp3');
const enemyDown = new Audio('static/sound/enemydown.mp3');
const death = new Audio('static/sound/Bomberman Dies.wav');
const stage = new Audio('static/sound/Stage Clear.wav');
const cursor = new Audio('static/sound/screenscroll.wav');
const timesUp = new Audio('static/sound/timeisup.wav');
const mainMenuMusic = new Audio('static/sound/menu.mp3');
const gameMusic = new Audio('static/sound/mainmusic.mp3');
let cheatmode = false;
let applefound = false;
let portalfound = false;
let softwalls = [];
let manX = 1;
let manY = 1;
let arena = [];
let keys = [];
let bombUsed = false;
let divMap = [];
let divRow = [];
let sprite;
let enemy1 = {x: 13, y: 1, direction: "", dead: true};
let enemy2 = {x: 13, y: 11, direction: "", dead: true};
let enemy3 = {x: 1, y: 11, direction: "", dead: true};
let aliveBots = 1;
let currentLI = 0;
let menuListLength = 1;
let firstTime = true;
let inPauseMenu = false;
let isRunning = true;
let inMainMenu = true;
let inGameOverMenu = false;
let nextLevel = false;
let listStartIndex = 0;
let [milliseconds,seconds,minutes] = [0,0,3];
let timeOver = false;
let score = 0;
let bombTimeIndex = 0;
let explosionIndex = 0;
let bombIndex = 0;
let botDeathTimeIndex = 0;
let levelDelay = 0;
let immortalTimeIndex = 0;
let counterFPS = 0;
let level = 1;
let levelStartTimeIndex = 1;
let musicMute = true;
let effectsMute = false;
let manDeathSoundPlay = false;
let apple = 0;
let timer = 0;
let immortal = false;
let manDied = false;
let loopImageX = [5];
let imageY = 3;
let frameCount = 0;
let frameCount2 = 0;
let frameCount3 = 0;
let manPicIndex = 0;
let botPicIndex = 0;
let immortalIndex = 0;
let currentTime;
let interval = 1000/defaultFPS;
let delta;
let opacity = 1;
let lives = 3;
let sounds = [];
let botIndex = 0;
let emptyBoxes = [];
let validboxes = [];
let loop = [];
let start;
let lastFrame = 0;
let currentFrame;
let startTime;
gameMenuLI[currentLI].classList.add("highlight");
gameMenuLI[1].style.display = "none";
gameMenuLI[2].style.display = "none";
keys[37] = false;
keys[38] = false;
keys[39] = false;
keys[40] = false;
sounds.push(walk);
sounds.push(bombPlanted);
sounds.push(explosion);
sounds.push(item);
sounds.push(gogo);
sounds.push(enemyDown);
sounds.push(death);
sounds.push(stage);
sounds.push(cursor);
sounds.push(timesUp);
mainMenuMusic.volume = 0.3;
mainMenuMusic.loop = loop;
gameMusic.volume = 0.3;
gameMusic.loop = loop;
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
function keysPressed(e) {
    if (e.repeat) {
        return;
    }
    keys[e.keyCode] = true;
    e.preventDefault();
}
function keysReleased(e) {
    keys[e.keyCode] = false;
}
function loadImage() {
    img.src = `static/images/characters.png`
    img.onload = () => {
    window.requestAnimationFrame(gameLoop)
    }
}
loadImage()
function createArena() { //function to create 15x13 bomberman arena based on basemap
    for (let y = 0; y < 13; y++) {
        arena[y] = []
        for (let x = 0; x < 15; x++) {
            if (!baseMap[y][x] && Math.random() < 0.3 && baseMap[y][x] !== 0) {
                arena[y][x] = 16
            } else if (!baseMap[y][x]){
                arena[y][x] = 1
            } else {
                arena[y][x] = baseMap[y][x]
            }
        }  
    }
}
createArena()
function makeArenaElements() { // function to make html bomberman elements (squares)
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 15; x++) {
            sprite = document.createElement('div');
            sprite.style.height = '16px';
            sprite.style.width = '16px';
            sprite.style.backgroundImage = `url(${img.src})`;
            sprite.style.zoom = `300%`;
            sprite.style.verticalAlign = "top";
            sprite.style.display = "inline-block";
            sprite.style.zIndex = "1";
            world.appendChild(sprite);
            divRow.push(sprite)
        }
        divMap.push(divRow)
        divRow = []
    }
}
function collide(x, y) { // function to check, if character is allowed to move where they want to move (if there is hard block or brick block, they are not allowed to)
    for (let i = 62; i <= 90; i++) {
        if (arena[y][x] === i && i !== 67 && i !== 73) {
            return false
        }
    }
    if (arena[y][x] === 1 || arena[y][x] == 2 || arena[y][x] == 61) {
        return false
    } else if (bombUsed && (arena[y][x] === 13 || arena[y][x] === 14|| arena[y][x] === 15) && ((manX - x) < 0.5 && manX > x || (x - manX) < 0.5 && manX < x  || (manY - y) < 0.5 && manY > y || (y - manY) < 0.5 && manY < y)) {
        // check if you have just planted the bomb and if you have, you are allowed to move freely away from it (in 0.5x0.5 block radius)
        return false
    } else {
        return true
    }
}
function collideBot(x, y) { //function to check bot move restrictions by same logic, than character collide
    for (let i = 62; i <= 90; i++) {
        if (arena[y][x] === i && i !== 67 && i !== 73) {
            return false
        }
    }
    if (arena[y][x] === 1 || arena[y][x] == 2 || arena[y][x] == 61) {
        return false
    } else {
        return true
    }
}
function botToBotCollide(bot1x, bot1y, bot2, bot3) { //collide function to check bot on bot movement
    if (!bot2.dead) {
        if (Math.abs(bot1x - bot2.x) <= 0.95 && Math.abs(bot1y - bot2.y) <= 0.95){
            return true
        }
    } 
    if (!bot3.dead) {
        if (Math.abs(bot1x - bot3.x) <= 1 && Math.abs(bot1y - bot3.y) <= 1) {
            return true
        }
    } 
    return false
}
function checkCorner(a) { //function to round coordinates so you dont have to be pixel perfect to fit between blocks!
    b = a % 1
    if(b<=0.25 && b>0) {
        a = Math.floor(a)
    } else if(b>=0.75 && b<1) {
        a = Math.ceil(a)
    }
    return a
}
function checkIfNextOrPrevBox(a) { //function that rounds bomb coordinates (it always lands on the center of the box, not between them)
    b = a % 1
    if(b<0.5 && b>0) {
        a = Math.floor(a)
    } else if(b>=0.5 && b<1) {
        a = Math.ceil(a)
    }
    return a
}
function makePowerups() { //creates brick wall array that we later use for making easter eggs that come out behind the wall
    let index = 0
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 15; x++) {            
            if (arena[y][x] == 16) {               
                softwalls.push(index)
            }
            index++
        }
    }
}
function checkIfSoftwall(y, x) { // function for bomb (check what kind squares are next to bomb and make according animations for it)
    arena[y][x] = explosionCenter[explosionIndex]
    if (arena[y-1][x] === 16 || arena[y-1][x] === 67 || arena[y-1][x] === 73 || brickDel.includes(arena[y-1][x])) { //up
        arena[y-1][x] = brickDel[explosionIndex]
    } else if (explosionUp.includes(arena[y-1][x])) {
        arena[y-1][x] = explosionUp[explosionIndex]
    }
    if (arena[y+1][x] === 16 || arena[y+1][x] === 67 || arena[y+1][x] === 73 || brickDel.includes(arena[y+1][x])) { //down
        arena[y+1][x] = brickDel[explosionIndex]
    } else if (explosionDown.includes(arena[y+1][x])) {
        arena[y+1][x] = explosionDown[explosionIndex]
    }
    if (arena[y][x-1] === 16 || arena[y][x-1] === 67 ||  arena[y][x-1] === 73 || brickDel.includes(arena[y][x-1])) { //left
        arena[y][x-1] = brickDel[explosionIndex]
    } else if (explosionLeft.includes(arena[y][x-1])) {
        arena[y][x-1] = explosionLeft[explosionIndex]
    }
    if (arena[y][x+1] === 16 || arena[y][x+1] === 67 || arena[y][x+1] === 73 || brickDel.includes(arena[y][x+1])) { //right
        arena[y][x+1] = brickDel[explosionIndex]
    } else if (explosionRight.includes(arena[y][x+1])) {
        arena[y][x+1] = explosionRight[explosionIndex]
    }
}
function drawLayout() { // function to paint our arena to html page
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 15; x++) {
            const elementx = (arena[y][x] % 6) * 16;
            const elementy = Math.ceil(arena[y][x]/6) * 16 ;
            divMap[y][x].style.backgroundImage = `url(${img.src})`;
            divMap[y][x].style.backgroundPosition = `${elementx}px ${elementy}px`;
        }
    }
}
function checkBotPos(bot) { //function to check, if bot has died (by flames) ...
    for (let i = 62; i <= 90; i++) {
        if (arena[checkIfNextOrPrevBox(bot.y)][checkIfNextOrPrevBox(bot.x)] === i) {
            enemyDown.play()
            bot.dead = true
            aliveBots -= 1
            botDeathTimeIndex = 1
            opacity = 1
            score += 100
        }
        if (checkIfNextOrPrevBox(bot.y) === checkIfNextOrPrevBox(manY) && checkIfNextOrPrevBox(bot.x) === checkIfNextOrPrevBox(manX) && !immortal) {
            manDied = true
            manDeathSoundPlay = true
            //... or character has walked into bot and died himself :( (there is also 0.5x0.5 box rule implemented here, so it's possible to trap bots in corners)
        }
    }
}
function checkManPos(a, b) { //function to check if man has walked into the fire..
    for (let i = 62; i <= 90; i++) {
        if ((arena[a][b] === i) && !immortal){
            manDied = true
            manDeathSoundPlay = true
        }
        if (arena[a][b] === 2) { //.. or collected hidden easteregg..
            item.play()
            score += 200
            arena[a][b] = 1
            apple = 0
        }
        if (arena[a][b] === 61 && enemy1.dead && enemy2.dead && enemy3.dead) { //..or completed the level
            opacity = 1
            nextLevel = true
            stage.play()
            gameMusic.pause()
        }
    }
}
function createMan() { //function to create our characters html div
    man.style.backgroundImage = `url(${img.src})`;
    man.style.marginLeft = '0';
    man.style.marginTop = '-16px';
    man.style.height = '32px';
    man.style.width = '16px';
    man.style.zoom = "300%"
    man.style.position = "absolute";
    man.style.zIndex = "100";
    chars.appendChild(man);
    man.style.transform = `translate(${manX *16}px, ${manY *16}px)`;
}
function createBot(div, x, y) { //function to create bots html div
    div.style.backgroundImage = `url(${img.src})`;
    div.style.marginLeft = '0';
    div.style.marginTop = '0';
    div.style.height = '16px';
    div.style.width = '16px';
    div.style.zoom = "300%"
    div.style.position = "absolute";
    div.style.zIndex = "100";
    chars.appendChild(div);
    div.style.transform = `translate(${x *16}px, ${y *16}px)`;
}
function drawMan (frameX, frameY) { //function to paint character into arena
    const elementx = frameX * 16;
    const elementy = (frameY * 32) -16;
    man.style.backgroundPosition = `${elementx}px ${elementy}px`;
}
function drawBot (div, frameX, frameY) { //function to paint bot into arena
    const elementx = frameX * 16;
    const elementy = (frameY * 16) - 16;
    div.style.backgroundPosition = `${elementx}px ${elementy}px`;
}
function deadMan() { //function for characters death..
    if (manDeathSoundPlay) {
        death.play()
        manDeathSoundPlay = false
    }
    loopImageX = [6, 5, 4, 3, 2, 1]
    frameCount++;
    if (frameCount >= frameLimit) { //using counting frames to delay some animations, because setTimeout is pain with pauses in place
        frameCount = 0;
        manPicIndex++;
        timer++
    }
    drawMan(loopImageX[manPicIndex], 5.5) //dying characters animation
    if (timer == 10) { //if animation is over, reset characters stats and make him immortal for some time
        imageY = 3
        minutes = 3
        seconds = 0
        timeOver = false
        manPicIndex = 0
        loopImageX = [5]
        lives -= 1
        timer = 0
        immortal = true
        manDied = false
        if (lives === 0) {
            man.style.opacity = "0"
        } else {
            manX = 1
            manY = 1
        }
    }
}
function movementMan() { //function to read players inputs and moving character based on them
    if (immortal) {
        const imm = ["1", "0.5", "1"]
        frameCount3++;
        if (frameCount3 >= 10) {
            frameCount3 = 0;
            immortalIndex++;
            if (immortalIndex >= imm.length) {
                immortalIndex = 0;
            }
        }
        man.style.opacity = imm[immortalIndex]
    } 
    let hasMoved = false;
    if (keys[37]) { //left arrow key
        walk.play()
         if(keys[38] === false && keys[40] === false) {
             manY = checkCorner(manY)
         }
         if(Number.isInteger(manY) && !collide(Math.floor(manX - movementSpeed), manY)) { 
         manX -= movementSpeed
         loopImageX = [9,7,9,8]
         imageY = 4
         hasMoved = true
         }
         loopImageX = [9,7,9,8]
         imageY = 4
       
     }
     if (keys[39]) { //right arrow key
         walk.play()
         if(keys[38] === false && keys[40] === false) {
             manY = checkCorner(manY)
         }
         if(Number.isInteger(manY) && !collide(Math.ceil(manX + movementSpeed), manY)) {
         manX += movementSpeed
         loopImageX = [9,7,9,8]
         imageY = 3
         hasMoved = true
         }
         loopImageX = [9,7,9,8]
         imageY = 3
     }
     if (keys[38]) { //up arrow key
         walk.play()
         if(keys[37] === false && keys[39] === false) {
             manX = checkCorner(manX)
         }
         if( Number.isInteger(manX) && !collide(manX, Math.floor(manY - movementSpeed))) {
         manY -= movementSpeed
         loopImageX = [5,4,5,6]
         imageY = 4
         hasMoved = true
         }
         loopImageX = [5,4,5,6]
         imageY = 4
     }
     if (keys[40]) { //down arrow key
         walk.play()
         if(keys[37] === false && keys[39] === false) {
             manX = checkCorner(manX)
         }
         if(Number.isInteger(manX) && !collide(manX, Math.ceil(manY + movementSpeed))) {
         manY += movementSpeed
         loopImageX = [5,4,5,6]
         imageY = 3
         hasMoved = true
         }
         loopImageX = [5,4,5,6]
         imageY = 3
     }
     if (hasMoved) { //walking animation
         frameCount++;
         if (frameCount >= frameLimit) {
             frameCount = 0;
             manPicIndex++;
             if (manPicIndex >= loopImageX.length) {
                 manPicIndex = 0;
             }
         }
     }
     if (!hasMoved) {
         manPicIndex = 0;
     }
}
function movementBot(div, bot1, bot2, bot3) { //function to move bot around the arena based on randomly chosen direction
    let ran = Math.floor(Math.random() * 4);
            if (bot1.direction == "down") {
                if (botToBotCollide(bot1.x, bot1.y + botMovementSpeed, bot2, bot3)) {
                    bot1.direction = "up"
                } else if(Number.isInteger(bot1.x) && !collideBot(bot1.x, Math.ceil(bot1.y + botMovementSpeed))) {
                    bot1.y += botMovementSpeed
                } else {
                    bot1.y = checkCorner(bot1.y)
                    bot1.direction = dir[ran]
                }
            } else if (bot1.direction == "left"){
                if(botToBotCollide(bot1.x - botMovementSpeed , bot1.y, bot2, bot3)) {
                    bot1.direction = "right"
                } else if(Number.isInteger(bot1.y) && !collideBot(Math.floor(bot1.x - botMovementSpeed), bot1.y)) {
                    bot1.x -= botMovementSpeed
                } else {
                    bot1.x = checkCorner(bot1.x)
                    bot1.direction = dir[ran]
                }
            } else if (bot1.direction == "right"){
                if (botToBotCollide(bot1.x + botMovementSpeed, bot1.y, bot2, bot3)) {
                    bot1.direction = "left"
                } else if (Number.isInteger(bot1.y) && !collideBot(Math.ceil(bot1.x + botMovementSpeed), bot1.y)) {
                    bot1.x += botMovementSpeed
                } else {
                    bot1.x = checkCorner(bot1.x)
                    bot1.direction = dir[ran]
                }
            } else if (bot1.direction == "up"){
                if (botToBotCollide(bot1.x, bot1.y - botMovementSpeed, bot2, bot3)) {
                    bot1.direction = "down"
                } else if(Number.isInteger(bot1.x) && !collideBot(bot1.x, Math.floor(bot1.y - botMovementSpeed))) {
                    bot1.y -= botMovementSpeed
                } else {
                    bot1.y = checkCorner(bot1.y)
                    bot1.direction = dir[ran]
                }
            }
            frameCount2++;
            if (frameCount2 >= 7 * aliveBots) { //bots animation
                frameCount2 = 0;
                botPicIndex++;
                if (botPicIndex >= botPics.length) {
                    botPicIndex = 0;
                }
            }
            div.style.transform = `translate(${bot1.x *16}px, ${bot1.y *16}px)`;
            drawBot(div, botPics[botPicIndex],9)
}
function findEmpty() { //function to create array of empty squares on arena so we can randomly place bots afterwards
    let index = 0
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 15; x++) {
            if (arena[y][x] == 1 && index !== 16 && index !== 17 && index !== 31) {
                emptyBoxes.push(index)
            }
            index++
        }
    }
    for (let j = 0; j < emptyBoxes.length; j++) {
        if (!validboxes.includes(emptyBoxes[j] - 15) && !validboxes.includes(emptyBoxes[j] - 1)){
            validboxes.push(emptyBoxes[j])
        
        }
    }
}
function startGame() { //function to start the game and make required paintings/variables
    createMan()
    man.style.backgroundImage = `url(${img.src})`;
    console.log(manX)
    man.style.transform = `translate(${manX*16}px, ${manY*16}px)`;
    findEmpty()
    enemy1.direction = dir[Math.floor(Math.random() * 4)]
    botIndex = Math.floor(Math.random() * validboxes.length)
    enemy1.y = Math.floor(validboxes[botIndex]/15)
    enemy1.x = Math.floor(validboxes[botIndex]%15)
    validboxes.splice(botIndex, 1)
    enemy1.dead = false
    createBot(bot1, enemy1.x, enemy1.y)
    if (!effectsMute) {
        sounds.forEach((mode) => {
            mode.volume = 0.3
        })
    }
    if (!musicMute) {
        gameMusic.play()
    }
    makePowerups()
    appleindex = Math.floor(Math.random() * softwalls.length)
    apple = softwalls[appleindex]
    softwalls.splice(appleindex, 1)
    portalindex = Math.floor(Math.random() * softwalls.length)
    portal = softwalls[portalindex]
    makeArenaElements()
}
function levelUp() { // function to reset game with higher level, if it is achieved
    resetVars()
    findEmpty()
    aliveBots = level
    enemy1 = {x: 13, y: 1, direction: "", dead: true};
    enemy2 = {x: 13, y: 11, direction: "", dead: true};
    enemy3 = {x: 1, y: 11, direction: "", dead: true};
    let bots = {enemy1, enemy2, enemy3}
    createBot(bot1, enemy1.x, enemy1.y)
    createBot(bot2, enemy2.x, enemy2.y)
    createBot(bot3, enemy3.x, enemy3.y)
    for (let i = 0; i < level; i++) {
        let asd = bots[Object.keys(bots)[i]];
        asd.dead = false
        botIndex = Math.floor(Math.random() * validboxes.length)
        asd.y = Math.floor(validboxes[botIndex]/15)
        asd.x = validboxes[botIndex]%15
        asd.direction = dir[Math.floor(Math.random() * 4)]
        validboxes.splice(botIndex, 1)
    }
    applefound = false
    portalfound = false
}
function restartGame() { //function to restart game
    resetVars()
    aliveBots = 1
    enemy2.dead = true
    enemy3.dead = true
    findEmpty()
    botIndex = Math.floor(Math.random() * validboxes.length)
    enemy1.y = Math.floor(validboxes[botIndex]/15)
    enemy1.x = Math.floor(validboxes[botIndex]%15)
    enemy1.direction = dir[Math.floor(Math.random() * 4)]
    validboxes.splice(botIndex, 1)
    enemy1.dead = false
    createBot(bot1, enemy1.x, enemy1.y)
    manDied = false
    bot1.style.opacity = opacity
    score = 0
    lives = 3
    level = 1
    nextLevel = false
    applefound = false
    portalfound = false
}
function resetVars() { //variable reseting function
    validboxes = []
    botPicIndex = 0
    emptyBoxes = []
    manPicIndex = 0
    loopImageX = [5]
    imageY = 3
    manX = 1;
    manY = 1;
    opacity = 1
    immortal = false
    botDeathTimeIndex = 0
    bombUsed = false
    bombIndex = 0
    bombTimeIndex = 0
    explosionIndex = 0
    deltaXbomb = 0
    deltaYbomb = 0
    milliseconds = 0
    seconds = 0
    minutes = 3
    gameMusic.pause()
    gameMusic.currentTime = 0
    gogo.currentTime = 0
    if (!musicMute) {
           gameMusic.play()
    }
    man.style.opacity = opacity
    createArena()
    softwalls = []
    makePowerups()
    appleindex = Math.floor(Math.random() * softwalls.length)
    apple = softwalls[appleindex]
    softwalls.splice(appleindex, 1)
    portalindex = Math.floor(Math.random() * softwalls.length)
    portal = softwalls[portalindex]
}
function menuMovement() { //function to read users inputs at game menu
    if (inPauseMenu || inGameOverMenu) {
        if (keys[38]) {
            cursor.currentTime = 0
            gameMenuLI[currentLI].classList.remove("highlight");
            cursor.play()
            currentLI = currentLI > listStartIndex ? --currentLI : listStartIndex;     // Decrease the counter      
            gameMenuLI[currentLI].classList.add("highlight"); // Highlight the new element
            keys[38] = false
        }
        if (keys[40]) {
            cursor.currentTime = 0
            gameMenuLI[currentLI].classList.remove("highlight");
            cursor.play()
            currentLI = currentLI < menuListLength-1 ? ++currentLI : menuListLength-1; // Increase counter 
            gameMenuLI[currentLI].classList.add("highlight");       // Highlight the new element
            keys[40] = false
        }
    }
    if (inPauseMenu || inGameOverMenu || inMainMenu) {
        if (keys[13]) {
            if (gameMenuLI[currentLI].value === 1 && inPauseMenu) {
                gameMenu.style.display = "none"
                isRunning = true
                inPauseMenu = false
            } else if (gameMenuLI[currentLI].value === 1 && inMainMenu){
                inMainMenu = false
                isRunning = true
                mainMenuMusic.pause()
                mainMenuMusic.currentTime = 0
                if (firstTime) {
                    gameMenu.style.display = "none";
                    scoreBoard.style.display = "inline-block";
                    startGame()
                    firstTime = false
                } else {
                    gameMenu.style.display = "none";
                    scoreBoard.style.display = "inline-block";
                    levelStartTimeIndex = 1
                    restartGame()
                }
            }
            if (gameMenuLI[currentLI].value === 2 && inPauseMenu) {
                gameMenu.style.display = "none"
                isRunning = true
                inPauseMenu = false
                levelStartTimeIndex = 1
                restartGame()
            } else if (gameMenuLI[currentLI].value === 2 && inGameOverMenu) {
                gameMenu.style.display = "none"
                isRunning = true
                inGameOverMenu = false
                levelStartTimeIndex = 1
                restartGame()
            }
            if ((gameMenuLI[currentLI].value === 3 && inPauseMenu) || gameMenuLI[currentLI].value === 3 && inGameOverMenu) {
                gameMenu.style.display = "block"
                gameMenu.style.backgroundColor = "rgb(121, 121, 121)"
                gameMenuLI[0].innerText = "START"
                gameMenuLI[0].style.display = "block"
                gameMenuLI[1].style.display = "none"
                gameMenuLI[2].style.display = "none"
                scoreBoard.style.display = "none";
                isRunning = false
                inMainMenu = true
                inPauseMenu = false
                inGameOverMenu = false
                gameMenuLI[currentLI].classList.remove("highlight");
                currentLI = 0
                listStartIndex = 0
                title.innerText = "MAIN MENU"
                gameMenuLI[currentLI].classList.add("highlight");
                gameMusic.pause()
                gameMusic.currentTime = 0
                if (!musicMute) {
                    mainMenuMusic.play()
                }
                menuListLength = 1
            } 
            keys[13] = false
        }
    }
    
}
function bomba() { //function to handle bombs and creating timeouts for animations
    let port = false
    if ((checkIfNextOrPrevBox(manX) === portal%15 && checkIfNextOrPrevBox(manY) === Math.floor(portal/15))) {
        port = true
    }
    if (keys[32] && !bombUsed && !manDied && !port) {
        bombPlanted.play()
        deltaXbomb = checkIfNextOrPrevBox(manX)
        deltaYbomb = checkIfNextOrPrevBox(manY)
        bombUsed = true
    }
    if (bombUsed) {
        bombTimeIndex ++
        if (bombTimeIndex % 12 === 0 && bombIndex < bombPics.length) {
            arena[deltaYbomb][deltaXbomb] = bombPics[bombIndex]
            bombIndex++;
        }
        if (bombTimeIndex === 120) {
            explosion.play()
        }
            if (bombTimeIndex >= 120 && bombTimeIndex % 6 === 0 && explosionIndex < explosionCenter.length) {
                checkIfSoftwall(deltaYbomb, deltaXbomb)
                explosionIndex++;
            }
        if (bombTimeIndex === 180) {
            clearArena()
            bombTimeIndex = -1
            bombIndex = 0
            explosionIndex = 0
            bombUsed = false
        }
    }
}
function clearArena() { //function for clearing bombs from arena after explosion
    for (let y = 0; y < 13; y++) {
        for (let x = 0; x < 15; x++) {
            if (arena[y][x] === 6 && y === Math.floor(apple/15) && x === apple%15) {
                arena[y][x] = 2
                applefound = true
            } else if (arena[y][x] === 6 && y === Math.floor(portal/15) && x === portal%15){
                arena[y][x] = 61
                portalfound = true
            }else if (arena[y][x] === 6){
                arena[y][x] = 1
            }
        }
    }
}
function stopwatch () { //timer function
    if (seconds <= 0) {
        minutes -= 1
        seconds = 60
    }
    if (milliseconds <= 0) {
        seconds -= 1
        milliseconds = 1000
    }
    if (seconds < 0 || minutes < 0 || milliseconds < 0) {
        timeOver = true
    }
    if (minutes === 0 && seconds <= 4) {
        timesUp.play()
    }
}
function muteSound() { //sounds mute function
    if (keys[77] && !musicMute) {
        gameMusic.pause()
        mainMenuMusic.pause()
            musicMute = true
            music.innerText = "MUSIC: OFF"
        keys[77] = false
    } 
    if (keys[77] && musicMute) {
        if (!inMainMenu) {
            gameMusic.play()
        } else {
            mainMenuMusic.play()
        }
            musicMute = false
            music.innerText = "MUSIC: ON"
        keys[77] = false
    }
    if (keys[78] && effectsMute) {
        sounds.forEach((mode) => {
            mode.volume = 0.3
        })
            effectsMute = false
            effects.innerText = "SOUND EFFECTS: ON"
        keys[78] = false
    }
    if (keys[78] && !effectsMute) {
        sounds.forEach((mode) => {
            mode.volume = 0
        })
            effectsMute = true
            effects.innerText = "SOUND EFFECTS: OFF"
        keys[78] = false
    }
}
function gameLoop(time) { //main gameloop
    currentTime = Date.now();
    muteSound()
    if (currentTime - startTime >= 1000) { //fps counter updates after 1s
    fps.innerHTML = (counterFPS / ((currentTime - startTime) / 1000)).toFixed(1)  + " FPS";
    startTime = currentTime
    counterFPS = 0;
    }
    if(start === undefined){
        start = time;
        startTime = currentTime
    } else {
        currentFrame = Math.round((time - start) / interval);
        delta = (currentFrame - lastFrame) * interval;
    }
    if (delta >= interval) { //make game run at 60FPS
        if (keys[88]) {
            if (!cheatmode) {
                cheatmode = true
                cheats.innerHTML = "CHEATS: ON"
            } else {
                cheatmode = false
                cheats.innerHTML = "CHEATS: OFF"
            }
            keys[88] = false
        } 
        menuMovement()
        if (levelStartTimeIndex < 185 && levelStartTimeIndex >= 2) { //next level animation with some delay
            levelStartTimeIndex ++
            header.innerText = "LEVEL " + level
            nextStage.style.display = "block"
            nextStage.classList.add("hide");
            isRunning = false
            if (levelStartTimeIndex === 184) {
                nextStage.style.display = "none"
                gogo.play()
                isRunning = true
                levelStartTimeIndex = 0
            }    
        }
        if (nextLevel) { //stage cleared and preparing for next level
            levelDelay ++
            opacity = opacity - 0.01
            man.style.opacity = opacity
            isRunning = false
            if (levelDelay === 250) {
                levelDelay = 0
                nextLevel = false
                level += 1
             if (level === 4) { //if level 3 is cleared, game is won
                    title.innerText = "YOU WON GZ"
                    gameMenu.style.display = "block";
                    gameMenuLI[1].style.display = "block"
                    gameMenuLI[2].style.display = "block"
                    gameMenuLI[0].style.display = "none"
                    gameMenuLI[currentLI].classList.remove("highlight");
                    currentLI = 1
                    gameMenuLI[currentLI].classList.add("highlight");
                    listStartIndex = 1
                    level -= 1
                    menuListLength = 3
                    inGameOverMenu = true
                    gameMenu.style.backgroundColor = "rgb(0, 255, 255, 0.5)"
                    isRunning = false
                } else { //else increase the level
                    levelUp()
                    isRunning = true
                    levelStartTimeIndex = 1
                }
            }       
        }
        if (!inMainMenu  && isRunning) { //main loop for game functions
            if (cheatmode) { //cheat mode to make audits easier (show where portal and apple is)
                if (!bombUsed && !portalfound) {
                    arena[Math.floor(portal/15)][portal%15] = 67
                }
                if (!bombUsed && !applefound) {
                    arena[Math.floor(apple/15)][apple%15] = 73
                }
            } else {
                if (!bombUsed && !portalfound) {
                    arena[Math.floor(portal/15)][portal%15] = 16
                }
                if (!bombUsed && !applefound) {
                    arena[Math.floor(apple/15)][apple%15] = 16
                }
            }
            if (levelStartTimeIndex === 1) {
                levelStartTimeIndex ++
            }
            if (keys[80] && !inMainMenu) { //pause handler
                gameMenu.style.backgroundColor = "rgb(0, 255, 255, 0.5)"
                title.innerText = "PAUSED"
                gameMenu.style.display = "block";
                gameMenuLI[0].innerText = "RESUME"
                gameMenuLI[0].style.display = "block"
                gameMenuLI[1].style.display = "block"
                gameMenuLI[2].style.display = "block"
                isRunning = false
                inPauseMenu = true
                listStartIndex = 0
                menuListLength = 3
            }
            if (!timeOver) {
                milliseconds -= 1000/60
                stopwatch()
            } else {
                [milliseconds,seconds,minutes] = [0,0,0];
                manDied = true
                manDeathSoundPlay = true
            }
            bomba()
            if (!manDied) { //player handler
                checkManPos(checkIfNextOrPrevBox(manY), checkIfNextOrPrevBox(manX))
                movementMan()
                drawMan(loopImageX[manPicIndex], imageY)
            } else {
                deadMan()
            } 
            if (immortal) {
                immortalTimeIndex ++
            }
            if (immortalTimeIndex === 480) {
                immortal = false
                immortalTimeIndex = 0
            }
            if (!enemy1.dead) { //bot 1 handler
                checkBotPos(enemy1)
                bot1.style.opacity = 1
                movementBot(bot1, enemy1, enemy2, enemy3)
            } else {
                if (botDeathTimeIndex <= 99 && botDeathTimeIndex >= 1) {
                    botDeathTimeIndex ++
                    opacity = opacity - 0.01
                    bot1.style.opacity = opacity
                } else {
                    bot1.remove()
                    botDeathTimeIndex = 0
                } 
            }
            if (!enemy2.dead) { //bot 2 handler
                checkBotPos(enemy2)
                bot2.style.opacity = 1
                movementBot(bot2, enemy2, enemy1, enemy3)
            } else {
                if (botDeathTimeIndex <= 99 && botDeathTimeIndex >= 1) {
                    botDeathTimeIndex ++
                    opacity = opacity - 0.01
                    bot2.style.opacity = opacity
                } else {
                    bot2.remove()
                    botDeathTimeIndex = 0
                }
            }
            if (!enemy3.dead) { //bot 3 handler
                checkBotPos(enemy3)
                bot3.style.opacity = 1
                movementBot(bot3, enemy3, enemy1, enemy2)
            } else {
                if (botDeathTimeIndex <= 99 && botDeathTimeIndex >= 1) {
                botDeathTimeIndex ++
                opacity = opacity - 0.01
                bot3.style.opacity = opacity
                } else {
                    bot3.remove()
                    botDeathTimeIndex = 0
                }                        
            }
            man.style.transform = `translate(${manX *16}px, ${manY *16}px)`;
            drawLayout()
            if (lives === 0) {
                manDied = true
                gameMenu.style.display = "block";
                title.innerText = "GAME OVER"
                gameMenuLI[1].style.display = "block"
                gameMenuLI[2].style.display = "block"
                gameMenuLI[0].style.display = "none"
                gameMenuLI[currentLI].classList.remove("highlight");
                currentLI = 1
                gameMenuLI[currentLI].classList.add("highlight");
                listStartIndex = 1
                menuListLength = 3
                inGameOverMenu = true
                gameMenu.style.backgroundColor = "rgb(0, 255, 255, 0.5)"
                isRunning = false
            }
        }
        timediv.innerText = "TIME: " + minutes + ":" + seconds + ":" + Math.round(milliseconds/100)
        scorediv.innerText = "SCORE: " + score
        livesdiv.innerText = "LIVES: " + lives
        leveldiv.innerText = "LEVEL: " + level
        lastFrame = currentFrame
        counterFPS ++
    } 
    requestAnimationFrame(gameLoop)
}