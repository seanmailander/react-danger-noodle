import { DIRECTIONS, TILES } from './consts';

const { EAST, WEST, NORTH, SOUTH } = DIRECTIONS;
const { WALL, EMPTY, SNAKE_BODY, SNAKE_HEAD, SNAKE_TAIL, APPLE } = TILES;


const setTile = (board, x, y, newTile) => {
  board[x][y].tile = newTile;
  return board;
}

const generateCol = (tile) => ({ tile });

const generateRow = (size, defaultTile) => ([...Array(size).keys()].map(c => (
  c === 0 || c === (size - 1) ? generateCol(WALL) : generateCol(defaultTile)))
);

const generateNewBoard = (size) => ([...Array(size).keys()].map(r => (
  r === 0 || r === (size - 1) ? generateRow(size, WALL) : generateRow(size, EMPTY)))
);

const isSnakeHead = (i, snake) => i === 0;
const isSnakeTail = (i, snake) => i === snake.length - 1;

const drawSnake = (board, snake) => snake.reduce(
  (board, { x, y }, i) => setTile(board, x, y, isSnakeHead(i, snake) ? SNAKE_HEAD : isSnakeTail(i, snake) ? SNAKE_TAIL : SNAKE_BODY),
  board
);

const drawApples = (board, apples) => apples.reduce(
  (board, { x, y }, i) => setTile(board, x, y, APPLE),
  board
);

export const getBoard = ({ boardSize, snake, apples }) => (
  drawApples(drawSnake(generateNewBoard(boardSize), snake), apples)
)

export const moveInDirection = ({ x, y }, direction) => (
  {
    x: x + (direction === SOUTH ? 1 : (direction === NORTH ? -1 : 0)),
    y: y + (direction === EAST ? 1 : (direction === WEST ? -1 : 0)),
  }
)

export const isApple = (apples, { x, y }) => apples.some(a => a.x === x && a.y === y);
