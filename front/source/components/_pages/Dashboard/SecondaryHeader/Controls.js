import React, { Component } from 'react';
import { changeFilter } from '../../../../redux/actions/headerActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from '../partials/ControlsSelect';

class Controls extends Component {

  render() {
    const { changeFilter, selectsValues } = this.props;

    const selects = [
      {
        title: 'Field',
        id: 'field',
        options: [
          {
            value: 'all',
            text: 'All',
          },
          {
            value: 'some',
            text: 'Some',
          },
        ],
      },
      {
        title: 'Money',
        id: 'money',
        options: [
          {
            value: 'all',
            text: 'All',
          },
          {
            value: 'some',
            text: 'Some',
          },
        ]
      },
      {
        title: 'Time',
        id: 'time',
        options: [
          {
            value: 'all',
            text: 'All',
          },
          {
            value: 'some',
            text: 'Some',
          },
        ]
      },
    ];

    return (
      <div className="secondary-header__controls">
        {selects.map( select => {
          return (
            <div className="secondary-header__filter" key={select.id}>
              <span className="secondary-header__filter-title">
                {select.title}
              </span>
              <div className="secondary-header__select">
                <Select
                  select={select}
                  changeHandler={changeFilter}
                  selectsValues={selectsValues}
                />
              </div>
            </div>
          )
        })}
      </div>
    );
  }

}

export default withRouter(
  connect(
    state => ({
      selectsValues: state.header.filters,
    }),
    { changeFilter }
)(Controls));
