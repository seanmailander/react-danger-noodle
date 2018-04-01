import { delay } from 'redux-saga'
import { put, take, all, call, takeEvery, race, select } from 'redux-saga/effects'

import { GAME_STARTED, GAME_RESET } from '../actions/game';
import { APPLE_EATEN, SNAKE_DIED } from './gameLogic';

export const APPLE_ADDED = Symbol('apples/ADDED_APPLE');

const timeToNextApple = 1000;

function* addApple({ x, y }) {
  yield put({ type: APPLE_ADDED, x, y });
}

function* getApplePositionWhitelist() {
  const { snake, boardSize } = yield select(state => ({
    boardSize: state.board.boardSize,
    snake: state.board.snake,
  }));

  const validSpots = [];
  const iterator = [...Array(boardSize - 2).keys()];
  iterator.forEach(r => {
    iterator.forEach(c => {
      const newSpot = { x: r + 1, y: c + 1 };
      if (!snake.some(s => s.x === newSpot.x && s.y === newSpot.y)) {
        validSpots.push(newSpot);
      }
    });
  });
  return validSpots;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function* getRandomApplePosition() {
  const applePositionWhitelist = yield getApplePositionWhitelist();
  const selectedPosition = getRandomInt(applePositionWhitelist.length - 1);
  return applePositionWhitelist[selectedPosition]
}

function* makeApple() {
  const { dead, timer } = yield race({
    dead: take(SNAKE_DIED),
    timer: call(delay, timeToNextApple)
  })
  if (!dead) {
    const randomApplePosition = yield getRandomApplePosition();
    yield addApple(randomApplePosition);
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