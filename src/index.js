import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import store from './store';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';


const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
);

registerServiceWorker();
