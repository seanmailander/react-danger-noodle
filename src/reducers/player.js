import { GAME_RESET } from '../actions/game';
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

    case GAME_RESET:
      return {
        ...initialState,
        direction: state.direction || NORTH,
      };

    default:
      return state;
  }
};
