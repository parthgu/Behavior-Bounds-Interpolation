"use strict";

import GameObjectSet from "../../engine/game_objects/game_object_set.js";
import engine from "../../engine/index.js";
import DyePack from "./dye_pack.js";

class DyePackSet extends GameObjectSet {
  constructor() {
    super();
  }

  update(aCamera) {
    if (engine.input.isKeyClicked(engine.input.keys.Space)) {
      let newDyePack = new DyePack();
      newDyePack.getXform().setPosition(aCamera.mouseWCX(), aCamera.mouseWCY());
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
        console.log("removed " + i);
        continue;
      }

      this.mSet[i].setSlowMode(slowMode);
      this.mSet[i].update(aCamera);
    }
  }
}

export default DyePackSet;
