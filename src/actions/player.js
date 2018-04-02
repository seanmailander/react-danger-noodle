import { DIRECTIONS } from '../helpers/consts';

const {
  EAST, WEST, NORTH, SOUTH,
} = DIRECTIONS;

export const PLAYER_CHANGED_DIRECTION = Symbol('game/PLAYER_CHANGED_DIRECTION');

const keyToDirectionMap = {
  w: NORTH,
  s: SOUTH,
  a: WEST,
  d: EAST,
};

const checkKeyMatters = key => (Object.prototype.hasOwnProperty.call(keyToDirectionMap, key));
const checkKeyIsNew = (key, state) => state.player.direction !== keyToDirectionMap[key];

export const changePlayerDirection = ({ key }) => (dispatch, getState) => (
  checkKeyMatters(key) && checkKeyIsNew(key, getState()) ?
    dispatch({
      type: PLAYER_CHANGED_DIRECTION,
      direction: keyToDirectionMap[key],
    }) : null
);
