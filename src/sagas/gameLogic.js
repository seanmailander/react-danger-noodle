import { put, takeLatest, select } from 'redux-saga/effects'

import { moveInDirection, isApple } from '../helpers/board';
import { TIME_TICKED } from './gameLoop';

export const SNAKE_MOVED = Symbol('gameLoop/PLAYER_MOVED');
export const APPLE_EATEN = Symbol('gameLoop/APPLE_EATEN');
export const SNAKE_DIED = Symbol('gameLoop/SNAKE_DIED');

function* killSnake({ x, y }) {
  yield put({ type: SNAKE_DIED, x, y });
}

function* eatApple({ x, y }) {
  yield put({ type: APPLE_EATEN, x, y });
}

function* moveSnake({ x, y, length }) {
  yield put({ type: SNAKE_MOVED, x, y, length });
}

function* getCurrentSnake() {
  const { snake } = yield select(state => ({
    snake: state.board.snake,
  }));
  const snakeHead = snake[0];
  return {
    currentLocation: snakeHead,
  }
}

function* movePlayer() {
  const { snake, playerDirection } = yield select(state => ({
    snake: state.board.snake,
    // playerDirection: state.player.directions[0]
    playerDirection: state.player.direction
  }));
  const snakeHead = snake[0];
  return moveInDirection(snakeHead, playerDirection)
}

function* checkWallCollision({ x, y }) {
  const { boardSize } = yield select(state => ({
    boardSize: state.board.boardSize,
  }));
  const boardLimit = boardSize - 1;
  return x === 0 || x === boardLimit || y === 0 || y === boardLimit;
}

function* checkAppleChomp({ x, y }) {
  const { apples } = yield select(state => ({
    apples: state.board.apples,
  }));
  return isApple(apples, { x, y });
}

function* gameLogic() {
  const { currentLocation } = yield getCurrentSnake();
  const newLocation = yield movePlayer();
  const didCollide = yield checkWallCollision(newLocation);
  const didEatApple = yield checkAppleChomp(newLocation);

  if (didCollide) {
    yield killSnake(currentLocation);
  } else {
    if (didEatApple) {
      yield eatApple(newLocation);
    }

    yield moveSnake({ ...newLocation });
  }
}

function* gameLogicSaga() {
  // Discard existing, taking latest
  yield takeLatest(TIME_TICKED, gameLogic);
}

export default gameLogicSaga;