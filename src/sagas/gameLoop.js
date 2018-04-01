import { delay, takeLatest } from 'redux-saga';
import { put, call, takeEvery, take, all, race } from 'redux-saga/effects'

import { GAME_STARTED, GAME_RESET } from '../actions/game';
import { SNAKE_DIED } from './gameLogic';

export const TIME_TICKED = Symbol('gameLoop/TIME_TICKED');

const timerInterval = 300;

function* tickTime() {
  yield put({ type: TIME_TICKED });
}

function* gameLoop() {
  const { dead, timer } = yield race({
    dead: take(SNAKE_DIED),
    timer: call(delay, timerInterval)
  })
  if (!dead) {
    yield tickTime();
  }
}

function* gameLoopSaga() {
  yield all([
    takeEvery(TIME_TICKED, gameLoop),
    takeEvery(GAME_STARTED, gameLoop),
    takeEvery(GAME_RESET, gameLoop),
  ]);
}

export default gameLoopSaga;