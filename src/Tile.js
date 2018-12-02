import React, { Component } from 'react';
import PropTypes from 'prop-types';
import photo from './pexels-photo-109919.jpeg';
export default class Tile extends Component {
  static propTypes = {
    color: PropTypes.shape({
      r: PropTypes.number,
      g: PropTypes.number,
      b: PropTypes.number,
    }),
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  state = {
    scale: 1,
  };

  render() {
    const { color: { r, g, b }, height, width, x, y, photoUrl } = this.props;
    const { scale } = this.state;

    // const photo = getRandomImage();
    const tileStyle = {
      border: `1px solid black`,
      background: `url(${photoUrl})`,
      backgroundColor: `rgba(${ r }, ${ g }, ${ b }, ${ 1 })`,
      backgroundSize: `cover`,
      position: 'absolute',
      height: `${ height * scale }%`,
      width: `${ width * scale }%`,
      top: `${ y * scale }%`,
      left: `${ x * scale }%`,
      backgroundBlendMode: `screen`
    };

    return (
      <div style={ tileStyle }></div>
    );
  }
}
