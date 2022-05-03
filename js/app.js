//default state
let scores = 0;
let lives = 3;
let allJewels = [];
let allEnemies = [];


// Default player state
let icon = 'images/char-boy.png';
document.querySelector('.char').innerHTML = `<img src=${icon}>`;
document.querySelector('.char-message').innerText = "boy selected.";

let startBtn = document.querySelector(".start-btn");

//create an array method to return a random value in an array
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

// When a character gets selected
let selectChar = function(char) {
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

startBtn.addEventListener("click", function() {
    heart = new Heart();
    allJewels = [ new Jewel(30, 50), new Jewel(130, 50), new Jewel(230, 50), new Jewel(330, 50), new Jewel(430, 50)];
    allEnemies = [ new Enemy(bugs[0]), new Enemy(bugs[1]), new Enemy(bugs[2])];
    document.getElementById('start-screen').style.display = 'none';
    scores = 0;
    lives = 3;
    updateScores();
    updateLives();
})

let updateLives = function() {
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

let updateScores = function() {
    document.querySelector('.scores').innerText = `You have ${scores} points.`;
    if (scores == 100)
        congrats();
}

let congrats = function() {
    document.getElementById('start-screen').style.display = 'block';
    document.querySelector(".modal-title").innerText = 'Winner!!!';
    document.querySelector(".modal-content").style.backgroundColor = '#047c6c';
    document.querySelector('.selection-container').style.display = 'none';
    document.querySelector('.start-btn').innerHTML = 'Play Again';
    document.querySelector('.start-btn').classList.add('btn-warning');
    document.getElementById("carouselExampleIndicators").innerHTML = `
        <div class="instruction mt-5">
            <h3 style="font-size: 32px;">Congratulations!</h3>
        </div>
        <div class="partition">
            <p class="">You ended the game with ${scores}/100 points. Boss! 🙌
            </p>
            <img style="height: 300px" src="https://i.gifer.com/6os.gif">
        </div>
    `
}

let gameOver = function() {
    document.getElementById('start-screen').style.display = 'block';
    document.querySelector(".modal-title").innerText = 'You lost this round.';
    document.querySelector(".modal-content").style.backgroundColor = '#924742fd';
    document.querySelector('.selection-container').style.display = 'none';
    document.querySelector('.start-btn').innerHTML = 'Restart Game';
    document.querySelector('.start-btn').classList.remove('btn-warning');
    document.getElementById("carouselExampleIndicators").innerHTML = `
        <div class="instruction mt-5">
            <h3 style="font-size: 32px;">Game Over</h3>
        </div>
        <div class="partition">
            <p class="">You ended the game with ${scores}/100 points. press restart to try again. 🥺️
            </p>
            <img style="height: 300px" src="https://i.gifer.com/7VE.gif">
        </div>
    `
}

/* ---------------------- ENEMIES CLASS ---------------------------------*/
let Enemy = function(enemy = {})
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

    //Collision detection
    if (((this.x + 50 >= player.x) &&
    (this.x - 10 <= player.x)) &&
    ((this.y + 10 >= player.y) &&
    (this.y - 1 <= player.y))) {
        player.x = 200;
        player.y = 400;
        lives -= 1, updateLives();
    }

    let newBug = bugs.random();
    //probability of spawning (frequency control)
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

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

/* ---------------------- PLAYER CLASS ---------------------------------*/
let Player = function(char, x = 200, y = 400) {
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

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function() {
    if (this.y <= 50) {
        setTimeout(function(){
            player.reset();
        }, 300)
    }
}

Player.prototype.handleInput = function(keyDown) {
        if (keyDown === 'left' && this.x > 0 && this.y > 50)
            this.x -= 101;
        else if (keyDown === 'right' && this.x < 400 && this.y > 50)
            this.x += 101;
        else if (keyDown === 'up' && this.y > 0)
            this.y -= 83;
        else if (keyDown === 'down' && this.y < 350)
            this.y += 83;
}

//Instantiation of player
let player = new Player('boy');

/* ---------------------- JEWEL CLASS ---------------------------------*/
let Jewel = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem-Orange.png';
}

Jewel.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Jewel.prototype.update = function(){
    //collision detection
    allJewels.forEach(function (jewel, index, allJewels){
        if (((jewel.x + 50 >= player.x) &&
        (jewel.x - 50 <= player.x)) &&
        ((jewel.y + 10 >= player.y))) {
            allJewels.splice(index, 1);
            scores += 20, updateScores();
        }
    })
}

/* ---------------------- HEART CLASS ---------------------------------*/

let randomXPos = [30, 130, 230, 330, 430];
let randomYPos = [135, 217, 300];

let Heart = function () {
    this.x = -200;
    this.y = -300;
    this.sprite = 'images/Heart.png';
}

Heart.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Heart.prototype.reset = function(){
    this.x = randomXPos.random();
    this.y = randomYPos.random();
}

Heart.prototype.update = function(){
    if (lives == 1 && this.y == -300)
        heart.reset();
    //collision detection
    if (((this.x + 40 >= player.x) &&
    (this.x - 40 <= player.x)) &&
    (this.y - 17 >= player.y)) {
            console.log("collision detection");
            this.x = -200;
            this.y = -300;
            lives += 1, updateLives();
        }
}

let heart = new Heart();


// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
