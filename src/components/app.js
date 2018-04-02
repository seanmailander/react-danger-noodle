import React from 'react';

import Game from './game';
import ForkMe from './fork-me';

import './app.css';

const App = () => (
  <div className="app">
    <header>
      Danger Noodle
      <ForkMe />
    </header>

    <main>
      <Game />
    </main>
  </div>
);

export default App;
