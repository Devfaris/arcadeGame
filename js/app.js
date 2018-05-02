let Enemy = function(x, y, moving) {
  "use strict";
    this.x = x;
    this.y = y;
    this.moving = moving;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    this.x += this.moving * dt;
    //reset enemy position of enemy
    if (this.x > 520) {
      this.x = -100;
      this.moving = 100 + Math.floor(Math.random()*200);
    }
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) {
          player.x = 200;
          player.y = 400;
    }
}
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
let Player = function(x,y){
  this.x = x;
  this.y = y;
  this.player = 'images/char-boy.png';
}
Player.prototype.update = function(dt){
  //  player cann't move outside canvas
   if (this.y > 380) {
       this.y = 380;
   }

   if (this.x > 400) {
       this.x = 400;
   }

   if (this.x < 0) {
       this.x = 0;
   }

   //if player reach winning
   if (this.y < 0) {
       this.x = 200;
       this.y = 380;
       swal("Woow!", "You Won!", "success");
   }
}
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function(keyboard){

  if (keyboard == 'left' && this.x > 0) {
    this.x -= 100;
  }
  if (keyboard == 'right' && this.x < 400) {
    this.x += 100;
  }
  if (keyboard == 'up' && this.y > 0) {
    this.y -= 80;
  }
  if (keyboard
     == 'down' && this.y < 400) {
    this.y += 80;
  }
  if (this.y < 0) {
    setTimeout(function() {
      Player.x = 200;
      Player.y = 400;
    }, 100);
  }
}
//create array to have all enemy objects
// "y" is position of elements
let allEnemies = [];
let enemyPath = [60, 145, 230];
let player = new Player(200,400);

enemyPath.forEach(function(positionY) {
  enemy = new Enemy(0, positionY, Math.floor(Math.random() * 190));
  allEnemies.push(enemy);
});
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
