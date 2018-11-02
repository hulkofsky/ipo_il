import React, { Component } from 'react';
import InvetorHeader from './InvestorHeader';
import EnterpreneurHeader from './HeaderEnterpreneur';
import Loader from '../partials/Loader';

class Header extends Component {

  render() {
    const userType = window.localStorage.getItem('user-type');

    let content;

    switch (userType) {
      case 'investor': {
        content = <InvetorHeader />;
        break;
      }

      case 'enterpreneur': {
        content = <EnterpreneurHeader />
        break;
      }

      default: {
        content = <Loader />
      }
    }

    return (
      <div>{content}</div>
    );
  }

}

export default Header;
