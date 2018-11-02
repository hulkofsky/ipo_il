import React, { Component } from 'react';
import { AxisLeft } from '@vx/axis';

class StatGraphValueScale extends Component {

  valueRender = value => {
    let resValue;

    if(value > 1000 && value < 1000000) {
      resValue = `${Math.floor(value / 1000)}k`;
    } else if(value > 1000000 && value < 1000000000) {
      resValue = `${Math.floor(value / 1000000)}min`;
    } else if(value > 1000000000) {
      resValue = `${Math.floor(value / 1000000000)}mlrd`;
    } else {
      resValue = Math.floor(value);
    }

    return resValue;
  }

  render() {

    const { units } = this.props;
    // let label;
    //
    // if(units) {
    //   label = 'Units Invested';
    // } else {
    //   label = 'Money Invested'
    // }

    return (
      <AxisLeft
        tickValues={this.props.values}
        left={10}
        // label={label}
        // labelOffset={0}
        tickFormat={this.valueRender}
        tickClassName='stat__axis-value'
        strokeWidth={0}
        hideTicks
        tickLabelProps={ val => ({
          fontSize: 14,
          fill: '#8B8B8B',
          fontWeight: 500
        })}
        {...this.props}
      />
    );
  }

}

export default StatGraphValueScale;
