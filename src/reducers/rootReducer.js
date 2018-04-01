import { combineReducers } from 'redux'

import game from './game';
import board from './board';
import player from './player';

export default combineReducers({
  game,
  board,
  player,
})