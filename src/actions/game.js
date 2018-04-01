export const GAME_STARTED = Symbol('game/GAME_STARTED');
export const GAME_RESET = Symbol('game/GAME_RESET');

export const startGame = () => dispatch => (
  dispatch({
    type: GAME_STARTED
  })
);

export const resetGame = () => dispatch => (
  dispatch({
    type: GAME_RESET
  })
);