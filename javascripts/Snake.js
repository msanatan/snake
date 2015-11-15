var Game = Game || {};

Game.SnakeGame = function(width, height, options) {
  'use strict';
  this.width = width;
  this.height = height;
  this.blockWidth = options.blockWidth || 20;
  this.blockHeight = options.blockHeight || 20;
  var columns = Math.round(this.width / this.blockWidth);
  var rows = Math.round(this.height / this.blockHeight);
  var midCol = Math.floor(columns / 2);
  var midRow = Math.floor(rows / 2);
  this.snake = [[midCol, midRow], [midCol - 1, midRow], [midCol - 2, midRow]];
};

Game.SnakeGame.prototype.DIRECTIONS = {
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left'
};

Game.SnakeGame.prototype.blockPosition = function(col, row) {
  'use strict';
  return {
    x: col * this.blockWidth,
    y: row * this.blockHeight
  };
};

Game.SnakeGame.prototype.update = function(inputHandler) {
  'use strict';
};

Game.SnakeGame.prototype.render = function(context) {
  'use strict';
  var coordinates;
  var self = this;

  context.beginPath();
  context.fillStyle = '#000000';
  context.fillRect(0, 0, this.width, this.height);
  context.closePath();

  context.beginPath();
  this.snake.forEach(function(s) {
    coordinates = self.blockPosition(s[0], s[1]);
    context.fillStyle = '#FFFFFF';
    context.rect(coordinates.x, coordinates.y, self.blockWidth,
                 self.blockHeight);
    context.lineWidth = "1";
    context.strokeStyle = '#000000';
    context.rect(coordinates.x, coordinates.y, self.blockWidth,
                      self.blockHeight);
  });
  context.closePath();
  context.fill();
  context.stroke();
};
