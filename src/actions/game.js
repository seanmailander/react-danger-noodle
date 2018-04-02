export const GAME_STARTED = Symbol('game/GAME_STARTED');
export const GAME_RESET = Symbol('game/GAME_RESET');
export const TIME_TICKED = Symbol('game/TIME_TICKED');

export const startGame = () => dispatch => (
  dispatch({
    type: GAME_STARTED,
  })
);

export const resetGame = () => dispatch => (
  dispatch({
    type: GAME_RESET,
  })
);

const minimumToTick = 100;
let timePassed = 0;

// eslint-disable-next-line no-return-assign
export const tickTime = delta => dispatch => (
  (timePassed + delta > minimumToTick) ?
    dispatch({
      type: TIME_TICKED,
    }) && (timePassed = 0) : (timePassed += delta)
);
