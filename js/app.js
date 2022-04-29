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
        case 'horn-girl': this.sprite = 'images/char-horn-girl.png';
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
Player.prototype.update = function() {

}

Player.prototype.handleInput = function(keyDown) {
        if (keyDown === 'left' && this.x > 0)
            this.x -= 101;
        else if (keyDown === 'right' && this.x < 400)
            this.x += 101;
        else if (keyDown === 'up' && this.y > 0)
            this.y -= 83;
        else if (keyDown === 'down' && this.y < 400)
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

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(bugs[0]), new Enemy(bugs[1]), new Enemy(bugs[2])];
// Place the player object in a variable called player


var char = "boy";
var player = new Player(char);



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
