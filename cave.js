// VARIABLES
let CanGetOutCave = false; // A variable that represent if the player can get out from the cave
let leavingCave = false; // A variable that causes the exit from the cave to only happen once, and not every frame until you exit
let enterBattle = false; //A variable that causes the exit from the cave to only happen once, and not every frame until you exit

// DATA
// cave collision
const caveCollisionMap = [];
for (let i = 0; i < caveCollisions.length; i += 95) {
    caveCollisionMap.push(caveCollisions.slice(i, 95 + i));
}

// cave monsters
const caveMonstersMap = [];
for (let i = 0; i < caveMonstersPositions.length; i += 95) {
    caveMonstersMap.push(caveMonstersPositions.slice(i, 95 + i));
}

// cave coins
const caveCoinsMap = [];
for (let i = 0; i < caveCoinsPositions.length; i += 95) {
    caveCoinsMap.push(caveCoinsPositions.slice(i, 95 + i));
}

// cave torches
const caveTorchesMap = [];
for (let i = 0; i < caveTorchesPositions.length; i += 95) {
    caveTorchesMap.push(caveTorchesPositions.slice(i, 95 + i));
}

// cave waterfalls up
const caveWaterfallsUpMap = [];
for (let i = 0; i < caveWaterfallsUpPositions.length; i += 95) {
    caveWaterfallsUpMap.push(caveWaterfallsUpPositions.slice(i, 95 + i));
}

// cave waterfalls left
const caveWaterfallsLeftMap = [];
for (let i = 0; i < caveWaterfallsLeftPositions.length; i += 95) {
    caveWaterfallsLeftMap.push(caveWaterfallsLeftPositions.slice(i, 95 + i));
}

// cave waterfalls down
const caveWaterfallsDownMap = [];
for (let i = 0; i < caveWaterfallsDownPositions.length; i += 95) {
    caveWaterfallsDownMap.push(caveWaterfallsDownPositions.slice(i, 95 + i));
}

// cave exit
const caveExitMap = [];
for (let i = 0; i < caveExitPosition.length; i += 95) {
    caveExitMap.push(caveExitPosition.slice(i, 95 + i));
}

// cave Enter battle
const caveEnterBattleMap = [];
for (let i = 0; i < caveEnterBattlePosition.length; i += 95) {
    caveEnterBattleMap.push(caveEnterBattlePosition.slice(i, 95 + i));
}

// IMAGES
// background image
const caveBackgroundImage = new Image();
caveBackgroundImage.src = "images/cave.png";

// green slime images
const greenRightStandingImage = new Image();
greenRightStandingImage.src = "images/slime_green_right_standing.png";

const greenSlimeWalkingImage = new Image();
greenSlimeWalkingImage.src = "images/slime_green_right_walking.png";

// coin image
const caveCoinImage = new Image();
caveCoinImage.src = "images/cave_coin.png";

// torch image
const torchImage = new Image();
torchImage.src = "images/Torch-Yellow.png";

// waterfalls images
const waterFallUpImage = new Image();
waterFallUpImage.src = "images/WaterFalls.png";

const waterFallDownImage = new Image();
waterFallDownImage.src = "images/WaterFallsDown.png"

//SPRITES
// create cave boudaries
const caveBoundaries = [];

caveCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 689) {
            caveBoundaries.push(
                new Boundary({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    width: 64,
                    height: 64
                })
            )
        }
    })
});

//create cave monsters
const caveMonsters = [];

greenSlimeOffset = {
    offsetX: 45,
    offsetY: 50
}

caveMonstersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 682) {
            caveMonsters.push(
                new BlueSlime({
                    position: {
                        x: j * 64 + offsetCave.x - greenSlimeOffset.offsetX,
                        y: i * 64 + offsetCave.y - greenSlimeOffset.offsetY
                    },
                    image: greenRightStandingImage,
                    frames: {
                        max: 4,
                        hold: 30
                    },
                    sprites: {
                        standing: {
                            right: greenRightStandingImage
                        },
                        walking: {
                            right: greenSlimeWalkingImage
                        }
                    },
                    animate: true,
                    scale: 5
                })
            )
        }
    })
});

// create cave coins
const caveCoins = [];

caveCoinsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 665) {
            caveCoins.push(
                new Sprite({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    image: caveCoinImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    scale: 4
                })
            )
        }
    })
})

// create cave torches
const caveTorches = [];

caveTorchesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 684) {
            caveTorches.push(
                new Sprite({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    image: torchImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    scale: 4
                })
            )
        }
    });
});

// create cave waterfalls
const caveWaterfallsUp = [];

caveWaterfallsUpMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 685) {
            caveWaterfallsUp.push(
                new Sprite({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    image: waterFallUpImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    scale: 4
                })
            )
        }
    });
});

const caveWaterfallsLeft = [];

caveWaterfallsLeftMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 685) {
            caveWaterfallsLeft.push(
                new Sprite({
                    position: {
                        x: j * 65 + offsetCave.x - 18,
                        y: i * 63 + offsetCave.y - 18
                    },
                    image: waterFallUpImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    rotation: -1.55,
                    scale: 4
                })
            )
        }
    });
});

const caveWaterfallsDown = [];

caveWaterfallsDownMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 685) {
            caveWaterfallsDown.push(
                new Sprite({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    image: waterFallDownImage,
                    frames: {
                        max: 8,
                        hold: 10
                    },
                    animate: true,
                    scale: 4
                })
            )
        }
    });
});

// create exit boundary
const caveExit = [];

caveExitMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 681) {
            caveExit.push(
                new Boundary({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    width: 64,
                    height: 64,
                    color: "blue"
                })
            )
        }
    })
})

// create exit boundary
const caveEnterBattle = [];

caveEnterBattleMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 681) {
            caveEnterBattle.push(
                new Boundary({
                    position: {
                        x: j * 64 + offsetCave.x,
                        y: i * 64 + offsetCave.y
                    },
                    width: 64,
                    height: 64,
                    color: "blue"
                })
            )
        }
    })
})

// create cave background
const caveBackground = new Sprite({
    position: {
        x: offsetCave.x,
        y: offsetCave.y
    },
    image: caveBackgroundImage
});

function initcave() {
    setTimeout(() => {
        CanGetOutCave = true;
    }, 5000)
}

function cave() {
    const animationId = requestAnimationFrame(cave);

    const moveables = [
        caveBackground, ...caveBoundaries, ...caveMonsters, ...projectiles, ...caveCoins, ...caveTorches,
         ...caveWaterfallsUp, ...caveWaterfallsLeft, ...caveWaterfallsDown, ...caveExit, ...caveEnterBattle
    ];
    // DRAWING
    // clear canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw background
    caveBackground.draw();

    // draw boundaries
    caveBoundaries.forEach(Boundary => {
        Boundary.draw();
    });

    // draw Exit boundary
    caveExit.forEach(exit => {
        exit.draw();
    })

    // draw enter battle boundary
    caveEnterBattle.forEach(battleEntery => {
        battleEntery.draw();
    })

    // draw torches
    caveTorches.forEach(Torch => {
        Torch.draw();
    });

    // draw watterfalls
    caveWaterfallsUp.forEach(waterfallUp => {
        waterfallUp.draw();
    })

    caveWaterfallsLeft.forEach(waterfallLeft => {
        waterfallLeft.draw();
    })

    caveWaterfallsDown.forEach(waterfallDown => {
        waterfallDown.draw();
    })

    // draw player
    player.draw();

    //draw hat(if player climed him)
    if (playerClaimHat) {
        hat.draw();
    }

    // draw Monsters
    caveMonsters.forEach(monster => {
        if (monster.alive) {
            monster.draw();

            // draw monster health bar
            c.fillStyle = "red";
            c.fillRect(monster.position.x + monster.hitbox.offsetX, monster.position.y, monster.hitbox.width, 10);

            c.fillStyle = "green";
            c.fillRect(monster.position.x + monster.hitbox.offsetX, monster.position.y, monster.hitbox.width / 2 * monster.lives, 10);
        }
    });

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
    
    // draw game coins
    caveCoins.forEach(coin => {
        coin.draw();
    })

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

    // MOVEMENT
    let moving = true;// A varible to check whenever we should move or not
    player.animate = false; // 'true' when the player is moving and need to change frame

    // player
    // move player up
    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true;
        player.image = player.sprites.up;

        // check collision with things on the map
        for (let i = 0; i < caveBoundaries.length; i++) {
            const Boundary = caveBoundaries[i];

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
            moveables.forEach((moveable) => {
                moveable.position.y += velocity;
            })
        }
    }
    // move player down
    else if (keys.s.pressed && lastKey === 's') {
        player.animate = true;
        player.image = player.sprites.down;

        // check collision with things on the map
        for (let i = 0; i < caveBoundaries.length; i++) {
            const Boundary = caveBoundaries[i];

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
            moveables.forEach((moveable) => {
                moveable.position.y -= velocity;
            })
        }
    }
    // move player right
    else if(keys.d.pressed && lastKey === 'd') {
        player.animate = true;
        player.image = player.sprites.right;

        // if player claimed the hat, also change the sprite of the hat to adjust the direction player is walking
        if (playerClaimHat) {
            hat.image = hat.sprites.right;
        }

        // check collision with things on the map
        for (let i = 0; i < caveBoundaries.length; i++) {
            const Boundary = caveBoundaries[i];

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
            moveables.forEach((movable) => {
                movable.position.x -= velocity;
            })
        }
    }
    // move player left
    else if(keys.a.pressed && lastKey === 'a') {
        player.animate = true;
        player.image = player.sprites.left;

        // if player claimed the hat, also change the sprite of the hat to adjust the direction player is walking
        if (playerClaimHat) {
            hat.image = hat.sprites.left;
        }

        // check collision with things on the map
        for (let i = 0; i < caveBoundaries.length; i++) {
            const Boundary = caveBoundaries[i];

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
            moveables.forEach((movable) => {
                movable.position.x += velocity;
            })
        }
    }

    // move monsters(if needed)
    for (let i = 0; i < caveMonsters.length; i++) {
        const monster = caveMonsters[i];

        c.beginPath()
        c.arc(monster.position.x + monster.width/2, monster.position.y + monster.height/2, 400, 0 , Math.PI * 2);
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
        if (distance < 400) {
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

            for (const boundary of caveBoundaries) {
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

            for (const boundary of caveBoundaries) {
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
    // check collsision between player and exit
    for (let i = 0; i < caveExit.length; i++) {
        const Exit = caveExit[i];

        if (rectangularCollision({
            rectangle1: Exit,
            rectangle2: player
        })) {
            if (CanGetOutCave && !leavingCave) {
                // So that the exit from the cave only happens once and not every frame until he exits.
                leavingCave = true; 

                // GET OUT FROM THE CAVE
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);

                // stop cave audio
                audio.cave.stop();
                audio.cave.seek(0);

                // fade
                gsap.to('#blackDiv', {
                    opacity: 1, 
                    onComplete() {
                        // active a new animation loop:            
                        // start main animation loop
                        animate();
                        // start map music
                        audio.map.stop();
                        audio.map.play();
                        clicked = true;

                        // show player achievements
                        document.querySelector('#Achievements').style.display = "block";

                        // show the screen
                        gsap.to('#blackDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                });
            } else {
                moveables.forEach(movable => {
                    movable.position.y -= velocity;
                })
            }
        }
    }

    // check collision between player to battle entery
    for (let i = 0; i < caveEnterBattle.length; i++) {
        const battleEntery = caveEnterBattle[i];

        if (rectangularCollision({
            rectangle1: player,
            rectangle2: battleEntery
        })) {
            if (!enterBattle) {
                // So that the exit from the cave only happens once and not every frame until he exits.
                enterBattle = true; 

                // ENTER BATTLE
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);

                // stop cave audio
                audio.cave.stop();
                audio.cave.seek(0);

                // fade
                gsap.to('#blackDiv', {
                    opacity: 1, 
                    onComplete() {
                        // save player position and than change it
                        pastPlayerPosition.x = player.position.x;
                        pastPlayerPosition.y = player.position.y;
                        player.position.x = canvas.width/2;
                        player.position.y = canvas.height - 25;

                        // save hat position and than change it to adjust the player new position
                        pastHatPosition.x = hat.position.x;
                        pastHatPosition.y = hat.position.y;
                        hat.position.x = player.position.x - 5;
                        hat.position.y = player.position.y - 12;

                        // active a new animation loop:            
                        // start main animation loop
                        startCaveBattle();

                        // start cave battle music
                        // audio.map.stop();
                        // audio.map.play();

                        // show the screen
                        gsap.to('#blackDiv', {
                            opacity: 0,
                            duration: 0.4,
                        })
                    }
                });
            }
        }
    }

    // collision between player and monsters
    for (let i = caveMonsters.length - 1; i >= 0; i--) {
        const monster = caveMonsters[i];

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

    // check collision between each projectile to each enemy
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = caveMonsters.length - 1; j >= 0; j--) {
            const projectile = projectiles[i];
            const monster = caveMonsters[j];

            // if enemy not alive continue to the next loop
            if (!monster.alive) continue;

            if (hitboxCollision({
                enemy: monster,
                rectangle2: projectile
            })) {
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

    // check collision between projectiles to boundaries
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = 0; j < caveBoundaries.length; j++) {
            const projectile = projectiles[i];
            const boundary = caveBoundaries[j];

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

    // check collision between player to coins
    for (let i = caveCoins.length - 1; i >= 0; i--) {
        const coin = caveCoins[i];

        if (rectangularCollision({
            rectangle1: coin,
            rectangle2: player
        })) {
            // increase number of coins
            numberOfCoins++

            // delete coin
            caveCoins.splice(i, 1);
        }
    }
}