var Game = Game || {};

Game.Snake = function(width, height, options) {
  'use strict';
  this.width = width;
  this.height = height;
  this.blockWidth = options.blockWidth || 20;
  this.blockHeight = options.blockHeight || 20;
  this.columns = Math.round(this.width / this.blockWidth);
  this.rows = Math.round(this.height / this.blockHeight);
  var midCol = Math.floor(this.columns / 2);
  var midRow = Math.floor(this.rows / 2);
  this.snake = [[midCol, midRow], [midCol - 1, midRow], [midCol - 2, midRow]];
  this.direction = 'right';
  this.pause = false;
  this.gameOver = false;
};

Game.Snake.prototype.DIRECTIONS = {
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left'
};

Game.Snake.prototype.blockPosition = function(col, row) {
  'use strict';
  return {
    x: col * this.blockWidth,
    y: row * this.blockHeight
  };
};

Game.Snake.prototype.moveSnake = function() {
  'use strict';
  var headX = this.snake[0][0];
  var headY = this.snake[0][1];

  if (this.direction === this.DIRECTIONS.UP) {
    headY -= 1;
  } else if (this.direction === this.DIRECTIONS.RIGHT) {
    headX += 1;
  } else if (this.direction === this.DIRECTIONS.DOWN) {
    headY += 1;
  } else if (this.direction === this.DIRECTIONS.LEFT) {
    headX -= 1;
  }

  var tail = this.snake.pop();
  tail = [headX, headY];
  this.snake.unshift(tail);
};

Game.Snake.prototype.isIntersecting = function(element, arr) {
  'use strict';
  return arr.some(function(a) {
    return a[0] === element[0] && a[1] === element[1];
  });
};

Game.Snake.prototype.isGameOver = function() {
  'use strict';
  var head = this.snake[0];
  if (head[0] < 0 || head[0] >= this.columns ||
     head[1] < 0 || head[1] >= this.rows ||
     this.isIntersecting(head, this.snake.slice(1))) {
    return true;
  }
  return false;
};

Game.Snake.prototype.getRandomInt = function(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max - min)) + min;
};

Game.Snake.prototype.update = function(inputHandler) {
  'use strict';

  this.gameOver = this.isGameOver();
  if (!this.gameOver) {

    if (inputHandler.pressed && inputHandler.isDown('ESC')) {
      this.pause = !this.pause;
    }
    if (!this.pause) {
      if (this.direction !== this.DIRECTIONS.DOWN &&
          inputHandler.isDown('UP')) {
        this.direction = this.DIRECTIONS.UP;
      } else if (this.direction !== this.DIRECTIONS.LEFT &&
                 inputHandler.isDown('RIGHT')) {
        this.direction = this.DIRECTIONS.RIGHT;
      } else if (this.direction !== this.DIRECTIONS.UP &&
                 inputHandler.isDown('DOWN')) {
        this.direction = this.DIRECTIONS.DOWN;
      } else if (this.direction !== this.DIRECTIONS.RIGHT &&
                 inputHandler.isDown('LEFT')) {
        this.direction = this.DIRECTIONS.LEFT;
      }
      this.moveSnake();
    }
  }
};

Game.Snake.prototype.render = function(context) {
  'use strict';
  var coordinates, textMeasure;
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

  if (this.pause) {
    context.beginPath();
    context.font = 'bold 120px Helvetica, Verdana, san-serif';
    context.fillStyle = '#FFDD88';
    textMeasure = context.measureText('Paused').width;
    context.fillText('Paused', (this.width / 2) - (textMeasure / 2), this.height / 2);
    context.closePath();
  }

  if (this.gameOver) {
    context.beginPath();
    context.font = 'bold 120px Helvetica, Verdana, san-serif';
    context.fillStyle = '#FFDD88';
    textMeasure = context.measureText('Game Over').width;
    context.fillText('Game Over', (this.width / 2) - (textMeasure / 2), this.height / 2);
    context.closePath();
  }
};
