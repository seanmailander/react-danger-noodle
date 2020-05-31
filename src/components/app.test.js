import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import App from './app';

import { DIRECTIONS } from '../helpers/consts';

const { NORTH } = DIRECTIONS;

const mockStore = configureStore([]);

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      board: {
        boardSize: 32,
        snake: [{ x: 15, y: 15 }],
        applesEaten: 0,
        apples: [],
      },
      game: {
        alive: false,
        running: false,
      },
      player: {
        currentDirection: null,
        nextDirection: NORTH,
      },
    });

    component = renderer.create(<Provider store={store}>
      <App />
    </Provider>);
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
