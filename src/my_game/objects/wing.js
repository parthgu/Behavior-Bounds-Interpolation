import engine from "../../engine/index.js";

class Wing extends engine.GameObject {
    constructor(spriteTexture) {
        super(null);
        this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setSize(10, 8);
        this.mRenderComponent.setSpriteSequence(
            512, 0,
            204, 164,
            5,
            0
        );
        this.mRenderComponent.setAnimationType(engine.eAnimationType.eRight);
        this.mRenderComponent.setAnimationSpeed(50);

        this.mPosLerp = null;
    }

    update(headPos, headOffset) {
        this.mRenderComponent.updateAnimation();
        
        let transform = this.getXform();
        if (this.mPosLerp === null) {
            this.mPosLerp = new engine.LerpVec2(
                transform.getPosition(), 120, 0.05
            );
        }
        
        this.mPosLerp.setFinal([
            headPos[0] + headOffset[0],
            headPos[1] + headOffset[1]
        ]);
        this.mPosLerp.update();

        transform.setPosition(
            this.mPosLerp.get()[0],
            this.mPosLerp.get()[1]
        );
    }
}

export default Wing;