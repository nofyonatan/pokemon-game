// get the canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // used to draw on the canvas

// width and height
canvas.width = 1024;
canvas.height = 576;

// collisoin
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

// battle zones
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

// house collision
const houseCollisionMap = [];
for (let i = 0; i < houseCollision.length; i += 13) {
    houseCollisionMap.push(houseCollision.slice(i, 13 + i));
}

// bar collisoin
const barCollisionMap = [];
for (let i = 0; i < barCollision.length; i += 22) {
    barCollisionMap.push(barCollision.slice(i, 22 + i));
}

// VARIABLES
// where the image of the map needs to start
const offset = {
    x: -735,
    y: -650
}

// where the image of the cave needs to start
const offsetCave = {
    x: -160,
    y: -1035
}

// An array that store all the achievements
const Allachievements = [
    ...document.querySelectorAll('#Achievements h2')
];

// Add blur to all achievements except the first achievement.
for (let i = 1; i < Allachievements.length; i++) {
    Allachievements[i].classList.add('blur');
}

// A varible that represent if the game can start or not
let gameStarted = false;
// A varible that shows what is the velocity of the player
let velocity = 3 
// A variable that represents when player number 3(a bot) can move
let player3moving = true;
// A variable that represents when player number 5(a bot) can move
let player5moving = true;

// A variable that represents if can be a dialogue with player 4
let dialoguePlayer4 = true;

// A variable that represents when there is a collision between player 1 and player 2
let collisionPlayer1Player2 = false;
// A variable that represents when there is a collision between player 1 and player 2
let collisionPlayer1Player7 = false;
// A variable that represents when there is a collision between player 1 and Rob's Chicken
let collisionPlayerRobChicken = false;

// A varible that represents the player position before he gets into the something
let pastPlayerPosition = {
    x: null,
    y: null
}
// A varible that represents the player 2 position before he gets into the house
let pastPlayer2Position = {
    x: null,
    y: null
}
// A varible that represents the player 7 position before he gets into the bar
let pastPlayer7Position = {
    x: null,
    y: null
}
// A varible that represents the hat position before it gets into the bar
let pastHatPosition = {
    x: null,
    y: null
}

// Achievements
let achievements = [
    '#achievementFindRobChicken', 
    '#achievementReturnRobChicken', 
    '#achievementReturnToRob', 
    '#achievementMeetBarSeller',
    '#achievementEnterBar'
];
let numberOfAchievementComplete = 0;
let achievementRetureRobChickenComplete = false; // // A varible that represents if the achievement of of return Rob's chicken completed
let playerClaimHat = false; // A varible that represents if player claim the hat
let numberAcievement = 1; // A varible that represents the number of achievemnt that shows on the screen

// A varible that represents how many times the first button of the dialoge with player 6 has clicked
let button1DiloguePlayer6Clicks = 0;

// A varible that represents if can be dialogue with player 6
let canDialogueWithPlayer6 = true;

// A varible that represents if player needs to gets into the cave
let getIntoCave = false;

// the amount of lives player has
let lives = 3
// the amount of ammo player have
let numberOfammo = 5;
// the number of coins player collect
let numberOfCoins = 0;

//LOAD IMAGES
// background image
const image = new Image();
image.src = "images/Pellet Town.png";

// foreground image
const foregroundImage = new Image();
foregroundImage.src = "images/foregroundObjects.png";

// players image
const playerDownImage = new Image();
playerDownImage.src = "images/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "images/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "images/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "images/playerRight.png";

// CHARCTERS IMAGES
const player2DownImage = new Image();
player2DownImage.src = "images/player2Down.png";

const player3RightImage = new Image();
player3RightImage.src = "images/player3Right.png";

const player3LeftImage = new Image();
player3LeftImage.src = "images/player3Left.png";

const player4DownImage = new Image();
player4DownImage.src = "images/player4Down.png";

const player5RightImage = new Image();
player5RightImage.src = "images/player5Right.png";

const player5LeftImage = new Image();
player5LeftImage.src = "images/player5Left.png";

const player6UpImage = new Image();
player6UpImage.src = "images/player6Up.png";

const player7DownImage = new Image();
player7DownImage.src = "images/player7Down.png";

const player8UpImage = new Image();
player8UpImage.src = "images/player8Up.png";

const player9DownImage = new Image();
player9DownImage.src = "images/player9Down.png";

const player10LeftImage = new Image();
player10LeftImage.src = "images/player10Left.png";

const player11RightImage = new Image();
player11RightImage.src = "images/player11Right.png";

// lawn mower image
const lawnMowerImage = new Image();
lawnMowerImage.src = "images/lawn-mower2.png";

const lawnMowerRightImage = new Image();
lawnMowerRightImage.src = "images/lawn-mower-right.png";

const lawnMowerLeftImage = new Image();
lawnMowerLeftImage.src = "images/lawn-mower-left.png";

// chicken images
const chickenWalkingLeftImage = new Image();
chickenWalkingLeftImage.src = "images/Chicken_walking_left.png";

const chickenWalkingRightImage = new Image();
chickenWalkingRightImage.src = "images/Chicken_walking_right.png";

const chickenSittingImage = new Image();
chickenSittingImage.src = "images/Chicken_sitting.png";

// fishing rod image
const fishingRodImage = new Image();
fishingRodImage.src = "images/fishing-rod.png";

// hats image
const hatImage = new Image();
hatImage.src = "images/hat.png";

const LeftHatImage = new Image();
LeftHatImage.src = "images/hatLeft.png";

// slime images
const slime_blue_right_standing = new Image();
slime_blue_right_standing.src = "images/slime_blue_right_standing.png";

const slime_blue_right_walking = new Image();
slime_blue_right_walking.src = "images/slime_blue_right_walking.png";

// heart image
const heartImage = new Image();
heartImage.src = "images/heart.png";

// coin image
const coinImage = new Image();
coinImage.src = "images/coin.png";

// create all boundraies
const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    width: 48,
                    height: 48
                })
            )
        }    
    })
})

// create battle zones
const battleZones = [];

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    width: 48,
                    height: 48
                })
            )
        }    
    })
});

// create house boundaries
const houseBoundaries = [];

houseCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 177) {
            houseBoundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    width: 48,
                    height: 48
                })
            )
        }    
    })
});

// create bar boundaries
const barBoundaries = [];

barCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 485) {
            barBoundaries.push(
                new Boundary({
                    position: {
                        x: j * 52.81 * 0.85,
                        y: i * 52.76 * 0.85
                    },
                    width: 52.81,
                    height: 52.76
                })
            )
        }    
    })
});

// array to save all the projectiles
const projectiles = [];

// array to save all the coins
const coins = [];

// create the player
const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/8,
        y: canvas.height/2 - 68/2
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage 
    }
});

// create player 2
const player2 = new Sprite({
    position: {
        x: canvas.width/2 - 192/8,
        y: canvas.height/2 - 68/2 - 69
    },
    image: player2DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 3
const player3 = new Sprite({
    position: {
        x: canvas.width/2 - 192/8 + 200,
        y: canvas.height/2 + 30 
    },
    image: player3RightImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        right: player3RightImage,
        left: player3LeftImage
    },
    animate: true
});

// how much can player number three can move
let player3Data = {
    walkedDistance: 0,
    maxDistance: 720,
    velocityX: 5,
};

// create player 4
const player4 = new Sprite({
    position: {
        x: 1160,
        y: 615
    },
    image: player4DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 5
const player5 = new Sprite({
    position: {
        x: 950,
        y: 15 
    },
    image: player5RightImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        right: player5RightImage,
        left: player5LeftImage
    },  
    animate: true
});

// how much can player number five can move
let player5Data = {
    walkedDistance: 0,
    maxDistance: 500,
    velocityX: 5,
};

// create player 6
const player6 = new Sprite({
    position: {
        x: 1875,
        y: 60
    },
    image: player6UpImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 7
const player7 = new Sprite({
    position: {
        x: 1450,
        y: -15
    },
    image: player7DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 8
const player8 = new Sprite({
    position: {
        x: 175,
        y: 335
    },
    image: player8UpImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 9
const player9 = new Sprite({
    position: {
        x: 270,
        y: 240
    },
    image: player9DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 10
const player10 = new Sprite({
    position: {
        x: 270,
        y: 510
    },
    image: player10LeftImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 11
const player11 = new Sprite({
    position: {
        x: 175,
        y: 415
    },
    image: player11RightImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create chickens
const chicken = new Sprite({
    position: {
        x: 300,
        y: 400
    },
    image: chickenWalkingLeftImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        left: chickenWalkingLeftImage,
        right: chickenWalkingRightImage
    },
    animate: true,
    scale: 1.2
});

// how much can chicken can move
let chickenData = {
    walkedDistance: 0,
    maxDistance: -250,
    velocityX: -2,
    waiting: false
};

const chicken2 = new Sprite({
    position: {
        x: 710,
        y: 670
    },
    image: chickenSittingImage,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
    scale: 1.2,
    deafultVal: 3
});

const RobChicken = new Sprite({
    position: {
        x: 1045,
        y: -125
    },
    image: chickenSittingImage,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
    scale: 1.2,
    deafultVal: 3
});

// create slimes
const slime = new Sprite({
    position: {
        x: 650,
        y: 585
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing
        },
        walking: {
            right: slime_blue_right_walking
        }
    },
    animate: true,
    scale: 3
})

slime.worldSpawn = {
    x: slime.position.x - offset.x,
    y: slime.position.y - offset.y
};

slime.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime.about = {
    alive: true
}

const slime2 = new Sprite({
    position: {
        x: 250,
        y: 400
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing
        },
        walking: {
            right: slime_blue_right_walking
        }
    },
    animate: true,
    scale: 3
})

slime2.worldSpawn = {
    x: slime2.position.x - offset.x,
    y: slime2.position.y - offset.y
};

slime2.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime2.about = {
    alive: true
}

const slime3 = new Sprite({
    position: {
        x: 1020,
        y: 150  
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing
        },
        walking: {
            right: slime_blue_right_walking
        }
    },
    animate: true,
    scale: 3
})

slime3.worldSpawn = {
    x: slime3.position.x - offset.x,
    y: slime3.position.y - offset.y
};

slime3.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime3.about = {
    alive: true
}

const slime4 = new Sprite({
    position: {
        x: 1600,
        y: 580  
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing
        },
        walking: {
            right: slime_blue_right_walking
        }
    },
    animate: true,
    scale: 3
})

slime4.worldSpawn = {
    x: slime4.position.x - offset.x,
    y: slime4.position.y - offset.y
};

slime4.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime4.about = {
    alive: true
}

const enemies = [];
enemies.push(slime);
enemies.push(slime2);
enemies.push(slime3);
enemies.push(slime4);

// create lawn mower
const lawnMower2 = new Sprite({
    position: {
        x: canvas.width/2 - 192/8 + 200,
        y: canvas.height/2 + 60
    },
    image: lawnMowerImage,
    scale: 0.65
});

// create lawn mower
const lawnMower = new Sprite({
    position: {
        x: 995,
        y: 50 
    },
    image: lawnMowerRightImage,
    sprites: {
        right: lawnMowerRightImage,
        left: lawnMowerLeftImage
    },
    scale: 0.25
});

// create fishing rod
const fishingRod = new Sprite({
    position: {
        x: 1880,
        y: -15
    },
    image: fishingRodImage,
    scale: 0.1
});

// hat image
const hat = new Sprite({
    position: {
        x: player.position.x - 5,
        y: player.position.y - 12
    },
    image: hatImage,
    sprites: {
        right: hatImage,
        left: LeftHatImage
    },
    scale: 0.3
})

// create beckground
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

// create foregrounds
const foregorond = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

// object that storage the keys and sotrage when they being pressed
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    h: {
        pressed: false
    },
    r: {
        pressed: false
    },
    b: {
        pressed: false
    }
};

// an object Which symbolizes when there is a fight and when there is not
const battle = {
    initiated: false
};

// function for detect collision
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
};

// fucntion for checking collsison between enemy and projectiles
function hitboxCollision({ enemy, rectangle2 }) {
    return (
        enemy.position.x + enemy.hitbox.offsetX + enemy.hitbox.width >= rectangle2.position.x &&
        enemy.position.x + enemy.hitbox.offsetX <= rectangle2.position.x + rectangle2.width &&
        enemy.position.y + enemy.hitbox.offsetY <= rectangle2.position.y + rectangle2.height &&
        enemy.position.y + enemy.hitbox.offsetY + enemy.hitbox.height >= rectangle2.position.y
    );
}

//  function for draw and moving on the screen(main function)
function animate() {
    if (!gameStarted) return;

    const animationId = window.requestAnimationFrame(animate);

    // things that should move every time that the player want to move
    const movables = [
        background, ...boundaries, foregorond, ...battleZones,
        player2, player3, player4, player5, player6, player7,
        lawnMower, fishingRod,
        chicken, chicken2, RobChicken,
        ...enemies,
        ...projectiles,
        ...coins
    ]; 

    document.querySelector('#Achievements').style.display = "block";

    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw beckground
    background.draw();

    // draw boundaries
    boundaries.forEach(Boundary => {
        Boundary.draw();
    });

    // draw battle Zones(for collision)
    battleZones.forEach(battleZone => {
        battleZone.draw();
    });

    // draw lawn mower
    lawnMower.draw();

    // draw fishing rod
    fishingRod.draw();

    // draw chickens
    chicken.draw();

    if (chicken2.frames.val === 3) {
        chicken2.animate = false;
    }
    chicken2.draw();

    if (RobChicken.frames.val === 3) {
        RobChicken.animate = false;
    }

    // draw characters
    player2.draw();
    player3.draw();
    player4.draw();
    player7.draw();
    player5.draw();
    player6.draw();

    // draw rob chicken
    RobChicken.draw();

    // draw player
    player.draw();

    // draw hat
    if (playerClaimHat) {
        hat.draw();
    }

    // draw enemies
    enemies.forEach(enemy => {
        if (enemy.about.alive) {
            enemy.draw();
        }
    })

    // draw projectiles and remove them if that went off the screen
    for (let i = projectiles.length - 1; i >= 0; i--) { 
        const projectile = projectiles[i];

        // draw projectile
        projectile.update(); 

        // Check if the projectiles went off the screen
        if ( 
            projectile.position.x < 0 || 
            projectile.position.x > canvas.width || 
            projectile.position.y < 0 || 
            projectile.position.y > canvas.height 
        ) { 
            projectiles.splice(i, 1); 
        }   
    }

    // draw coins
    coins.forEach(coin => {
        coin.draw();
    })

    // draw foreground
    foregorond.draw();

    // draw hearts
    if (lives === 3) {
        c.drawImage(heartImage, 20, 20, heartImage.width * 2, heartImage.height * 2);
        c.drawImage(heartImage, 50, 20, heartImage.width * 2, heartImage.height * 2);
        c.drawImage(heartImage, 80, 20, heartImage.width * 2, heartImage.height * 2);
    } 
    else if (lives === 2) {
        c.drawImage(heartImage, 20, 20, heartImage.width * 2, heartImage.height * 2);
        c.drawImage(heartImage, 50, 20, heartImage.width * 2, heartImage.height * 2);
    }
    else if (lives === 1) {
        c.drawImage(heartImage, 20, 20, heartImage.width * 2, heartImage.height * 2);
    }

    // draw number of ammo
    c.beginPath() // start drawing
    // draw a circle
    c.arc(135, 31, 7, 0, Math.PI * 2);
    c.fillStyle = "orange";
    c.fill();
    c.closePath();

    c.font = "15px sans-serif";
    c.fillStyle = "black";
    c.fillText("X" + numberOfammo, 150, 37);

    // draw number of coins
    c.drawImage(coinImage, 185, 25, 14, 14);

    c.font = "15px sans-serif";
     c.fillStyle = "black";
    c.fillText("X" + numberOfCoins, 210, 38);

    if (battle.initiated) return; // if we allready strated a battle we don't want the player to move
    // active a battle
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        // check collisoin with battle zones
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i];
            const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
                                    Math.max(player.position.x, battleZone.position.x)) *
                                    (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
                                    Math.max(player.position.y, battleZone.position.y));

            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                }) &&
                overlappingArea > (player.width * player.height) / 2
                && Math.random() < 0.01
            ) {

                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);

                // stop map music, and start battle music
                audio.map.stop();
                audio.map.seek(0);
                audio.initBattle.play();
                audio.battle.play();

                battle.initiated = true;

                if (numberAcievement === 3) {
                    completeAchievement('#achievementGetIntoBattle'); // remove the achievement and add another achievement
                }

                // hide player achievements
                document.querySelector('#Achievements').style.display = "none";

                // fade
                gsap.to('#blackDiv', {
                    opacity: 1, 
                    repeat: 3, 
                    yoyo: true, // make a smooth fade
                    duration: 0.4, // each fade take 0.4 secondes
                    onComplete() { // when the all the fades finish stop fade and don't show nothing
                        gsap.to('#blackDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // active a new animation loop
                                initBattle();
                                animateBattle();
                                gsap.to('#blackDiv', {
                                    opacity: 0,
                                    duration: 0.4,
                                })
                            }
                        })
                    }
                });
                break;
            }
        }
    }

    // COLLISION
    // check if player collide with character number 2
    if (rectangularCollision({
        rectangle1: player, 
        rectangle2: player2
    })) {
        document.querySelector('#character2Dialogue').style.display = "block";
        document.querySelector('#character2Dialogue').style.left = player2.position.x + 50 + "px";
        document.querySelector('#character2Dialogue').style.top = player2.position.y - 50 + "px";
        document.querySelector('#enterHouse1').style.display = "block";

        if (numberAcievement === 1) {
            completeAchievement('#achievementMeetAdam'); // remove the achievement and add the next achievement
        }

        collisionPlayer1Player2 = true;
    } else {
        document.querySelector('#character2Dialogue').style.display = "none";
        document.querySelector('#enterHouse1').style.display = "none";
        collisionPlayer1Player2 = false;
    }

    // check if player collide with character number 3
    if (rectangularCollision({
        rectangle1: player, 
        rectangle2: player3
    })) {
        player3moving = false;
        document.querySelector('#character3Dialogue').style.display = "block";
        document.querySelector('#character3Dialogue').style.left = player3.position.x + 50 + "px";
        document.querySelector('#character3Dialogue').style.top = player3.position.y - 50 + "px";
    } else {
        player3moving = true;
        document.querySelector('#character3Dialogue').style.display = "none";
    }

    // check collision between player and player 4
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: player4
    })) {
        // if can be a dialogue with player 4 - show dialogue
        if (dialoguePlayer4) {
            // open dialogue with player 4
            document.querySelector('#character4Dialogue').style.display = "flex";
            document.querySelector('#character4Dialogue').style.left = player4.position.x + 50 + "px";
            if (!achievementRetureRobChickenComplete){
                document.querySelector('#character4Dialogue').style.top = player4.position.y - 50 + "px";
            } else {
                document.querySelector('#character4Dialogue').style.top = player4.position.y - 145 + "px";
            }
            
            if (numberAcievement === 4) {
                completeAchievement('#achievementMeetRob'); // remove the achievement and add the next achievement
            }

            if (numberAcievement === 7) {
                completeAchievement('#achievementReturnToRob');
            }
        }

    } else {
        document.querySelector('#character4Dialogue').style.display = "none";
    }

    // check collision between player to player 6
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: player6
    })) {   
        if (canDialogueWithPlayer6) {
        // open dialogue with player number 6
            document.querySelector('#character6Dialogue').style.display = "flex";
            document.querySelector('#character6Dialogue').style.left = player6.position.x + 50 + "px";
            document.querySelector('#character6Dialogue').style.top = player6.position.y - 70 + "px";
        }
    } else {
        document.querySelector('#character6Dialogue').style.display = "none";
    }

    // check collison between player and player 7
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: player7
    })) {
        collisionPlayer1Player7 = true;
        // show dialogue
        document.querySelector('#character7Dialogue').style.display = "block";
        document.querySelector('#character7Dialogue').style.left = player7.position.x + 50 + "px";
        document.querySelector('#character7Dialogue').style.top = player7.position.y -50 + "px";
        // show how can player enter his bar
        document.querySelector('#enterbar').style.display = "block";

        // if the achievement of meeting bar seller in the screen remove hte achievement and show the next achievement
        if (numberAcievement === 8) {
            completeAchievement('#achievementMeetBarSeller');
        }
    } else {
        document.querySelector('#character7Dialogue').style.display = "none";
        document.querySelector('#enterbar').style.display = "none";
    }

    // check collision between player and Rob chicken
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: RobChicken
    })) {
        // show its Rob's chicken
        document.querySelector('#RobChickenText').style.display = "block";
        document.querySelector('#RobChickenText').style.left = RobChicken.position.x - 15 + "px";
        document.querySelector('#RobChickenText').style.top = RobChicken.position.y - 5 + "px";

        // if the achievement of find Rob on the screen - remove it and add another achievement
        if (numberAcievement === 5) {
            completeAchievement('#achievementFindRobChicken'); // remove the achievement and add the next achievement
        }

        if (numberAcievement === 6) {
            if (!achievementRetureRobChickenComplete) {
                document.querySelector('#catchRobChicken').style.display = "block";
                document.querySelector('#catchRobChicken').style.left = player.position.x - 13 + "px";
                document.querySelector('#catchRobChicken').style.top = player.position.y + 50 + "px";

                collisionPlayerRobChicken = true;
            }
        }
    } else {
        document.querySelector('#RobChickenText').style.display = "none";
        if (!achievementRetureRobChickenComplete) {
            document.querySelector('#catchRobChicken').style.display = "none";
        }
    }

    // check collision between each projectile to each enemy
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = enemies.length - 1; j >= 0; j--) {
            const projectile = projectiles[i];
            const enemy = enemies[j];

            // if enemy not alive continue to another loop
            if (!enemy.about.alive) continue;

            if (hitboxCollision({
                enemy: enemy,
                rectangle2: projectile
            })) {
                // enemy not alive (you can't see him)
                enemy.about.alive = false

                // delete the projectile
                projectiles.splice(i, 1);

                // create a coin where we killed the enemy
                coins.push(
                    new Sprite({
                        position: {
                            x: enemy.position.x + enemy.width / 2 - 7,
                            y: enemy.position.y + enemy.height / 2 - 7
                        },
                        image: coinImage,
                        scale: 1.5
                    })
                )

                // after 10 seconds the enemy respawn
                setTimeout(() => {
                    respawnEnemy(enemy);
                }, 10000)

                break;
            }
        }
    }

    // check collision between projectiles to boundaries
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = 0; j < boundaries.length; j++) {
            const projectile = projectiles[i];
            const boundary = boundaries[j];

            if (!projectile) continue;

            if (rectangularCollision({
                rectangle1: projectile,
                rectangle2: boundary
            })) {
                // delete projectile
                projectiles.splice(i, 1);
            }
        }
    }

    // check collision between each enemy to the player
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        if (!enemy.about.alive) continue;

        if (hitboxCollision({
            enemy: enemy,
            rectangle2: player
        })) {
            enemy.about.alive = false;
            if (lives > 0) {
                lives -= 1;
            }
            setTimeout(() => {
                respawnEnemy(enemy);
            }, 10000)
        }
    }

    // check collisoin betwwen player to a coin
    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];

        if (rectangularCollision({
            rectangle1: player,
            rectangle2: coin
        })) {
            coins.splice(i, 1);
            numberOfCoins += 1;
        }
    }

    if (getIntoCave) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        // don't let the player start map music
        clicked = true;

        // So that when the player returns, he won't go straight into the cave again.
        getIntoCave = false;

        // stop map music
        audio.map.stop();
        audio.map.seek(0); // restart music

        // hide player achievements
        document.querySelector('#Achievements').style.display = "none";

        // hide dialogue
        document.querySelector('#character6Dialogue').style.display = "none";

        // fade
        gsap.to('#blackDiv', {
            opacity: 1, 
            repeat: 3, 
            yoyo: true, // make a smooth fade
            duration: 0.4, // each fade take 0.4 secondes
            onComplete() { // when the all the fades finish stop fade and don't show nothing
                gsap.to('#blackDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete() {
                        // active a new animation loop
                        player.image = player.sprites.down;
                        //start cave music
                        audio.cave.play();
                        // start the cave function
                        initcave();
                        cave();
                        // The player cannot leave the cave for a few seconds after entering.
                        CanGetOutCave = false;
                        // So the player can exit the cave
                        leavingCave = false;
                        // show screen
                        gsap.to('#blackDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                })
            }
        });
    }

    let moving = true; // A varible to check whenever we should move or not
    player.animate = false; // 'true' when the player is moving and need to change frame

    // "move" player (Move everything except the player to create the feeling that the player is moving)
    if (keys.w.pressed && lastKey === 'w') {
        player.animate  = true;
        player.image = player.sprites.up;

        // check collision with things on the map(except battle zones)
        for (let i = 0; i < boundaries.length; i++) {
            const Boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...Boundary,
                        position: {
                            x: Boundary.position.x,
                            y: Boundary.position.y + velocity
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += velocity;
            })
        }
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate  = true;
        player.image = player.sprites.left;

        // if player claimed the hat, also change the sprite of the hat to adjust the direction player is walking
        if (playerClaimHat) {
            hat.image = hat.sprites.left;
        }

        // check collision with things on the map(except battle zones)
        for (let i = 0; i < boundaries.length; i++) {
            const Boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...Boundary,
                        position: {
                            x: Boundary.position.x + velocity,
                            y: Boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += velocity;
            })            
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.animate  = true;
        player.image = player.sprites.down;

        // check collision with things on the map(except battle zones)
        for (let i = 0; i < boundaries.length; i++) {
            const Boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...Boundary,
                        position: {
                            x: Boundary.position.x,
                            y: Boundary.position.y - velocity
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= velocity;
            })
        }
    } 
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate  = true;
        player.image = player.sprites.right;

        // if player claimed the hat, also change the sprite of the hat to adjust the direction player is walking
        if (playerClaimHat) {
            hat.image = hat.sprites.right;
        }

        // check collision with things on the map(except battle zones)
        for (let i = 0; i < boundaries.length; i++) {
            const Boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...Boundary,
                        position: {
                            x: Boundary.position.x - velocity,
                            y: Boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                break;
            }
        }
        
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= velocity;
            })
        }
    } 
    else if (keys.h.pressed && collisionPlayer1Player2) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        // stop map music
        // audio.map.stop();
        // audio.map.seek(0); // restart music

        if (numberAcievement === 2) {
            completeAchievement('#achievementEnteringAdamHouse'); // remove the achievement and add the next achievement
        }

        // hide player achievements
        document.querySelector('#Achievements').style.display = "none";

        // fade
        gsap.to('#blackDiv', {
            opacity: 1, 
            repeat: 3, 
            yoyo: true, // make a smooth fade
            duration: 0.4, // each fade take 0.4 secondes
            onComplete() { // when the all the fades finish stop fade and don't show nothing
                gsap.to('#blackDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete() {
                        // active a new animation loop
                        // save player 1 and player 2 and hat position
                        pastPlayerPosition.x = player.position.x;
                        pastPlayerPosition.y = player.position.y;
                        pastPlayer2Position.x = player2.position.x;
                        pastPlayer2Position.y = player2.position.y;
                        pastHatPosition.x = hat.position.x;
                        pastHatPosition.y = hat.position.y;
                        // change player 1 and player 2 position
                        player.position.x = 504;
                        player.position.y = 544;
                        player2.position.x = 484;
                        player2.position.y = 324;
                        hat.position.x = player.position.x - 5;
                        hat.position.y = player.position.y - 12;
                        getIntoHouse();
                        gsap.to('#blackDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                })
            }
        });
    }
    else if (keys.b.pressed && collisionPlayer1Player7) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        // don't let the player start map music
        clicked = true;

        // stop map music
        audio.map.stop();
        audio.map.seek(0); // restart music

        if (numberAcievement === 9) {
            completeAchievement('#achievementEnterBar'); // remove the achievement and add the next achievement
        }

        // hide player achievements
        document.querySelector('#Achievements').style.display = "none";

        // fade
        gsap.to('#blackDiv', {
            opacity: 1, 
            repeat: 3, 
            yoyo: true, // make a smooth fade
            duration: 0.4, // each fade take 0.4 secondes
            onComplete() { // when the all the fades finish stop fade and don't show nothing
                gsap.to('#blackDiv', {
                    opacity: 1,
                    duration: 0.4,
                    onComplete() {
                        // active a new animation loop
                        // save player 1 and player 7 and hat position
                        pastPlayerPosition.x = player.position.x;
                        pastPlayerPosition.y = player.position.y;
                        pastPlayer7Position.x = player7.position.x;
                        pastPlayer7Position.y = player7.position.y;
                        pastHatPosition.x = hat.position.x;
                        pastHatPosition.y = hat.position.y;
                        // change player 1 and player 2 position
                        player.position.x = 504;
                        player.position.y = 400;
                        player7.position.x = 750;
                        player7.position.y = 285;
                        hat.position.x = player.position.x - 5;
                        hat.position.y = player.position.y - 12;
                        // start bar music
                        audio.bar.play();
                        getIntoBar();
                        gsap.to('#blackDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                })
            }
        });
    }
    else if (keys.r.pressed && collisionPlayerRobChicken && !achievementRetureRobChickenComplete) {
        gsap.to(RobChicken, {
            opacity: 0,
            onComplete: () => {
                RobChicken.position.x = player4.position.x + player4.width + 5;
                RobChicken.position.y = player4.position.y + player4.height - RobChicken.height;

                completeAchievement('#achievementReturnRobChicken'); // remove the achievement and add another one
                document.querySelector('#catchRobChicken').remove();
                achievementRetureRobChickenComplete = true;
                document.querySelector('#character4Text').innerHTML = "Oh thank God you found it. I thank you so much! Here's something for you:";
                //document.querySelector('#character4Dialogue').style.height = 80 + "px";
                document.querySelector('#hatImage').style.display = "block";
                document.querySelector('#hatClaimButton').style.display = "block";

                gsap.to(RobChicken, {
                    opacity: 1
                })
            }
        })
    }

    // MOVE CHARACTERS
    // player 3
    if (player3Data.walkedDistance !== player3Data.maxDistance) { // if player 3 needs to move
        if (!player3moving) {
            player3.animate= false;
        } else {
            player3.animate = true; // player 3 needs to start animate

            if (player3.frames.elapsed % 10 === 0) { // with that the animation will not be to quickly
                player3.position.x += player3Data.velocityX; // move player (left or right)
                // increase the walked distance of player 3 (to see when he gets to the location which he needs to gets)
                player3Data.walkedDistance += player3Data.velocityX; 
            }
        }
    } else {
        player3.animate = false; // stop player 3 animation
        player3.frames.val = 1; // restart his frame
        player3Data.walkedDistance = 0; // restart walked distance of player 3
        player3Data.maxDistance *= -1; // chage max distance to match the reverse direction
        player3Data.velocityX *= -1; // change velocity x to match the reverse direction
        // Change the image to match the direction we changed. 
        if (player3Data.velocityX < 0) {
            player3.image = player3.sprites.left; 
        }
        else if (player3Data.velocityX > 0) {
            player3.image = player3.sprites.right;
        }
        player3.animate = true;
    }

    // player 5
    if (player5Data.walkedDistance !== player5Data.maxDistance) { // if player 5 needs to move
        if (!player5moving) {
            player5.animate= false;
        } else {
            player5.animate = true; // player 5 needs to start animate

            if (player5.frames.elapsed % 10 === 0) { // with that the animation will not be to quickly
                player5.position.x += player5Data.velocityX; // move player (left or right)
                lawnMower.position.x += player5Data.velocityX; // move the lawn mower with the player
                // increase the walked distance of player 5 (to see when he gets to the location which he needs to gets)
                player5Data.walkedDistance += player5Data.velocityX; 
            }
        }
        
    } else {
        player5.animate = false; // stop player 5 animation
        player5.frames.val = 1; // restart his frame
        player5Data.walkedDistance = 0; // restart walked distance of player 5
        player5Data.maxDistance *= -1; // chage max distance to match the reverse direction
        player5Data.velocityX *= -1; // change velocity x to match the reverse direction
        // Change the image to match the direction we changed. 
        if (player5Data.velocityX < 0) {
            player5.image = player5.sprites.left;
            lawnMower.image = lawnMower.sprites.left; 
            lawnMower.position.x = player5.position.x - 55.75;
        }
        else if (player5Data.velocityX > 0) {
            player5.image = player5.sprites.right;
            lawnMower.image = lawnMower.sprites.right;
            lawnMower.position.x = player5.position.x + 45;
        }
        player5.animate = true;
    }

    // MOVE CHICKENS
    if (!chickenData.waiting) {
        if (chickenData.walkedDistance !== chickenData.maxDistance) { // chicken needs still to mive

            chicken.animate = true;

            if (chicken.frames.elapsed % 10 === 0) { // with that the animation will not be to quickly
                chicken.position.x += chickenData.velocityX; // move chicken (left or right)
                // increase the walked distance of the chicken (to see when it gets to the location which he needs to gets)
                chickenData.walkedDistance += chickenData.velocityX; 
            }
        } else {
            chicken.animate = false;
            chicken.frames.val = 1; // restart his frame

            // srart waiting
            chickenData.waiting = true;

            setTimeout(() => {
                chickenData.walkedDistance = 0; // restart walked distance of player 5
                chickenData.maxDistance *= -1; // chage max distance to match the reverse direction
                chickenData.velocityX *= -1; // change velocity x to match the reverse direction
                // Change the image to match the direction we changed. 
                if (chickenData.velocityX < 0) {
                    chicken.image = chicken.sprites.left;
                }
                else if (chickenData.velocityX > 0) {
                    chicken.image = chicken.sprites.right;
                }
                chicken.animate = true; // continue moving

                //stop waiting
                chickenData.waiting = false;
            }, 2000); // wait 2 seconds
        }
    }

    // move enemies(if needed)
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];

        // c.beginPath()
        // c.arc(enemy.position.x + enemy.width/2, enemy.position.y + enemy.height/2, 300, 0 , Math.PI * 2);
        // c.strokeStyle = "rgba(255, 0, 0, 1)";
        // c.stroke();
        // c.closePath();

        // Calculating the distance on the X axis between the player and the enemy
        const dx = player.position.x - enemy.position.x;

        // Calculate the distance on the Y axis between the player and the enemy
        const dy = player.position.y - enemy.position.y;

        // Calculating the direct distance (in the air) between the player and the enemy
        // According to the Pythagorean theorem
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the player is within the enemy's detection radius
        if (distance < 300) {
            // change enemy sprite
            enemy.image = enemy.sprites.walking.right;
            enemy.frames.hold = 10;

            // Enemy pursuit speed
            const speed = 1.2;

            // How much the player needs to move in each axis
            const velocityX = (dx / distance) * speed;
            const velocityY = (dy / distance) * speed;

            // check collision with boundaries
            // X-axis
            let canMoveX = true;

            for (const boundary of boundaries) {
                if (
                    hitboxCollision({
                        enemy: {
                            ...enemy,
                            position: {
                                x: enemy.position.x + velocityX,
                                y: enemy.position.y
                            }
                        },
                        rectangle2: boundary
                    })
                ) {
                    canMoveX = false;
                    break;
                }
            }

            // Y-axis
            let canMoveY = true;

            for (const boundary of boundaries) {
                if (
                    hitboxCollision({
                        enemy: {
                            ...enemy,
                            position: {
                                x: enemy.position.x,
                                y: enemy.position.y + velocityY
                            }
                        },
                        rectangle2: boundary
                    })
                ) {
                    canMoveY = false;
                    break;
                }
            }


            // dx / distance and dy / distance
            // create a normalized vector (length 1)
            // i.e. just direction without the effect of distance

            // Moving the enemy towards the player on the X axis
            if (canMoveX) {
                enemy.position.x += velocityX;
            }

            // Moving the enemy towards the player on the Y axis
            if (canMoveY) {
                enemy.position.y += velocityY;
            }
        } else {
            enemy.image = enemy.sprites.standing.right;
            enemy.frames.hold = 30;
        }
    }
}

function respawnEnemy(enemy) {
    enemy.position.x =
        enemy.worldSpawn.x + background.position.x;

    enemy.position.y =
        enemy.worldSpawn.y + background.position.y;

    enemy.about.alive = true;
}

function completeAchievement(removeId) {
    const achievement = document.querySelector(removeId);

    // if already complete return
    if (!achievement) return;

    // increase the varible that represents the number if achievement that the player see
    numberAcievement++

    // play the audio of achievement complete
    audio.achievementComplete.play();

    // remove the achievement from the game
    achievement.remove();

    // remove the achievement from the arrey that storage all the achievements (for blur)
    Allachievements.shift();

    if (Allachievements.length > 0) {
        // remove the blur from the new first achievement
        Allachievements[0].classList.remove('blur');
    }
    
    // increase the varible of achievements complete
    numberOfAchievementComplete++;

    // show the next achievement that now has a place on the screen
    const nextAchievement =
        achievements[numberOfAchievementComplete - 1];

    if (nextAchievement) {
        document.querySelector(nextAchievement).style.display = "block";
    }
}

// function for writing 'Welcome Adventure in slow motion
function typeWelcomeText() {
    // our text that we want to write
    const text = "Welcome Adventurer!";

    // the element that we want the text to be write on
    const element = document.querySelector('#welcomeText');

    // represent the letter in the word that we need to write
    let index = 0;

    // we want to write every letter in the word in a gap of 1/10 second
    const interval = setInterval(() => {
        // add the letter to the element
        element.textContent += text[index];

        // move to the next letter in the word
        index++;

        // if we finished write the word stop writing
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, 100);
}

function drawPlayerState() {
    // draw hearts
    if (lives === 3) {
        c.drawImage(heartImage, 20, 20, heartImage.width * 2, heartImage.height * 2);
        c.drawImage(heartImage, 50, 20, heartImage.width * 2, heartImage.height * 2);
        c.drawImage(heartImage, 80, 20, heartImage.width * 2, heartImage.height * 2);
    } 
    else if (lives === 2) {
        c.drawImage(heartImage, 20, 20, heartImage.width * 2, heartImage.height * 2);
        c.drawImage(heartImage, 50, 20, heartImage.width * 2, heartImage.height * 2);
    }
    else if (lives === 1) {
        c.drawImage(heartImage, 20, 20, heartImage.width * 2, heartImage.height * 2);
    }

    // draw number of ammo
    c.beginPath() // start drawing
    // draw a circle
    c.arc(135, 31, 7, 0, Math.PI * 2);
    c.fillStyle = "orange";
    c.fill();
    c.closePath();

    c.font = "15px sans-serif";
    c.fillStyle = "white";
    c.fillText("X" + numberOfammo, 150, 37);

    // draw number of coins
    c.drawImage(coinImage, 185, 25, 14, 14);

    c.font = "15px sans-serif";
     c.fillStyle = "white";
    c.fillText("X" + numberOfCoins, 210, 38);
}

// EVENT LISTENERS
let lastKey = '';
// event Listener for key down
window.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") {
        keys.w.pressed = true;
        lastKey = 'w';
    } 
    else if (e.code === "KeyA") {
        keys.a.pressed = true;
        lastKey = 'a';
    }
    else if (e.code === "KeyS") {
        keys.s.pressed = true;
        lastKey = 's';
    }
    else if (e.code === "KeyD") {
        keys.d.pressed = true;
        lastKey = 'd';
    }
    else if (e.code === "KeyH") {
        keys.h.pressed = true;
    }
    else if (e.code === "KeyR") {
        keys.r.pressed = true;
    }
    else if (e.code === "KeyB") {
        keys.b.pressed = true;
    }
});

// event Listener for key up
window.addEventListener("keyup", (e) => {
    if (e.code === "KeyW") {
        keys.w.pressed = false;
    } 
    else if (e.code === "KeyA") {
        keys.a.pressed = false;
    }
    else if (e.code === "KeyS") {
        keys.s.pressed = false;
    }
    else if (e.code === "KeyD") {
        keys.d.pressed = false;
    }
    else if (e.code === "KeyH") {
        keys.h.pressed = false;
    }
    else if (e.code === "KeyR") {
        keys.r.pressed = false;
    }
    else if (e.code === "KeyB") {
        keys.b.pressed = false;
    }
});

let clicked = false;

// event listener for showing the tutorial scroll
window.addEventListener('load', () => {
    gsap.to('#tutorialScroll', {
        // we want the scroll to move down
        y: 0,
        // We want the movement to last 1.5 seconds
        duration: 1.5,
        // we want it to be smooth
        ease: 'power3.out',
        // when the scroll finally gets down we want to start writing the wlcome text
        onComplete: typeWelcomeText
    });
});

// event listener for start game
document.querySelector('#startGameBtn').addEventListener('click', () => {

    // to create a sequence
    gsap.timeline()

    // scale the tutorial scroll down and than don't show it(all that needs to took 0.5 seconds)
    .to('#tutorialScroll', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5
    })

    // dont show the black screen(to see the game)
    .to('#introScreen', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            // remove the element from our website(we dont need him anymore)
            document.querySelector('#introScreen').remove();

            // start game
            gameStarted = true;
            animate();
        }
    });
});

// event listener for the claim button
document.querySelector('#hatClaimButton').addEventListener('click', () => {
    //hide dialogue with player 4
    document.querySelector('#character4Dialogue').style.display = "none";

    // the dialogue with player 4 right now finish
    dialoguePlayer4 = false;

    // show the hat on the player
    playerClaimHat = true;

    // increase player speed
    velocity = 5;
})

// event listener for start music
window.addEventListener('click', () => {
    // audio
    if (!clicked) {
        audio.map.play();
        clicked = true;
    }
})

// event listeners for going to the cave
document.querySelector('#buttonGetIntoCave').addEventListener('click', () => {
    button1DiloguePlayer6Clicks++
    if (button1DiloguePlayer6Clicks === 1) {
        document.querySelector('#character6Text').innerHTML = "Are you sure about that?";
        document.querySelector('#buttonGetIntoCave').innerHTML = "Yes";
        document.querySelector('#buttonNotGettingIntoCave').innerHTML = "No";
    } 
    else if (
        document.querySelector('#character6Text').innerHTML === "Are you sure about that?" || 
        document.querySelector('#character6Text').innerHTML === "So do you want to go or not?"||
        document.querySelector('#character6Text').innerHTML === "Tell me if you want to go again."
    ) {
        // get into cave
        getIntoCave = true;
        document.querySelector('#character6Text').innerHTML = "Did you enjoy there?";
        document.querySelector('#buttonGetIntoCave').innerHTML = "Yes! I want to go again!";
        document.querySelector('#buttonNotGettingIntoCave').innerHTML = "No! I will never go there again";
    }
    else if (document.querySelector('#character6Text').innerHTML === "Did you enjoy there?") {
        document.querySelector('#character6Text').innerHTML = "Again?! Well, if you insist..."
        document.querySelector('#buttonGetIntoCave').style.display = "none";
        document.querySelector('#buttonNotGettingIntoCave').style.display = "none";
        setTimeout(() => {
            getIntoCave = true;
            document.querySelector('#character6Text').innerHTML = "Tell me if you want to go again."
            document.querySelector('#buttonGetIntoCave').style.display = "block";
            document.querySelector('#buttonNotGettingIntoCave').style.display = "block";
            document.querySelector('#buttonGetIntoCave').innerHTML = "Yes";
            document.querySelector('#buttonNotGettingIntoCave').innerHTML = "Um, I don't think so.";
        }, 1500)
    }
})

document.querySelector('#buttonNotGettingIntoCave').addEventListener('click', () => {
    if (document.querySelector('#buttonNotGettingIntoCave').innerHTML === "I'm not going anywhere near there!") {
        document.querySelector('#character6Dialogue').style.display = "none";
        canDialogueWithPlayer6 = false;
        setTimeout(() => {
            canDialogueWithPlayer6 = true;
        }, 8000)
    } 
    else if (document.querySelector('#buttonNotGettingIntoCave').innerHTML === "No") {
        document.querySelector('#character6Text').innerHTML = "Tell me if you change your mind";
        setTimeout(() => {
            document.querySelector('#character6Text').innerHTML = "So do you want to go or not?";
        }, 10000)
    }
    else if (
        document.querySelector('#buttonNotGettingIntoCave').innerHTML === "No! I will never go there again" ||
        document.querySelector('#buttonNotGettingIntoCave').innerHTML === "Um, I don't think so."
    ) {
        document.querySelector('#character6Text').innerHTML = "Bye, that was a wonderful adventure!";
        document.querySelector('#buttonNotGettingIntoCave').style.display = "none";
        document.querySelector('#buttonGetIntoCave').style.display = "none";
        setTimeout(() => {
            canDialogueWithPlayer6 = false;
        }, 2000)
    }
})

// event listener for creating projectiles
canvas.addEventListener('click', (event) => {
    if (numberOfammo <= 0) return; // If you run out of ammo, don't create a bullet.

    // dicrease the variable that shows how many bullets have left
    numberOfammo -= 1;

    const rect = canvas.getBoundingClientRect(); // where is the canvas on the browser

    // Where did we click on the canvas?
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // the center of the player sprite (Where the projectile should be created)
    const playerCenterX = player.position.x + player.width / 2;
    const playerCenterY = player.position.y + player.height / 2;

    //the angle of the shot
    const angle = Math.atan2(
        mouseY - playerCenterY,
        mouseX - playerCenterX
    );

    // the speed of the shot
    const speed = 10;

    // how much the projectile needs to move every frame
    const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    };

    // create the projectile
    projectiles.push(
        new Projectile({
            position: {
                x: playerCenterX,
                y: playerCenterY
            },
            velocity
        })
    )
});

// If the user goes to another window - stop the music. If he comes back - continue the music.
document.addEventListener('visibilitychange', () => {

    if (document.hidden) {
        Howler.mute(true);
    } else {
        Howler.mute(false);
    }
});