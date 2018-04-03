import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resetGame, startGame } from '../actions/game';
import { changePlayerDirection } from '../actions/player';

import AnimatedBoard from './animatedBoard';

export class GameComponent extends Component {
  componentDidMount() {
    document.addEventListener('keypress', this.props.changePlayerDirection);
  }
  componentDidUnMount() {
    document.removeEventListener('keypress', this.props.changePlayerDirection);
  }
  render() {
    const {
      // eslint-disable-next-line no-shadow
      board, alive, running, startGame, resetGame, applesEaten,
    } = this.props;
    return (
      <div>
        <AnimatedBoard board={board} alive={alive} run={running} />

        <p>
          {alive && !running ? <button onClick={startGame}>Start game</button> : null}
          {!alive ? <button onClick={resetGame}>Restart game</button> : null}
        </p>
        <p>Score: {applesEaten}</p>
        {!alive ? <p>Dead!</p> : null}
      </div>);
  }
}

const mapStateToProps = state => ({
  alive: state.game.alive,
  running: state.game.running,
  applesEaten: state.board.applesEaten,
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  resetGame,
  startGame,
  changePlayerDirection,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComponent);
