import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeStatFilter } from '../../../../redux/actions/projectsActions';

class StaticticControls extends Component {

  selectChangeHandler = e => {
    this.props.changeStatFilter(e.target.value);
  }

  render() {
    const { maxDateRange, statFilter, ranges } = this.props.dateRanges;
    let validOptions;

    if(maxDateRange === -1) {
      return null;
    }

    if(maxDateRange || maxDateRange === 0) {
      validOptions = ranges.slice(0, maxDateRange + 2);
    }


    return (
      <div className="select__wrap stat__select-wrap">

        { validOptions && validOptions.length &&  (
          <React.Fragment>
            <span className="stat__select-title">
              Time
            </span>
            <select
              value={statFilter}
              onChange={this.selectChangeHandler}
              name="stat-control"
              className="select"
              >
                {validOptions.map( rangeObj => {
                  return <option value={rangeObj.name} key={rangeObj.name}>{rangeObj.optionTitle}</option>
                })}
              </select>
          </React.Fragment>
          )
        }
      </div>
    );
  }

}

export default connect(
  state => {
    return {
      dateRanges: state.projects.dateRanges
    }
  }, { changeStatFilter }
)(StaticticControls);
