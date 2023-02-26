"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";

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

    this.mDyePackSet = null;
    this.mPatrolSet = null;

    this.isAutoSpawning = false;
    this.nextSpawnTime = null;
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

    this.mBg = new engine.TextureRenderable(this.kBg);
    this.mBg.getXform().setSize(200, 150);
    this.mBg.getXform().setPosition(100, 75);

    this.mDyePackSet = new DyePackSet();
    this.mPatrolSet = new PatrolSet();
    // this.mPatrolSet.addToSet(new Patrol(this.kSpriteSheet, 150, 75));
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

    this.mPatrolSet.draw(this.mCamera);
    this.mDyePackSet.draw(this.mCamera);
  }

  // The Update function, updates the application state. Make sure to _NOT_ draw
  // anything from this function!
  update() {
    if (engine.input.isKeyClicked(engine.input.keys.C)) this.spawnPatrol();

    // auto spawning
    if (engine.input.isKeyClicked(engine.input.keys.P)) {
      this.isAutoSpawning = !this.isAutoSpawning;

      if (this.isAutoSpawning) {
        this.spawnPatrol();
        this.setNextSpawnTime();
      }
    }

    if (this.isAutoSpawning && performance.now() >= this.nextSpawnTime) {
      this.spawnPatrol();
      this.setNextSpawnTime();
    }

    // update objects
    this.mDyePackSet.update(this.mCamera, this.mHero, this.mPatrolSet);
    this.mHero.update(this.mCamera);
    this.mPatrolSet.update(this.mCamera);
  }

  spawnPatrol() {
    let spawnX =
      this.mCamera.getWCCenter()[0] +
      (Math.random() * this.mCamera.getWCWidth()) / 2;

    let spawnY =
      this.mCamera.getWCCenter()[1] +
      ((Math.random() - 0.5) * this.mCamera.getWCHeight()) / 2;

    this.mPatrolSet.addToSet(new Patrol(this.kSpriteSheet, spawnX, spawnY));

    console.log(this.mCamera.getWCCenter());
  }

  setNextSpawnTime() {
    this.nextSpawnTime = performance.now() + (Math.random() + 2) * 1000;
  }
}

window.onload = function () {
  engine.init("GLCanvas");

  let myGame = new MyGame();
  myGame.start();
};
