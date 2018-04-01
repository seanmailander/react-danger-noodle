import { GAME_RESET, GAME_STARTED } from '../actions/game';
import { TIME_TICKED } from '../sagas/gameLoop';
import { SNAKE_DIED } from '../sagas/gameLogic';

const initialState = {
  gameTick: 0,
  alive: true,
  running: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_STARTED:
      return {
        ...state,
        running: true
      }

    case TIME_TICKED:
      return {
        ...state,
        gameTick: state.gameTick + 1
      }

    case SNAKE_DIED:
      return {
        ...state,
        alive: false
      }

    case GAME_RESET:
      return {
        ...initialState,
        running: true
      };

    default:
      return state
  }
}
