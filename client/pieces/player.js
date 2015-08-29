var Player = function(x,y, radius) {
  Piece.apply(this, arguments); 
  this.collisions = {}; 
};

Player.prototype = Object.create(Piece.prototype);
Player.prototype.constructor = Player;

Player.prototype.moveLeft = function(){
  this.x = Math.max(this.x - 2, 20);
};

Player.prototype.moveRight = function() {
  this.x = Math.min(this.x + 2, 460);
}
