import React, { Component } from 'react';
import Stat from './Stat';

class StatAmount extends Component {

  componentWillMount() {
    this.props.checkFilter('amount');
  }

  render() {
    const { amount } = this.props.projects.stats;

    return (
      <div>
        <Stat
          {...this.props}
          {...this.props.projects}
          data={amount}
          margin={{
            left: 0,
            top: 0,
            bottom: 20,
            right: 0,
          }}
          width={1400}
          height={544}
          gradientColor = '39, 67, 151'
          lineColor = '#36436B'
        />
      </div>
    );
  }

}

export default StatAmount;
