"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class DyePack extends engine.GameObject {
  constructor() {
    super(null);
    this.mSpeed = 2;
    this.mDeaccelerate = 0.1;
    this.mLifeSpan = 0;
    this.mCreationTime = performance.now();
    this.mIsAlive = true;

    this.mRenderComponent = new engine.SpriteRenderable(
      "assets/SpriteSheet.png"
    );
    this.mRenderComponent.setColor([1, 1, 1, 0.1]);
    this.mRenderComponent.getXform().setPosition(30, 27.5);
    this.mRenderComponent.getXform().setSize(2, 3.25);
    this.mRenderComponent.setElementPixelPositions(510, 595, 23, 153);
  }

  update() {
    this.getXform().incXPosBy(this.mSpeed);
    if (performance.now() - this.mCreationTime >= 5000) this.mIsAlive = false;
    if (this.getXform().getXPos() > 130) {
      this.mIsAlive = false;
    }
  }

  getSpeed() {
    return this.mSpeed;
  }

  setSpeed(delta) {
    this.mSpeed = delta;
  }

  slowDown() {
    if (this.mSpeed > 0) this.mSpeed -= this.mDeaccelerate;
    else this.mIsAlive = false;
  }

  isAlive() {
    return this.mIsAlive;
  }
}

export default DyePack;
