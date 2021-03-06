var keydownHandler = function(d, i) {
  if (d3.event.keyCode === 65 && lastKey !== 65) {
    lastKey = 65;
    if (!moveKeyIntervalIDs["65"]) {
      moveKeyIntervalIDs["65"] = setInterval(function(){player.moveLeft();}, 22);  
    }
    
  } else if (d3.event.keyCode === 68 && lastKey !== 68) {
    lastKey = 68;
    if (!moveKeyIntervalIDs["68"]) {
      moveKeyIntervalIDs["68"] = setInterval(function(){player.moveRight();}, 22);
    }
  }
};

var keyUpHandler = function(d, i) {
  var key = d3.event.keyCode;
  if ((key === 65) || (key === 68)) {
    lastKey = null;
    clearTimeout(moveKeyIntervalIDs[key]); 
    moveKeyIntervalIDs[key] = null;
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