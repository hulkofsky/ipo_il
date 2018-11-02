import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  InputGroupAddon,
  CustomInput
} from "reactstrap";
import DatePicker from "../../datePicker";

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.emptyData = {
      enterpreneur_id: "",
      project_name: "",
      project_field: "",
      money_to_collect: "",
      money_collected: "",
      project_start_date: new Date().toISOString(),
      project_finish_date: new Date().toISOString(),
      video_url: "",
      project_description: "",
      tashkif_file: "",
      project_files: [],
      project_team: [],
      articles: [],
      status_id: "",
      project_type: "a",
      unit_name1: "",
      unit_name2: "",
      unit_name3: "",
      min_unit_price1: "",
      max_unit_price1: "",
      min_units1: "",
      min_unit_price2: "",
      max_unit_price2: "",
      min_units2: "",
      min_unit_price3: "",
      max_unit_price3: "",
      min_units3: "",
      is_talking_about_us: false,
      learn_more: false
    };
    this.reset = this.reset.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: !nextProps.data ? this.emptyData : nextProps.data
    });
  }

  handleChange(e, item) {
    const { target } = e;
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [item]: target.value
      }
    }));
  }

  handleChangeDate(date, item) {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [item]: date.toISOString()
      }
    }));
  }

  handleToggle(item, value) {
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [item]: !value
      }
    }));
  }

  handlerChangeFile = event => {
    const { files } = event.target;
    const file = files[0];

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        tashkif_file: file
      }
    }));
  };

  getInputs() {
    let output = [],
      i = 1;
    for (let item in this.state.data) {
      if (item !== "id" && item !== "password" && item !== "signin_token") {
        if (typeof this.state.data[item] === "boolean") {
          output.push(
            <InputGroup className="modal-input" key={i}>
              <CustomInput
                type="checkbox"
                id={item + "form"}
                label={item}
                onChange={() => {
                  this.handleToggle(item, this.state.data[item]);
                }}
                checked={this.state.data[item]}
              />
            </InputGroup>
          );
        } else if (
          item === "project_start_date" ||
          item === "project_finish_date"
        ) {
          output.push(
            <DatePicker
              key={i}
              item={item}
              handleChange={this.handleChangeDate}
              value={this.state.data[item]}
            />
          );
        } else if (item === "tashkif_file") {
          output.push(
            <InputGroup className="modal-input" key={i}>
              <InputGroupAddon addonType="prepend">{item}</InputGroupAddon>
              <CustomInput type="file" onChange={this.handlerChangeFile} />
            </InputGroup>
          );
        } else if (
          this.state.data[item] &&
          typeof this.state.data[item] === "object"
        ) {
          output.push(
            <InputGroup className="modal-input" key={i}>
              {null}
            </InputGroup>
          );
        } else {
          output.push(
            <InputGroup className="modal-input" key={i}>
              <InputGroupAddon addonType="prepend">{item}</InputGroupAddon>
              <Input
                value={this.state.data[item] ? this.state.data[item] : ""}
                onChange={e => this.handleChange(e, item)}
              />
            </InputGroup>
          );
        }
      }
      i++;
    }
    return output;
  }

  reset() {
    this.setState({ data: this.props.data });
  }

  onButtonSaveClick = data => event => {
    event && event.preventDefault && event.preventDefault();
    const { saveChanges } = this.props;
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "tashkif_file_link") continue;
        formData.append(key, data[key]);
      }
    }
    formData.append("tashkif_file_link", data["tashkif_file"]);

    // TODO tashkif_file_link

    saveChanges(this.state.data, formData);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.showTableForm}
        toggle={this.props.toggleTableForm}
        className="wide-modal"
      >
        <ModalHeader toggle={this.props.toggleTableForm}>Edit Form</ModalHeader>
        <ModalBody>{this.state.data ? this.getInputs() : null}</ModalBody>
        <ModalFooter>
          <Button
            className="float-left"
            color="success"
            onClick={this.onButtonSaveClick(this.state.data)}
          >
            Confirm
          </Button>{" "}
          {this.state.data && this.state.data.id ? (
            <Button className="float-left" color="link" onClick={this.reset}>
              Reset
            </Button>
          ) : null}{" "}
          <Button
            className="float-right"
            color="secondary"
            onClick={this.props.toggleTableForm}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmDelete;