//default state
var scores = 0;
var lives = 3;


let startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click", function() {
    document.getElementById('start-screen').style.display = 'none';
    scores = 0;
    lives = 3;
    updateScores();
    updateLives();
})





var updateLives = function() {
    if (lives >= 3) {
        lives = 3;
        document.querySelector('.lives').innerText = `Health: ❤️️❤️️❤️️`;
    } else if (lives == 2) {
        document.querySelector('.lives').innerText = `Health: ❤️️❤️️`;
    } else if (lives == 1)
        document.querySelector('.lives').innerText = `Health: ❤️️`;
    else
        gameOver();
}

var updateScores = function() {
    document.querySelector('.scores').innerText = `You have ${scores} points.`;
    if (scores == 100)
        congrats();
}

var gameOver = function() {
    document.getElementById('start-screen').style.display = 'block';
    document.querySelector(".modal-title").innerText = 'The Frogger is dead.';
    document.querySelector(".modal-content").style.backgroundColor = '#924742fd';
    // document.querySelector(".modal-content").style.height = '500px';
    document.querySelector('.selection-container').style.display = 'none';
    document.querySelector('.start-btn').innerHTML = 'Restart Game';
    document.getElementById("carouselExampleIndicators").innerHTML = `
        <div class="instruction mt-5">
            <h3 style="font-size: 32px;">Game Over</h3>
        </div>
        <div class="partition">
            <p class="">You ended the game with ${scores} points. press restart to try again. 🥺️
            </p>
            <img style="height: 300px" src="https://i.gifer.com/7VE.gif">
        </div>
    `
}
// ENEMIES
var Enemy = function(enemy = {})
{
    this.enemy = enemy;
    this.x = enemy.position.x;
    this.y = enemy.position.y;
    this.speed = enemy.speed * (Math.floor(Math.random() * 3) + 1);
    this.sprite = enemy.sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    let isBugFlipped;
    if (this.sprite === 'images/enemy-bug-flip.png')
    {
        isBugFlipped = true;
        this.x -= this.speed * dt;
        if (this.x < -50)
            this.x = 505;
    }
    else
    {
        isBugFlipped = false;
        this.x += this.speed * dt;
        if (this.x > 505)
            this.x = -50;
    }

    if (((this.x + 50 >= player.x) &&
    (this.x - 10 <= player.x)) &&
    ((this.y + 20 >= player.y) /*||
    (this.y - 1 <= player.y)*/)) {

    console.log(`collision + x${this.x} + y${this.y}`);
    player.x = 200;
    player.y = 400;

    if (this.enemy)
        lives -= 1, updateLives();
    else if (this.heart)
        lives += 1, updateLives();
    else
        scores += 20, updateScores();
    };

    let newBug = bugs.random();
    let isSpawnReady = (Math.random() < 0.005);

    if (this.x > 300 && isSpawnReady && allEnemies.length < 6)
        allEnemies.push(new Enemy(newBug));

    if (allEnemies.length == 6)
    {
        for (let i = 3; i < allEnemies.length; i++)
        {
            if ((allEnemies[i].x < -30) && isBugFlipped)
                allEnemies.splice(i, 1);
            else if ((allEnemies[i].x > 500) && !isBugFlipped)
                allEnemies.splice(i, 1);
        }
    }
};
    //position reset

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER
var Player = function(char, x = 200, y = 400) {
    this.x = x;
    this.y = y;
    this.char = char;
    switch (this.char) {
        case 'cat-girl': this.sprite = 'images/char-cat-girl.png';
            break;
        case 'boy': this.sprite = 'images/char-boy.png';
            break;
        case 'little-devil': this.sprite = 'images/char-horn-girl.png';
            break;
        case 'pink-girl': this.sprite = 'images/char-pink-girl.png';
            break;
        case 'princess': this.sprite = 'images/char-princess-girl.png';
            break;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player.prototype.reset = function(){
//     this.x = 200;
//     this.y = 100;
// }

// var playerPosX;
// var playerPosY;

// Player.prototype.update = function() {
//     playerPosX = this.x;
//     playerPosY = this.y;
// }

Player.prototype.handleInput = function(keyDown) {
        if (keyDown === 'left' && this.x > 0)
            this.x -= 101;
        else if (keyDown === 'right' && this.x < 400)
            this.x += 101;
        else if (keyDown === 'up' && this.y > 0)
            this.y -= 83;
        else if (keyDown === 'down' && this.y < 350)
            this.y += 83;
}

let bugs = [
    {
        position: { x: -50, y: 60},
        speed: 100,
        sprite: 'images/enemy-bug.png'
    },
    {
        position: { x: 500, y: 145},
        speed: 100,
        sprite: 'images/enemy-bug-flip.png'
    },
    {
        position: { x: -50, y: 225},
        speed: 100,
        sprite: 'images/enemy-bug.png'
    }
]

//create an array method to return a random value in an array
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(bugs[0]), new Enemy(bugs[1]), new Enemy(bugs[2])];
// Place the player object in a variable called player

// Default player state
var player = new Player('boy');
var icon = 'images/char-boy.png';
document.querySelector('.char').innerHTML = `<img src=${icon}>`;
document.querySelector('.char-message').innerText = "boy selected.";

// When a character gets selected
var selectChar = function(char) {
    player = new Player(char);

    switch (char) {
        case 'cat-girl': icon = 'images/char-cat-girl.png';
            break;
        case 'boy': icon = 'images/char-boy.png';
            break;
        case 'little-devil': icon = 'images/char-horn-girl.png';
            break;
        case 'pink-girl': icon = 'images/char-pink-girl.png';
            break;
        case 'princess': icon = 'images/char-princess-girl.png';
            break;
    }
    document.querySelector('.char').innerHTML = `<img src=${icon}>`;
    document.querySelector('.char-message').innerText = char + " selected.";
}

//Jewel class
var Jewel = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem-Orange.png';
}

var allJewels = [ new Jewel(30, 50), new Jewel(130, 50), new Jewel(230, 50), new Jewel(330, 50), new Jewel(430, 50)];

Jewel.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Heart class
var Heart = function () {
    var randomXPos = [30, 130, 230, 330, 430];
    var randomYPos = [150, 250, 350];
    this.x = randomXPos.random();
    this.y = randomYPos.random();
    this.sprite = 'images/Heart.png';
}

Heart.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var heart = new Heart();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
