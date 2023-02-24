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
    this.mSlowDownMode = false;
    this.kWidth = 2;
    this.kHeight = 3.25;
    this.kXPos = 100;
    this.kYPos = 50;

    this.mRenderComponent = new engine.SpriteRenderable(
      "assets/SpriteSheet.png"
    );
    this.mRenderComponent.setColor([1, 1, 1, 0.1]);
    this.mRenderComponent.getXform().setPosition(this.kXPos, this.kYPos);
    this.mRenderComponent.getXform().setSize(this.kWidth, this.kHeight);
    this.mRenderComponent.setElementPixelPositions(510, 595, 23, 153);

    this.mWidthOscillate = new engine.Oscillate(4, 20, 300);
    this.mHeightOscillate = new engine.Oscillate(0.2, 20, 300);

    this.mIsOscillating = false;
  }

  update(aCamera) {
    if (this.mIsAlive) {
      if (performance.now() - this.mCreationTime >= 5000) {
        this.mIsAlive = false;
        return;
      }

      if (!this.mIsOscillating) {
        this.getXform().incXPosBy(this.mSpeed);
        this.kXPos = this.getXform().getXPos();
        this.kYPos = this.getXform().getYPos();
      }

      if (this.getXform().getXPos() > aCamera.getWCWidth()) {
        this.mIsAlive = false;
      }
      if (this.mSlowDownMode) {
        this.slowDown();
      }

      if (engine.input.isKeyClicked(engine.input.keys.S)) {
        this.mIsOscillating = true;
        this.mWidthOscillate.reStart();
        this.mHeightOscillate.reStart();
      }

      if (this.mIsOscillating) {
        this.getXform().setPosition(
          this.kXPos + this.mWidthOscillate.getNext(),
          this.kYPos + this.mHeightOscillate.getNext()
        );

        if (this.mWidthOscillate.done()) {
          this.misOscillating = false;
          this.mIsAlive = false;
        }
      }
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

  setSlowMode(val) {
    this.mSlowDownMode = val;
  }
}

export default DyePack;
