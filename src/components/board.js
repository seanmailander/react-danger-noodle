import React from 'react';

import './board.css';

import { getBoard } from '../helpers/board';
import { TILES } from '../helpers/consts';

const {
  WALL, SNAKE_BODY, SNAKE_DEAD, SNAKE_HEAD, SNAKE_NECK, SNAKE_TAIL, APPLE,
} = TILES;

const snakeTileToContent = {
  [SNAKE_DEAD]: 'd',
  [SNAKE_HEAD]: 's',
  [SNAKE_NECK]: 'n',
  [SNAKE_BODY]: 'e',
  [SNAKE_TAIL]: 'k',
  [APPLE]: 'a',
};

const renderTile = tile => (
  snakeTileToContent[tile]
);

const mapTileToClass = tile => (
  tile === WALL ? 'wall' : 'empty'
);

const renderCol = ({ tile }, i) => (
  <div className={(`col ${mapTileToClass(tile)}`)} key={i}>
    <div className="tile">{renderTile(tile)}</div>
  </div>
);
const renderRow = (row, i) => (
  <div className="row" key={i}>
    {row.map(renderCol)}
  </div>
);
const BoardComponent = ({ board, alive }) => (
  <div className="board">
    {getBoard(board, alive).map(renderRow)}
  </div>
);

export default BoardComponent;
