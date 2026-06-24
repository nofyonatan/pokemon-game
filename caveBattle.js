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

function caveBattle() {
    const animationId = requestAnimationFrame(caveBattle);

    // resize canvas
    canvas.width = caveBattleBackground.width;
    canvas.height = caveBattleBackground.height;

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
    caveBattleTorchL.forEach(torch => {
        torch.draw();
        console.log(torch.width);
    })

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
}