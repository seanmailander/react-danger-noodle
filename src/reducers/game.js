import { GAME_RESET } from '../actions/game';
import { GAME_OVER } from '../sagas/gameLoop';
import { SNAKE_DIED } from '../sagas/gameLogic';

const initialState = {
  alive: false,
  running: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SNAKE_DIED:
      return {
        ...state,
        alive: false,
      };

    case GAME_OVER:
      return {
        ...state,
        running: false,
      };

    case GAME_RESET:
      return {
        ...initialState,
        alive: true,
        running: true,
      };

    default:
      return state;
  }
};
