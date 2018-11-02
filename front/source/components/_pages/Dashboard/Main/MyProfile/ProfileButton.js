import React, { Component } from 'react';

class ProfileButton extends Component {

  clickHandler = () => {
    this.props.clickHandler();
  }

  render() {
    const {
      addedClassName = '',
      text,
    } = this.props;

    return (
      <button
        className={`profile-button ${addedClassName}`}
        onClick={this.clickHandler}
      >
        {text}
      </button>
    );
  }

}

export default ProfileButton;
