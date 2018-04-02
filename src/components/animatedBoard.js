import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Animator from './animator';
import BoardComponent from './board';

import { tickTime as userUpdate } from '../actions/game';

const TIMESTEP = 1000 / 60;
const MAX_FPS = 60;

const animate = new Animator(TIMESTEP, MAX_FPS);

const mapDispatchToProps = dispatch => bindActionCreators({
  userUpdate,
}, dispatch);

export default connect(null, mapDispatchToProps)(animate(BoardComponent));
