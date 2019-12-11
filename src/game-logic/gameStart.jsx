import dweebs from "../data/dweebs";
import store from "../store/store";
import _ from "lodash";
import {
  PLAYING,
  GAME_STARTED_MESSAGE,
  EVALUATE_DWEEB_UPDATE
} from "../store/actionTypes";

function dispatchUpdates(dweebs) {
  for (let i = 0; i < dweebs.length; i++) {
    store.dispatch({
      type: EVALUATE_DWEEB_UPDATE.type,
      dweeb: dweebs[i]
    });
  }
}

function gameStart(gameReset) {
  if (gameReset) {
    const initialDweebList = dweebs;
    dispatchUpdates(initialDweebList);
  } else {
    let currentDweebs = _.values(store.getState().dweebs);

    currentDweebs = currentDweebs.map(dweeb => {
      let fullLifeDweeb = { ...dweeb };
      fullLifeDweeb.life = fullLifeDweeb.totalLife;
      return fullLifeDweeb;
    });

    dispatchUpdates(currentDweebs);
  }

  store.dispatch(PLAYING);
  store.dispatch(GAME_STARTED_MESSAGE);
}

export default gameStart;
