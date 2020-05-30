import { delay } from 'redux-saga/effects';
import { put, call, takeEvery, all } from 'redux-saga/effects';

import { SNAKE_DIED } from './gameLogic';
// import { PLAYER_CHANGED_DIRECTION } from '../actions/player';

export const GAME_OVER = Symbol('gameLoop/GAME_OVER');

function* gameOver() {
  yield put({ type: GAME_OVER });
}

function* delayGameOver() {
  yield call(delay, 20);
  yield gameOver();
}

function* gameLoopSaga() {
  yield all([
    takeEvery(SNAKE_DIED, delayGameOver),
  ]);
}

export default gameLoopSaga;
