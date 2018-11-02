import React, { Component } from "react";
import ColapseComponent from "../../Colapse";
import { Button, CustomInput } from "reactstrap";

class TableRow extends Component {
  getColumns() {
    let output = [],
      i = 1;
    if (this.props.thead) {
      for (let item in this.props.data) {
        if (
          item !== "password" &&
          item !== "confPass" &&
          item !== "signin_token"
        ) {
          output.push(
            <th key={i} className="text-center">
              {item}
            </th>
          );
        }
        i++;
      }
      output.push(
        <th key={i} className="text-center">
          Action
        </th>
      );
    } else {
      for (let item in this.props.data) {
        if (
          item !== "password" &&
          item !== "confPass" &&
          item !== "signin_token"
        ) {
          if (typeof this.props.data[item] === "boolean") {
            output.push(
              <td key={i} className="text-center">
                <CustomInput
                  type="checkbox"
                  id={item + "row"}
                  onChange={() => {}}
                  disabled
                  checked={this.props.data[item]}
                />
              </td>
            );
          } else if (item === "icon" || item === "photo") {
            output.push(
              <td key={i} className="text-center">
                <img src={this.props.data[item]} alt={this.props.data[item]} />
              </td>
            );
          } else if (typeof this.props.data[item] !== "object") {
            output.push(
              <td key={i} className="text-center">
                <div className="table-text-content">
                  {this.props.data[item]}
                </div>
              </td>
            );
          } else if (typeof this.props.data[item] === "object") {
            output.push(
              <td key={i} className="text-center">
                {this.props.data[item] ? (
                  <ColapseComponent item={item} data={this.props.data[item]} />
                ) : (
                  ""
                )}
              </td>
            );
          }
        }
        i++;
      }
      output.push(
        <td key={i} className="text-center">
          <Button
            color="success"
            onClick={() => {
              this.props.toggleTableForm(this.props.index);
            }}
          >
            Edit
          </Button>{" "}
          <Button
            color="danger"
            onClick={() => {
              this.props.toggleConfirm(this.props.data.id);
            }}
          >
            Delete
          </Button>
        </td>
      );
    }
    return output;
  }

  render() {
    return <tr>{this.getColumns()}</tr>;
  }
}

export default TableRow;
