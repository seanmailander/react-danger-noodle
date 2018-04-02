const EAST = Symbol('east');
const WEST = Symbol('west');
const NORTH = Symbol('north');
const SOUTH = Symbol('south');

export const DIRECTIONS = {
  EAST,
  WEST,
  NORTH,
  SOUTH,
};

const WALL = Symbol('wallTile');
const EMPTY = Symbol('emptyTile');
const SNAKE_DEAD = Symbol('snakeDead');
const SNAKE_HEAD = Symbol('snakeHead');
const SNAKE_BODY = Symbol('snakeBody');
const SNAKE_TAIL = Symbol('snakeTail');
const APPLE = Symbol('apple');

export const TILES = {
  WALL,
  EMPTY,
  SNAKE_DEAD,
  SNAKE_HEAD,
  SNAKE_BODY,
  SNAKE_TAIL,
  APPLE,
};
