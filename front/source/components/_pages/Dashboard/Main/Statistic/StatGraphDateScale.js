import React, { Component } from 'react';
import { AxisBottom } from '@vx/axis';

class StatGraphDateScale extends Component {

  parseDateToString = date => {
    // debugger
    // const { values } = this.props;
    const { ranges, statFilter } = this.props.dateRanges;
    let resDate;

    switch(statFilter) {
      case ranges[0].name: {
        weekParse();
        break;
      }

      default: {
        resDate = date.toLocaleDateString();
      }
    }
// console.warn(this.props.values);
    return resDate;

    function weekParse() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      resDate = days[ date.getDay() ];
    }
  }

  render() {
    return (
      <AxisBottom
        tickValues={this.props.values}
        tickFormat={this.parseDateToString}
        top={520}
        left={-30}
        tickClassName='stat__axis-value'
        strokeWidth={0}
        hideTicks
        tickLabelProps={ val => ({
          fontSize: 14,
          fill: '#8B8B8B',
          fontWeight: 500,
        })}
        {...this.props}
      />
    );
  }

}

export default StatGraphDateScale;
