var keydownHandler = function(d, i) {
  //debugger;
  if (moveKeyIntervalID) return;
  if (d3.event.keyCode === 65) {
    moveKeyIntervalID = setInterval(function(){player.moveLeft();}, 10);
  } else if (d3.event.keyCode === 68) {
    moveKeyIntervalID = setInterval(function(){player.moveRight();}, 10);
  }
};

var keyUpHandler = function(d, i) {
  var key = d3.event.keyCode;
  if (key === 65 || key === 68) {
    clearTimeout(moveKeyIntervalID); 
    moveKeyIntervalID = null;
  }
};

var collisionHandler = function() {
  currentScore = 0;
  d3.selectAll(".current")
    .select("span")
    .data([currentScore])
    .text(function(d) {
      return d
    });

  d3.selectAll(".collisions")
    .select("span")
    .data([++collisions])
    .text(function(d) {
      return d
    });

};