import React, { Component } from 'react';
import Stat from './Stat';

class StatUnit extends Component {

  render() {
    const { currentUnitValue } = this.props;

    return (
      <div>
        <div className="stat__unit-header">
          <div className="stat__unit-header-title">
            Units Invested
          </div>
          <div className="stat__unit-items-header stat__unit-items">
            <div className="stat__unit-item">
              1 UNIT = 10 ILS
            </div>
            <div className="stat__unit-item">
              1 UNIT = {currentUnitValue} ILS
            </div>
            <div className="stat__unit-item">
              1 UNIT = 20 ILS
            </div>
          </div>
        </div>
        <Stat
          margin={{
            left: 0,
            top: 0,
            bottom: 20,
            right: 0,
          }}
          width={1400}
          height={544}
          units
          unitType='units'
          {...this.props}
        />
        <div className="stat__unit-footer">
          <div className="stat__unit-items-footer stat__unit-items">
            <div className="stat__unit-item">
              -        Unit price on purchased date
            </div>
            <div className="stat__unit-item">
              -        Unit price on selected date
            </div>
            <div className="stat__unit-item">
              -        Unit price on current date
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default StatUnit;
