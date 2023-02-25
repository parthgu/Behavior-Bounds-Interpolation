"use strict"; // Operate in Strict mode such that variables must be declared before used!

import GameObject from "../../engine/game_objects/game_object.js";
import engine from "../../engine/index.js";

const kMinSpeed = 5;
const kMaxSpeed = 10;

class Head extends engine.GameObject {
  constructor(spriteSheet) {
    super(null);

    this.setSpeed(
      (kMinSpeed + (Math.random() * (kMaxSpeed - kMinSpeed))) / 60
    );
    this.setCurrentFrontDir(vec2.fromValues(
      Math.random() - 0.5,
      Math.random() - 0.5
    ));

    this.kWidth = 7.5;
    this.kHeight = 7.5;

    this.mRenderComponent = new engine.SpriteRenderable(spriteSheet);
    this.mRenderComponent.setColor([1, 1, 1, 0]);
    this.mRenderComponent.getXform().setSize(this.kWidth, this.kHeight);
    this.mRenderComponent.setElementPixelPositions(130, 310, 0, 180);
  }
}

export default Head;
