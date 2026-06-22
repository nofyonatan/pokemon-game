// house background image
const house1Image = new Image();
house1Image.src = 'images/house1.png';

// create house beckground
const houseBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: house1Image
})

// Pellet Town map image
const PelletTownMapImage = new Image();
PelletTownMapImage.src = "images/PelletTownMap.png";

// create map
const map = new Sprite({
    position: {
        x: 170,
        y: 30
    },
    image: PelletTownMapImage,
    scale: 0.05
})

function getIntoHouse() {
    const animationId = requestAnimationFrame(getIntoHouse);

    // hide dialogue with player 2
    document.querySelector('#character2Dialogue').style.display = "none";
    // hide option to enter to the house
    document.querySelector('#enterHouse1').style.display = "none";
    // show another dialogue with the house
    document.querySelector('#character2DialogueHouse').style.display = "block";
    // player 1 and player 2 is not collising anymore
    collisionPlayer1Player2 = false;

    // resize canvas
    canvas.width = house1Image.width;
    canvas.height = house1Image.height;

    // draw house
    houseBackground.draw();

    // draw boundaries
    houseBoundaries.forEach(Boundary => {
        Boundary.draw();
    })

    // draw map
    map.draw();

    // draw a circle on the map (the circle shows where Rob chicken is)
    c.beginPath();
    c.arc(223, 46, 5, 0, Math.PI * 2);
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();

    // draw player 2
    player2.draw();

    // draw player
    player.draw();

    // if player climed the hat draw the hat
    if (playerClaimHat) {
        hat.draw();
    }

    //
    if (player.position.y <= 150) {
        document.querySelector('#character2DialogueHouse').innerHTML = "I think I saw Rob's chicken around this area.";
        document.querySelector('#character2DialogueHouse').style.height = "30px";
    } else {
        document.querySelector('#character2DialogueHouse').innerHTML = "Great house, isn't it?";
        document.querySelector('#character2DialogueHouse').style.height = "28px";
    }

    // check if player exit the house
    if (player.position.y > canvas.height) {
        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        // hide player 2 and player 1 dialogue in the house
        document.querySelector('#character2DialogueHouse').style.display = "none";

        // fade
        gsap.to('#blackDiv', {
            opacity: 1, 
            onComplete() {
                // active a new animation loop:
                // resize canvas
                canvas.width = 1024;
                canvas.height = 576;
                // change player 1 and player 2 position
                player.position.x = pastPlayerPosition.x;
                player.position.y = pastPlayerPosition.y;
                player2.position.x = pastPlayer2Position.x;
                player2.position.y = pastPlayer2Position.y;
                hat.position.x = pastHatPosition.x;
                hat.position.y = pastHatPosition.y;
                // start main animation loop
                animate();
                // start map music
                // audio.map.stop();
                // audio.map.play();
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
        for (let i = 0; i < houseBoundaries.length; i++) {
            const Boundary = houseBoundaries[i];
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
            player.position.y -= velocity;
            hat.position.y -= velocity;
        }
    }

    // player move down
    else if (keys.s.pressed && lastKey === 's') {
        player.animate  = true;
        player.image = player.sprites.down

        // check collision with things on the map
        for (let i = 0; i < houseBoundaries.length; i++) {
            const Boundary = houseBoundaries[i];
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
            player.position.y += velocity;
            hat.position.y += velocity;
        }
    }

    // player move right
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate  = true;
        player.image = player.sprites.right;

        // check collision with things on the map
        for (let i = 0; i < houseBoundaries.length; i++) {
            const Boundary = houseBoundaries[i];
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
            player.position.x += velocity;
            hat.position.x += velocity;
        }
    }

    // player move left
    else if (keys.a.pressed && lastKey === 'a') {
        player.animate  = true;
        player.image = player.sprites.left;

        // check collision with things on the map
        for (let i = 0; i < houseBoundaries.length; i++) {
            const Boundary = houseBoundaries[i];
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
            player.position.x -= velocity;
            hat.position.x -= velocity;
        }
    }
}