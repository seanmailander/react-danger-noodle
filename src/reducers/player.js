import { GAME_RESET, GAME_STARTED } from '../actions/game';
import { PLAYER_CHANGED_DIRECTION } from '../actions/player';

import { DIRECTIONS } from '../helpers/consts';

const { NORTH } = DIRECTIONS;

const initialState = {
  direction: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_CHANGED_DIRECTION:
      return {
        ...state,
        direction: action.direction,
      };

    case GAME_STARTED:
      return {
        ...state,
        direction: state.direction || NORTH,
      };

    case GAME_RESET:
      return initialState;

    default:
      return state;
  }
};
