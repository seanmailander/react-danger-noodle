export const TIME_TICKED = Symbol('game/TIME_TICKED');
export const GAME_STARTED = Symbol('game/GAME_STARTED');
export const GAME_RESET = Symbol('game/GAME_RESET');

const timerInterval = 1000;

let timer;

export const startGame = () => {
  return dispatch => {
    const tick = () => {
      dispatch({
        type: TIME_TICKED
      });
      timer = setTimeout(tick, timerInterval);
    }

    dispatch({
      type: GAME_STARTED
    });
    timer = setTimeout(tick, timerInterval);
  }
}

export const resetGame = () => {
  return dispatch => {
    clearTimeout(timer);
    dispatch({
      type: GAME_RESET
    });
    dispatch(startGame());
  }
}
