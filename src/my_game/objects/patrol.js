"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import Head from "./head.js";
import Wing from "./wing.js";

class Patrol extends engine.GameObject {
  constructor(spriteSheet, x, y) {
    super(null);
    this.mRenderComponent = new engine.Renderable();
    this.mHead = new Head(spriteSheet);
    this.mHead.getXform().setPosition(x, y);
    this.mTopWing = new Wing(spriteSheet);
    this.mTopWing.getXform().setPosition(x, y);
    this.mTopWing.getRenderable().setColor([1, 1, 1, 0]);
    this.mBottomWing = new Wing(spriteSheet);
    this.mBottomWing.getXform().setPosition(x, y);
    this.mBottomWing.getRenderable().setColor([1, 1, 1, 0]);

    this.mWidth = null;
    this.mHeight = null;
    this.mXPos = null;
    this.myPos = null;

    this.mIsAlive = true;
    this.mTopWingHits = 0;
    this.mBottomWingHits = 0;
  }

  update(aCamera) {
    this.updateDimentions();
    this.mHead.update();
    let headPos = this.mHead.getXform().getPosition();

    this.mTopWing.update(headPos, [10, 6]);
    this.mBottomWing.update(headPos, [10, -6]);

    switch (aCamera.collideWCBound(this.getXform(), 1.0)) {
      case engine.eBoundCollideStatus.eCollideTop:
        if (this.mHead.getCurrentFrontDir()[1] > 0)
          this.mHead.setCurrentFrontDir(
            vec2.fromValues(
              this.mHead.getCurrentFrontDir()[0],
              this.mHead.getCurrentFrontDir()[1] * -1
            )
          );
        break;
      case engine.eBoundCollideStatus.eCollideRight:
        if (this.mHead.getCurrentFrontDir()[0] > 0)
          this.mHead.setCurrentFrontDir(
            vec2.fromValues(
              this.mHead.getCurrentFrontDir()[0] * -1,
              this.mHead.getCurrentFrontDir()[1]
            )
          );
        break;
      case engine.eBoundCollideStatus.eCollideBottom:
        if (this.mHead.getCurrentFrontDir()[1] < 0)
          this.mHead.setCurrentFrontDir(
            vec2.fromValues(
              this.mHead.getCurrentFrontDir()[0],
              this.mHead.getCurrentFrontDir()[1] * -1
            )
          );
        break;
      case engine.eBoundCollideStatus.eCollideLeft:
        if (this.mHead.getCurrentFrontDir()[0] < 0)
          this.mHead.setCurrentFrontDir(
            vec2.fromValues(
              this.mHead.getCurrentFrontDir()[0] * -1,
              this.mHead.getCurrentFrontDir()[1]
            )
          );
        break;
      default:
        break;
    }

    if (
      this.mRenderComponent.getXform().getXPos() -
        this.mRenderComponent.getXform().getWidth() / 2 >=
      aCamera.getWCCenter()[0] + aCamera.getWCWidth() / 2
    ) {
      this.mIsAlive = false;
    }
  }

  draw(camera) {
    // this.mRenderComponent.draw(camera);
    this.mHead.draw(camera);
    this.mTopWing.draw(camera);
    this.mBottomWing.draw(camera);
  }

  onHitEvent() {
    this.mHead.getXform().incXPosBy(5);
  }

  topWingHitEvent() {
    this.mTopWingHits++;
    this.mTopWing.getRenderable().setColor([1, 1, 1, this.mTopWingHits / 5]);
    if (this.mTopWingHits / 5 >= 1) {
      this.mIsAlive = false;
    }
  }

  bottomWingHitEvent() {
    this.mBottomWingHits++;
    this.mBottomWing
      .getRenderable()
      .setColor([1, 1, 1, this.mBottomWingHits / 5]);
    if (this.mBottomWingHits / 5 >= 1) {
      this.mIsAlive = false;
    }
  }

  updateDimentions() {
    this.mWidth = this.mTopWing.getBBox().maxX() - this.mHead.getBBox().minX();
    this.mHeight =
      (this.mTopWing.getBBox().maxY() - this.mBottomWing.getBBox().minY()) *
      1.5;
    this.mXPos = this.mTopWing.getBBox().maxX() - this.mWidth / 2;

    this.mYPos = this.mBottomWing.getBBox().minY() + this.mHeight / 2;

    this.getXform().setXPos(this.mXPos);
    this.getXform().setYPos(this.mYPos);
    this.getXform().setWidth(this.mWidth);
    this.getXform().setHeight(this.mHeight);
  }

  isAlive() {
    return this.mIsAlive;
  }
}

export default Patrol;
