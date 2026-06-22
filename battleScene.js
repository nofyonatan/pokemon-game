// battle ground background image
const battleBackgroundImage = new Image();
battleBackgroundImage.src = 'images/battleBackground.png';

// create battle background
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
});

let draggle;
let emby;
let renderSprites;
let queue;

let battleAnimationId;

function initBattle() {
    // show health and attack divs
    document.querySelector('#userInterface').style.display = 'block';
    // hide dialogue box
    document.querySelector('#dialogueBox').style.display = 'none';
    // restart enemy health
    document.querySelector('#enemyHealthBar').style.width = '100%';
    // restart player health
    document.querySelector('#playerHealthBar').style.width = '100%';
    // removes attaks buttons
    document.querySelector('#attacksBox').replaceChildren();


    // create draggle
    draggle = new Monster(monsters.Draggle); 
    // create emby
    emby = new Monster(monsters.Emby); 
    // our monsters sprites
    renderSprites = [draggle, emby];
    // here we storage the enemy attacks
    queue = [];

    emby.attacks.forEach(attack => {
        // create a button element and append him to the attacks box
        const button = document.createElement('button');
        button.id = attack.name;
        button.innerText = attack.name;
        document.querySelector('#attacksBox').append(button);
    });

    // our event listeners for our buttons (attack)
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            // emby attack
            const selectedAttack = attacks[e.currentTarget.innerHTML];

            emby.attack({
                attack: selectedAttack,
                recipient: draggle,
                renderSprites
            })

            // if draggle health less than zero fade hom out of the screen
            if (draggle.health <= 0) {
                queue.push(() => {
                    draggle.faint();
                })
                queue.push(() => {
                    // fade back to black
                    gsap.to('#blackDiv', {
                        opacity: 1,
                        onComplete: () => {
                            window.cancelAnimationFrame(battleAnimationId);
                            animate();
                            document.querySelector('#userInterface').style.display = "none";

                            gsap.to(draggle.position, {
                                y: draggle.position.y -= 20
                            });

                            gsap.to('#blackDiv', {
                                opacity: 0
                            });

                            battle.initiated = false;

                            // restart map music
                            audio.map.stop();
                            audio.map.play();

                            // show achievements
                            document.querySelector('#Achievements').style.display = "block";
                        }
                    })
                })
            }

            // draggle or another enemy attacks right here
            let randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

            // if draggle already used 3 fireballs he can only use tackle
            if (draggle.fireballs >= 3) {
                randomAttack = draggle.attacks[0];
            } 

            queue.push(() => {
                draggle.attack({
                    attack: randomAttack,
                    recipient: emby,
                    renderSprites
                });

                if (emby.health <= 0) {
                    queue.push(() => {
                        emby.faint();
                    })

                    queue.push(() => {
                        // fade back to black
                        gsap.to('#blackDiv', {
                            opacity: 1,
                            onComplete: () => {
                                window.cancelAnimationFrame(battleAnimationId);
                                animate();
                                document.querySelector('#userInterface').style.display = "none";

                                gsap.to(emby.position, {
                                    y: emby.position.y -= 20
                                });

                                gsap.to('#blackDiv', {
                                    opacity: 0
                                })

                                battle.initiated = false;

                                // restart map music
                                audio.map.stop();
                                audio.map.play();

                                // show achievements
                                document.querySelector('#Achievements').style.display = "block";
                            }
                        })
                    })
                }
            })
        });

        // if the user hovring with the mouse on one of the buutons change attak type to the type of the aatck that he is hoverring on
        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            document.querySelector('#attackType').innerText = selectedAttack.type;
            document.querySelector('#attackType').style.color = selectedAttack.color; 
        })
    });
}

// main function that orgnize all the battle
function animateBattle() {
    // loop id
    battleAnimationId = window.requestAnimationFrame(animateBattle);

    // draw background
    battleBackground.draw();

    // draw render sprites
    renderSprites.forEach(sprite => {
        sprite.draw();
    });
}

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
    if (queue.length > 0 && !draggle.didFireballWhenCant) {
        queue[0]();
        queue.shift();
    } else e.currentTarget.style.display = 'none';
})