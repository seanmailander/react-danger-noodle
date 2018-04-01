import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetGame, startGame } from '../actions/game'
import { changePlayerDirection } from '../actions/player'

import './game.css';

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
const renderBoard = (board, alive) => (
  <div className="board">
    {getBoard(board, alive).map(renderRow)}
  </div>
)


export class GameComponent extends Component {
  componentDidMount() {
      document.addEventListener('keypress', this.props.changePlayerDirection);
  }
  componentDidUnMount() {
      document.removeEventListener('keypress', this.props.changePlayerDirection);
  }
  render() {
    const { changePlayerDirection, board, alive, running, startGame, resetGame, gameTick } = this.props;
    return <div>
      {renderBoard(board, alive)}

      <p>
        {!running ? <button onClick={startGame}>Start game</button> : null}
        {!alive ? <button onClick={resetGame}>Restart game</button> : null}
      </p>
      <p>Count: {gameTick}</p>
      {!alive ? <p>Dead!</p> : null}
    </div>
  }
};

const mapStateToProps = state => ({
  alive: state.game.alive,
  running: state.game.running,
  gameTick: state.game.gameTick,
  board: state.board,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  resetGame,
  startGame,
  changePlayerDirection,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent)