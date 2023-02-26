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

    this.mSet.forEach((gameObj) => gameObj.setSlowMode(false));

    if (engine.input.isKeyPressed(engine.input.keys.D)) {
      this.mSet.forEach((gameObj) => gameObj.setSlowMode(true));
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
          if (this.mSet[i].pixelTouches(patrolSet.getObjectAt(j).mHead, h)) {
            if (!this.mSet[i].mIsOscillating)
              patrolSet.getObjectAt(j).onHitEvent();
            this.mSet[i].mIsOscillating = true;
          } else if (
            this.mSet[i].pixelTouches(patrolSet.getObjectAt(j).mTopWing, t)
          ) {
            if (!this.mSet[i].mIsOscillating)
              patrolSet.getObjectAt(j).topWingHitEvent();
            this.mSet[i].mIsOscillating = true;
          } else if (
            this.mSet[i].pixelTouches(patrolSet.getObjectAt(j).mBottomWing, b)
          ) {
            if (!this.mSet[i].mIsOscillating)
              patrolSet.getObjectAt(j).bottomWingHitEvent();
            this.mSet[i].mIsOscillating = true;
          } else {
            this.mSet[i].setSlowMode(true);
          }
        }
      }

      this.mSet[i].update(aCamera);
    }
  }
}

export default DyePackSet;
