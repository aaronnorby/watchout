var Player = function(x,y, radius) {
  Piece.apply(this, arguments); 
  this.collisions = {};
  this.xDeflect = 0; 
};

Player.prototype = Object.create(Piece.prototype);
Player.prototype.constructor = Player;

Player.prototype.moveLeft = _.throttle(function(){
  this.xDeflect = Math.min(this.xDeflect + 1, 7);
}, 35);

Player.prototype.moveRight = _.throttle(function() {
  this.xDeflect = Math.max(this.xDeflect - 1, 0-7);
}, 35);
