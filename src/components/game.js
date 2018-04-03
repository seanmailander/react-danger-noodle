import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resetGame, startGame } from '../actions/game';
import { changePlayerDirection } from '../actions/player';

import AnimatedBoard from './animatedBoard';

export class GameComponent extends Component {
  componentDidMount() {
    document.addEventListener('keypress', this.props.changePlayerDirection);
    document.addEventListener('keypress', this.props.startGame);
  }
  componentDidUnMount() {
    document.removeEventListener('keypress', this.props.changePlayerDirection);
    document.removeEventListener('keypress', this.props.startGame);
  }
  render() {
    const {
      // eslint-disable-next-line no-shadow
      board, alive, running, resetGame, applesEaten,
    } = this.props;
    return (
      <div>
        <AnimatedBoard board={board} alive={alive} run={running} />

        <p>
          {!running ? "Press any key (W, S, A, D) to start game" : null }
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
