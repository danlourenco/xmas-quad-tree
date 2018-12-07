import React, { Component } from 'react';
import { randomArrayItem } from './utils';

export default class Canvas extends Component {

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
  }

  componentWillReceiveProps({ height, width, canvasSizeSet }) {
    if (canvasSizeSet === false) {
      this.setCanvasSize(height, width);
      this.props.onSizeSet();
    }
  }

  setCanvasSize = (height, width) => {
    this.canvas.height = height;
    this.canvas.width = width;
    console.log('setCanvasSize');
  }

  paintTile = tile => {
    const { x, y, width, height, color: { r, g, b } } = tile;
    const image = new Image();

    image.onload = () => {
      this.ctx.drawImage(image, x, y, width, height)
      this.ctx.fillStyle = `rgba(${ r },${ g },${ b }, 0.75)`;
      this.ctx.fillRect(x, y, width, height)
    };

    image.src = this.getRandomImage();
  }

  paint = () => {
    this.props.quadtree.forEach( (tile) => {
      this.paintTile(tile);
    });
  }

  getRandomImage = () => {
    const { files } = this.props;
    return randomArrayItem(files)['url'];
  }

  render() {
    const { hasLoaded } = this.props;
    
    if (hasLoaded) {
      this.paint();
    } 

    return <canvas ref={ (ref) => ( this.canvas = ref )} />
  }
}