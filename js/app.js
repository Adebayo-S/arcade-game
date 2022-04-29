// ENEMIES
var Enemy = function(enemy = {})
{
    let rndm = Math.random();
    this.x = enemy.position.x;
    this.y = enemy.position.y;
    this.speed = (enemy.speed === 0) ? 0 : enemy.speed * rndm;
    this.sprite = enemy.sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

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
        position: { x: 0, y: 55},
        speed: 100,
        sprite: 'images/enemy-bug.png'
    },
    {
        position: { x: 0, y: 55},
        speed: 100,
        sprite: 'images/enemy-bug.png'
    }
]
let bug = {
    position: { x: 0, y: 55},
    speed: 100,
    sprite: 'images/enemy-bug.png'
};

let rock = {
    position: { x: 0, y: 0},
    speed: 0,
    sprite: 'images/Rock.png'
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [ new Enemy(bug)/*, new Enemy(rock), new Enemy(bug)*/];
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
