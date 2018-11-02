import React, { Component } from 'react';
import Stat from './Stat';

class StatSubsrc extends Component {

  componentWillMount() {
    this.props.checkFilter('subscr');
  }

  render() {
    const { subscribers, subscr } = this.props.projects.stats;

    return (
      <div>
        <Stat
          {...this.props}
          {...this.props.projects}
          data={subscribers || subscr}
          margin={{
            left: 0,
            top: 0,
            bottom: 20,
            right: 0,
          }}
          width={1400}
          height={544}
          tooltipTitle="Subscribers"
          unitType='subscribers'
        />
      </div>
    );
  }

}

export default StatSubsrc;
