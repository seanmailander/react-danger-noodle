import React from 'react';

import Game from './game'

import './app.css';

const App = () => (
  <div className="app">
    <header>
      Danger Noodle
    </header>

    <main>
      <Game />
    </main>
  </div>
)

export default App;