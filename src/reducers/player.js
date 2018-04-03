import { GAME_RESET } from '../actions/game';
import { PLAYER_CHANGED_DIRECTION } from '../actions/player';

import { DIRECTIONS } from '../helpers/consts';
import { SNAKE_MOVED } from '../sagas/gameLogic';
import { GAME_OVER } from '../sagas/gameLoop';

const { NORTH } = DIRECTIONS;

const initialState = {
  currentDirection: null,
  nextDirection: NORTH,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SNAKE_MOVED:
      return {
        ...state,
        currentDirection: state.nextDirection,
      };

    case PLAYER_CHANGED_DIRECTION:
      return {
        ...state,
        nextDirection: action.direction,
      };

    case GAME_OVER:
      return initialState;

    case GAME_RESET:
      return {
        ...initialState,
        nextDirection: state.nextDirection || NORTH,
      };

    default:
      return state;
  }
};
