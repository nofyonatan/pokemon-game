const barImage = new Image();
barImage.src = "images/shop.png";

const foregorondBarImage = new Image();
foregorondBarImage.src = "images/foregroundObjectsBar.png";

const barBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: barImage,
    scale: 0.85
})

const foregorondBar = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: foregorondBarImage,
    scale: 0.85
})

let playerCantMove = false;
let inShop = false;
let numberBulletsBought = 0;
let goldenBerryPrice = 15;
document.querySelector('#goldenBerryPrice').innerText = goldenBerryPrice;

function getIntoBar() {
    const animationId = requestAnimationFrame(getIntoBar);

     // hide dialogue with player 2
    document.querySelector('#character7Dialogue').style.display = "none";
    // hide option to enter to the house
    document.querySelector('#enterbar').style.display = "none";
    // player 1 and player 7 is not colliding anymore
    collisionPlayer1Player7 = false;

    // resize canvas
    canvas.width = barImage.width * 0.85;
    canvas.height = barImage.height * 0.85;

    // DRAWING
    // draw bar
    barBackground.draw();

    // draw boundaries
    barBoundaries.forEach(Boundary => {
        Boundary.draw();
    })

    // draw player 7
    player7.draw();

    // draw player 8
    player8.draw();

    // draw player 9
    player9.draw();

    // draw player 10
    player10.draw();

    // draw player 11
    player11.draw();

    // If the player bought any potions - do any effect on the player
    drawPowerUpEffect()

    // draw player
    player.draw();

    // if player climed the hat draw the hat
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

    // draw foreground objects
    foregorondBar.draw();

    // COLLISOIN
    // collisoin between player and player 7
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: player7
    })) {
        if (!inShop) {
            document.querySelector('#character7DialogueBar').style.display = "flex";
            playerCantMove = true;
            inShop = true;
        }
    } else {
        document.querySelector('#character7DialogueBar').style.display = "none";
    }

    // check collision between projectiles to boundaries
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = 0; j < barBoundaries.length; j++) {
            const projectile = projectiles[i];
            const boundary = barBoundaries[j];

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

    // check if player exit the house
    if (player.position.y > canvas.height) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        // stop bar music
        audio.bar.stop();
        audio.bar.seek(0);

        // fade
        gsap.to('#blackDiv', {
            opacity: 1, 
            onComplete() {
                // active a new animation loop:
                // resize canvas
                canvas.width = 1024;
                canvas.height = 576;
                c.imageSmoothingEnabled = false;
                // change player 1 and player 7 and hat position
                player.position.x = pastPlayerPosition.x;
                player.position.y = pastPlayerPosition.y;
                player7.position.x = pastPlayer7Position.x;
                player7.position.y = pastPlayer7Position.y;
                hat.position.x = pastHatPosition.x;
                hat.position.y = pastHatPosition.y;               
                // start main animation loop
                animate();
                // start map music
                audio.map.stop();
                audio.map.play();
                clicked = true;

                // show the screen
                gsap.to('#blackDiv', {
                    opacity: 0,
                    duration: 0.4,
                })
            }
        });
    }

    // MOVE PLAYER
    player.animate = false;
    let moving = true;
    // player move up
    if (keys.w.pressed && lastKey === 'w') {
        player.animate  = true;
        player.image = player.sprites.up;

        // check collision with things on the map
        for (let i = 0; i < barBoundaries.length; i++) {
            const Boundary = barBoundaries[i];
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
        
        if (moving && !playerCantMove) {
            player.position.y -= velocity;
            hat.position.y -= velocity;
        }
    }

    // player move down
    else if (keys.s.pressed && lastKey === 's') {
        player.animate  = true;
        player.image = player.sprites.down

        // check collision with things on the map
        for (let i = 0; i < barBoundaries.length; i++) {
            const Boundary = barBoundaries[i];
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
        
        if (moving && !playerCantMove) {
            player.position.y += velocity;
            hat.position.y += velocity;
        }
    }

    // player move right
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate  = true;
        player.image = player.sprites.right;

        // check collision with things on the map
        for (let i = 0; i < barBoundaries.length; i++) {
            const Boundary = barBoundaries[i];
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
        
        if (moving && !playerCantMove) {
            player.position.x += velocity;
            hat.position.x += velocity;
        }
    }

    // player move left
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate  = true;
        player.image = player.sprites.left;

        // check collision with things on the map
        for (let i = 0; i < barBoundaries.length; i++) {
            const Boundary = barBoundaries[i];
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
        
        if (moving && !playerCantMove) {
            player.position.x -= velocity;
            hat.position.x -= velocity;
        }
    }

    // ACHIEVEMENTS CHECK
    checkAchievements();
}

// event listener for buying bullets
document.querySelector('#buyBullets').addEventListener('click', () => {
    if (numberOfCoins >= 1) {
        numberOfammo += 5;
        updatePlayerAmmo();
        numberBulletsBought += 5;
        numberOfCoins -= 1;
        updatePlayerCoins();
    }
});

// event listener for buying wine
document.querySelector('#buyWine').addEventListener('click', () => {
    if (numberOfCoins >= 5) {
        if (lives < maxLives) {
            lives++;
            updatePlayerHealthBar();
            numberOfCoins -= 5;
            updatePlayerCoins();
        }
    }
});

// event listener for buying golden berry
document.querySelector('#buyGoldenBerry').addEventListener('click', () => {
    if (numberOfCoins >= goldenBerryPrice) {
        maxLives++;
        createHealthBar();
        updatePlayerHealthBar();
        numberOfCoins -= goldenBerryPrice;
        updatePlayerCoins();
        goldenBerryPrice += 5;
        document.querySelector('#goldenBerryPrice').innerText = goldenBerryPrice;
    }
});

// event listener for buying speed potion
document.querySelector("#buySpeedPotion").addEventListener('click', () => {
    if (numberOfCoins >= 30) {
        numberOfCoins -= 30;
        updatePlayerCoins();
        playerSpeedBoost = true;
        velocity *= 2;
        setTimeout(() => {
            velocity = velocity / 2;
        }, 60000)
    }
});

// event listener for buying invincible potion
document.querySelector('#buyinvinciblePotion').addEventListener('click', () => {
    if (numberOfCoins >= 50) {
        numberOfCoins -= 50;
        updatePlayerCoins();
        playerInvincible = true;
        setTimeout(() => {
            playerInvincible = false;
        }, 30000)
    }
});

// event listener for buying greed potion
document.querySelector('#buyGreedPotion').addEventListener('click', () => {
    if (numberOfCoins >= 30) {
        numberOfCoins -= 30;
        updatePlayerCoins();
        playerDoubleCoins = true;
        setTimeout(() => {
            playerDoubleCoins = false;
        }, 45000)
    }
})

// event listener for exit from the shop
document.querySelector('#closeShop').addEventListener('click', () => {
    if (inShop) {
        document.querySelector('#character7DialogueBar').style.display = "none";
        playerCantMove = false;
        setTimeout(() => {
            inShop = false;
        }, 1000)
    }
})