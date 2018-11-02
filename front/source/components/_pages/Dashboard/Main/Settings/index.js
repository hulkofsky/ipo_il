import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entrepr from './EntrepreneurSettings';
import Investor from './InvestorSettings';
import Loader from '../../partials/Loader';

class Settings extends Component {

  render() {
    // const { userType } = this.props;
    const userType = window.localStorage.getItem('user-type')
    let content;

    switch (userType) {
      case 'investor':
        content = <Investor />
        break;

      case 'enterpreneur': {
        content = <Entrepr {...this.props}/>
        break;
      }

      default:
        content = <Loader />
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }

}

export default connect(
  state => ({
    userType: state.pageContent.userType,
  })
)(Settings);
