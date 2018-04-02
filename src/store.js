import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/rootReducer';
import gameLoopSaga from './sagas/gameLoop';
import gameLogicSaga from './sagas/gameLogic';
import appleSaga from './sagas/apples';


// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  logger,
  sagaMiddleware,
];

let selectedComposer = compose;

if (process.env.NODE_ENV === 'development') {
  selectedComposer = composeWithDevTools;
}

const composedEnhancers = selectedComposer(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

// then run the saga
sagaMiddleware.run(gameLoopSaga);
sagaMiddleware.run(gameLogicSaga);
sagaMiddleware.run(appleSaga);

export default store;
