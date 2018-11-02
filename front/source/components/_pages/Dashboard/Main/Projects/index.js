import React, { Component } from 'react';
import Entrepreneur from './EntrepreneurProjects';
import Investor from './InvestorProjects';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import multi from '../../../../_HOC/lang.hoc';

class Projects extends Component {

  render() {
    // const { userType } = this.props;
    const {  dir } = this.props;
    // const dir = window.localStorage.getItem('dir')
    const userType = window.localStorage.getItem('user-type')
    const userId = window.localStorage.getItem('user-id')
    let content;

    switch (userType) {
      case 'investor':
      content = <Investor params={this.props.match.params}/>;
      break;
      
      case 'enterpreneur':
        content = <Entrepreneur />
        break;

      default: {
        content = <span className="not-found">404 Page not found</span>
      }
    }

    return (
      <div>
      {/* <div dir={dir}> */}
        {content}
      </div>
    );
  }

}

export default withRouter(
  connect(
    state => {
      return {
        userType: state.pageContent.userType,
      }
    }
)(multi(Projects)));
