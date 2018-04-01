import { delay } from 'redux-saga'
import { put, take, all, call, takeEvery } from 'redux-saga/effects'

import { TIME_TICKED, GAME_STARTED } from '../actions/game';
import { APPLE_EATEN } from './gameLoop';

export const APPLE_ADDED = Symbol('apples/ADDED_APPLE');

function* makeApple() {
  console.log('making an apple');
  yield call(delay, 3000);
  yield put({ type: APPLE_ADDED, x: 3, y: 3 });
}

function* appleSaga() {
  yield all([
    takeEvery(APPLE_EATEN, makeApple),
    takeEvery(GAME_STARTED, makeApple)
  ]);
}

export default appleSaga;