import React, { Component } from 'react';
import './App.css';
import quadtree from './quadtree.json';
import Tile from './Tile';

class App extends Component {
  render() {

    return (
      <div className="App">
        { quadtree.map((image, i) => <Tile key={ i } {...image} />)}
      </div>
    );
  }
}

export default App;
