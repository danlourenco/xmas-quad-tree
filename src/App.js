import React, { Component } from 'react';
import './App.css';
import config from './config';
import Canvas from './Canvas';

export default class App extends Component {

  state = {
    canvasSizeSet: false,
    hasLoaded: false,
    quadtree: null,
    source: {
      height: 0,
      width: 0,
    }
  }
  componentDidMount = () => {
    this.getQuadTree();
    this.timer = setInterval(() => this.getQuadTree(), 5000);
  }

  componentWillUnmount = () => {
    this.timer = null;
  }

  handleSizeSet = () => this.setState({ canvasSizeSet: true });

  getQuadTree = () => {
    fetch(config.quadtreeUrl, {
      method: 'post',
      body: JSON.stringify({
        source: config.sourceUrl
      })
    })
      .then(result => result.json())
      .then(result => this.setState({ 
        hasLoaded: true,
        quadtree: result.quadtree,
        source: result.source,
      }))
      .catch(err => console.error(err));
  }
  render() {
    const { 
      canvasSizeSet,
      hasLoaded, 
      quadtree, 
      source: { 
        height = 0, 
        width = 0
      } 
    } = this.state;
    return (
      <div className="App">
        { !hasLoaded && <p>loading</p>}
          <Canvas 
            canvasSizeSet={ canvasSizeSet }
            hasLoaded={ hasLoaded }
            height={ height }
            width={ width }
            quadtree={ quadtree }
            onSizeSet={ this.handleSizeSet }
          />
      </div> 
    );
  }
}