import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../../redux/actions/authActions';
import { withRouter, Link, NavLink } from 'react-router-dom';

class Logout extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.click();
    return false
  }

  render() {
    const { className, text } = this.props;

    return (
      <NavLink
        to="#"
        className={`${className || ''}`}
        onClick={this.logout}
        children={text}
      />
    );
  }

}

export default withRouter(
  connect(null, { logout })(Logout)
);
