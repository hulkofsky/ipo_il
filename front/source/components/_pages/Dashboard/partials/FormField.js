import React, { Component } from 'react';

class FormField extends Component {

  render() {
    const { addedClassName = '', id, children, label } = this.props;

    return (
      <div className="profile__form-field">
        <label htmlFor={id} className="profile__form-field-label">{label}</label>
        {children}
      </div>
    );
  }

}

export default FormField;
