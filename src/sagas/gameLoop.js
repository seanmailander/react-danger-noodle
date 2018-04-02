import { delay } from 'redux-saga';
import { put, call, takeEvery, take, all, race } from 'redux-saga/effects';

import { GAME_STARTED, GAME_RESET } from '../actions/game';
import { SNAKE_DIED } from './gameLogic';
// import { PLAYER_CHANGED_DIRECTION } from '../actions/player';

export const TIME_TICKED = Symbol('gameLoop/TIME_TICKED');
export const GAME_OVER = Symbol('gameLoop/GAME_OVER');

const timerInterval = 100;

function* tickTime() {
  yield put({ type: TIME_TICKED });
}
function* gameOver() {
  yield put({ type: GAME_OVER });
}

function* delayGameOver() {
  yield call(delay, 20);
  yield gameOver();
}

function* gameLoop() {
  const { dead } = yield race({
    dead: take(SNAKE_DIED),
    // move: take(PLAYER_CHANGED_DIRECTION), todo
    timer: call(delay, timerInterval),
  });
  if (!dead) {
    yield tickTime();
  }
}

function* gameLoopSaga() {
  yield all([
    takeEvery(TIME_TICKED, gameLoop),
    takeEvery(GAME_STARTED, gameLoop),
    takeEvery(GAME_RESET, gameLoop),
    takeEvery(SNAKE_DIED, delayGameOver),
  ]);
}

export default gameLoopSaga;
