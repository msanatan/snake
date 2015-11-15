var animate;
var Game = Game || {};
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var FPS = 1000 / 30;
var engine = new Game.Engine('game', WIDTH, HEIGHT);

engine.init();
engine.register(new Game.Snake(WIDTH, HEIGHT, {}));

// Use fallbacks for requestAnimationFrame
animate = (window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, FPS);
  });

// Taken from Mozilla
(function() {
  'use strict';
  function main() {
    Game.stopLoop = animate(main);
    engine.step();
  }
  main();
})();
