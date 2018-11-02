import React, { Component, Fragment } from 'react';
import InvestorSearch from './InvestorSearch'
import EnterpreneurSearch from './EnterpreneurSearch'
import Loader from '../partials/Loader'

class Search extends Component {
  render() {
    const userType = window.localStorage.getItem('user-type');

    let content;

    switch (userType) {
      case 'investor': {
        content = <InvestorSearch />;
        break;
      }

      case 'enterpreneur': {
        content = <EnterpreneurSearch />
        break;
      }

      default: {
        content = <Loader />
      }
    }

    return (
      <Fragment>{content}</Fragment>
    );
  }
}

export default Search;
