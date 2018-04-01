import { TIME_TICKED, GAME_RESET } from '../actions/game';

const initialState = {
  gameTick: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TIME_TICKED:
      return {
        ...state,
        gameTick: state.gameTick + 1
      }

    case GAME_RESET:
      return initialState;

    default:
      return state
  }
}
