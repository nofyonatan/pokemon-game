// DATA
// boundries map
const caveBattleCollisionMap = [];
for (let i = 0; i < caveBattleCollision.length; i += 21) {
    caveBattleCollisionMap.push(caveBattleCollision.slice(i, 21 + i));
}

// up torches map
const caveBattleTorchUmap = [];
for (let i = 0; i < caveBattleTorchUpositions.length; i += 21) {
    caveBattleTorchUmap.push(caveBattleTorchUpositions.slice(i, 21 + i));
}

// left torches map
const caveBattleTorchLmap = [];
for (let i = 0; i < caveBattleTorchLPositions.length; i += 21) {
    caveBattleTorchLmap.push(caveBattleTorchLPositions.slice(i, 21 + i));
}

// LOAD IMAGES
// cave battle background image
const caveBattleBackgroundImage = new Image();
caveBattleBackgroundImage.src = "images/caveBattle.png";

// left torch
const leftTorchImage = new Image();
leftTorchImage.src = "images/Torch Yellow L.png";

// red slime
const redSlimeStandingImage = new Image();
redSlimeStandingImage.src = "images/slime_red_right_standing.png";

const redSlimeWalkingImage = new Image();
redSlimeWalkingImage.src = "images/slime_red_right_walking.png";

// CREATE SPRITES
// create background
const caveBattleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: caveBattleBackgroundImage,
    scale: 0.80
})

// create cave battle boundaries
const caveBattleBoundaries = [];

caveBattleCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 561) {
            caveBattleBoundaries.push(
                new Boundary({
                    position: {
                        x: j * 64 * 0.80,
                        y: i * 64 * 0.80
                    },
                    width: 64 * 0.80,
                    height: 64 * 0.80
                })
            )
        }
    })
})

// create cave battle up torches
const caveBattleTorchU = [];

caveBattleTorchUmap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 562) {
            caveBattleTorchU.push(
                new Sprite({
                    position: {
                        x: j * 64 * 0.80,
                        y: i * 64 * 0.80
                    },
                    image: torchImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    scale: 4 * 0.80
                })
            )
        }
    })
})

// create cave battle left torches
const caveBattleTorchL = [];

caveBattleTorchLmap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 562) {
            caveBattleTorchL.push(
                new Sprite({
                    position: {
                        x: j * 64 * 0.80,
                        y: i * 64 * 0.80
                    },
                    image: leftTorchImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    scale: 4 * 0.80
                })
            )
        }
    })
})

const caveBattleMonsters = [];

// create red bos slime
const redBosSlime = new RedBosSlime({
    position: {
        x: 600,
        y: 100
    },
    image: redSlimeStandingImage,
    frames: {
        max: 4,
        hold: 30
    },
    animate: true,
    scale: 15
})

// FUNCTIONS
function startCaveBattle() {
    // resize canvas
    canvas.width = caveBattleBackground.width;
    canvas.height = caveBattleBackground.height;

    // So that the canvas doesn't blur the figures
    c.imageSmoothingEnabled = false;

    // player has infinite ammo on the cave battle
    InfiniteAmmo = true;

    // the cooldown of the shot is increase because player has inifinite ammo
    cooldown = 1000;

    // start game
    summonLoop();
    caveBattle();
}

// after how much time we need to summon a monster each time
let summonTime = 5000;
function summonLoop() {
    if (!redBosSlime.alive) return;

    summonMonster();

    setTimeout(summonLoop, summonTime);
}

function caveBattle() {
    const animationId = requestAnimationFrame(caveBattle);

    // DRAWING
    // clear canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw background
    caveBattleBackground.draw();

    // draw boundaries
    caveBattleBoundaries.forEach(Boundary => {
        Boundary.draw();
    });

    // draw up torches
    caveBattleTorchU.forEach(torch => {
        torch.draw();
    })

    // draw left torches
    // caveBattleTorchL.forEach(torch => {
    //     torch.draw();
    // })

    // draw boss slime
    if (redBosSlime.alive) {
        redBosSlime.draw();

        // draw boss slime a health bar
        c.fillStyle = "red";
        c.fillRect(
            redBosSlime.position.x + redBosSlime.hitbox.offsetX, 
            redBosSlime.position.y + redBosSlime.hitbox.offsetY - 12, 
            redBosSlime.hitbox.width, 
            12
        );

        c.fillStyle = "green";
        c.fillRect(
            redBosSlime.position.x + redBosSlime.hitbox.offsetX, 
            redBosSlime.position.y + redBosSlime.hitbox.offsetY - 12, 
            redBosSlime.hitbox.width/100 * redBosSlime.health, 
            12
        );
    }


    // draw slimes
    caveBattleMonsters.forEach(monster => {
        if (monster.alive) {
            monster.draw();
        }
    });

    // draw player
    player.draw();

    // draw hat(if player climed him)
    if (playerClaimHat) {
        hat.draw();
    }

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

    // draw player lives, coins and ammo
    drawPlayerState();

    // MOVEMENT
    let moving = true;// A varible to check whenever we should move or not
    player.animate = false; // 'true' when the player is moving and need to change frame

    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true;
        player.image = player.sprites.up;

        // check for collision with boundaries
        for (let i = 0; i < caveBattleBoundaries.length; i++) {
            const Boundary = caveBattleBoundaries[i];

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary,
                    position: {
                        x: Boundary.position.x,
                        y: Boundary.position.y + velocity
                    }
                }
            })) {
                moving = false;
                break;
            }
        }

        if (moving) {
            player.position.y -= velocity;
            hat.position.y -= velocity;
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;

        // check for collision with boundaries
        for (let i = 0; i < caveBattleBoundaries.length; i++) {
            const Boundary = caveBattleBoundaries[i];

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary,
                    position: {
                        x: Boundary.position.x,
                        y: Boundary.position.y - velocity
                    }
                }
            })) {
                moving = false;
                break;
            }
        }

        if (moving) {
            player.position.y += velocity;
            hat.position.y += velocity;
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;

        // check for collision with boundaries
        for (let i = 0; i < caveBattleBoundaries.length; i++) {
            const Boundary = caveBattleBoundaries[i];

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary,
                    position: {
                        x: Boundary.position.x - velocity,
                        y: Boundary.position.y
                    }
                }
            })) {
                moving = false;
                break;
            }
        }

        if (moving) {
            player.position.x += velocity;
            hat.position.x += velocity;
        }
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true;
        player.image = player.sprites.left;

        // check for collision with boundaries
        for (let i = 0; i < caveBattleBoundaries.length; i++) {
            const Boundary = caveBattleBoundaries[i];

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {...Boundary,
                    position: {
                        x: Boundary.position.x + velocity,
                        y: Boundary.position.y
                    }
                }
            })) {
                moving = false;
                break;
            }
        }

        if (moving) {
            player.position.x -= velocity;
            hat.position.x -= velocity;
        }
    }

    // move monsters(if needed)
    for (let i = 0; i < caveBattleMonsters.length; i++) {
        const monster = caveBattleMonsters[i];

        if (!monster.alive) continue;

        c.beginPath()
        c.arc(monster.position.x + monster.width/2, monster.position.y + monster.height/2, 300, 0 , Math.PI * 2);
        c.strokeStyle = "rgba(255, 0, 0, 0)";
        c.stroke();
        c.closePath();

        // Calculating the distance on the X axis between the player and the monster
        const dx = player.position.x - monster.position.x;

        // Calculate the distance on the Y axis between the player and the monster
        const dy = player.position.y - monster.position.y;

        // Calculating the direct distance (in the air) between the player and the monster
        // According to the Pythagorean theorem
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the player is within the monster's detection radius
        if (distance < 300) {
            // change monster sprite
            monster.image = monster.sprites.walking.right;
            monster.frames.hold = 10;

            // monster pursuit speed
            const speed = 1.2;

            // How much the player needs to move in each axis
            const velocityX = (dx / distance) * speed;
            const velocityY = (dy / distance) * speed;

            // check collision with boundaries
            // X-axis
            let canMoveX = true;

            for (const boundary of caveBattleBoundaries) {
                if (
                    hitboxCollision({
                        enemy: {
                            ...monster,
                            position: {
                                x: monster.position.x + velocityX,
                                y: monster.position.y
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

            for (const boundary of caveBattleBoundaries) {
                if (
                    hitboxCollision({
                        enemy: {
                            ...monster,
                            position: {
                                x: monster.position.x,
                                y: monster.position.y + velocityY
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

            // Moving the monster towards the player on the X axis
            if (canMoveX) {
                monster.position.x += velocityX;
            }

            // Moving the monster towards the player on the Y axis
            if (canMoveY) {
                monster.position.y += velocityY;
            }
        } else {
            monster.image = monster.sprites.standing.right;
            monster.frames.hold = 30;
        }
    }

    // COLLISION
    // check collision between projectiles to slimes
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = caveBattleMonsters.length - 1; j >= 0; j--) {
            const projectile = projectiles[i];
            const monster = caveBattleMonsters[j];

            // if enemy not alive continue to the next loop
            if (!monster.alive) continue;

            if (hitboxCollision({
                enemy: monster,
                rectangle2: projectile
            })) {
                if (monster.unkillable) continue;

                // decrease monster lives
                monster.lives--;
                // if monster lives is equal to 0 - don't show the monster
                if (monster.lives <= 0) {
                    // enemy not alive (you can't see him)
                    monster.alive = false
                }

                // delete projectile
                projectiles.splice(i, 1);

                break;
            }
        }
    }

    // check collision between the boss slime to projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];

        // if enemy not alive continue to the next loop
        if (!redBosSlime.alive) continue;

        if (hitboxCollision({
            enemy: redBosSlime,
            rectangle2: projectile
        })) {
            // decrease monster lives
            redBosSlime.health--;
            // update boss summon time(if needed)
            updateBossPahse();
            // if monster lives is equal to 0 - don't show the monster
            if (redBosSlime.health <= 0) {
                // enemy not alive (you can't see him)
                redBosSlime.alive = false
            }
            // delete projectile
            projectiles.splice(i, 1);
        }
    }

    // check collision between projectiles to walls
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = 0; j < caveBattleBoundaries.length; j++) {
            const projectile = projectiles[i];
            const boundary = caveBattleBoundaries[j];

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

    // collision between slimes to player
    for (let i = caveBattleMonsters.length - 1; i >= 0; i--) {
        const monster = caveBattleMonsters[i];

        if (!monster.alive) continue;

        if (hitboxCollision({
            enemy: monster,
            rectangle2: player
        })) {
            monster.alive = false;
            if (lives > 0) {
                lives--;
            }
        }
    }
}

function summonMonster() {
    caveBattleMonsters.push(
        new regularSlime({
            position: {
                x: redBosSlime.position.x  + redBosSlime.hitbox.width/2 + redBosSlime.hitbox.width/4,
                y: redBosSlime.position.y  + (redBosSlime.hitbox.height/2 + redBosSlime.hitbox.height/4)
            },
            image: redSlimeStandingImage,
            frames: {
                max: 4,
                hold: 30
            },
            sprites: {
                standing: {
                    right: redSlimeStandingImage
                },
                walking: {
                    right: redSlimeWalkingImage
                }
            },
            animate: true,
            scale: 3
        })
    )

    caveBattleMonsters[caveBattleMonsters.length - 1].unkillable = true;

    gsap.to(caveBattleMonsters[caveBattleMonsters.length - 1].position, {
        x: player.position.x,
        y: player.position.y,
        duration: 1.5,
        onComplete: () => {
            caveBattleMonsters[caveBattleMonsters.length - 1].unkillable = false;
        }
    })
}

function updateBossPahse() {
    if (redBosSlime.health <= 20) {
        summonTime = 1000;
        cooldown = 300;
    }
    else if (redBosSlime.health <= 50) {
        summonTime = 2500;
        cooldown = 600;
    }
    else if (redBosSlime.health <= 75) {
        summonTime = 3800;
        cooldown: 800
    }
}