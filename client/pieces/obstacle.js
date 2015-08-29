var Obstacle = function(x,y, radius){
  Piece.apply(this, arguments);
  this.xDeflect = (Math.random() - .5) * 2;
  this.yDelta = (Math.random() * 10);
};

Obstacle.prototype = Object.create(Piece.prototype);
Obstacle.prototype.constructor = Obstacle;
Obstacle.prototype.move = function(playerDeltaX) {
  this.y = this.y - this.yDelta;
  this.x = this.x + this.xDeflect + playerDeltaX || 0;
};

var generateObstacle = function() {
  var x = Math.random() * width*2;
  var y = 620;
  var radius = 20;
  var obstacle = new Obstacle(x, y, radius);
  return obstacle;
}
