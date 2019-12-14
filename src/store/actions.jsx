import store from "../store/store";
import {
  CUSTOM_MESSAGE,
  NOT_PLAYING,
  UPDATE_DWEEBS
} from "../store/actionTypes";
import _ from "lodash";

export const gameStateUpdate = action => dispatch => {
  dispatch(action);
};

export const messageUpdate = messageKey => dispatch => {
  dispatch(messageKey);
};

export const dweebUpdate = (action, dweeb) => dispatch => {
  dispatch({
    type: action.type,
    dweeb: dweeb
  });
};

export const fight = (action, dweebs) => async dispatch => {
  if (!store.getState().gameState.playing) {
    return false;
  }
  await dispatch({
    type: action.type,
    dweebs: dweebs
  });

  let dweebsAfterAction = _.values(store.getState().dweebs);
  const dweeb1 = dweebsAfterAction[0];
  const dweeb2 = dweebsAfterAction[1];

  let actionTextElement = `Dweeb 1 damage: ${dweeb1.lastHit}<br> ------ <br>Dweeb 2 damage: ${dweeb2.lastHit}`;

  if (dweeb1.life === 0 || dweeb2.life === 0) {
    store.dispatch(NOT_PLAYING);
    actionTextElement +=
      dweeb1.life > dweeb2.life
        ? `<br>------<br>Dweeb 1 Won`
        : dweeb2.life > dweeb1.life
        ? `<br>------<br>Dweeb 2 Won`
        : `<br>------<br>Draw`;
  }

  dweebsAfterAction = dweebsAfterAction.map(dweeb => {
    let dweebWithoutHurt = { ...dweeb };
    dweebWithoutHurt.hurted = false;
    return dweebWithoutHurt;
  });
  setTimeout(() => {
    store.dispatch({
      type: UPDATE_DWEEBS.type,
      dweebs: dweebsAfterAction
    });
  }, 70);

  store.dispatch({
    type: CUSTOM_MESSAGE.type,
    messageTextOrHtml: actionTextElement
  });
};
