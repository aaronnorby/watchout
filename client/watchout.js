// start slingin' some d3 here.

var currentScore = 0;
var highScore = 0;
var collisions = 0;

var objCount = 0;

var height = 363;
var width = 500;

var obstacles = [];
var waves = [];
var player = new Player(240,200,15);

for (var i = -1; i < 3; i++) {
  waves.push(new Wave(i*250));
}

for (var i = 0; i < 3; i++) {
  obstacles.push(generateObstacle());
}


var body = d3.select('body');

var svg = body.append('svg')
  .attr('height', height)
  .attr('width', width);

// svg.selectAll('image')
//   .data(obstacles, function(d) {return d.id})
//   .enter()
//   .append('image')
//   .attr('height', 60)
//   .attr('width', 60)
//   .attr('xlink:href', function(d) {return d.sprite;})
//   .attr("y", function(d) {return d.y})
//   .attr("x", function(d) {return d.x})
//   .attr('class', 'obstacle');



var moveKeyIntervalIDs = {
  "65": null,
  "68": null
};
var lastKey;

body.on('keydown', keydownHandler);

body.on('keyup', keyUpHandler);

d3.timer(tickFn);

var quad = d3.geom.quadtree();
  quad.x(function(d) {return d.x;});
  quad.y(function(d) {return d.y;});
  quad.extent([[0-width, -1],[width + width, height + 1]]);



// This is the function that does everything 
////////////////////////////////////////////
function tickFn() {
  if (currentScore > highScore) {
    highScore = currentScore;
  }

  d3.selectAll(".high")
    .select("span")
    .data([highScore])
    .text(function(d) {
      return d;
    });

  d3.selectAll(".current")
    .select("span")
    .data([++currentScore])
    .text(function(d) {
      return d;
    });
  //debugger;

  // Paint background 

  waves.forEach(function(wave) {
    wave.move(player.xDeflect);
  });

  if (waves[3].x > width + 250) {
    waves.pop();
    waves.unshift(new Wave(waves[0].x - 250));
  }

  if (waves[0].x < 0 - 250) {
    waves.shift();
    waves.push(new Wave(waves[2].x + 250));
  }

  svg.selectAll('image')
    .data(waves)
    .enter()
    .append('image')
    .attr('xlink:href', './img/waves.png')
    .attr('height', 363)
    .attr('width', 255)
    .attr('y', 0);

  svg.selectAll('image')
    .data(waves)
    .attr('x', function(d) {return d.x;});  


  obstacles = obstacles.filter(function(obs) {
    return obs.y > 85 && (obs.x > 0 - width && obs.x < width*2);
  });

  while (obstacles.length < 12) {
    obstacles.push(generateObstacle());
  }

  // var root = quad([player].concat(obstacles));
  var root = quad(obstacles);

 /* var nodeCount = 0;
  root.visit(function(node) {
    nodeCount++;
  });
  console.log(nodeCount);*/

  // svg.selectAll('.player')
  //     .data([player])
  //     .attr("cx", function(d) {return d.x});

  obstacles.forEach(function(obstacle) {
    obstacle.move(player.xDeflect);
  });
  //debugger;
  var closest = root.find([player.x, player.y]);

  //console.log(closest);
  //console.log("dist: " + distance(player.x, player.y, closest.x, closest.y));
  
  if (closest !== undefined && distance(player.x, player.y, closest.x, closest.y) < 25 &&
    !(player.collisions[closest.id])) {
    
      player.collisions[closest.id] = true;

      collisionHandler();
      console.log("Collision!");
  }

  svg.selectAll('.player')
  .data([player])
  .enter()
  .append('image')
  .attr('height', 100)
  .attr('width', 100)
  .attr('x', width / 2)
  .attr('y', height / 2)
  .attr('class', 'player');

  svg.selectAll('.player')
    .data([player])
    .attr('xlink:href', function(d) {
    var path = "./img/Surfer/surfer_solo_";
    var pathEnd = ".gif";
    var deflect = Math.abs(d.xDeflect);
      if (deflect < 1.75) {
        return path + 1 + pathEnd;
      }
      if (deflect < 3.5) {
        return path + 2 + pathEnd;
      }
      if (deflect < 5.25) {
        return path + 3 + pathEnd;
      }
      if (deflect <= 7) {
        return path + 4 + pathEnd;
      }
    })
    .attr('transform', function(d) {
      if (d.xDeflect < 0) {
        return "scale(1 1) translate(-50 -50)";
      }
      return "scale(-1 1) translate(" + (-width - 50) + " -50)";
    });

  var obs = svg.selectAll('.obstacle')
    .data(obstacles, function(d) {return d.id})
    .attr("y", function(d) {return d.y})
    .attr("x", function(d) {return d.x});

    //debugger;
  obs.enter()
    .append('image')
    .attr('xlink:href', function(d) {return d.sprite;})
    .attr('height', 60)
    .attr('width', 60)
    .attr("y", function(d) {return d.y})
    .attr("x", function(d) {return d.x})
    .attr('transform', 'translate(-30 -30)')
    .attr('class', 'obstacle');

  obs.exit()
    .remove();


};

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}






