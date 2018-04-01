import { DIRECTIONS } from '../helpers/consts';

const { EAST, WEST, NORTH, SOUTH } = DIRECTIONS;

export const PLAYER_CHANGED_DIRECTION = Symbol('game/PLAYER_CHANGED_DIRECTION');

const keyToDirectionMap = {
  'w': NORTH,
  's': SOUTH,
  'a': WEST,
  'd': EAST,
}

const checkKeyMatters = (key) => (keyToDirectionMap.hasOwnProperty(key));

export const changePlayerDirection = ({ key }) => dispatch => (
  checkKeyMatters(key) ? 
    dispatch({
      type: PLAYER_CHANGED_DIRECTION,
      direction: keyToDirectionMap[key],
    }) : null
);
