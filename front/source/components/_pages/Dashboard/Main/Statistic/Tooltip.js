import React, { Component } from 'react';
import { Tooltip } from '@vx/tooltip';

class TooltipCustom extends Component {

  render() {
    const { left, top, units, unit, value, zIndex = 2, title = 'ILS' } = this.props;

    return (
      <Tooltip
        left={left}
        top={top}
        style={{
          backgroundColor: '#fff',
          color: '#36436B',
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.5,
          padding: '13px',
          boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
          zIndex: zIndex,
        }}
      >
        <div className="stat__point-descr-wrap">
          {units &&
            <div className="stat__point-descr">
              <span className="stat__point-descr-value">
                {units}
              </span>
              <span className="stat__point-descr-unit">
                units
              </span>
            </div>
          }
          <div className="stat__point-descr">
            <span className="stat__point-descr-value">
              {value}
            </span>
            <span className="stat__point-descr-unit">
              {title}
            </span>
          </div>
        </div>
      </Tooltip>
    );
  }

}

export default TooltipCustom;
