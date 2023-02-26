"use strict";

import GameObjectSet from "../../engine/game_objects/game_object_set.js";
import engine from "../../engine/index.js";
import DyePack from "./dye_pack.js";

class DyePackSet extends GameObjectSet {
  constructor() {
    super();
  }

  update(aCamera, hero, patrolSet) {
    if (engine.input.isKeyClicked(engine.input.keys.Space)) {
      let newDyePack = new DyePack();
      newDyePack
        .getXform()
        .setPosition(hero.getXform().getXPos(), hero.getXform().getYPos());
      this.addToSet(newDyePack);
    }

    let slowMode = false;
    if (engine.input.isKeyPressed(engine.input.keys.D)) {
      slowMode = true;
    }

    let i;

    for (i = 0; i < this.mSet.length; i++) {
      if (!this.mSet[i].isAlive()) {
        this.removeFromSet(this.mSet[i]);
        continue;
      }
      let h = [];
      let t = [];
      let b = [];
      for (let j = 0; j < patrolSet.size(); j++) {
        if (
          this.mSet[i]
            .getBBox()
            .intersectsBound(patrolSet.getObjectAt(j).getBBox())
        ) {
          slowMode = true;
          if (this.mSet[i].pixelTouches(patrolSet.getObjectAt(j).mHead, h)) {
            patrolSet.getObjectAt(j).onHitEvent();
            this.mSet[i].mIsOscillating = true;
          } else if (
            this.mSet[i].pixelTouches(patrolSet.getObjectAt(j).mTopWing, t)
          ) {
            this.mSet[i].mIsOscillating = true;
          } else if (
            this.mSet[i].pixelTouches(patrolSet.getObjectAt(j).mBottomWing, b)
          ) {
            this.mSet[i].mIsOscillating = true;
          }
        }
      }
      this.mSet[i].setSlowMode(slowMode);
      this.mSet[i].update(aCamera);
    }
  }
}

export default DyePackSet;
