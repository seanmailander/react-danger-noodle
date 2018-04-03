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

const directionToReverseMap = {
  [SOUTH]: NORTH,
  [NORTH]: SOUTH,
  [EAST]: WEST,
  [WEST]: EAST,
};

const checkKeyMatters = key => (Object.prototype.hasOwnProperty.call(keyToDirectionMap, key));
const checkKeyIsNotReverse = (key, state) => state.player.direction !== directionToReverseMap[keyToDirectionMap[key]];
const checkKeyIsNew = (key, state) => state.player.direction !== keyToDirectionMap[key];

export const changePlayerDirection = ({ key }) => (dispatch, getState) => (
  checkKeyMatters(key) && checkKeyIsNew(key, getState()) && checkKeyIsNotReverse(key, getState()) ?
    dispatch({
      type: PLAYER_CHANGED_DIRECTION,
      direction: keyToDirectionMap[key],
    }) : null
);
