"use strict"; // Operate in Strict mode such that variables must be declared before used!

import GameObject from "../../engine/game_objects/game_object.js";
import engine from "../../engine/index.js";

class Head extends engine.GameObject {
  constructor() {
    super(null);
    this.kWidth = 7.5;
    this.kHeight = 7.5;
    this.kXPos = 100;
    this.kYPos = 50;

    this.mXSpeed = Math.floor(Math.random() * 1.083 + 0.083);
    this.mYSpeed = Math.floor(Math.random() * 1.083 + 0.083);

    if (Math.random() > 0.5) {
      this.mXSpeed *= -1;
    }
    if (Math.random() > 0.5) {
      this.mYSpeed *= -1;
    }

    this.mRenderComponent = new engine.SpriteRenderable(
      "assets/SpriteSheet.png"
    );
    this.mRenderComponent.setColor([1, 1, 1, 0]);
    // this.mRenderComponent.getXform().setPosition(this.kXPos, this.kYPos);
    this.mRenderComponent.getXform().setSize(this.kWidth, this.kHeight);
    this.mRenderComponent.setElementPixelPositions(130, 310, 0, 180);
  }

  update() {
    // this.kXPos += this.mXSpeed;
    // this.kYPos += this.mYSpeed;
    // this.mRenderComponent.getXform().setPosition(this.kXPos, this.kYPos);
  }

  getSpeed() {
    return this.mSpeed;
  }

  setSpeed(delta) {
    this.mSpeed = delta;
  }
}

export default Head;
