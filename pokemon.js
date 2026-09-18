// get the canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // used to draw on the canvas

// width and height
canvas.width = 1024;
canvas.height = 576;

c.imageSmoothingEnabled = false;

// collisoin
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

// battle zones
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

// house collision
const houseCollisionMap = [];
for (let i = 0; i < houseCollision.length; i += 13) {
    houseCollisionMap.push(houseCollision.slice(i, 13 + i));
}

// bar collisoin
const barCollisionMap = [];
for (let i = 0; i < barCollision.length; i += 22) {
    barCollisionMap.push(barCollision.slice(i, 22 + i));
}

// VARIABLES
// where the image of the map needs to start
const offset = {
    x: -735,
    y: -650
}

// where the image of the cave needs to start
const offsetCave = {
    x: -160,
    y: -1035
}

// An array that store all the achievements
const Allachievements = [
    ...document.querySelectorAll('#Achievements h2')
];

// Add blur to all achievements except the first achievement.
for (let i = 1; i < Allachievements.length; i++) {
    Allachievements[i].classList.add('blur');
}

// game variables
let gameStarted = false; // A varible that represent if the game can start or not
let worldStartPositions = null; // A varible that store all the postions of all the objects that are moving,
                                //  at the start of the game
let velocity = 3  // A varible that shows what is the velocity of the player
let enterPlayer2House = false; // A variable that represent if player needs to enter player 2 house
let playerClaimHat = false; // A varible that represents if player claim the hat
let playerEnterTheCave = false; // A variable that represent whether the player entered the cave or not
let playerRefusedToEnterTheCave = false; // A variable that represent whether the player refused to enter the cave or not
let getIntoCave = false; // A varible that represents if player needs to gets into the cave
let playerWantToEnterBar = false; // A variable that represent whether player needs to get into the bar or not
let inCave = false; // A variable that represent whether player is in cave or not

// moving varaibles
let player3moving = true; // A variable that represents when player number 3(a bot) can move
let player5moving = true; // A variable that represents when player number 5(a bot) can move
 
// dialogue variables
let dialoguePlayer4 = true; // A variable that represents if can be a dialogue with player 4
let playerTalkingWithPlayer4 = false; // A variable that represents whether the player is currently talking to player 4
let playerIsTalkingWithPlayer6 = false; // A variable that represents whether the player is currently talking to player 6
let dialogueWithPlayer6AfterEnterCaveOpen = false; // A variable that represents whether the after-cave dialogue
                                                   // with player 6 is open or not.
let dialogueWithPlayer6AfterRefuseEnterCaveOpened = false; // A variable that represents whether the dialogue after player
                                                           // 6's refusal to enter the cave is open or not
let canDialogueWithPlayer6 = true; // A varible that represents if can be dialogue with player 6
let playerEnteredBar = false; // A variable that represent whether the player entered the bar or not
let dialogueWritten = false; // A variable that represents whether the dialogue is still in the middle of being written
let instantWriting = false; // A variable that represents whether the player pressed space before the writing was finished -
                            // in which case you will immediately write the sentence
let currentDialogue = [];
let dialogueIndex = 0;
let openDialogue = false; // A variable that represents whether a dialogue is opened

const player6Dialogue = [ // player 6 dialogues

    // 0
    {
        type: "text",
        text: "You won't believe what I found!"
    },

    // 1
    {
        type: "text",
        text: "I found an abandoned cave in the middle of the sea."
    },

    // 2
    {
        type: "text",
        text: "there are rumors that there are a lot of treasures there!"
    },

    // 3
    {
        type: "text",
        text: "But monsters are protecting them!"
    },

    // 4
    {
        type: "choices",
        choices: [
            {
                text: "Take me there!",
                next: 5
            },
            {
                text: "I'm not going anywhere near there!",
                next: 7
            }
        ]
    },

    // 5
    {
        type: "text",
        text: "Are you sure about that?"
    },

    // 6
    {
        type: "choices",
        choices: [
            {
                text: "Yes",
                next: 7,
                action: () => {
                    getIntoCave = true;
                    playerEnterTheCave = true;
                    closeDialogue();
                }
            },
            {
                text: "No",
                next: 7
            }
        ]
    },

    // 7
    {
        type: "text",
        text: "Tell me if you change your mind."
    },

    // 8

    {
        type: "choices",
        choices: [
            {
                text: "Actually, I do want to go.",
                next: 9,
                action: () => {
                    getIntoCave = true;
                    playerEnterTheCave = true;
                    closeDialogue();
                }
            },
            {
                text: "No, I don't think so.",
                next: 9
            }
        ]
    },

    // 9
    {
        type: "text",
        text: "Bye, have a nice day!"
    }
];
const player6DialogueAfterRefuseEnterCave = [

    // 0
    {
        type: "text",
        text: "So you did decide to change your mind?"
    },

    // 1
    {
        type: "choices",
        choices: [
            {
                text: "Yes",
                next: 2
            },
            {
                text: "No, I just came to say hello",
                next: 5
            }
        ]
    },

    // 2
    {
        type: "text",
        text: "Are you ready to go?"
    },

    // 3
    {
        type: "choices",
        choices: [
            {
                text: "Yes, I'm ready!",
                next: 4,
                action: () => {
                    getIntoCave = true;
                    playerEnterTheCave = true;
                    closeDialogue();
                }
            },
            {
                text: "Um, on second thought, maybe I'll give up on that.",
                next: 4
            }
        ]
    },

    // 4
    {
        type: "text",
        text: "Remember, if you change your mind, I'm here!"
    },

    // 5
    {
        type: "text",
        text: "Have a wonderful day!"
    }
]
const player6DialogueAfterCave = [

    // 0
    {
        type: "text",
        text: "Did you enjoy there?"
    },

    // 1
    {
        type: "choices",
        choices: [
            {
                text: "Yes! I want to go again!",
                next: 2,
                action: () => {
                    getIntoCave = true;
                    playerEnterTheCave = true;
                    closeDialogue();
                }
            },
            {
                text: "No! I will never go there again!",
                next: 2,
                action: () => {
                    setTimeout(() => {
                        canDialogueWithPlayer6 = false;
                    }, 4000);
                }
            }
        ]
    },

    // 2
    {
        type: "text",
        text: "Goodbye, it was an amazing adventure."
    }
]

const player7Dialogue = [
    // 0
    {
        type: "text",
        text: "Hello! How are you?"
    },

    // 1 
    {
        type: "text",
        text: "Would you like to visit my bar?"
    },

    // 2
    {
        type: "choices",
        choices: [
            {
                text: "Yes",
                next: 3,
                action: () => {
                    playerWantToEnterBar = true;
                    playerEnteredBar = true;
                    closeDialogue();
                }
            },
            {
                text: "Maybe another time",
                next: 3
            }
        ]
    },

    // 3
    {
        type: "text",
        text: "have a great day!"
    }
]

const player7Dialogue2 = [
    // 0
    {
        type: "text",
        text: "Hello to my best customer!"
    }
]

// collision vaiables
let collisionPlayer1Player2 = false; // A variable that represents when there is a collision between player 1 and player 2
let collisionPlayer1Player7 = false; // A variable that represents when there is a collision between player 1 and player 2
let collisionPlayerRobChicken = false; // A variable that represents when there is a collision between player 1 and Rob's Chicken

// position variables
let pastPlayerPosition = { // A varible that represents the player position before he gets into the something
    x: null,
    y: null
}
let pastPlayer2Position = { // A varible that represents the player 2 position before he gets into the house
    x: null,
    y: null
}
let pastPlayer7Position = { // A varible that represents the player 7 position before he gets into the bar
    x: null,
    y: null
}
let pastHatPosition = { // A varible that represents the hat position before it gets into the bar
    x: null,
    y: null
}

// achievement variables
let numberOfSlimesPlayerKilled = 0 // A variable that represent how many slimes player has kill
let numberPeoplePlayerMeet = 0; //  A variable that represent how many people player has met
let playerMeetings = { // A variable that represent if player meet someone
    player2: false,
    player3: false,
    player4: false,
    player5: false,
    player6: false,
    player7: false,
    player8: false,
    player9: false,
    player10: false,
    player11: false
}
let achievementsComplete = 0; // A variable that represent how many achievements player has completed
let numberAchievementVisibleOnScreen = 0; // A variable that represent how many achievement visible on the screen
let achievementRetureRobChickenComplete = false; // A varible that represents if the achievement of of return Rob's chicken completed
let alreadyCalldUnlockAchievement = false; // A variable that represent whether the function "UnlockAchievement"
                                           //  is already called ot not
let currentAchievementCategory = "explorer";
let categoriesNumberOfAchievementsComplete =
    {
        "explorer": 0,
        "combat": 0,
        "money": 0,
        "social": 0,
        "shop": 0,
        "cave": 0
    };

// player variables
let lives = 3; // the amount of lives player has
let maxLives = 3; // the max amount of lives player can have.
createHealthBar();
updatePlayerHealthBar();
let playerDead = false; // A variable that represent whether player is dead or not
let diedInCave = false; // A variable that represenr whether player died in cave or not
let InfiniteAmmo = false; // A variable that represent whether player has infinite ammo or not
let pastNumberOfammo; // A variable that represent how much ammo player had in the past
let numberOfammo = 5; // the amount of ammo player have
updatePlayerAmmo();
let numberOfCoins = 0; // the number of coins player collect
updatePlayerCoins();
let playerSpeedBoost = false // A variable that represent whether player has speed boost or not
let playerInvincible = false // A variable that represent whether player is invincible or not
let playerDoubleCoins = false; // A variable that represent whether player should get double coins or not

//LOAD IMAGES
// background image
const image = new Image();
image.src = "images/Pellet Town.png";

// foreground image
const foregroundImage = new Image();
foregroundImage.src = "images/foregroundObjects.png";

// players image
const playerDownImage = new Image();
playerDownImage.src = "images/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "images/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "images/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "images/playerRight.png";

const playerRightSpeedBoostImage = new Image();
playerRightSpeedBoostImage.src = "images/playerRightSpeedBoost.png";

const playerLeftSpeedBoostImage = new Image();
playerLeftSpeedBoostImage.src = "images/playerLeftSpeedBoost.png";

const playerDownSpeedBoostImage = new Image();
playerDownSpeedBoostImage.src = "images/playerDownSpeedBoost.png";

const playerUpSpeedBoostImage = new Image();
playerUpSpeedBoostImage.src = "images/playerUpSpeedBoost.png";

// CHARCTERS IMAGES
const player2DownImage = new Image();
player2DownImage.src = "images/player2Down.png";

const player3RightImage = new Image();
player3RightImage.src = "images/player3Right.png";

const player3LeftImage = new Image();
player3LeftImage.src = "images/player3Left.png";

const player4DownImage = new Image();
player4DownImage.src = "images/player4Down.png";

const player5RightImage = new Image();
player5RightImage.src = "images/player5Right.png";

const player5LeftImage = new Image();
player5LeftImage.src = "images/player5Left.png";

const player6UpImage = new Image();
player6UpImage.src = "images/player6Up.png";

const player7DownImage = new Image();
player7DownImage.src = "images/player7Down.png";

const player8UpImage = new Image();
player8UpImage.src = "images/player8Up.png";

const player9DownImage = new Image();
player9DownImage.src = "images/player9Down.png";

const player10LeftImage = new Image();
player10LeftImage.src = "images/player10Left.png";

const player11RightImage = new Image();
player11RightImage.src = "images/player11Right.png";

// lawn mower image
const lawnMowerImage = new Image();
lawnMowerImage.src = "images/lawn-mower2.png";

const lawnMowerRightImage = new Image();
lawnMowerRightImage.src = "images/lawn-mower-right.png";

const lawnMowerLeftImage = new Image();
lawnMowerLeftImage.src = "images/lawn-mower-left.png";

// chicken images
const chickenWalkingLeftImage = new Image();
chickenWalkingLeftImage.src = "images/Chicken_walking_left.png";

const chickenWalkingRightImage = new Image();
chickenWalkingRightImage.src = "images/Chicken_walking_right.png";

const chickenSittingImage = new Image();
chickenSittingImage.src = "images/Chicken_sitting.png";

// fishing rod image
const fishingRodImage = new Image();
fishingRodImage.src = "images/fishing-rod.png";

// hats image
const hatImage = new Image();
hatImage.src = "images/hat.png";

const LeftHatImage = new Image();
LeftHatImage.src = "images/hatLeft.png";

// slime images
const slime_blue_right_standing = new Image();
slime_blue_right_standing.src = "images/slime_blue_right_standing.png";

const slime_blue_left_standing = new Image();
slime_blue_left_standing.src = "images/slime_blue_left_standing.png";

const slime_blue_right_walking = new Image();
slime_blue_right_walking.src = "images/slime_blue_right_walking.png";

const slime_blue_left_walking = new Image();
slime_blue_left_walking.src = "images/slime_blue_left_walking.png";

// heart image
const heartImage = new Image();
heartImage.src = "images/heart.png";

// coin image
const coinImage = new Image();
coinImage.src = "images/coin.png";

// create all boundraies
const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    width: 48,
                    height: 48
                })
            )
        }    
    })
})

// create battle zones
const battleZones = [];

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    width: 48,
                    height: 48
                })
            )
        }    
    })
});

// create house boundaries
const houseBoundaries = [];

houseCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 177) {
            houseBoundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    width: 48,
                    height: 48
                })
            )
        }    
    })
});

// create bar boundaries
const barBoundaries = [];

barCollisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 485) {
            barBoundaries.push(
                new Boundary({
                    position: {
                        x: j * 52.81 * 0.85,
                        y: i * 52.76 * 0.85
                    },
                    width: 52.81,
                    height: 52.76
                })
            )
        }    
    })
});

// array to save all the projectiles
const projectiles = [];

// array to save all the coins
const coins = [];

// create the player
const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/8,
        y: canvas.height/2 - 68/2
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage ,
        speedBoost: {
            right: playerRightSpeedBoostImage,
            left: playerLeftSpeedBoostImage,
            down: playerDownSpeedBoostImage,
            up: playerUpSpeedBoostImage
        }
    }
});

// create player 2
const player2 = new Sprite({
    position: {
        x: canvas.width/2 - 192/8,
        y: canvas.height/2 - 68/2 - 69
    },
    image: player2DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 3
const player3 = new Sprite({
    position: {
        x: canvas.width/2 - 192/8 + 200,
        y: canvas.height/2 + 30 
    },
    image: player3RightImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        right: player3RightImage,
        left: player3LeftImage
    },
    animate: true
});

// how much can player number three can move
let player3Data = {
    walkedDistance: 0,
    maxDistance: 720,
    velocityX: 5,
};

// create player 4
const player4 = new Sprite({
    position: {
        x: 1160,
        y: 615
    },
    image: player4DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 5
const player5 = new Sprite({
    position: {
        x: 950,
        y: 15 
    },
    image: player5RightImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        right: player5RightImage,
        left: player5LeftImage
    },  
    animate: true
});

// how much can player number five can move
let player5Data = {
    walkedDistance: 0,
    maxDistance: 500,
    velocityX: 5,
};

// create player 6
const player6 = new Sprite({
    position: {
        x: 1875,
        y: 60
    },
    image: player6UpImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 7
const player7 = new Sprite({
    position: {
        x: 1450,
        y: -15
    },
    image: player7DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 8
const player8 = new Sprite({
    position: {
        x: 175,
        y: 335
    },
    image: player8UpImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 9
const player9 = new Sprite({
    position: {
        x: 270,
        y: 240
    },
    image: player9DownImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 10
const player10 = new Sprite({
    position: {
        x: 270,
        y: 510
    },
    image: player10LeftImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create player 11
const player11 = new Sprite({
    position: {
        x: 175,
        y: 415
    },
    image: player11RightImage,
    frames: {
        max: 4,
        hold: 10
    }
});

// create chickens
const chicken = new Sprite({
    position: {
        x: 300,
        y: 400
    },
    image: chickenWalkingLeftImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        left: chickenWalkingLeftImage,
        right: chickenWalkingRightImage
    },
    animate: true,
    scale: 1.2
});

// how much can chicken can move
let chickenData = {
    walkedDistance: 0,
    maxDistance: -250,
    velocityX: -2,
    waiting: false
};

const chicken2 = new Sprite({
    position: {
        x: 710,
        y: 670
    },
    image: chickenSittingImage,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
    scale: 1.2,
    deafultVal: 3
});

const RobChicken = new Sprite({
    position: {
        x: 1045,
        y: -125
    },
    image: chickenSittingImage,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
    scale: 1.2,
    deafultVal: 3
});

// create slimes
const slime = new Sprite({
    position: {
        x: 650,
        y: 585
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing,
            left: slime_blue_left_standing
        },
        walking: {
            right: slime_blue_right_walking,
            left: slime_blue_left_walking
        }
    },
    animate: true,
    scale: 3
})

slime.worldSpawn = {
    x: slime.position.x - offset.x,
    y: slime.position.y - offset.y
};

slime.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime.about = {
    alive: true
}

const slime2 = new Sprite({
    position: {
        x: 250,
        y: 400
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing,
            left: slime_blue_left_standing
        },
        walking: {
            right: slime_blue_right_walking,
            left: slime_blue_left_walking
        }
    },
    animate: true,
    scale: 3
})

slime2.worldSpawn = {
    x: slime2.position.x - offset.x,
    y: slime2.position.y - offset.y
};

slime2.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime2.about = {
    alive: true
}

const slime3 = new Sprite({
    position: {
        x: 1020,
        y: 150  
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing,
            left: slime_blue_left_standing
        },
        walking: {
            right: slime_blue_right_walking,
            left: slime_blue_left_walking
        }
    },
    animate: true,
    scale: 3
})

slime3.worldSpawn = {
    x: slime3.position.x - offset.x,
    y: slime3.position.y - offset.y
};

slime3.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime3.about = {
    alive: true
}

const slime4 = new Sprite({
    position: {
        x: 1600,
        y: 580  
    },
    image: slime_blue_right_standing,
    frames: {
        max: 4,
        hold: 30
    },
    sprites: {
        standing: {
            right: slime_blue_right_standing,
            left: slime_blue_left_standing
        },
        walking: {
            right: slime_blue_right_walking,
            left: slime_blue_left_walking
        }
    },
    animate: true,
    scale: 3
})

slime4.worldSpawn = {
    x: slime4.position.x - offset.x,
    y: slime4.position.y - offset.y
};

slime4.hitbox = {
    offsetX: 27,
    offsetY: 30,
    width: 45,
    height: 40
};

slime4.about = {
    alive: true
}

const enemies = [];
enemies.push(slime);
enemies.push(slime2);
enemies.push(slime3);
enemies.push(slime4);

// create lawn mower
const lawnMower2 = new Sprite({
    position: {
        x: canvas.width/2 - 192/8 + 200,
        y: canvas.height/2 + 60
    },
    image: lawnMowerImage,
    scale: 0.65
});

// create lawn mower
const lawnMower = new Sprite({
    position: {
        x: 995,
        y: 50 
    },
    image: lawnMowerRightImage,
    sprites: {
        right: lawnMowerRightImage,
        left: lawnMowerLeftImage
    },
    scale: 0.25
});

// create fishing rod
const fishingRod = new Sprite({
    position: {
        x: 1880,
        y: -15
    },
    image: fishingRodImage,
    scale: 0.1
});

// hat image
const hat = new Sprite({
    position: {
        x: player.position.x - 5,
        y: player.position.y - 12
    },
    image: hatImage,
    sprites: {
        right: hatImage,
        left: LeftHatImage
    },
    scale: 0.3
})

// create beckground
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

// create foregrounds
const foregorond = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

// object that storage the keys and sotrage when they being pressed
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    h: {
        pressed: false
    },
    r: {
        pressed: false
    },
    b: {
        pressed: false
    }
};

// an object Which symbolizes when there is a fight and when there is not
const battle = {
    initiated: false
};

// ACHIEVEMENTS
const Achievements = {
    explorer: [

        {
            id: "enterHouse",
            icon: "🏠",
            title: "Home Sweet Home",
            description: "Enter a house",
            unlocked: false,
            visible: true,
            action: () => {
                setTimeout(() => {
                    newAchievement("talkToRob");    
                }, 4000)   
            }
        },

        {
            id: "talkToRob",
            icon: "👦🏻",
            title: "Nice To Meet You",
            description: "Talk to rob",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("findRobChicken");
                }, 4000)
            }
        },

        {
            id: "findRobChicken",
            icon: "🐔",
            title: "Pac Pac",
            description: "Find Rob's chicken",
            unlocked: false,
            visible: false
        },

        {
            id: "enterBar",
            icon: "🍷",
            title: "Drunk",
            description: "Enter the bar",
            unlocked: false,
            visible: true,
            action: () => {
                setTimeout(() => {
                    newAchievement("buy20Bullets");
                }, 4000)
            }
        },

        {
            id: "enterCave",
            icon: "🗻" ,
            title: "Is Anyone There... Ere... Re",
            description: "Enter the cave",
            unlocked: false,
            visible: true,
            action: () => {
                setTimeout(() => {
                    newAchievement("defeatSlimesBoss");
                }, 4000)
            }
        }
    ],

    combat: [
        {
            id: "killFirstSlime",
            icon: "⚔",
            title: "First Blood",
            description: "Kill your first slime.",
            unlocked: false,
            visible: true,
            action: () => {
                setTimeout(() => {
                    newAchievement("kill10Slimes");
                }, 4000)
            }
        },

        {
            id: "kill10Slimes",
            icon: "⚔",
            title: "Warm-Up",
            description: "Kill 10 slimes",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("Kill30Slimes");
                }, 4000)
            }
        },

        {
            id: "Kill30Slimes",
            icon: "⚔",
            title: "Natural Born Killer",
            description: "Kill 30 slimes",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("Kill50Slimes");
                }, 4000)
            }
        },

        {
            id: "Kill50Slimes",
            icon: "⚔",
            title: "Monster's Nightmare",
            description: "Kill 50 slimes",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("Kill100Slimes");
                }, 4000)
            }
        },

        {
            id: "Kill100Slimes",
            icon: "⚔",
            title: "Serial Grinder",
            description: "Kill 100 slimes",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("Kill500Slimes");
                }, 4000)
            }
        },

        {
            id: "Kill500Slimes",
            icon: "⚔",
            title: "Population Control",
            description: "Kill 500 slimes",
            unlocked: false,
            visible: false
        }
    ],

    money: [
        {
            id: "collect5Coins",
            icon: "💰",
            title: "beggar",
            description: "Collect 5 coins.",
            unlocked: false,
            visible: true,
            action: () => {
                setTimeout(() => {
                    newAchievement("collect20Coins")
                }, 4000)
            }
        },

        {
            id: "collect20Coins",
            icon: "💰",
            title: "Pocket Change",
            description: "Collect 20 coins.",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("collect50Coins")
                }, 4000)
            }
        },

        {
            id: "collect50Coins",
            icon: "💰",
            title: "Middle Class",
            description: "Collect 50 coins.",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("collect100Coins")
                }, 4000)
            }
        },

        {
            id: "collect100Coins",
            icon: "💰",
            title: "Making it Rain",
            description: "Collect 100 coins.",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("collect300Coins")
                }, 4000)
            }
        },

        {
            id: "collect300Coins",
            icon: "💰",
            title: "Filthy Rich",
            description: "Collect 300 coins.",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("collect500Coins")
                }, 4000)
            }
        },

        {
            id: "collect500Coins",
            icon: "💰",
            title: "Broke the Economy",
            description: "Collect 500 coins.",
            unlocked: false,
            visible: false
        }
    ],

    social: [
        {
            id: "talk5People",
            icon: "👨",
            title: "New neighbor",
            description: "Talk to 5 people",
            unlocked: false,
            visible: true
        }
    ],

    shop: [
        {
            id: "buy20Bullets",
            icon: "🔫",
            title: "Ammunition collection",
            description: "Buy 20 bullets",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("restore5HP");
                }, 4000)
            }
        },

        {
            id: "restore5HP",
            icon: "❤️",
            title: "Not Dead Yet",
            description: "Recover 5 HP",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("increaseMaxHP");
                }, 4000)
            }
        },

        {
            id: "increaseMaxHP",
            icon: "💪",
            title: "Unstoppable",
            description: "Increase your max HP by 3",
            unlocked: false,
            visible: false,
            action: () => {
                setTimeout(() => {
                    newAchievement("buyPotion");
                }, 4000)
            }
        },

        {
            id: "buyPotion",
            icon: "🧪",
            title: "A real scientist",
            description: "Buy your first potion",
            unlocked: false,
            visible: false
        }
    ],

    cave: [
        {
            id: "defeatSlimesBoss",
            icon: "😈",
            title: "King of the Slimes",
            description: "Defeat the king of the slimes",
            unlocked: false,
            visible: false
        }
    ]
};

// FUNCTIONS
function renderAchievementCategories() {
    const categoriesContainer = document.querySelector("#achievementCategories");

    categoriesContainer.innerHTML = "";

    Object.keys(Achievements).forEach((category) => {

        const button = document.createElement("button");

        button.classList.add("achievementCategoryButton");

        button.innerText = category;

        if (category === currentAchievementCategory) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            currentAchievementCategory = category;

            renderAchievements();

        });

        categoriesContainer.appendChild(button);
    });
}

// A function used to create achievements in the category the player is in
function renderAchievements() {

    const achievementGrid = document.querySelector("#achievementGrid");

    achievementGrid.innerHTML = "";

    numberAchievementVisibleOnScreen = 0;

    const category = Achievements[currentAchievementCategory];

    category.forEach((achievement) => {

        if (achievement.visible) {

            numberAchievementVisibleOnScreen++;

            const card = document.createElement("div");

            card.classList.add("achievementCard");

            if (achievement.unlocked) {
                card.classList.add("completed");
            }
            else {
                card.classList.add("locked");
            }

            card.innerHTML = `
                <div class="achievementIcon">
                    ${achievement.icon}
                </div>

                <div class="achievementInfo">
                    <h3>${achievement.title}</h3>

                    <p>${achievement.description}</p>
                </div>
            `;

            achievementGrid.appendChild(card);
        }
    });

    document.querySelector("#achievementProgress").innerText =
        `${categoriesNumberOfAchievementsComplete[currentAchievementCategory]} / ${numberAchievementVisibleOnScreen} completed`;

    renderAchievementCategories();
}
renderAchievements();

// function for unlock achievement
function unlockAchievement(id) {
    const achievement = findAchievement(id);

    if (!achievement) return;

    if (achievement.unlocked) return;

    if (!achievement.visible) {
        newAchievement(id);

        setTimeout(() => {
            unlockAchievement(id);
        }, 4000)
        return;
    }

    if (achievement.action) {
        achievement.action();
    }

    achievement.unlocked = true;

    achievementsComplete++;

    achievementCategory = findCategoryName(id);

    if (!achievementCategory) return;

    categoriesNumberOfAchievementsComplete[achievementCategory] += 1;

    renderAchievements();

    showPopup({
        icon: achievement.icon,
        title: achievement.title,
        message: "Achievement Unlocked!"
    })

    // play the audio of achievement unlock
    audio.achievementComplete.play();
}

// function for show new Achievement
function newAchievement(id) {
    const achievement = findAchievement(id);

    if (!achievement) return;

    if (achievement.visible) return;

    achievement.visible = true;

    renderAchievements();

    showPopup({
        icon: achievement.icon,
        title: achievement.title,
        message: "New Achievement!"
    })

    // play the audio of new achievement
    audio.achievementComplete.play();
}

function findAchievement(id) {
    for (const category of Object.values(Achievements)) {
        for (const achievement of category) {
            if (achievement.id === id) {
                return achievement;
            }
        }
    }

    return null;
}

function findCategoryName(id) {
    for (const [categoryName, categoryArray] of Object.entries(Achievements)) {
        for (const achievement of categoryArray) {
            if (achievement.id === id) {
                return categoryName; 
            }
        }
    }
    return null; 
}

// function for show when player unlock or get a new achievement
function showPopup(data) {
    document.querySelector("#achievementPopup").style.display = "flex";

    document.querySelector("#achievementPopupIcon").innerText = data.icon;
    document.querySelector("#achievementPopupTitle").innerText = data.title;
    document.querySelector("#achievementPopupMessage").innerText = data.message;

    gsap.fromTo(
        "#achievementPopup",
        {
            right: -400
        },
        {
            right: 20,
            duration: .6
        }
    );

    setTimeout(() => {

        gsap.to("#achievementPopup", {
            right: -400,
            duration: .6,
            onComplete() {
                document.querySelector("#achievementPopup").style.display = "none";
                alreadyCalldUnlockAchievement = false;
            }
        });

    }, 3000);
}

// function for popup achievement when unlock it
function showAchievementPopup(achievement) {
    document.querySelector('#achievementPopup').style.display = "flex";

    document.querySelector('#achievementPopupIcon').innerText = achievement.icon;
    document.querySelector('#achievementPopupTitle').innerText = achievement.title;

    gsap.fromTo(
        "#achievementPopup",
        {
            right: -400
        },
        {
            right: 20,
            duration: .6
        }
    );
    
    setTimeout(() => {
        gsap.to("#achievementPopup", {
            right: -400,
            duration: .6,
            onComplete() {
                document.querySelector('#achievementPopup').style.display = "none";
            }
        });
    }, 3000);
}   

// function for detect collision
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
};

// fucntion for checking collsison between enemy and projectiles
function hitboxCollision({ enemy, rectangle2 }) {
    return (
        enemy.position.x + enemy.hitbox.offsetX + enemy.hitbox.width >= rectangle2.position.x &&
        enemy.position.x + enemy.hitbox.offsetX <= rectangle2.position.x + rectangle2.width &&
        enemy.position.y + enemy.hitbox.offsetY <= rectangle2.position.y + rectangle2.height &&
        enemy.position.y + enemy.hitbox.offsetY + enemy.hitbox.height >= rectangle2.position.y
    );
}

//  function for draw and moving on the screen(main function)
function animate() {
    if (!gameStarted) return;

    const animationId = window.requestAnimationFrame(animate);

    // things that should move every time that the player want to move
    const movables = [
        background, ...boundaries, foregorond, ...battleZones,
        player2, player3, player4, player5, player6, player7,
        lawnMower, fishingRod,
        chicken, chicken2, RobChicken,
        ...enemies,
        ...projectiles,
        ...coins
    ]; 

    if (worldStartPositions === null) {
        worldStartPositions = [
            background,
            ...boundaries,
            foregorond,
            ...battleZones,
            player2,
            player3,
            player4,
            player5,
            player6,
            player7,
            lawnMower,
            fishingRod,
            chicken,
            chicken2,
            RobChicken,
            ...enemies
        ].map(movable => ({
            object: movable,
            x: movable.position.x,
            y: movable.position.y
        }));
    }

    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw beckground
    background.draw();

    // draw boundaries
    boundaries.forEach(Boundary => {
        Boundary.draw();
    });

    // draw battle Zones(for collision)
    battleZones.forEach(battleZone => {
        battleZone.draw();
    });

    // draw lawn mower
    lawnMower.draw();

    // draw fishing rod
    fishingRod.draw();

    // draw chickens
    chicken.draw();

    if (chicken2.frames.val === 3) {
        chicken2.animate = false;
    }
    chicken2.draw();

    if (RobChicken.frames.val === 3) {
        RobChicken.animate = false;
    }

    // draw characters
    player2.draw();
    player3.draw();
    player4.draw();
    player7.draw();
    player5.draw();
    player6.draw();

    // draw rob chicken
    RobChicken.draw();

    // If the player bought any potions - do any effect on the player
    drawPowerUpEffect()

    // draw player
    player.draw();

    // draw hat
    if (playerClaimHat) {
        hat.draw();
    }

    // draw enemies
    enemies.forEach(enemy => {
        if (enemy.about.alive) {
            enemy.draw();
        }
    })

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

    // draw coins
    coins.forEach(coin => {
        coin.draw();
    })

    // draw foreground
    foregorond.draw();

    if (!playerDead) {
        // ACHIEVEMENTS CHECK 
        checkAchievements();

        // ACTIVE A BATTLE
        if (battle.initiated) return; // if we allready strated a battle we don't want the player to move
        // active a battle
        if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
            // check collisoin with battle zones
            for (let i = 0; i < battleZones.length; i++) {
                const battleZone = battleZones[i];
                const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
                                        Math.max(player.position.x, battleZone.position.x)) *
                                        (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
                                        Math.max(player.position.y, battleZone.position.y));

                if (
                    rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone
                    }) &&
                    overlappingArea > (player.width * player.height) / 2
                    && Math.random() < 0.01
                ) {

                    // deactivate current animation loop
                    window.cancelAnimationFrame(animationId);

                    document.querySelector(".playerState").style.display = "none";
                    document.querySelector("#achievementButton").style.display = "none";

                    // stop map music, and start battle music
                    audio.map.stop();
                    audio.map.seek(0);
                    audio.initBattle.play();
                    audio.battle.play();

                    battle.initiated = true;

                    // fade
                    gsap.to('#blackDiv', {
                        opacity: 1, 
                        repeat: 3, 
                        yoyo: true, // make a smooth fade
                        duration: 0.4, // each fade take 0.4 secondes
                        onComplete() { // when the all the fades finish stop fade and don't show nothing
                            gsap.to('#blackDiv', {
                                opacity: 1,
                                duration: 0.4,
                                onComplete() {
                                    // active a new animation loop
                                    initBattle();
                                    animateBattle();
                                    gsap.to('#blackDiv', {
                                        opacity: 0,
                                        duration: 0.4,
                                    })
                                }
                            })
                        }
                    });
                    break;
                }
            }
        }

        // COLLISION
        let talkingToSomeone = false; // A variable that represent if player talking to someone
        // check if player collide with character number 2
        if (rectangularCollision({
            rectangle1: player, 
            rectangle2: player2
        })) {
            // If player has not yet met this character then the number of people the player has met should increase.
            if (!playerMeetings.player2) {
                numberPeoplePlayerMeet++;
                playerMeetings.player2 = true;
            }

            // player is talking to someone
            talkingToSomeone = true;

            // If the dialogue is not already open - open it
            if (!openDialogue) {
                openCharacterDialogue(
                    "Adam",
                    [
                        {
                            type: "text",
                            text: "Hello! My name is Adam."
                        },
                        {
                            type: "text",
                            text: "How can I help you?"
                        },
                        {
                            type: "text",
                            text: "Feel free to enter my house!"
                        }
                    ],
                    true
                );
            }

            // there is collision with player 2
            collisionPlayer1Player2 = true;
        } else {
            collisionPlayer1Player2 = false;
        }

        // check if player collide with character number 3
        if (rectangularCollision({
            rectangle1: player, 
            rectangle2: player3
        })) {
            // If  player has not yet met this character then the number of people the player has met should increase.
            if (!playerMeetings.player3) {
                numberPeoplePlayerMeet++;
                playerMeetings.player3 = true;
            }

            // player is talking to someone
            talkingToSomeone = true;
            
            // player 3 needs to stop moving
            player3moving = false;

            // If the dialogue is not already open - open it
            if (!openDialogue) {
                openCharacterDialogue(
                    "Bob",
                    [
                        {
                            type: "text",
                            text: "Hi!"
                        },
                        {
                            type: "text",
                            text: "Would you like to join me for a walk?"
                        },
                        {
                            type: "text",
                            text: "It's a perfect day!"
                        }
                    ]
                );
            }
        } else {
            // player 3 can continue moving
            player3moving = true;
        }

        // check collision between player and player 4
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: player4
        })) {
            // if can be a dialogue with player 4 - show dialogue
            if (dialoguePlayer4) {
                // If  player has not yet met this character then the number of people the player has met should increase.
                if (!playerMeetings.player4) {
                    numberPeoplePlayerMeet++;
                    playerMeetings.player4 = true;
                }

                // player is talking to someone
                talkingToSomeone = true;

                // unlock achievemnt number 3
                unlockAchievement("talkToRob");    

                // open dialogue with player 4
                // If the dialogue is not already open - open it
                if (!openDialogue) {
                    playerTalkingWithPlayer4 = true // player is currently talking with player 4

                    if (!achievementRetureRobChickenComplete) {
                        openCharacterDialogue(
                            "Rob",
                            [
                                // 0
                                {
                                    type: "text",
                                    text: "Hey, how are you?"
                                },

                                // 1
                                {
                                    type: "text",
                                    text: "My name is Rob, I need your help."
                                },

                                // 2
                                {
                                    type: "text",
                                    text: "I lost a chicken... I have to find it!"
                                }
                            ]
                        );
                    } else {
                        openCharacterDialogue(
                            "Rob",
                            [
                                // 0
                                {
                                    type: "text",
                                    text: "Oh thank God you found it."
                                },

                                // 1
                                {
                                    type: "text",
                                    text: "I thank you so much! Here's something for you..."
                                }
                            ]
                        );
                    }
                }

            }

        } 

        // check collision between player to player 6
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: player6
        })) {   
            if (canDialogueWithPlayer6) {
                // If  player has not yet met this character then the number of people the player has met should increase.
                if (!playerMeetings.player6) {
                    numberPeoplePlayerMeet++;
                    playerMeetings.player6 = true;
                }

                // player is talking with player 6 at the moment
                playerIsTalkingWithPlayer6 = true;

                // player is talking to someone
                talkingToSomeone = true;
                
                // Open the dialogue only if it is not already open
                if (!openDialogue) {
                    if (!playerEnterTheCave && !playerRefusedToEnterTheCave) {
                        openCharacterDialogue(
                            "Fisherman",
                            player6Dialogue
                        );
                    }
                    else if (playerEnterTheCave) {
                        playerEnterTheCave = false;
                        dialogueWithPlayer6AfterEnterCaveOpen = true;
                        openCharacterDialogue(
                            "Fisherman",
                            player6DialogueAfterCave
                        );
                    }
                    else if (playerRefusedToEnterTheCave) {
                        playerRefusedToEnterTheCave = false;
                        dialogueWithPlayer6AfterRefuseEnterCaveOpened = true;
                        openCharacterDialogue(
                            "Fisherman",
                            player6DialogueAfterRefuseEnterCave
                        );
                    }
                }
            }
        } 

        // check collison between player and player 7
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: player7
        })) {
            // If  player has not yet met this character then the number of people the player has met should increase.
            if (!playerMeetings.player7) {
                numberPeoplePlayerMeet++;
                playerMeetings.player7 = true;
            }

            // player is talking to someone
            talkingToSomeone = true;

            if (!openDialogue) {
                if (!playerEnteredBar) {
                    openCharacterDialogue(
                        "Barman",
                        player7Dialogue
                    );
                } else {
                    openCharacterDialogue(
                        "Barman",
                        player7Dialogue2,
                        false,
                        true
                    );
                }
            }
        } 

        if (!talkingToSomeone) {
            // // hide dialogue
            // document.querySelector('#charactersDialogueBox').style.display = "none";
            // // hide house icon
            // document.querySelector('#houseDialogue').style.display = "none";
            // // delete the text in the dialogue
            // document.querySelector('#dialogueText').innerText = "";
            // // dialogue is not already open
            openDialogue = false;
            closeDialogue();

            if (dialogueWithPlayer6AfterEnterCaveOpen) {
                dialogueWithPlayer6AfterEnterCaveOpen = false;
                playerEnterTheCave = true;
            }
            else if (dialogueWithPlayer6AfterRefuseEnterCaveOpened) {
                dialogueWithPlayer6AfterRefuseEnterCaveOpened = false;
                playerRefusedToEnterTheCave = true;
            }
        }


        // check collision between player and Rob chicken
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: RobChicken
        })) {
            // show its Rob's chicken
            document.querySelector('#RobChickenText').style.display = "block";
            document.querySelector('#RobChickenText').style.left = RobChicken.position.x - 15 + "px";
            document.querySelector('#RobChickenText').style.top = RobChicken.position.y - 5 + "px";

            if (!achievementRetureRobChickenComplete && findAchievement("findRobChicken").visible) {
                document.querySelector('#catchRobChicken').style.display = "block";
                document.querySelector('#catchRobChicken').style.left = player.position.x - 13 + "px";
                document.querySelector('#catchRobChicken').style.top = player.position.y + 50 + "px";

                collisionPlayerRobChicken = true;
            }

        } else {
            document.querySelector('#RobChickenText').style.display = "none";
            if (!achievementRetureRobChickenComplete) {
                document.querySelector('#catchRobChicken').style.display = "none";
            }
        }

        // check collision between each projectile to each enemy
        for (let i = projectiles.length - 1; i >= 0; i--) {
            for (let j = enemies.length - 1; j >= 0; j--) {
                const projectile = projectiles[i];
                const enemy = enemies[j];

                // if enemy not alive continue to another loop
                if (!enemy.about.alive) continue;

                if (hitboxCollision({
                    enemy: enemy,
                    rectangle2: projectile
                })) {
                    // enemy not alive (you can't see him)
                    enemy.about.alive = false

                    // delete the projectile
                    projectiles.splice(i, 1);    

                    // increase the varible that represent how many slimes player has killed
                    numberOfSlimesPlayerKilled++

                    // create a coin where we killed the enemy
                    coins.push(
                        new Sprite({
                            position: {
                                x: enemy.position.x + enemy.width / 2 - 7,
                                y: enemy.position.y + enemy.height / 2 - 7
                            },
                            image: coinImage,
                            scale: 1.5
                        })
                    )

                    // after 10 seconds the enemy respawn
                    setTimeout(() => {
                        respawnEnemy(enemy);
                    }, 10000)

                    break;
                }
            }
        }

        // check collision between projectiles to boundaries
        for (let i = projectiles.length - 1; i >= 0; i--) {
            for (let j = 0; j < boundaries.length; j++) {
                const projectile = projectiles[i];
                const boundary = boundaries[j];

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

        // check collision between each enemy to the player
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];

            if (!enemy.about.alive) continue;

            if (hitboxCollision({
                enemy: enemy,
                rectangle2: player
            })) {
                enemy.about.alive = false;
                if (lives > 0 && !playerInvincible) {
                    lives -= 1;
                    if (lives <= 0) {
                        handlePlayerDeath();
                    }
                    updatePlayerHealthBar();
                }

                setTimeout(() => {
                    respawnEnemy(enemy);
                }, 10000)
            }
        }

        // check collisoin betwwen player to a coin
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: coin
            })) {
                coins.splice(i, 1);

                if (playerDoubleCoins) {
                    numberOfCoins += 2;
                } else {
                    numberOfCoins += 1;
                }
                
                updatePlayerCoins();
            }
        }

        if (getIntoCave) {
            // deactivate current animation loop
            window.cancelAnimationFrame(animationId);

            // don't let the player start map music
            clicked = true;

            // So that when the player returns, he won't go straight into the cave again.
            getIntoCave = false;

            // player is on cave right now
            inCave = true;

            // unlocked achievement if enter the cave
            unlockAchievement("enterCave");

            // stop map music
            audio.map.stop();
            audio.map.seek(0); // restart music

            // hide dialogue
            document.querySelector('#character6Dialogue').style.display = "none";

            // fade
            gsap.to('#blackDiv', {
                opacity: 1, 
                repeat: 3, 
                yoyo: true, // make a smooth fade
                duration: 0.4, // each fade take 0.4 secondes
                onComplete() { // when the all the fades finish stop fade and don't show nothing
                    gsap.to('#blackDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete() {
                            // active a new animation loop
                            player.image = player.sprites.down;
                            //start cave music
                            audio.cave.play();
                            // start the cave function
                            initcave();
                            // The player cannot leave the cave for a few seconds after entering.
                            CanGetOutCave = false;
                            // So the player can exit the cave
                            leavingCave = false;
                            // show screen
                            gsap.to('#blackDiv', {
                                opacity: 0,
                                duration: 0.4,
                            })
                        }
                    })
                }
            });
        }

        // MOVEMENT
        let moving = true; // A varible to check whenever we should move or not
        player.animate = false; // 'true' when the player is moving and need to change frame

        // "move" player (Move everything except the player to create the feeling that the player is moving)
        if (keys.w.pressed && lastKey === 'w') {
            player.animate  = true;
            player.image = player.sprites.up;

            // if player bought the speed boost potion he should have blue outline around him
            if (playerSpeedBoost) {
                player.image = player.sprites.speedBoost.up;
            }

            // check collision with things on the map(except battle zones)
            for (let i = 0; i < boundaries.length; i++) {
                const Boundary = boundaries[i];
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
                movables.forEach((movable) => {
                    movable.position.y += velocity;
                })
            }
        }
        else if (keys.a.pressed && lastKey === 'a') {
            player.animate  = true;
            player.image = player.sprites.left;

            // if player bought the speed boost potion he should have blue outline around him
            if (playerSpeedBoost) {
                player.image = player.sprites.speedBoost.left;
            }

            // if player claimed the hat, also change the sprite of the hat to adjust the direction player is walking
            if (playerClaimHat) {
                hat.image = hat.sprites.left;
            }

            // check collision with things on the map(except battle zones)
            for (let i = 0; i < boundaries.length; i++) {
                const Boundary = boundaries[i];
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
                movables.forEach((movable) => {
                    movable.position.x += velocity;
                })            
            }
        }
        else if (keys.s.pressed && lastKey === 's') {
            player.animate  = true;
            player.image = player.sprites.down;

            // if player bought the speed boost potion he should have blue outline around him
            if (playerSpeedBoost) {
                player.image = player.sprites.speedBoost.down;
            }

            // check collision with things on the map(except battle zones)
            for (let i = 0; i < boundaries.length; i++) {
                const Boundary = boundaries[i];
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
                movables.forEach((movable) => {
                    movable.position.y -= velocity;
                })
            }
        } 
        else if (keys.d.pressed && lastKey === 'd') {
            player.animate  = true;
            player.image = player.sprites.right;

            // if player bought the speed boost potion he should have blue outline around him
            if (playerSpeedBoost) {
                player.image = player.sprites.speedBoost.right;
            } 

            // if player claimed the hat, also change the sprite of the hat to adjust the direction player is walking
            if (playerClaimHat) {
                hat.image = hat.sprites.right;
            }

            // check collision with things on the map(except battle zones)
            for (let i = 0; i < boundaries.length; i++) {
                const Boundary = boundaries[i];
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
                movables.forEach((movable) => {
                    movable.position.x -= velocity;
                })
            }
        } 
        else if (enterPlayer2House) {
            // deactivate current animation loop
            window.cancelAnimationFrame(animationId);

            // if this is the first time player has entered the house unlock the achievement of entering a house
            unlockAchievement("enterHouse");

            // fade
            gsap.to('#blackDiv', {
                opacity: 1, 
                repeat: 3, 
                yoyo: true, // make a smooth fade
                duration: 0.4, // each fade take 0.4 secondes
                onComplete() { // when the all the fades finish stop fade and don't show nothing
                    gsap.to('#blackDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete() {
                            // active a new animation loop
                            // save player 1 and player 2 and hat position
                            pastPlayerPosition.x = player.position.x;
                            pastPlayerPosition.y = player.position.y;
                            pastPlayer2Position.x = player2.position.x;
                            pastPlayer2Position.y = player2.position.y;
                            pastHatPosition.x = hat.position.x;
                            pastHatPosition.y = hat.position.y;
                            // change player 1 and player 2 position
                            player.position.x = 504;
                            player.position.y = 544;
                            player2.position.x = 484;
                            player2.position.y = 324;
                            hat.position.x = player.position.x - 5;
                            hat.position.y = player.position.y - 12;

                            // hide big player health bar and show a small button instand
                            hidePlayerState();
                            showHealthButton();

                            // Move the achievements button so it doesn't cover the health bar
                            document.querySelector('#achievementButton').style.left = 5 + "px";
                            document.querySelector('#achievementButton').style.top = 55 + "px";

                            getIntoHouse();
                            gsap.to('#blackDiv', {
                                opacity: 0,
                                duration: 0.4,
                            })
                        }
                    })
                }
            });
        }
        else if (playerWantToEnterBar) {
            // deactivate current animation loop
            window.cancelAnimationFrame(animationId);

            playerWantToEnterBar = false; // So the player will not enter the bar instanly when coming back

            // if this is the first time player enter the bar unlock the achievement of entering the bar
            unlockAchievement("enterBar");
            
            // don't let the player start map music
            clicked = true;

            // stop map music
            audio.map.stop();
            audio.map.seek(0); // restart music

            // fade
            gsap.to('#blackDiv', {
                opacity: 1, 
                repeat: 3, 
                yoyo: true, // make a smooth fade
                duration: 0.4, // each fade take 0.4 secondes
                onComplete() { // when the all the fades finish stop fade and don't show nothing
                    gsap.to('#blackDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete() {
                            // active a new animation loop
                            // save player 1 and player 7 and hat position
                            pastPlayerPosition.x = player.position.x;
                            pastPlayerPosition.y = player.position.y;
                            pastPlayer7Position.x = player7.position.x;
                            pastPlayer7Position.y = player7.position.y;
                            pastHatPosition.x = hat.position.x;
                            pastHatPosition.y = hat.position.y;
                            // change player 1 and player 2 position
                            player.position.x = 504;
                            player.position.y = 400;
                            player7.position.x = 750;
                            player7.position.y = 285;
                            hat.position.x = player.position.x - 5;
                            hat.position.y = player.position.y - 12;
                            // start bar music
                            audio.bar.play();
                            getIntoBar();
                            gsap.to('#blackDiv', {
                                opacity: 0,
                                duration: 0.4,
                            })
                        }
                    })
                }
            });
        }
        else if (keys.r.pressed && collisionPlayerRobChicken && !achievementRetureRobChickenComplete) {
            //if (!alreadyCalldUnlockAchievement) {
            unlockAchievement("findRobChicken");    
                //alreadyCalldUnlockAchievement = true;
            //}
            
            gsap.to(RobChicken, {
                opacity: 0,
                onComplete: () => {
                    RobChicken.position.x = player4.position.x + player4.width + 5;
                    RobChicken.position.y = player4.position.y + player4.height - RobChicken.height;

                    document.querySelector('#catchRobChicken').remove();

                    achievementRetureRobChickenComplete = true;

                    gsap.to(RobChicken, {
                        opacity: 1
                    })
                }
            })
        }

        // MOVE CHARACTERS
        // player 3
        if (player3Data.walkedDistance !== player3Data.maxDistance) { // if player 3 needs to move
            if (!player3moving) {
                player3.animate= false;
            } else {
                player3.animate = true; // player 3 needs to start animate

                if (player3.frames.elapsed % 10 === 0) { // with that the animation will not be to quickly
                    player3.position.x += player3Data.velocityX; // move player (left or right)
                    // increase the walked distance of player 3 (to see when he gets to the location which he needs to gets)
                    player3Data.walkedDistance += player3Data.velocityX; 
                }
            }
        } else {
            player3.animate = false; // stop player 3 animation
            player3.frames.val = 1; // restart his frame
            player3Data.walkedDistance = 0; // restart walked distance of player 3
            player3Data.maxDistance *= -1; // chage max distance to match the reverse direction
            player3Data.velocityX *= -1; // change velocity x to match the reverse direction
            // Change the image to match the direction we changed. 
            if (player3Data.velocityX < 0) {
                player3.image = player3.sprites.left; 
            }
            else if (player3Data.velocityX > 0) {
                player3.image = player3.sprites.right;
            }
            player3.animate = true;
        }

        // player 5
        if (player5Data.walkedDistance !== player5Data.maxDistance) { // if player 5 needs to move
            if (!player5moving) {
                player5.animate= false;
            } else {
                player5.animate = true; // player 5 needs to start animate

                if (player5.frames.elapsed % 10 === 0) { // with that the animation will not be to quickly
                    player5.position.x += player5Data.velocityX; // move player (left or right)
                    lawnMower.position.x += player5Data.velocityX; // move the lawn mower with the player
                    // increase the walked distance of player 5 (to see when he gets to the location which he needs to gets)
                    player5Data.walkedDistance += player5Data.velocityX; 
                }
            }
            
        } else {
            player5.animate = false; // stop player 5 animation
            player5.frames.val = 1; // restart his frame
            player5Data.walkedDistance = 0; // restart walked distance of player 5
            player5Data.maxDistance *= -1; // chage max distance to match the reverse direction
            player5Data.velocityX *= -1; // change velocity x to match the reverse direction
            // Change the image to match the direction we changed. 
            if (player5Data.velocityX < 0) {
                player5.image = player5.sprites.left;
                lawnMower.image = lawnMower.sprites.left; 
                lawnMower.position.x = player5.position.x - 55.75;
            }
            else if (player5Data.velocityX > 0) {
                player5.image = player5.sprites.right;
                lawnMower.image = lawnMower.sprites.right;
                lawnMower.position.x = player5.position.x + 45;
            }
            player5.animate = true;
        }

        // MOVE CHICKENS
        if (!chickenData.waiting) {
            if (chickenData.walkedDistance !== chickenData.maxDistance) { // chicken needs still to mive

                chicken.animate = true;

                if (chicken.frames.elapsed % 10 === 0) { // with that the animation will not be to quickly
                    chicken.position.x += chickenData.velocityX; // move chicken (left or right)
                    // increase the walked distance of the chicken (to see when it gets to the location which he needs to gets)
                    chickenData.walkedDistance += chickenData.velocityX; 
                }
            } else {
                chicken.animate = false;
                chicken.frames.val = 1; // restart his frame

                // srart waiting
                chickenData.waiting = true;

                setTimeout(() => {
                    chickenData.walkedDistance = 0; // restart walked distance of player 5
                    chickenData.maxDistance *= -1; // chage max distance to match the reverse direction
                    chickenData.velocityX *= -1; // change velocity x to match the reverse direction
                    // Change the image to match the direction we changed. 
                    if (chickenData.velocityX < 0) {
                        chicken.image = chicken.sprites.left;
                    }
                    else if (chickenData.velocityX > 0) {
                        chicken.image = chicken.sprites.right;
                    }
                    chicken.animate = true; // continue moving

                    //stop waiting
                    chickenData.waiting = false;
                }, 2000); // wait 2 seconds
            }
        }

        // move enemies(if needed)
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];

            // c.beginPath()
            // c.arc(enemy.position.x + enemy.width/2, enemy.position.y + enemy.height/2, 300, 0 , Math.PI * 2);
            // c.strokeStyle = "rgba(255, 0, 0, 1)";
            // c.stroke();
            // c.closePath();

            // Calculating the distance on the X axis between the player and the enemy
            const dx = player.position.x - enemy.position.x;

            // Calculate the distance on the Y axis between the player and the enemy
            const dy = player.position.y - enemy.position.y;

            // Calculating the direct distance (in the air) between the player and the enemy
            // According to the Pythagorean theorem
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If the player is within the enemy's detection radius
            if (distance < 300) {
                // Enemy pursuit speed
                const speed = 1.2;

                // How much the player needs to move in each axis
                const velocityX = (dx / distance) * speed;
                const velocityY = (dy / distance) * speed;

                // change enemy sprite
                if (velocityX < 0) {
                    enemy.image = enemy.sprites.walking.left;
                } else {
                    enemy.image = enemy.sprites.walking.right;
                }

                enemy.frames.hold = 10;

                // check collision with boundaries
                // X-axis
                let canMoveX = true;

                for (const boundary of boundaries) {
                    if (
                        hitboxCollision({
                            enemy: {
                                ...enemy,
                                position: {
                                    x: enemy.position.x + velocityX,
                                    y: enemy.position.y
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

                for (const boundary of boundaries) {
                    if (
                        hitboxCollision({
                            enemy: {
                                ...enemy,
                                position: {
                                    x: enemy.position.x,
                                    y: enemy.position.y + velocityY
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

                // Moving the enemy towards the player on the X axis
                if (canMoveX) {
                    enemy.position.x += velocityX;
                }

                // Moving the enemy towards the player on the Y axis
                if (canMoveY) {
                    enemy.position.y += velocityY;
                }
            } else {
                if (enemy.image === enemy.sprites.walking.right || enemy.image === enemy.sprites.standing.right) {
                    enemy.image = enemy.sprites.standing.right;
                }
                else if (enemy.image === enemy.sprites.walking.left || enemy.image === enemy.sprites.standing.left) {
                    enemy.image = enemy.sprites.standing.left;
                }
                
                enemy.frames.hold = 30;
            }
        }
    }
}

function handlePlayerDeath() {
    if (playerDead) return;

    playerDead = true;

    // Save the amount of coins the player lost
    document.querySelector("#goldLoss").innerText = numberOfCoins;

    // Hide the player
    gsap.to(player, {
        opacity: 0,
        duration: 1,
        onComplete: () => {

            // Show death screen
            document.querySelector("#deathScreen").style.display = "flex";

            gsap.to("#deathScreen", {
                opacity: 1,
                duration: 2
            });
        }
    });
}

function respawnWorld() {
    // Return world objects to their exact starting positions
    worldStartPositions.forEach(({ object, x, y }) => {
        object.position.x = x;
        object.position.y = y;
    });

    // Clear temporary objects
    projectiles.length = 0;
    coins.length = 0;

    // Lose all coins
    numberOfCoins = 0;
    updatePlayerCoins();

    // Restore full HP
    lives = maxLives;
    updatePlayerHealthBar();

    // Return player to starting position
    player.position.x = canvas.width / 2 - 192 / 8;
    player.position.y = canvas.height / 2 - 68 / 2;

    // Reset player sprite
    player.image = player.sprites.down;
    player.animate = false;
    player.frames.val = 0;
    player.frames.elapsed = 0;

    // Return hat
    hat.position.x = player.position.x - 5;
    hat.position.y = player.position.y - 12;

    // Hide death screen
    gsap.to("#deathScreen", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            document.querySelector("#deathScreen").style.display = "none";

            // Show player again
            player.opacity = 1;

            // Start the main world ONLY if we came from the cave
            if (diedInCave) {
                audio.map.play();
                animate();
                diedInCave = false;
            }

            playerDead = false;

        }
    });
}

document.querySelector("#respawnButton").addEventListener("click", () => {
    respawnWorld();
})

function respawnEnemy(enemy) {
    enemy.position.x =
        enemy.worldSpawn.x + background.position.x;

    enemy.position.y =
        enemy.worldSpawn.y + background.position.y;

    enemy.about.alive = true;
}

// A function for open dialogue
function openCharacterDialogue(name, dialogue, showHouse = false, showBar = false) {

    openDialogue = true;

    currentDialogue = dialogue;
    dialogueIndex = 0;

    document.querySelector("#dialogueName").innerText = name;

    document.querySelector("#charactersDialogueBox").style.display = "flex";

    document.querySelector("#houseDialogue").style.display =
        showHouse ? "block" : "none";

    document.querySelector("#barDialogue").style.display =
        showBar ? "block" : "none";

    showCurrentDialogue();

}

function showCurrentDialogue() {

    const dialogue = currentDialogue[dialogueIndex];

    const dialogueChoices = document.querySelector("#dialogueChoices");

    // First we clean up the previous choices
    dialogueChoices.innerHTML = "";

    if (dialogue.type === "text") {

        dialogueChoices.style.display = "none";

        typeDialogue(dialogue.text);

    }

    else if (dialogue.type === "choices") {

        // No text is currently being typed
        dialogueChoices.style.display = "flex";

        showDialogueChoices(dialogue.choices);
    }
}

function showDialogueChoices(choices) {

    const dialogueChoices =
        document.querySelector("#dialogueChoices");

    dialogueChoices.innerHTML = "";

    choices.forEach(choice => {

        const button = document.createElement("button");

        button.classList.add("dialogueChoiceButton");

        button.innerText = choice.text;

        button.addEventListener("click", () => {

            // If there is an action that needs to be taken
            if (choice.action) {
                choice.action();
            }

            // Moving on to the next dialogue
            dialogueIndex = choice.next;

            showCurrentDialogue();
        });

        dialogueChoices.appendChild(button);
    });
}

// A function for close dialogue
function closeDialogue() {

    document.querySelector("#charactersDialogueBox").style.display = "none";

    document.querySelector("#houseDialogue").style.display = "none";

    document.querySelector("#dialogueText").innerText = "";

    // openDialogue = false;

    dialogueIndex = 0;

}

// A function that moves to the next dialogue
function nextDialogue() {

    if (dialogueWritten) {
        instantWriting = true;
        return;
    }

    const dialogue = currentDialogue[dialogueIndex];

    // If we are on a selection screen,
    // You must select a button
    if (dialogue.type === "choices") {
        return;
    }

    dialogueIndex++;

    if (dialogueIndex >= currentDialogue.length) {

        // if player is talking with player 2 in the house and reach this point it means he finished dialogue number 1
        // in the house, and needs to continue to dialogue number 2
        if (enterPlayer2House && collisionPlayer1Player2) {
            playerFinishDialogueNumber1WithPlayer2InHouse = true;
        }

        // if player is talking with player 4, after he gave him back the chicken - he should get a hat
        if (playerTalkingWithPlayer4 && achievementRetureRobChickenComplete) {
            // the dialogue with player 4 right now finish
            dialoguePlayer4 = false;

            // show the hat on the player
            playerClaimHat = true;

            // increase player speed
            velocity = 5;
        }

        // if the player is talking with player 6, and reach to this point - it means that he doesnt entered the cave
        if (playerIsTalkingWithPlayer6) {
            playerRefusedToEnterTheCave = true;
        }

        closeDialogue();

        return;
    }

    showCurrentDialogue();
}

// A function that aims to cause the dialogue text to be divided into lines that fit the dialogue element.
function wrapDialogueText(text, element) {
    // Split the input text into an array of individual words
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    // Create a temporary hidden DOM element to measure the visual width of the text
    const measureElement = document.createElement("span");

    measureElement.style.position = "absolute";
    measureElement.style.visibility = "hidden";
    measureElement.style.whiteSpace = "nowrap"; // Prevent the text from wrapping inside the measuring element

    // Copy the relevant font styles from the target element to ensure identical text measurement
    const style = window.getComputedStyle(element);

    measureElement.style.fontFamily = style.fontFamily;
    measureElement.style.fontSize = style.fontSize;
    measureElement.style.fontWeight = style.fontWeight;
    measureElement.style.letterSpacing = style.letterSpacing;

    // Append to the body so the browser can calculate the layout widths
    document.body.appendChild(measureElement);

    // Iterate through each word to construct the wrapped lines
    for (const word of words) {
        // Construct a prospective line: add a space if the line already has text, otherwise start with the word
        const testLine = currentLine
            ? currentLine + " " + word
            : word;

        // Apply the prospective line to the hidden element to check its pixel width
        measureElement.textContent = testLine;

        // Check if the prospective line fits within the target element's available width
        if (measureElement.offsetWidth <= element.clientWidth) {
            // The word fits! Commit the test line as the current line
            currentLine = testLine;
        } else {
            // The word doesn't fit! Push the completed current line to the results array...
            lines.push(currentLine);
            // ...and start a new line with the current word
            currentLine = word;
        }
    }

    // Push the very last line to the array if it contains any remaining text
    if (currentLine) {
        lines.push(currentLine);
    }

    // Clean up the DOM by removing the temporary measuring element
    measureElement.remove();

    // Recombine all the wrapped lines into a single string separated by newlines (\n)
    return lines.join("\n");
}

// function for typing text dialogue in slow motion
let interval;
function typeDialogue(message) {
    // Canceling the previous timer (if any) to prevent duplication and concurrent writing
    clearInterval(interval);

    // the element that we want the text to be write on
    const element = document.querySelector('#dialogueText');    

    // Reset existing text in an element before starting new printing
    element.textContent = "";

    // our text that we want to write
    const text = wrapDialogueText(message, element);

    // represent the letter in the word that we need to write
    let index = 0;

    // we want to write every letter in the word in a gap of 1/10 second
    interval = setInterval(() => {
        if (instantWriting) {
            element.textContent = "";
            element.textContent = text;

            // stop interval
            clearInterval(interval);
            // The dialogue is no longer written
            dialogueWritten = false;
            // the text not need to insant writing anymore
            instantWriting = false;
        } else {

            // the dialogue is still written
            dialogueWritten = true;

            // add the letter to the element
            element.textContent += text[index];

            // move to the next letter in the word
            index++;

            // if we finished write the word stop writing
            if (index >= text.length) {
                // stop interval
                clearInterval(interval);
                // The dialogue is no longer written
                dialogueWritten = false;
                // Ensure instantWriting is safely reset when typing finishes naturally
                instantWriting = false;
            }
        }
    }, 100);
}

// function for writing 'Welcome Adventure' in slow motion
function typeWelcomeText() {
    // our text that we want to write
    const text = "Welcome Adventurer!";

    // the element that we want the text to be write on
    const element = document.querySelector('#welcomeText');

    // represent the letter in the word that we need to write
    let index = 0;

    // we want to write every letter in the word in a gap of 1/10 second
    const interval = setInterval(() => {
        // add the letter to the element
        element.textContent += text[index];

        // move to the next letter in the word
        index++;

        // if we finished write the word stop writing
        if (index >= text.length) {
            clearInterval(interval);
        }
    }, 100);
}

function createHealthBar() {
    const healthBar = document.querySelector(".healthBarBackgroundMap");

    healthBar.innerHTML = "";

    for (let i = 0; i < maxLives; i++) {

        const segment = document.createElement("div");

        segment.classList.add("healthSegment");

        healthBar.appendChild(segment);
    }
}

// function for update player health
function updatePlayerHealthBar() {
    const healthSegments = document.querySelectorAll(".healthSegment");

    healthSegments.forEach((segment, index) => {
        if (index < lives) {
            segment.classList.remove("lost");
        } else {
            segment.classList.add("lost");
        }
    });
}

// funcntion for update player number of coins
function updatePlayerCoins() {
    const playerCoins = document.querySelector('#playerCoins');

    playerCoins.innerText = numberOfCoins;
}

function checkAchievements() {
    // combat
    if (numberOfSlimesPlayerKilled === 1) {
        unlockAchievement("killFirstSlime"); 
    }
    if (numberOfSlimesPlayerKilled === 10) {
        unlockAchievement("kill10Slimes");
    }

    if (numberOfSlimesPlayerKilled === 30) {
        unlockAchievement("Kill30Slimes");
    }
    
    if (numberOfSlimesPlayerKilled === 50) {
        unlockAchievement("Kill50Slimes");
    }

    if (numberOfSlimesPlayerKilled === 100) {
        unlockAchievement("Kill100Slimes");
    }

    if (numberOfSlimesPlayerKilled === 500) {
        unlockAchievement("Kill500Slimes");
    }

    // money
    if (numberOfCoins >= 5) {
        unlockAchievement("collect5Coins");
    }

    if (numberOfCoins >= 20) {
        unlockAchievement("collect20Coins");
    }

    if (numberOfCoins >= 50) {
        unlockAchievement("collect50Coins");
    }

    if (numberOfCoins >= 100) {
        unlockAchievement("collect100Coins");
    }

    if (numberOfCoins >= 300) {
        unlockAchievement("collect300Coins");
    }

    if (numberOfCoins >= 500) {
        unlockAchievement("collect500Coins");
    }

    // social
    if (numberPeoplePlayerMeet >= 5) {
        unlockAchievement("talk5People");
    }   

    // shop
    if (numberBulletsBought >= 20) {
        unlockAchievement("buy20Bullets");    
    }

    if (numberWineBought >= 5) {
        unlockAchievement("restore5HP");
    }

    if (numberGoldenBerriesBought >= 3) {
        unlockAchievement("increaseMaxHP");
    }

    if (playerBoughtPotion) {
        unlockAchievement("buyPotion");
    }
}

// function for update player number of ammo
function updatePlayerAmmo() {
    const playerAmmo = document.querySelector('#playerNumberOfAmmo');

    playerAmmo.innerText = numberOfammo;
}

// function for showing player state
function showPlayerState() {
    document.querySelector(".playerState").style.left = 5 + "px";
    document.querySelector(".playerState").style.display = "block";
}

// function for hiding player state
function hidePlayerState() {
    document.querySelector(".playerState").style.display = "none";
}

// function for showing health button
function showHealthButton() {
    document.querySelector("#healthButton").style.display = "block";
}

// function for hiding player state
function hideHealthButton() {
    document.querySelector("#healthButton").style.display = "none";
}

function drawPowerUpEffect() {
    if (playerInvincible) {
        drawInvincibilityAura();
    }

    if (playerSpeedBoost) {
        drawSpeedEffect();
    }

    if (playerDoubleCoins) {
        drawDoubleMoneyEffect();
    }
}

function drawInvincibilityAura() {
    if (!playerInvincible) return;

    const centerX = player.position.x + player.width / 2;
    const centerY = player.position.y + player.height / 2;

    const radius = 34 + Math.sin(Date.now() / 150) * 3;

    c.save();

    c.beginPath();
    c.arc(centerX, centerY, radius, 0, Math.PI * 2);

    c.strokeStyle = "rgba(255, 255, 255, 0.8)";
    c.lineWidth = 4;

    c.shadowColor = "white";
    c.shadowBlur = 15;

    c.stroke();

    c.restore();
}

function drawSpeedEffect() {
    if (!playerSpeedBoost) return;

    const x = player.position.x;
    const y = player.position.y;

    const time = performance.now();

    // How far the lines travel
    const distance = 18;

    // Movement speed of the lines
    const speed = 0.1;

    // Each line starts at a different point in its animation
    const offset1 = (time * speed) % distance;
    const offset2 = (time * speed + 6) % distance;
    const offset3 = (time * speed + 12) % distance;

    // Fixed lengths
    const length1 = 12;
    const length2 = 20;
    const length3 = 8;

    c.save();

    // Function for drawing one horizontal line
    function drawHorizontalLine(lineX, lineY, length, offset) {

        // Fade the line as it moves away
        const alpha = 0.8 - (offset / distance) * 0.5;

        c.fillStyle = `rgba(80, 200, 255, ${alpha})`;

        c.fillRect(
            Math.floor(lineX),
            Math.floor(lineY),
            length,
            2
        );
    }

    // Function for drawing one vertical line
    function drawVerticalLine(lineX, lineY, length, offset) {

        const alpha = 0.8 - (offset / distance) * 0.5;

        c.fillStyle = `rgba(80, 200, 255, ${alpha})`;

        c.fillRect(
            Math.floor(lineX),
            Math.floor(lineY),
            2,
            length
        );
    }

    if (lastKey === "d") {

        // Player moving right -> lines behind the player
        drawHorizontalLine(
            x - 5 - offset1 - length1,
            y + 15,
            length1,
            offset1
        );

        drawHorizontalLine(
            x - 5 - offset2 - length2,
            y + 25,
            length2,
            offset2
        );

        drawHorizontalLine(
            x - 5 - offset3 - length3,
            y + 35,
            length3,
            offset3
        );

    } else if (lastKey === "a") {

        // Player moving left -> lines behind the player
        drawHorizontalLine(
            x + player.width + 5 + offset1,
            y + 15,
            length1,
            offset1
        );

        drawHorizontalLine(
            x + player.width + 5 + offset2,
            y + 25,
            length2,
            offset2
        );

        drawHorizontalLine(
            x + player.width + 5 + offset3,
            y + 35,
            length3,
            offset3
        );

    } else if (lastKey === "w") {

        // Player moving up -> lines behind the player
        drawVerticalLine(
            x + 13,
            y + player.height + 5 + offset1,
            length1,
            offset1
        );

        drawVerticalLine(
            x + 23,
            y + player.height + 5 + offset2,
            length2,
            offset2
        );

        drawVerticalLine(
            x + 33,
            y + player.height + 5 + offset3,
            length3,
            offset3
        );

    } else if (lastKey === "s") {

        // Player moving down -> lines behind the player
        drawVerticalLine(
            x + 13,
            y - 5 - offset1 - length1,
            length1,
            offset1
        );

        drawVerticalLine(
            x + 23,
            y - 5 - offset2 - length2,
            length2,
            offset2
        );

        drawVerticalLine(
            x + 33,
            y - 5 - offset3 - length3,
            length3,
            offset3
        );
    }

    c.restore();
}

function drawDoubleMoneyEffect() {
    // 1. Exit the function immediately if the double coins power-up is not active
    if (!playerDoubleCoins) return;

    // 2. GEOMETRY: Find the exact center point of the player
    const centerX = player.position.x + player.width / 2;
    const centerY = player.position.y + player.height / 2;

    // 3. Get the current time in milliseconds to drive the continuous rotation animation
    const time = Date.now();

    // 4. Save the current canvas drawing state (colors, transforms, etc.)
    c.save();   

    // 5. Loop 4 times to calculate and draw 4 separate sparkles
    for (let i = 0; i < 4; i++) {
        // 6. GEOMETRY: Calculate the angle for the current sparkle.
        // 'time / 700' creates the rotation over time (higher number = slower spin).
        // 'i * (Math.PI * 2 / 4)' divides a full circle (2*PI) into 4 equal 90-degree steps.
        const angle = time / 700 + i * (Math.PI * 2 / 4);

        // 7. GEOMETRY: Convert the polar angle into X and Y screen coordinates.
        // Cosine handles horizontal movement, Sine handles vertical movement.
        // Multiplying X by 28 and Y by 20 stretches the circle into a wide ellipse.
        const x = centerX + Math.cos(angle) * 28;
        const y = centerY + Math.sin(angle) * 20;

        // 8. Set the drawing color to gold for the pixel-art sparkle
        c.fillStyle = "gold";

        // 9. DRAWING: Render 3 overlapping rectangles to form a classic retro '+' sparkle shape
        c.fillRect(x - 2, y - 2, 4, 4); // Center core square (4x4 pixels)
        c.fillRect(x - 1, y - 4, 2, 8); // Vertical thin line (2x8 pixels)
        c.fillRect(x - 4, y - 1, 8, 2); // Horizontal thin line (8x2 pixels)
    }
    // 10. Restore the canvas state so these style changes don't affect other game drawings
    c.restore();
}

// EVENT LISTENERS
let lastKey = '';
// event Listener for key down
window.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") {
        keys.w.pressed = true;
        lastKey = 'w';
    } 
    else if (e.code === "KeyA") {
        keys.a.pressed = true;
        lastKey = 'a';
    }
    else if (e.code === "KeyS") {
        keys.s.pressed = true;
        lastKey = 's';
    }
    else if (e.code === "KeyD") {
        keys.d.pressed = true;
        lastKey = 'd';
    }
    else if (e.code === "KeyH") {
        keys.h.pressed = true;
    }
    else if (e.code === "KeyR") {
        keys.r.pressed = true;
    }
    else if (e.code === "KeyB") {
        keys.b.pressed = true;
    }
});

// event Listener for key up
window.addEventListener("keyup", (e) => {
    if (e.code === "KeyW") {
        keys.w.pressed = false;
    } 
    else if (e.code === "KeyA") {
        keys.a.pressed = false;
    }
    else if (e.code === "KeyS") {
        keys.s.pressed = false;
    }
    else if (e.code === "KeyD") {
        keys.d.pressed = false;
    }
    else if (e.code === "KeyH") {
        keys.h.pressed = false;
    }
    else if (e.code === "KeyR") {
        keys.r.pressed = false;
    }
    else if (e.code === "KeyB") {
        keys.b.pressed = false;
    }
});

let clicked = false;

// event listener for showing the tutorial scroll
window.addEventListener('load', () => {
    gsap.to('#tutorialScroll', {
        // we want the scroll to move down
        y: 0,
        // We want the movement to last 1.5 seconds
        duration: 1.5,
        // we want it to be smooth
        ease: 'power3.out',
        // when the scroll finally gets down we want to start writing the wlcome text
        onComplete: typeWelcomeText
    });
});

// event listener for start game
document.querySelector('#startGameBtn').addEventListener('click', () => {

    // to create a sequence
    gsap.timeline()

    // scale the tutorial scroll down and than don't show it(all that needs to took 0.5 seconds)
    .to('#tutorialScroll', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5
    })

    // dont show the black screen(to see the game)
    .to('#introScreen', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            // remove the element from our website(we dont need him anymore)
            document.querySelector('#introScreen').remove();

            // start game
            gameStarted = true;
            animate();
        }
    });
});

// event listener for open and close health bar when the small health button display
document.querySelector("#healthButton").addEventListener("click", () => {
    const playerState = document.querySelector(".playerState");

    if (playerState.style.display === "none") {

        playerState.style.left = 55 + "px";
        playerState.style.display = "block";

        gsap.fromTo(
            playerState,
            {
                scale: 0.8,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 0.2
            }
        );

    } else {

        gsap.to(playerState, {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                playerState.style.display = "none";
                playerState.style.left = 5 + "px";
                gsap.to(playerState, {
                    scale: 1,
                    opacity: 1
                })
            }
        });

    }

});

document.addEventListener("keyup", (e) => {
    if (e.code === "Space" && openDialogue) {
        nextDialogue();
    }
});

document.querySelector("#arrowButton").addEventListener("click", () => {
    if(openDialogue){
        nextDialogue();
    }
});

// event listener for closing dialogue
document.querySelector('#closeDialogue').addEventListener('click', () => {
    closeDialogue();
})

// event listener for entering the house
document.querySelector('#houseDialogue').addEventListener('click', () => {
    // if there is collision between player and player 2
    if (collisionPlayer1Player2) {
        // entering player 2 house
        enterPlayer2House = true;
        closeDialogue();
    }
})

// event listener for entering the bar
document.querySelector('#barDialogue').addEventListener('click', () => {
    playerWantToEnterBar = true
    closeDialogue();
})

// event listener for opening and closing the achievement menu
let menuOpen = false; // A variable that represents whether the menu is open or closed
document.querySelector('#achievementButton').addEventListener('click', () => {
    if (!menuOpen) {
        document.querySelector('#achievementMenu').style.display = "block";
        menuOpen = true;
    }
    else if (menuOpen) {
        document.querySelector('#achievementMenu').style.display = "none";
        menuOpen = false
    }
})

// event listener for the claim button
document.querySelector('#hatClaimButton').addEventListener('click', () => {

    // the dialogue with player 4 right now finish
    dialoguePlayer4 = false;

    // show the hat on the player
    playerClaimHat = true;

    // increase player speed
    velocity = 5;
})

// event listener for start music
window.addEventListener('click', () => {
    // audio
    if (!clicked) {
        audio.map.play();
        clicked = true;
    }
})

// event listeners for going to the cave
document.querySelector('#buttonGetIntoCave').addEventListener('click', () => {
    button1DiloguePlayer6Clicks++
    if (button1DiloguePlayer6Clicks === 1) {
        document.querySelector('#character6Text').innerHTML = "Are you sure about that?";
        document.querySelector('#buttonGetIntoCave').innerHTML = "Yes";
        document.querySelector('#buttonNotGettingIntoCave').innerHTML = "No";
    } 
    else if (
        document.querySelector('#character6Text').innerHTML === "Are you sure about that?" || 
        document.querySelector('#character6Text').innerHTML === "So do you want to go or not?"||
        document.querySelector('#character6Text').innerHTML === "Tell me if you want to go again."
    ) {
        // get into cave
        getIntoCave = true;
        document.querySelector('#character6Text').innerHTML = "Did you enjoy there?";
        document.querySelector('#buttonGetIntoCave').innerHTML = "Yes! I want to go again!";
        document.querySelector('#buttonNotGettingIntoCave').innerHTML = "No! I will never go there again";
    }
    else if (document.querySelector('#character6Text').innerHTML === "Did you enjoy there?") {
        document.querySelector('#character6Text').innerHTML = "Again?! Well, if you insist..."
        document.querySelector('#buttonGetIntoCave').style.display = "none";
        document.querySelector('#buttonNotGettingIntoCave').style.display = "none";
        setTimeout(() => {
            getIntoCave = true;
            document.querySelector('#character6Text').innerHTML = "Tell me if you want to go again."
            document.querySelector('#buttonGetIntoCave').style.display = "block";
            document.querySelector('#buttonNotGettingIntoCave').style.display = "block";
            document.querySelector('#buttonGetIntoCave').innerHTML = "Yes";
            document.querySelector('#buttonNotGettingIntoCave').innerHTML = "Um, I don't think so.";
        }, 1500)
    }
})

document.querySelector('#buttonNotGettingIntoCave').addEventListener('click', () => {
    if (document.querySelector('#buttonNotGettingIntoCave').innerHTML === "I'm not going anywhere near there!") {
        document.querySelector('#character6Dialogue').style.display = "none";
        canDialogueWithPlayer6 = false;
        setTimeout(() => {
            canDialogueWithPlayer6 = true;
        }, 8000)
    } 
    else if (document.querySelector('#buttonNotGettingIntoCave').innerHTML === "No") {
        document.querySelector('#character6Text').innerHTML = "Tell me if you change your mind";
        setTimeout(() => {
            document.querySelector('#character6Text').innerHTML = "So do you want to go or not?";
        }, 10000)
    }
    else if (
        document.querySelector('#buttonNotGettingIntoCave').innerHTML === "No! I will never go there again" ||
        document.querySelector('#buttonNotGettingIntoCave').innerHTML === "Um, I don't think so."
    ) {
        document.querySelector('#character6Text').innerHTML = "Bye, that was a wonderful adventure!";
        document.querySelector('#buttonNotGettingIntoCave').style.display = "none";
        document.querySelector('#buttonGetIntoCave').style.display = "none";
        setTimeout(() => {
            canDialogueWithPlayer6 = false;
        }, 2000)
    }
})

// event listener for creating projectiles
let lastShotTime = 0;
let cooldown = 700
canvas.addEventListener('click', (event) => {
    if (!InfiniteAmmo) {
        if (numberOfammo <= 0) return; // If you run out of ammo, don't create a bullet.
    }

    const now = Date.now();

    if (now - lastShotTime < cooldown) return;

    lastShotTime = now;

    // dicrease the variable that shows how many bullets have left
    if (!InfiniteAmmo) {
        numberOfammo -= 1;
        updatePlayerAmmo();
    }

    // create bullet
    const rect = canvas.getBoundingClientRect(); // where is the canvas on the browser

    // Where did we click on the canvas?
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // the center of the player sprite (Where the projectile should be created)
    const playerCenterX = player.position.x + player.width / 2;
    const playerCenterY = player.position.y + player.height / 2;

    //the angle of the shot
    const angle = Math.atan2(
        mouseY - playerCenterY,
        mouseX - playerCenterX
    );

    // the speed of the shot
    const speed = 10;

    // how much the projectile needs to move every frame
    const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    };

    // create the projectile
    projectiles.push(
        new Projectile({
            position: {
                x: playerCenterX,
                y: playerCenterY
            },
            velocity
        })
    )
});

// If the user goes to another window - stop the music. If he comes back - continue the music.
document.addEventListener('visibilitychange', () => {

    if (document.hidden) {
        Howler.mute(true);
    } else {
        Howler.mute(false);
    }
});