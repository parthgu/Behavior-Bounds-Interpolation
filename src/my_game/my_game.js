"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import DyePack from "./objects/dye_pack.js";
import DyePackSet from "./objects/dye_pack_set.js";
import Renderable from "../engine/renderables/renderable.js";

class MyGame extends engine.Scene {
  constructor() {
    super();

    this.kMinionSprite = "assets/SpriteSheet.png";
    this.kBg = "assets/bg.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    this.mHero = null;
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(30, 27.5), // position of the camera
      200, // width of camera
      [0, 0, 800, 600] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    this.mBg = new engine.TextureRenderable(this.kBg);
    this.mBg.getXform().setSize(300, 150);
    this.mBg.getXform().setPosition(30, 27.5);

    this.mHero = new Hero(this.kMinionSprite);
    this.mHero.getXform().setSize(9, 12);
    this.mHero.getXform().setPosition(30, 27.5);
  }

  load() {
    engine.texture.load(this.kBg);
    engine.texture.load(this.kMinionSprite);
  }

  unload() {
    engine.texture.unload(this.kBg);
    engine.texture.unload(this.kMinionSprite);
  }

  // This is the draw function, make sure to setup proper drawing environment, and more
  // importantly, make sure to _NOT_ change any state.
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setViewAndCameraMatrix();

    this.mBg.draw(this.mCamera);

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
