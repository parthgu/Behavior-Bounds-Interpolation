"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Wing from "./objects/wing.js";
import Head from "./objects/head.js";

import DyePack from "./objects/dye_pack.js";
import DyePackSet from "./objects/dye_pack_set.js";

import Patrol from "./objects/patrol.js";
import PatrolSet from "./objects/patrol_set.js";

class MyGame extends engine.Scene {
  constructor() {
    super();

    this.kSpriteSheet = "assets/SpriteSheet.png";
    this.kBg = "assets/bg.png";

    // The camera to view the scene
    this.mCamera = null;

    this.mBg = null;
    this.mHero = null;
    
    this.mHead = null;
    this.mWing = null;

    this.mDyePackSet = null;
    this.mPatrolSet = null;
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(100, 75), // position of the camera
      200, // width of camera
      [0, 0, 800, 600] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    this.mHero = new Hero(this.kSpriteSheet);
    this.mHero.getXform().setPosition(100, 75);

    this.mWing = new Wing(this.kSpriteSheet);
    this.mWing.getXform().setPosition(150, 75);

    this.mHead = new Head(this.kSpriteSheet);
    this.mHead.getXform().setPosition(175, 75);

    this.mBg = new engine.TextureRenderable(this.kBg);
    this.mBg.getXform().setSize(200, 150);
    this.mBg.getXform().setPosition(100, 75);

    this.mDyePackSet = new DyePackSet();
    this.mPatrolSet = new PatrolSet();
    this.mPatrolSet.addToSet(new Patrol());
  }

  load() {
    engine.texture.load(this.kBg);
    engine.texture.load(this.kSpriteSheet);
  }

  unload() {
    engine.texture.unload(this.kBg);
    engine.texture.unload(this.kSpriteSheet);
  }

  // This is the draw function, make sure to setup proper drawing environment, and more
  // importantly, make sure to _NOT_ change any state.
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setViewAndCameraMatrix();

    this.mBg.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mWing.draw(this.mCamera);
    this.mHead.draw(this.mCamera);

    // this.mDyePackSet.draw(this.mCamera);
    // this.mPatrolSet.draw(this.mCamera);
  }

  // The Update function, updates the application state. Make sure to _NOT_ draw
  // anything from this function!
  update() {
    this.mDyePackSet.update(this.mCamera, this.mHero);
    this.mHero.update(this.mCamera);
    
    this.mHead.update();
    this.mWing.update(this.mHead);
  }
}

window.onload = function () {
  engine.init("GLCanvas");

  let myGame = new MyGame();
  myGame.start();
};
