// start slingin' some d3 here.

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

function tickFn() {
  debugger;

  var quad = d3.geom.quadtree([player].concat(obstacles))
    .x(function(d) {return d.x;})
    .y(function(d) {return d.y;});


  svg.selectAll('.player')
      .data([player])
      .attr("cx", function(d) {return d.x});

  obstacles.forEach(function(obstacle) {
    obstacle.move();
  });

  var closest = quad.find(player.x, player.y);

  console.log(closest);

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






