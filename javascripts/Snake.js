var Game = Game || {};

Game.Snake = function(width, height, options) {
  'use strict';
  this.width = width;
  this.height = height;
  this.blockWidth = options.blockWidth || 20;
  this.blockHeight = options.blockHeight || 20;
  this.columns = Math.round(this.width / this.blockWidth);
  this.rows = Math.round(this.height / this.blockHeight);
  this.midCol = Math.floor(this.columns / 2);
  this.midRow = Math.floor(this.rows / 2);
  this.snake = [[this.midCol, this.midRow], [this.midCol - 1, this.midRow],
                [this.midCol - 2, this.midRow]];
  this.direction = 'right';
  this.pause = false;
  this.gameOver = false;
  this.food = [];
  this.foodCount = 0;
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
  var tail;

  if (this.direction === this.DIRECTIONS.UP) {
    headY -= 1;
  } else if (this.direction === this.DIRECTIONS.RIGHT) {
    headX += 1;
  } else if (this.direction === this.DIRECTIONS.DOWN) {
    headY += 1;
  } else if (this.direction === this.DIRECTIONS.LEFT) {
    headX -= 1;
  }

  if (this.food[0] !== headX || this.food[1] !== headY) {
    tail = this.snake.pop();
  }
  else {
    this.food = [];
    this.foodCount += 1;
  }
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

Game.Snake.prototype.reset = function() {
  this.snake = [[this.midCol, this.midRow], [this.midCol - 1, this.midRow],
                [this.midCol - 2, this.midRow]];
  this.food = [];
  this.foodCount = 0;
  this.direction = 'right';
  this.gameOver = false;
}

Game.Snake.prototype.update = function(inputHandler) {
  'use strict';

  this.gameOver = this.isGameOver();
  if (!this.gameOver) {

    if (inputHandler.pressed && inputHandler.isDown('ESC')) {
      this.pause = !this.pause;
    }
    if (!this.pause) {

      if (this.food.length === 0) {
        this.food = [this.getRandomInt(0, this.columns),
                     this.getRandomInt(0, this.rows)];
      }

      if (this.direction !== this.DIRECTIONS.DOWN &&
          (inputHandler.isDown('UP') || inputHandler.isDown('W'))) {
        this.direction = this.DIRECTIONS.UP;
      } else if (this.direction !== this.DIRECTIONS.LEFT &&
                 (inputHandler.isDown('RIGHT') || inputHandler.isDown('D'))) {
        this.direction = this.DIRECTIONS.RIGHT;
      } else if (this.direction !== this.DIRECTIONS.UP &&
                 (inputHandler.isDown('DOWN') || inputHandler.isDown('S'))) {
        this.direction = this.DIRECTIONS.DOWN;
      } else if (this.direction !== this.DIRECTIONS.RIGHT &&
                 (inputHandler.isDown('LEFT') || inputHandler.isDown('A'))) {
        this.direction = this.DIRECTIONS.LEFT;
      }
      this.moveSnake();
    }
  } else {
    if (inputHandler.pressed && inputHandler.isDown('RTN')) {
      this.reset();
    }
  }
};

Game.Snake.prototype.render = function(context) {
  'use strict';
  var coordinates, textMeasure, foodCoordinates;
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

  context.beginPath();
  foodCoordinates = this.blockPosition(this.food[0], this.food[1]);
  context.fillStyle = '#FF5566';
  context.rect(foodCoordinates.x, foodCoordinates.y, this.blockWidth,
               this.blockHeight);
  context.closePath();
  context.fill();

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

    context.beginPath();
    context.font = '80pt Helvetica, Verdana, sans-serif';
    context.fillStyle = '#FFFFFF';
    textMeasure = context.measureText('Try Again?').width;
    context.fillText('Try Again?', (this.width / 2) - (textMeasure / 2), (this.height / 2) + 120);
    context.closePath();
  }
};
