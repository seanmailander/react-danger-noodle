import { GAME_RESET } from '../actions/game';
import { SNAKE_MOVED, APPLE_EATEN } from '../sagas/gameLogic';
import { APPLE_ADDED } from '../sagas/apples';

const removeTailIfNeeded = (snake, intendedLength) => {
  if (snake.length > intendedLength) {
    const newSnake = [].concat(snake);
    newSnake.pop();
    return newSnake;
  }

  return snake;
};

const initialSnakeSize = 5;
const sizeToIncreasePerApple = 4;

const initialState = {
  boardSize: 32,
  snake: [{ x: 15, y: 15 }],
  applesEaten: 0,
  apples: [],
};

const getLength = applesEaten => (applesEaten * sizeToIncreasePerApple) + initialSnakeSize;

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_RESET:
      return initialState;

    case SNAKE_MOVED: {
      const { snake, applesEaten } = state;
      const { x, y } = action;
      const length = getLength(applesEaten);
      const snakeWithNewHead = [{ x, y }, ...snake];
      const snakeWithTailRemovedIfNeeded = removeTailIfNeeded(snakeWithNewHead, length);
      return {
        ...state,
        snake: snakeWithTailRemovedIfNeeded,
      };
    }

    case APPLE_ADDED: {
      const { apples } = state;
      const { x, y } = action;
      return {
        ...state,
        apples: [
          ...apples,
          { x, y },
        ],
      };
    }

    case APPLE_EATEN: {
      const { apples, applesEaten } = state;
      const { x, y } = action;
      return {
        ...state,
        apples: apples.filter(a => !(a.x === x && a.y === y)),
        applesEaten: applesEaten + 1,
      };
    }

    default:
      return state;
  }
};
