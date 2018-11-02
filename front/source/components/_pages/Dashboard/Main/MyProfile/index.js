import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entr from './EnterpreneurMyProfile';
import Investor from './InvestorMyProfile';
import Loader from '../../partials/Loader';

class Profile extends Component {

  render() {
    const dir = window.localStorage.getItem('dir')
    const userType = window.localStorage.getItem('user-type')
    const userId = window.localStorage.getItem('user-id')
    let content;
    console.log(this.props)
    const match = this.props.match

    switch (userType) {
      case 'investor':
        content = <Investor match={match}/>
        break;

      case 'enterpreneur': {
        content = <Entr match={match}/>
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
)(Profile);
