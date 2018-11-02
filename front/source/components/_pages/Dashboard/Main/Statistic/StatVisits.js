import React, { Component } from 'react';
import Stat from './Stat';

class StatVisits extends Component {

  componentWillMount() {
    this.props.checkFilter('visits');
  }

  render() {
    const { visits } = this.props.projects.stats;

    return (
      <div>
        <Stat
          {...this.props}
          {...this.props.projects}
          data={visits}
          margin={{
            left: 0,
            top: 0,
            bottom: 20,
            right: 0,
          }}
          width={1400}
          height={544}
          tooltipTitle='Visits'
          unitType='visitors'
        />
      </div>
    );
  }

}

export default StatVisits;
