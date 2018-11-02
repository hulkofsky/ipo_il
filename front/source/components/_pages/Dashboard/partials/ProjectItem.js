import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProgressCircle from '../../../ProgressBarCircle/ProgressBarCircle.index';
import { withRouter } from 'react-router-dom';

class ProjectItem extends Component {

  deleteProject = () => {
    const { id } = this.props.item;
    const {index} = this.props
    console.log(id)
    // debugger
    this.props.deleteProject(id, index);
  }

  render() {
    const { item, item: {purchases}, titles, investor, deleteProject } = this.props;
    // const { item, titles, investor, deleteProject } = this.props;
    const finishDate = new Date(item.project_finish_date).valueOf();
    const startDate = new Date(item['project_start_date']).valueOf();
    const nowDate = new Date().valueOf();
    let daysAtAll = Math.floor( (finishDate - startDate) / 24 / 60 / 60 / 1000 );
    let dayLeft = Math.floor( (finishDate - nowDate) / 24 / 60 / 60 / 1000 );
    // const { userType, userId } = this.props.match.params;
    const userId = window.localStorage.getItem('user-id');
    const userType = window.localStorage.getItem('user-type');
    let investedAmount;
    // using to build a path for link
    let projectType;

    if(daysAtAll < 0) {
      daysAtAll = 0;
    }

    if(dayLeft < 0) {
      dayLeft = 0;
    }

    if(!investor) {
      projectType = '';
    } else {
      if(purchases) {
        projectType = 'purchasedprojects/';
      } else {
        projectType = 'subscribedProjects/';
      }
    }

    if(purchases && purchases.length > 0) {
      investedAmount = purchases
        .map( item => (item.unit_count * item.unit_price) || 0)
        .reduce( (sum = 0, current = 0) => sum + current);
    } else {
      investedAmount = 0;
    }

    // console.log('-----------')
    // console.log(titles)

    return (
      <div className="projects">
        <Link to={`/dash/${userType}/${userId}/projects/${projectType}${item.id}`} className="projects__inner-link">
          <div className="projects__header">
            <div className="projects__header-right">
              <div className="projects__title">
                {item.project_name}
              </div>
              <div className="projects__field">
                {item.project_field}
              </div>
            </div>
            <div className="projects__header-left">
              <div className="projects__members">
                {`${item.project_team.length} ${titles['members']}`}
              </div>
            </div>
          </div>
          <div className="projects__middle">
            <div className="projects__middle-right">
              <ProgressCircle dynamicValue={item.money_collected} staticValue={item.money_to_collect}/>
            </div>
            <div className="projects__middle-left">
              <div className="projects__middle-days">
                <div className="projects__days">
                  {`${daysAtAll} ${titles['days']}`}
                </div>
                <div className="projects__days-left">
                  {`${dayLeft} ${titles['days_left']}`}
                </div>
              </div>
            </div>
          </div>
          <div className="projects__footer">
            <div className="projects__footer-left">
              <div className="projects__footer-be projects__footer-field-title">
                {titles['to_be_collected'] || titles['checked']}
              </div>
              <div className="projects__footer-already projects__footer-field-title">
                {titles['already_collected'] || titles['collected']}
              </div>
              { investor && purchases &&
                <div className="projects__footer-invested projects__footer-field-title">
                  {titles['invested']}
                </div>
              }
            </div>
            <div className="projects__footer-right">
              <div className="projects__footer-be-count projects__footer-field-value">
                {`${item.money_to_collect} ${titles['ils']}`}
              </div>
              <div className="projects__footer-already-count projects__footer-field-value">
                {`${item.money_collected}  ${titles['ils']}`}
              </div>
              {investor && purchases &&
                <div className="projects__footer-invested-count projects__footer-field-value">
                  {`${investedAmount} ${titles['ils']}`}
                </div>
              }
            </div>
          </div>
        </Link>
        <div className="projects__menu">
          <div className="projects__menu-button">
            <span className="projects__menu-dots"></span>
            <span className="projects__menu-dots"></span>
            <span className="projects__menu-dots"></span>
          </div>
          <div className="projects__menu-dropdown" onClick={this.preventNavigateToProject}>
            <ul className="projects__menu-list">
              { !investor && item.enterpreneur_id &&
                <li className="projects__menu-item">
                  <Link to={`/dash/${userType}/${userId}/projects/${projectType}${item.id}`} className="projects__menu-link" >
                    {titles['preview']}
                  </Link>
                </li>
              }
              { !investor && item.enterpreneur_id &&
                <li className="projects__menu-item">
                  <Link to={`/dash/${userType}/${userId}/projects/${projectType}${item.id}/edit`} className="projects__menu-link" >
                    {titles['edit']}
                  </Link>
                </li>
              }
              {
                projectType === 'subscribedProjects/'
                ? null
                : (
                  <li className="projects__menu-item">
                    <Link
                      className="projects__menu-link"
                      to={`/dash/${userType}/${userId}/projects/${projectType}${item.id}/statistic`}
                      >
                        {titles['statistic']}
                      </Link>
                    </li>
                )
              }
              <li className="projects__menu-item">
                <Link to="#" className="projects__menu-link" onClick={this.deleteProject}>
                  {titles['delete']}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(ProjectItem);
