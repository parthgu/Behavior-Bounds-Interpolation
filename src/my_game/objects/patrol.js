"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import Head from "./head.js";
import Wing from "./wing.js";

class Patrol extends engine.GameObject {
  constructor(spriteSheet, x, y) {
    super(null);

    this.mHead = new Head(spriteSheet);
    this.mHead.getXform().setPosition(x, y);
    this.mTopWing = new Wing(spriteSheet);
    this.mTopWing.getXform().setPosition(x, y);
    this.mBottomWing = new Wing(spriteSheet);
    this.mBottomWing.getXform().setPosition(x, y);
  }

  update(aCamera) {
    this.mHead.update();
    let headPos = this.mHead.getXform().getPosition();

    this.mTopWing.update(headPos, [10, 6]);
    this.mBottomWing.update(headPos, [10, -6]);
  }

  draw(camera) {
    this.mHead.draw(camera);
    this.mTopWing.draw(camera);
    this.mBottomWing.draw(camera);
  }

  onHitEvent() {
    this.mHead.getXform().incXPosBy(5);
  }
}

export default Patrol;
