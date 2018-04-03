import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { startGameIfPossible } from '../actions/game';
import { changePlayerDirection } from '../actions/player';

import AnimatedBoard from './animatedBoard';

export class GameComponent extends Component {
  componentDidMount() {
    document.addEventListener('keypress', this.props.changePlayerDirection);
    document.addEventListener('keypress', this.props.startGameIfPossible);
  }
  componentDidUnMount() {
    document.removeEventListener('keypress', this.props.changePlayerDirection);
    document.removeEventListener('keypress', this.props.startGameIfPossible);
  }
  render() {
    const {
      // eslint-disable-next-line no-shadow
      board, alive, running, applesEaten,
    } = this.props;
    return (
      <div>
        <AnimatedBoard board={board} alive={alive} run={running} />

        <p>
          {!running ? "Press any key (W, S, A, D) to start game" : null }
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
  changePlayerDirection,
  startGameIfPossible,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameComponent);
