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
    this.canvas.height = window.innerWidth / (16/9);
    this.canvas.width = window.innerWidth;
    console.log('setCanvasSize');
  }

  paintTile = tile => {
    const { x, y, width, height, color: { r, g, b } } = tile;
    const image = new Image();

    image.onload = () => {

      var ratio = this.canvas.width / this.props.width

      this.ctx.drawImage(image, Math.round(x * ratio), Math.round(y * ratio), Math.round(width * ratio), Math.round(height * ratio))
      this.ctx.fillStyle = `rgba(${ r },${ g },${ b }, 0.75)`;
      this.ctx.fillRect(Math.round(x * ratio), Math.round(y * ratio), Math.round(width * ratio), Math.round(height * ratio))
    };

    image.src = tile.url + "?crop=faces,center&fit=crop&h=" + tile.height + "&w=" + tile.width

  }

  paint = () => {
    this.props.quadtree.forEach( (tile) => {
      this.paintTile(tile);
    });
  }

  render() {
    const { hasLoaded } = this.props;
    
    if (hasLoaded) {
      this.paint();
    }

    return <canvas ref={ (ref) => ( this.canvas = ref )} />
  }
}