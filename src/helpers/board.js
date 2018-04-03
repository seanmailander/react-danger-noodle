import { DIRECTIONS, TILES } from './consts';

const {
  EAST, WEST, NORTH, SOUTH,
} = DIRECTIONS;
const {
  WALL, EMPTY, SNAKE_BODY, SNAKE_DEAD, SNAKE_HEAD, SNAKE_NECK, SNAKE_TAIL, APPLE,
} = TILES;


const setTile = (board, x, y, newTile) => {
  // eslint-disable-next-line
  board[x][y].tile = newTile;
  return board;
};

const generateCol = tile => ({ tile });

const generateRow = (size, defaultTile) => ([...Array(size).keys()].map(c => (
  c === 0 || c === (size - 1) ? generateCol(WALL) : generateCol(defaultTile)))
);

const generateNewBoard = size => ([...Array(size).keys()].map(r => (
  r === 0 || r === (size - 1) ? generateRow(size, WALL) : generateRow(size, EMPTY)))
);

/* eslint-disable */
const aliveSnakePositions = [ SNAKE_HEAD, SNAKE_NECK, SNAKE_BODY, SNAKE_TAIL ];
const deadSnakePositions = [ SNAKE_DEAD, SNAKE_BODY, SNAKE_DEAD ].concat(...aliveSnakePositions);

const getSnek = (currentPosition, alive, totalLength) => (
  alive ? aliveSnakePositions[currentPosition % aliveSnakePositions.length] :
  deadSnakePositions[currentPosition % deadSnakePositions.length] 
)
/* eslint-enable */


const drawSnake = (startingBoard, snake, alive) => snake.reduce(
  (board, { x, y }, i) => setTile(
    board, x, y,
    getSnek(i, alive, snake.length),
  ),
  startingBoard,
);

const drawApples = (startingBoard, apples) => apples.reduce(
  (board, { x, y }) => setTile(board, x, y, APPLE),
  startingBoard,
);

export const getBoard = ({ boardSize, snake, apples }, alive) => (
  drawApples(drawSnake(generateNewBoard(boardSize), snake, alive), apples)
);

export const moveInDirection = ({ x, y }, direction) => (
  {
    x: x + (direction === SOUTH ? 1 : (direction === NORTH ? -1 : 0)),
    y: y + (direction === EAST ? 1 : (direction === WEST ? -1 : 0)),
  }
);

export const isApple = (apples, { x, y }) => apples.some(a => a.x === x && a.y === y);
