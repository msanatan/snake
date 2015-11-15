var Game = Game || {};


Game.SnakeGame = function(width, height, options) {
  'use strict';
  this.width = width;
  this.height = height;
  this.grid = [];
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
