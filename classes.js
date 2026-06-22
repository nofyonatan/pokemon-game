//sprite class
class Sprite {
    constructor({
            position, 
            image, 
            frames = {max: 1, hold: 10}, 
            sprites, 
            animate = false,  
            rotation = 0, 
            scale = 1,
            deafultVal = 0
    }) {
        this.position = position;
        this.image = new Image();
        this.frames = {...frames, val: 0, elapsed: 0};
        this.scale = scale;
        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max) * this.scale;
            this.height = this.image.height * this.scale;
        }
        this.image.src = image.src;

        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation;
        this.deafultVal = deafultVal;

    }

    draw() {
        c.save();
        c.translate(this.position.x + this.width/2, this.position.y + this.height/2);
        c.rotate(this.rotation);
        c.translate(-this.position.x - this.width/2, -this.position.y - this.height/2);
        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image,
            this.frames.val * this.image.width / this.frames.max, 
            0,
            this.image.width / this.frames.max, 
            this.image.height, 
            this.position.x,
            this.position.y,
            this.width, //(this.image.width / this.frames.max)
            this.height //this.image.height * this.scale
        );
        c.restore();

        c.strokeStyle = "rgba(255, 0, 0, 0)";
        if (this.scale === 3) {
            c.strokeRect(this.position.x + 27, this.position.y + 30, 45, 40);
        }
        else if (this.scale === 5) {
            c.strokeRect(this.position.x + 48, this.position.y + 50, 65, 60);
        } 
        else {
            c.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }

        if (!this.animate) {
            this.frames.val = this.deafultVal;
            return;
        }

        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++;
            } else {
                this.frames.val = 0;
            }
        }
    }
}

//
class BlueSlime extends Sprite {
    constructor(config) {
        super(config);

        this.lives = 2;
        this.alive = true;

        this.hitbox = {
            offsetX: 48,
            offsetY: 50,
            width: 65,
            height: 60
        };
    }
}

//monster class
class Monster extends Sprite {
    constructor({
        position, 
        image, 
        frames = {max: 1, hold: 10}, 
        sprites, 
        animate = false,  
        rotation = 0, 
        isEnemy = false, 
        name,
        attacks 
    }) {
        super({
            position, 
            image, 
            frames, 
            sprites, 
            animate,  
            rotation
        })
        this.health = 100;
        this.isEnemy = isEnemy;
        this.name = name;
        this.attacks = attacks;
        this.tackles = 0;
        this.fireballs = 0;
    }

    faint() {
        document.getElementById("dialogueBox").innerText = this.name +  ' fainted!';
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        // play victory sound
        audio.victory.play();

        // stop battle audio
        audio.battle.stop();
    }

    attack({attack, recipient, renderSprites}) {
        if (attack.name === 'Fireball' && this.fireballs >= 3) {
            document.getElementById("dialogueBox").style.display = 'block';
            document.getElementById("dialogueBox").innerText =
                this.name + " has no Fireballs left!";
            return;
        } else {
            document.getElementById("dialogueBox").style.display = 'block';
            document.getElementById("dialogueBox").innerText = this.name +  ' used ' + attack.name; 
        }   
        
        let healthBar = '#enemyHealthBar';
        if (this.isEnemy) healthBar = '#playerHealthBar';

        let rotation = 1;
        if (this.isEnemy) rotation = -2.2

        attacks.Tackle.damage += 8 * this.tackles;

        this.maxFireballs = true;

        recipient.health -= attack.damage;


        attacks.Tackle.damage = 10
        this.didFireballWhenCant = false;

        switch (attack.name) {
            case 'Fireball':
                // increase the variable that shows how many firballs player send
                this.fireballs++;

                if (emby.fireballs >= 3) {
                    document.querySelector('#Fireball').disabled = true; 
                    document.querySelector('#Fireball').innerText = "Fireball (0)";
                }

                // show how many fireballs have left
                document.getElementById("dialogueBox").innerText =
                    `${this.name} used Fireball (${3 - this.fireballs} left)`; 

                // play init firball audio
                audio.initFireball.play();

                // fire ball image
                const fireballImage = new Image()
                fireballImage.src = 'images/fireball.png';

                // create fire ball
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation
                })

                renderSprites.splice(1, 0, fireball);

                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.fireballHit.play(); // play hit fireball audio

                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderSprites.splice(1, 1);
                    }
                }) 

            break;
            case 'Tackle':
                const tl = gsap.timeline();

                let movmentDistance = 20;
                if (this.isEnemy) movmentDistance = -20
                this.tackles += 1;

                // Move the attacker to make it look like he is making a tackle 
                tl.to(this.position, {
                    x: this.position.x - movmentDistance
                }).to(this.position, {
                    x: this.position.x + movmentDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        // start tackle sound
                        audio.tackleHit.play();
                        // Enemy actually gets hit
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;
            case 'Waterball':
                // play init waterball audio
                //audio.initFireball.play();

                // fire ball image
                const waterballImage = new Image()
                waterballImage.src = 'images/waterball.png';

                // create fire ball
                const waterball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: waterballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation,
                    scale: 0.25
                })

                renderSprites.splice(1, 0, waterball);

                gsap.to(waterball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // Enemy actually gets hit
                        audio.waterballHit.play(); // play hit waterball audio

                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderSprites.splice(1, 1);
                    }
                }) 

            break;

        }

    }
}

// boundary class
class Boundary {
    static width = 48;
    static height = 48
    constructor({ position, width, height, color = "red"}) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color
    }

    draw() {
        if (this.color === "red") {
            c.fillStyle = "rgba(255, 0, 0, 0)";
        }
        else if (this.color === "blue") {
            c.fillStyle = "rgba(0, 0, 255, 0.5)";
        }
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Projectile {
    constructor({ position, velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
        this.width = 10;
        this.height = 10;   
    }

    draw() {
        c.beginPath() // starting a new draw
        // draw a circle
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2
        );
        c.fillStyle = 'orange';
        c.fill();
        c.closePath();
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}