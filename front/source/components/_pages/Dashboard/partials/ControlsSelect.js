import React, { Component } from 'react';

class Select extends Component {

  changeHandler = e => {
    const { value, name } = e.target;
    this.props.changeHandler({value, name});
  }

  render() {
    const { select, selectsValues } = this.props;
    const selectId = select.id;

    return (
      <div className="select__wrap">
        <select
          className="select"
          onChange={this.changeHandler}
          value={selectsValues[selectId]}
          name={selectId}
          >
            {select.options.map( option => {
              return (
                <option value={option.value} key={option.text + option.value}>
                  {option.text}
                </option>
              )
            })}
          </select>
      </div>
    );
  }

}

export default Select;
