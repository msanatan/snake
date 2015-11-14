var Game = Game || {};

Game.Engine = function(canvasID, width, height) {
  'use strict';
  this.canvas = document.getElementById(canvasID);
  this.canvas.width = width;
  this.canvas.height = height;
};

Game.Engine.prototype.init = function() {
  'use strict';
  this.canvas.focus();
  this.ctx = this.canvas.getContext('2d');
  this.inputHandler = new Game.InputHandler();
  this.inputHandler.register();
};

Game.Engine.prototype.register = function(screen) {
  'use strict';
  this.screen = screen;
};

Game.Engine.prototype.update = function() {
  'use strict';
  this.inputHandler.update();
  this.screen.update(this.inputHandler);
};

Game.Engine.prototype.render = function() {
  'use strict';
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.screen.render(this.ctx);
};

Game.Engine.prototype.stop = function() {
  'use strict';
  delete this.screen;
  this.screen = null;
};

Game.Engine.prototype.switchScreens = function(newScreen) {
  'use strict';
  this.stop();
  this.inputHandler.reset();
  this.register(newScreen);
};

Game.Engine.prototype.step = function() {
  'use strict';
  this.update();
  this.render();
};
