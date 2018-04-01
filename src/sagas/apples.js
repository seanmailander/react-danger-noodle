import { delay } from 'redux-saga'
import { put, take, all, call, takeEvery, race } from 'redux-saga/effects'

import { GAME_STARTED, GAME_RESET } from '../actions/game';
import { APPLE_EATEN, SNAKE_DIED } from './gameLogic';

export const APPLE_ADDED = Symbol('apples/ADDED_APPLE');

const timeToNextApple = 3000;

function* addApple({ x, y }) {
  yield put({ type: APPLE_ADDED, x, y });
}

function* makeApple() {
  const { dead, timer } = yield race({
    dead: take(SNAKE_DIED),
    timer: call(delay, timeToNextApple)
  })
  if (!dead) {
    yield addApple({ x: 3, y: 3 })
  }
}

function* appleSaga() {
  yield all([
    takeEvery(APPLE_EATEN, makeApple),
    takeEvery(GAME_STARTED, makeApple),
    takeEvery(GAME_RESET, makeApple),
  ]);
}

export default appleSaga;