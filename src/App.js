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
    this.timer = setInterval(() => this.getQuadTree(), 2000);
  }

  componentWillUnmount = () => {
    this.timer = null;
  }

  getQuadTree = () => {
    fetch('https://ewe1w9vued.execute-api.us-west-2.amazonaws.com/default/quadtree', {
      method: 'post',
      body: JSON.stringify({
        iterations: `${this.state.iterations}`,
        source: 'http://www.pmoadvisory.com/wp-content/uploads/2014/03/happy-holidays-text-png-10.png'
      })
    })
      .then(result => result.json())
      .then(result => this.setState({ 
        doneLoading: true,
        iterations: this.state.iterations < 512 ? this.state.iterations + 4 : 512,
        quadtree: result.quadtree,
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