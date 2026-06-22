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
let inShop = false

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

    // draw player
    player.draw();

    // if player climed the hat draw the hat
    if (playerClaimHat) {
        hat.draw();
    }

    // draw foreground objects
    foregorondBar.draw();

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

                // show player achievements
                document.querySelector('#Achievements').style.display = "block";

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
}

// event listener for buying bullets
document.querySelector('#buyBullets').addEventListener('click', () => {
    if (numberOfCoins >= 1) {
        numberOfammo += 5;
        numberOfCoins -= 1;
    }
})

// event listener for buying wine
document.querySelector('#buyWine').addEventListener('click', () => {
    if (numberOfCoins >= 5) {
        if (lives < 3) {
            lives += 1;
            numberOfCoins -= 5;
        }
    }
})

// event listener for exit from the shop
document.querySelector('#closeShop').addEventListener('click', () => {
    if (inShop) {
        document.querySelector('#character7DialogueBar').style.display = "none";
        playerCantMove = false;
        setTimeout(() => {
            inShop = false;
        }, 5000)
    }
})