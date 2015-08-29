// start slingin' some d3 here.

var currentScore = 0;
var highScore = 0;
var collisions = 0;

var objCount = 0;

var height = 640;
var width = 480;

var obstacles = [];
var player = new Player(240,200,15);

for (var i = 0; i < 3; i++) {
  obstacles.push(generateObstacle());
}


var body = d3.select('body');

var svg = body.append('svg')
  .attr('height', height)
  .attr('width', width);

svg.selectAll('circle')
  .data(obstacles, function(d) {return d.id})
  .enter()
  .append('circle')
  .attr('r', function(d) {return d.radius})
  .attr('cx', function(d) {return d.x})
  .attr('cy', function(d) {return d.y})
  .attr('fill', 'red')
  .attr('class', 'obstacle');

svg.selectAll('.player')
  .data([player])
  .enter()
  .append('circle')
  .attr('r', function(d) {return d.radius})
  .attr('cx', function(d) {return d.x})
  .attr('cy', function(d) {return d.y})
  .attr('fill', 'blue')
  .attr('class', 'player');

var moveKeyIntervalID;

body.on('keydown', keydownHandler);

body.on('keyup', keyUpHandler);

d3.timer(tickFn);

var quad = d3.geom.quadtree();
  quad.x(function(d) {return d.x;});
  quad.y(function(d) {return d.y;});
  quad.extent([[0,0],[width, height]]);

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

  obstacles = obstacles.filter(function(obs) {
    return obs.y > 0;
  });

  // var root = quad([player].concat(obstacles));
  var root = quad(obstacles);

  /*root.visit(function(node) {
    console.log(node);
  })*/

  svg.selectAll('.player')
      .data([player])
      .attr("cx", function(d) {return d.x});

  obstacles.forEach(function(obstacle) {
    obstacle.move();
  });
  //debugger;
  var closest = root.find([player.x, player.y]);

  //console.log(closest);
  //console.log("dist: " + distance(player.x, player.y, closest.x, closest.y));
  
  if (closest !== undefined && distance(player.x, player.y, closest.x, closest.y) < 35 &&
    !(player.collisions[closest.id])) {
    
      player.collisions[closest.id] = true;

      collisionHandler();
      console.log("Collision!");
  }

  var obs = svg.selectAll('.obstacle')
    .data(obstacles, function(d) {return d.id})
    .attr("cy", function(d) {return d.y})
    .attr("cx", function(d) {return d.x});

  obs.enter()
    .append('circle')
    .attr('r', function(d) {return d.radius})
    .attr('cx', function(d) {return d.x})
    .attr('cy', function(d) {return d.y})
    .attr('fill', 'red')
    .attr('class', 'obstacle');

  obs.exit()
    .remove();


};

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}






