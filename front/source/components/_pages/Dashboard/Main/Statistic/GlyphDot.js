import React, { Component } from 'react';
import { GlyphDot } from '@vx/glyph';

class GlyphDotCustom extends Component {

  render() {
    const { left, top, stroke = '#36436B', fill = '#fff' } = this.props;

    return (
      <GlyphDot
        cx={left}
        cy={top}
        r={12}
        fill={fill}
        stroke={stroke}
        strokeWidth={5}
      />
    );
  }

}

export default GlyphDotCustom;
