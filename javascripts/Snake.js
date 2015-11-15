var Game = Game || {};


Game.SnakeGame = function(width, height, options) {
  'use strict';
  this.width = width;
  this.height = height;
  this.blockWidth = options.blockWidth || 20;
  this.blockHeight = options.blockHeight || 20;
  var columns = Math.round(this.width / this.blockWidth);
  var rows = Math.round(this.height / this.blockHeight);
  this.grid = new Array(columns);
  this.grid.forEach(function(g) {
    g = new Array(rows);
  });
};

Game.SnakeGame.prototype.DIRECTIONS = {
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left'
};

Game.SnakeGame.prototype.update = function(inputHandler) {
  'use strict';
};

Game.SnakeGame.prototype.render = function(context) {
  'use strict';
  context.beginPath();
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);
  context.closePath();
};
