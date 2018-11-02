import React, { Component } from "react";
import { InputGroup, InputGroupAddon } from "reactstrap";
import Datetime from "react-datetime";

class DatePickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(Date.parse(this.props.value))
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      date: new Date(Date.parse(nextProps.value))
	});
  }

  render() {
    return (
      <InputGroup className="modal-input">
        <InputGroupAddon addonType="prepend">{this.props.item}</InputGroupAddon>
        <Datetime
          value={this.state.date}
          onChange={e => this.props.handleChange(e, this.props.item)}
        />
      </InputGroup>
    );
  }
}

export default DatePickerComponent;
