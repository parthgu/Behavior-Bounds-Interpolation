"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class Hero extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);
        this.kDelta = 0.3;
        this.kWidth = 9; this.kHeight = 12;


        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(100, 50);
        this.mRenderComponent.getXform().setSize(this.kWidth, this.kHeight);
        this.mRenderComponent.setElementPixelPositions(0, 120, 0, 180);

        this.mWidthOscillate = new engine.Oscillate(4.5, 4, 60);
        this.mHeightOscillate = new engine.Oscillate(6, 4, 60);

        this.mIsOscillating = false;
    }

    update() {
        let transform = this.getXform();

        if (engine.input.isKeyClicked(engine.input.keys.Q)) {
            this.misOscillating = true;
            this.mWidthOscillate.reStart();
            this.mHeightOscillate.reStart();
        }

        if (this.misOscillating) {
            transform.setSize(
                this.kWidth + this.mWidthOscillate.getNext(),
                this.kHeight + this.mHeightOscillate.getNext()
            );

            if (this.mWidthOscillate.done())
                this.misOscillating = false;
        }
    }
}

export default Hero;