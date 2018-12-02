import React, { Component } from 'react';
import './App.css';
// import quadtree from './quadtree.json';
import Tile from './Tile';

export default class App extends Component {

  state = {
    doneLoading: false,
    quadtree: null,
    iterations: 0,
  }
  componentDidMount = () => {
    this.timer = setInterval(() => this.getQuadTree(), 4000);
  }

  componentWillUnmount = () => {
    this.timer = null;
  }

  getQuadTree = () => {
    fetch('https://ewe1w9vued.execute-api.us-west-2.amazonaws.com/default/quadtree', {
      method: 'post',
      body: JSON.stringify({
        iterations: `${this.state.iterations}`,
        source: 'https://static1.squarespace.com/static/50f4828fe4b09bfe914638ba/t/5b5ff80870a6ad7675283e6f/1533016278805/Slalom_Indexs-04.png?format=2500w'
      })
    })
      .then(result => result.json())
      .then(result => this.setState({ 
        doneLoading: true,
        quadtree: result.quadtree,
        iterations: this.state.iterations + 4
      }))
      .catch(err => console.error(err));
  }
  render() {
    const { doneLoading, quadtree } = this.state;
    const photoUrl = `https://loremflickr.com/320/240?random=`;
    console.log(this.state.quadtree);
    return (
      <div className="App">
        { doneLoading && quadtree.map((image, i) => 
          <Tile key={ i } photoUrl={ `${photoUrl}${i}`} {...image} />)}
      </div> 
    );
  }
}