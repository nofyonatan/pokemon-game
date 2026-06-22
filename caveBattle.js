// LOAD IMAGES
const caveBattleBackgroundImage = new Image();
caveBattleBackgroundImage.src = "images/caveBattle.png";

// create Sprites
const caveBattleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: caveBattleBackgroundImage,
    scale: 0.80
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

        if (moving) {
            player.position.y -= velocity;
        }
    }
}