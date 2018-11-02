import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class StaticticLink extends Component {

  render() {
    const { userId, userType, projectId, projectType, } = this.props.match.params;
    return (
      <div className="statistic-link-wrap">
        <Link
          to={`/dash/${userType}/${userId}/projects/${projectType}/${projectId}/statistic`} className='statistic-link'>
          Statistic
        </Link>
      </div>
    );
  }

}

export default withRouter(StaticticLink);
