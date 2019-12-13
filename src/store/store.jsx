import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import dweebs from "../data/dweebs";
import evaluateDweebUpdate from "../game-logic/evaluateDweebUpdate";
import fight from "../game-logic/fight";
import _ from "lodash";

const initialState = {
  gameState: {
    playing: false,
    isAboutModalVisible: false
  },
  message: {
    text: ""
  },
  dweebs: dweebs
};

function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case "PLAYING":
      return {
        ...state,
        playing: true
      };
    case "NOT_PLAYING":
      return {
        ...state,
        playing: false
      };
    case "TOGGLE_ABOUT_MODAL_VISIBILITY":
      return {
        ...state,
        isAboutModalVisible: !state.isAboutModalVisible
      };

    default:
      return {
        ...state
      };
  }
}

function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "NO_MESSAGE":
      return {
        ...state,
        text: ""
      };
    case "GAME_STARTED_MESSAGE":
      return {
        ...state,
        text: "Game Started"
      };
    case "DWEEB_UPDATED_MESSAGE":
      return {
        ...state,
        text: "Dweeb has been updated"
      };
    case "CUSTOM_MESSAGE":
      return {
        ...state,
        text: action.text
      };
    default:
      return {
        ...state
      };
  }
}

function dweebReducer(state = initialState, action) {
  switch (action.type) {
    case "EVALUATE_DWEEB_UPDATE":
      const dweebForUpdate = evaluateDweebUpdate(action.dweeb);
      let updatedDweebsState = _.values(state);
      updatedDweebsState = updatedDweebsState.map(dweeb => {
        return dweeb.id === dweebForUpdate.id ? dweebForUpdate : dweeb;
      });

      return {
        ...state,
        ...updatedDweebsState
      };

    case "UPDATE_DWEEBS":
      const dweebsForUpdate = _.cloneDeep(action.dweebs);
      return {
        ...state,
        ...dweebsForUpdate
      };

    case "FIGHT":
      const dweebsAfterFight = fight(action.dweebs);
      return {
        ...state,
        ...dweebsAfterFight
      };
    default:
      return {
        ...state
        // ...state.dweebs
      };
  }
}

const middleware = [thunk];

const rootReducer = combineReducers({
  gameState: gameStateReducer,
  message: messageReducer,
  dweebs: dweebReducer
});

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
