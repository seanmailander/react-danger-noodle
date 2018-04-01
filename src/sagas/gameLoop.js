import { put, takeLatest, select } from 'redux-saga/effects'

import { TIME_TICKED } from '../actions/game';

import { findSnakeHead, moveInDirection, isApple } from '../helpers/board';

export const GAME_LOOP_SUCEEDED = Symbol('gameLoop/GAME_LOOP_SUCEEDED');
export const GAME_LOOP_FAILED = Symbol('gameLoop/GAME_LOOP_FAILED');

export const SNAKE_MOVED = Symbol('gameLoop/PLAYER_MOVED');
export const APPLE_EATEN = Symbol('gameLoop/APPLE_EATEN');

function* movePlayer() {
  const { board, playerDirection} = yield select(state => ({
    board: state.board,
    playerDirection: state.player.direction
  }));
  const { snake, apples } = board;
  const snakeHead = snake[0];
  const { x, y } = moveInDirection(snakeHead, playerDirection);
  
  const didEatApple = isApple(apples, { x, y });

  yield put({ type: SNAKE_MOVED, x, y, length: snake.length + (didEatApple ? 1 : 0) });
}

function checkWallCollision() {
  console.log('checking wall collision');
}

function checkAppleChomp() {
  console.log('checking apple chomp');
}

function* gameLoop() {
   try {
      yield movePlayer();
      yield checkWallCollision();
      yield checkAppleChomp();

      yield put({type: GAME_LOOP_SUCEEDED});
   } catch (e) {
      yield put({type: GAME_LOOP_FAILED, error: e});
   }
}

function* gameLoopSaga() {
  // Discard existing, taking latest
  yield takeLatest(TIME_TICKED, gameLoop);
}

export default gameLoopSaga;