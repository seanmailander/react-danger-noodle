import { GAME_RESET } from '../actions/game';
import { PLAYER_CHANGED_DIRECTION } from '../actions/player';

import { DIRECTIONS } from '../helpers/consts';
import { SNAKE_MOVED } from '../sagas/gameLogic';

const { NORTH } = DIRECTIONS;

const initialState = {
  directions: [NORTH],
  direction: NORTH,
};

const removeDirectionIfNeeded = directions => (
  directions.slice(directions.length === 1 ? 0 : 1)
);

const addDirectionIfNeeded = (directions, newDirection) => (
  [...directions].concat(directions[directions.length - 1] === newDirection ? [] : newDirection)
);

export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_CHANGED_DIRECTION:
      return {
        ...state,
        directions: addDirectionIfNeeded(state.directions, action.direction),
        direction: action.direction,
      };

    case SNAKE_MOVED: {
      return {
        ...state,
        directions: removeDirectionIfNeeded(state.directions),
      };
    }

    case GAME_RESET:
      return initialState;

    default:
      return state;
  }
};
