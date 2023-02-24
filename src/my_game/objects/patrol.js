"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Patrol extends engine.GameObject {
  constructor() {
    super(null);
    this.kHeadXPos = 100;
    this.kHeadYPos = 50;
    this.mXSpeed = this.mRenderComponent = new engine.SpriteRenderable(
      "assets/SpriteSheet.png"
    );
    this.mUpperWing = new engine.SpriteAnimateRenderable(
      "assets/SpriteSheet.png"
    );
    this.mLowerWing = new engine.SpriteAnimateRenderable(
      "assets/SpriteSheet.png"
    );

    this.mHeadBoundingBox = new engine.BoundingBox(
      [this.kHeadXPos, this.kHeadYPos],
      7.5,
      7.5
    );

    this.mRenderComponent.setColor([1, 1, 1, 0]);
    this.mRenderComponent
      .getXform()
      .setPosition(this.kHeadXPos, this.kHeadYPos);
    this.mRenderComponent.getXform().setSize(7.5, 7.5);
    this.mRenderComponent.setElementPixelPositions(130, 310, 0, 180);
  }

  update(aCamera) {}
}

export default Patrol;
