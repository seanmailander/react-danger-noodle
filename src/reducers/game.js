import { GAME_RESET } from '../actions/game';
import { TIME_TICKED } from '../sagas/gameLoop';
import { SNAKE_DIED } from '../sagas/gameLogic';

const initialState = {
  gameTick: 0,
  alive: true,
}

export default (state = initialState, action) => {
  switch (action.type) {
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
      return initialState;

    default:
      return state
  }
}
