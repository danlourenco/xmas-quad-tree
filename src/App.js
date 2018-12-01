import React, { Component } from 'react';
import './App.css';
import images from './source';
import Tile from './Tile';

class App extends Component {
  render() {

    return (
      <div className="App">
        { images.map((image, i) => <Tile key={ i } {...image} />)}
      </div>
    );
  }
}

export default App;
