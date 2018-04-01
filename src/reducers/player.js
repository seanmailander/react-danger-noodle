import { GAME_RESET } from '../actions/game';
import { PLAYER_CHANGED_DIRECTION } from '../actions/player';

import { DIRECTIONS } from '../helpers/consts';

const { EAST, WEST, NORTH, SOUTH } = DIRECTIONS;

const initialState = {
  direction: NORTH,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_CHANGED_DIRECTION:
      return {
        ...state,
        direction: action.direction,
      }

    case GAME_RESET:
      return initialState;

    default:
      return state
  }
}
