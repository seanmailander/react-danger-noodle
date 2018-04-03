export const GAME_RESET = Symbol('game/GAME_RESET');
export const TIME_TICKED = Symbol('game/TIME_TICKED');

const startGame = () => dispatch => (
  dispatch({
    type: GAME_RESET,
  })
);

const checkKeyMatters = key => ["w", "s", "a", "d", "r"].some(k => k === key);

export const startGameIfPossible = ({ key }) => (dispatch, getState) => (
  checkKeyMatters(key) && !getState().game.running ? dispatch(startGame()) : null
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
