import React, { Component } from 'react';

export default class Canvas extends Component {
  state = {
    width: null,
    height: null,
  }

  componentDidMount() {
    this.canvas.width = 3072;
    this.canvas.height = 2301;
    this.ctx = this.canvas.getContext('2d');
  }

  static getDerivedStateFromProps(props, state) {
    if (props.width !== state.width 
      || props.height !== state.height
      ) {
      return {
          width: props.width,
          height: props.height,
      }
    }

    return null;
  }

  paint = () => {
    this.props.quadtree.forEach( (item, index) => {
      console.log(item);
      const { x, y, width, height, color: { r, g, b } } = item;
      const image = new Image();
      image.onload = () => {
        this.ctx.drawImage(image, x, y, width, height)
        this.ctx.fillStyle = `rgba(${ r },${ g },${ b }, 0.75)`;
        this.ctx.fillRect(item.x, item.y, item.width, item.height)
      };

      image.src = this.getRandomImage();
      console.log(image.src);
    });
  }

  getRandomImage = () => {
    const { files } = this.props;
    return files[Math.floor(Math.random()*files.length)]['url'];
  }
  render() {
    const { hasLoaded } = this.props;
    
    if (hasLoaded) {
      this.paint();
    } 
    return (
      <div style={{ display: 'flex', width: '50%%', height: '50%'}}>
        <canvas 
          ref={ (ref) => ( this.canvas = ref )}
        />
      </div>
    )
  }
}