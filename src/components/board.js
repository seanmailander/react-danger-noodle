import React from 'react'

import './board.css';

import { getBoard } from '../helpers/board';
import { TILES } from '../helpers/consts';

const { WALL, EMPTY, SNAKE_BODY, SNAKE_DEAD, SNAKE_HEAD, SNAKE_TAIL, APPLE } = TILES;

const snakeTileToContent = {
  [SNAKE_BODY]: 'b',
  [SNAKE_DEAD]: 'd',
  [SNAKE_HEAD]: 'h',
  [SNAKE_TAIL]: 't',
  [APPLE]: 'a',
}

const renderTile = tile => (
  snakeTileToContent[tile]
);

const mapTileToClass = tile => (
  tile === WALL ? 'wall' : 'empty'
)

const renderCol = ({ tile }, i) => (
  <div className={(`col ${mapTileToClass(tile)}`)} key={i}>
    <div className="tile">{renderTile(tile)}</div>
  </div>
)
const renderRow = (row, i) => (
  <div className="row" key={i}>
    {row.map(renderCol)}
  </div>
)
const BoardComponent = ({ board, alive }) => (
  <div className="board">
    {getBoard(board, alive).map(renderRow)}
  </div>
);

export default BoardComponent;