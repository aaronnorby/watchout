var Wave = function(x) {
  this.x = x;
}

Wave.prototype.move = function(playerXDeflect) {
  this.x += playerXDeflect;
}