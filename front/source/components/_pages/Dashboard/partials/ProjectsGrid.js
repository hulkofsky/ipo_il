import React, { Component } from 'react';
import Investor from './ProjectGridInvestor';
import Entrepreneur from './ProjectsGridEnterpreneur';
import Loader from './Loader';

class ProjectGrid extends Component {

  render() {
    const userType = window.localStorage.getItem('user-type')
    let content;

    switch (userType) {
      case 'investor': {
        content = <Investor {...this.props} />
        break;
      }

      case 'enterpreneur': {
        content = <Entrepreneur {...this.props} />
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

export default ProjectGrid;
