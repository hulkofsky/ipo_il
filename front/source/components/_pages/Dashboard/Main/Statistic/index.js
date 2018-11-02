import React, { Component } from 'react';
import CompanyStatistic from './CompanyStatistic';
import Investor from './Investor';
import Loader from '../../partials/Loader';
import multi from '../../../../_HOC/lang.hoc';

class Statistic extends Component {

  render() {
    const { userType, dir } = this.props.match.params;
    let content;

    switch (userType) {
      case 'investor': {
        content = <Investor params={this.props.match.params} />;
        break;
      }

      case 'enterpreneur': {
        content = <CompanyStatistic params={this.props.match.params} />;
        break;
      }

      default: {
        content = <Loader />
      }
    }

    return (
      <div dir={dir}>
        {content}
      </div>
    );
  }

}

export default multi(Statistic);
