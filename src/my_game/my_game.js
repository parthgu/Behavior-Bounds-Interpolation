"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";

class MyGame extends engine.Scene {
  constructor() {
    super();

    this.kSpriteSheet = "assets/SpriteSheet.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mHero = null;
  }

  load() {
    engine.texture.load(this.kSpriteSheet);
  }
  
  unload() {
    engine.texture.unload(this.kSpriteSheet);
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(100, 50), // position of the camera
      200, // width of camera
      [0, 0, 800, 600] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    this.mHero = new Hero(this.kSpriteSheet);
  }

  // This is the draw function, make sure to setup proper drawing environment, and more
  // importantly, make sure to _NOT_ change any state.
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setViewAndCameraMatrix();

    this.mHero.draw(this.mCamera);
  }

  // The Update function, updates the application state. Make sure to _NOT_ draw
  // anything from this function!
  update() {
    this.mHero.update();
  }
}

window.onload = function () {
  engine.init("GLCanvas");

  let myGame = new MyGame();
  myGame.start();
};
