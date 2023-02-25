"use strict";

import GameObjectSet from "../../engine/game_objects/game_object_set.js";
import engine from "../../engine/index.js";
import Patrol from "./patrol.js";

class PatrolSet extends GameObjectSet {
  constructor() {
    super();
  }

  update(camera) {
    if (engine.input.isKeyClicked(engine.input.keys.J))
      this.mSet.forEach(gameObj => gameObj.onHitEvent());

    this.mSet.forEach(gameObj => gameObj.update(camera));
  }
}

export default PatrolSet;
