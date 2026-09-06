const player2DialogueInHouse = [
    // 0
    {
        type: "text",
        text: "Great house, isn't it?"
    },

    // 1
    {
        type: "choices",
        choices: [
            {
                text: "What is that map?",
                next: 2
            },
            {
                text: "Yes, very beautiful",
                next: 5
            }
        ]
    },

    // 2
    {
        type: "text",
        text: "The map? It's a map of the village."
    },

    // 3
    {
        type: "choices",
        choices: [
            {
                text: "what is that circle on the map?",
                next: 4
            },
            {
                text: "oh nice",
                next: 5
            }
        ]
    },

    // 4
    {
        type: "text",
        text: "Oh the circle? I found Rob's chicken there. Now that I think about it, I actually forgot to tell him that..."
    },

    // 5
    {
        type: "text",
        text: "Feel comfortable here, stay here as long as you want!"
    }
]

const player2DialogueInHouse2 = [
    // 0
    {
        type: "text",
        text: "Need something?"
    }
]

let playerFinishDialogueNumber1WithPlayer2InHouse = false;

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

    // player 1 and player 2 is not collising anymore
    collisionPlayer1Player2 = false;

    // resize canvas
    canvas.width = house1Image.width;
    canvas.height = house1Image.height;

    // DRAWING
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

    // if player bought invincible postion draw aura around him
    drawInvincibilityAura();

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

    // COLLISION
    // check collision between projectiles to boundaries
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: player2
    })) {
        collisionPlayer1Player2 = true;

        if (!openDialogue) {
            if (!playerFinishDialogueNumber1WithPlayer2InHouse) {
                openCharacterDialogue(
                    "Adam",
                    player2DialogueInHouse
                )
            } else {
                openCharacterDialogue(
                    "Adam",
                    player2DialogueInHouse2
                )
            }
        }
    } else {
        openDialogue = false;
        closeDialogue();
        collisionPlayer1Player2 = false;
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let j = 0; j < houseBoundaries.length; j++) {
            const projectile = projectiles[i];
            const boundary = houseBoundaries[j];

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

                c.imageSmoothingEnabled = false;
                // change player 1 and player 2 position
                player.position.x = pastPlayerPosition.x;
                player.position.y = pastPlayerPosition.y;
                player2.position.x = pastPlayer2Position.x;
                player2.position.y = pastPlayer2Position.y;
                hat.position.x = pastHatPosition.x;
                hat.position.y = pastHatPosition.y;

                // hide small button and show big health bar instand
                showPlayerState();
                hideHealthButton();

                // Move the achievements button to be near the health bar
                document.querySelector('#achievementButton').style.left = 260 + "px";
                document.querySelector('#achievementButton').style.top = 7 + "px";

                // start main animation loop
                animate();
                // start map music
                // audio.map.stop();
                // audio.map.play();
                clicked = true;

                // So the player will not enter the house again after returning back to the world
                enterPlayer2House = false;

                // show the screen
                gsap.to('#blackDiv', {
                    opacity: 0,
                    duration: 0.4,
                })
            }
        });
    }

    // MOVEMENT
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

    // ACHIEVEMENTS CHECK
    checkAchievements();
}