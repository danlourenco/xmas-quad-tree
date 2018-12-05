import React, { Component } from 'react';
import './App.css';
import Tile from './Tile';
import Canvas from './Canvas';

export default class App extends Component {

  state = {
    hasLoaded: false,
    quadtree: null,
    iterations: 512,
    files: [],
    source: {
      height: 0,
      width: 0,
    }
  }
  componentDidMount = () => {
    this.timer = setInterval(() => this.getQuadTree(), 3000);
  }

  componentWillUnmount = () => {
    this.timer = null;
  }

  getQuadTree = () => {
    fetch('https://ewe1w9vued.execute-api.us-west-2.amazonaws.com/default/quadtree', {
      method: 'post',
      body: JSON.stringify({
        iterations: `${this.state.iterations}`,
        source: 'https://i.imgur.com/c1Ya0We.jpg'
      })
    })
      .then(result => result.json())
      .then(result => this.setState({ 
        hasLoaded: true,
        iterations: this.state.iterations < 1024 ? this.state.iterations + 4 : 1024,
        quadtree: result.quadtree,
        files: result.files,
        source: result.source,
      }))
      .catch(err => console.error(err));
  }
  render() {
    const { hasLoaded, quadtree, files, source: { height = 0, width = 0} } = this.state;
    const photoUrl = `https://loremflickr.com/320/240?random=`;
    // console.log(this.state.quadtree);
    return (
      <div className="App">
        { !hasLoaded && <p>loading</p>}
        {/* { doneLoading && quadtree.map((image, i) => 
          <Tile key={ i } photoUrl={ `${photoUrl}${i}`} {...image} />)} */}
          <Canvas 
            height={ height }
            width={ width }
            quadtree={ quadtree }
            files={ files }
            hasLoaded={ hasLoaded }
          />
      </div> 
    );
  }
}