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

    let i;
    for (i = 0; i < this.mSet.length; i++) {
      this.mSet[i].update();

      if (!this.mSet[i].isAlive()) {
        this.removeFromSet(this.mSet[i]);
        console.log("removed " + i);
      }
    }
  }
}

export default DyePackSet;
