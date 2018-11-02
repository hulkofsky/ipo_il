import React, { Component } from 'react';
import SecondaryHeader from '../../SecondaryHeader';
import ProjectItem from '../../partials/ProjectItem';
import ProjectsGrid from '../../partials/ProjectsGrid';
import Tabs from '../../../../Tabs/Tabs.index';
import Tab from '../../../../Tabs/Tabs.item';
import './project.styl';
import { connect } from 'react-redux';
import { getAllProjects } from '../../../../../redux/reducers/getProjects.reducer';
import multiLang from '../../../../_HOC/lang.hoc'

class Projects extends Component {

  render() {
    const { userId, getAllProjects, params: { projectsType }, dir } = this.props;
    let activeTabs = 0;

    if(projectsType === 'subscribedProjects') {
      activeTabs = 1;
    }

    return (
      <div>
        <SecondaryHeader controls={true} />
        <main className="dash-inner" dir={dir}>
          <Tabs defaultActiveTabIndex={activeTabs} height={30} tabsAddClassName={'projects-tabs'} >
            <Tab title='Purchased Projects'>
              <ProjectsGrid
                itemsInRow={3}
                requestUrl={`investor/${userId}/purchasedprojects`}
                projectType='purchased_projects'
                investor
                getAllProjects={getAllProjects}
                projectTypeRequest='purchasedprojects'
              />
            </Tab>
            <Tab title='Subscribed Projects'>
              <ProjectsGrid
                itemsInRow={2}
                requestUrl={`investor/${userId}/subscribedProjects`}
                projectType='subscribed_projects'
                projectTypeRequest='subscribedProjects'
                investor
                getAllProjects={getAllProjects}
              />
            </Tab>
          </Tabs>
        </main>
      </div>
    );
  }

}

export default connect(
  state => ({
    userId: state.pageContent.userId,
  }), { getAllProjects }
)(multiLang(Projects));
