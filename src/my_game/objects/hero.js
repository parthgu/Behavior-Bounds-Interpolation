"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Hero extends engine.GameObject {
  constructor(spriteTexture) {
    super(null);
    this.kDelta = 0.3;
    this.kWidth = 9;
    this.kHeight = 12;

    this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
    this.mRenderComponent.setColor([1, 1, 1, 0]);
    this.mRenderComponent.getXform().setSize(this.kWidth, this.kHeight);
    this.mRenderComponent.setElementPixelPositions(0, 120, 0, 180);

    this.mIsOscillating = false;
    this.mWidthOscillate = new engine.Oscillate(4.5, 4, 60);
    this.mHeightOscillate = new engine.Oscillate(6, 4, 60);

    this.mPosLerp = null;
  }

  update(camera, patrolSet) {
    let b = [];
    let transform = this.getXform();
    for (let i = 0; i < patrolSet.size(); i++) {
      if (
        this.getBBox().intersectsBound(patrolSet.getObjectAt(i).mHead.getBBox())
      ) {
        if (!this.mIsOscillating) this.hitEvent();
      }
    }

    // scale oscillation
    if (engine.input.isKeyClicked(engine.input.keys.Q)) {
      this.hitEvent();
    }

    if (this.misOscillating) {
      transform.setSize(
        this.kWidth + this.mWidthOscillate.getNext(),
        this.kHeight + this.mHeightOscillate.getNext()
      );
      this.mIsOscillating = !this.mWidthOscillate.done();
    }

    // position interpolation
    if (camera.isMouseInViewport()) {
      if (this.mPosLerp === null) {
        this.mPosLerp = new engine.LerpVec2(transform.getPosition(), 120, 0.05);
      }

      this.mPosLerp.setFinal([camera.mouseWCX(), camera.mouseWCY()]);
      this.mPosLerp.update();

      transform.setPosition(this.mPosLerp.get()[0], this.mPosLerp.get()[1]);
    }
  }

  hitEvent() {
    this.misOscillating = true;
    this.mWidthOscillate.reStart();
    this.mHeightOscillate.reStart();
  }
}

export default Hero;
