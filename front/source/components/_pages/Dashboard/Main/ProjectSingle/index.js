import React, { Component } from 'react';
import SecondaryHeader from '../../SecondaryHeader/index';
import ProjectSingleItem from './ProjectSingle.jsx';
import ProjectSingleItemEnt from './ProjectSingle.enterpreneur';
import multilang from '../../../../_HOC/lang.hoc'
import { getPageContent, resetPageContent } from '../../../../../redux/reducers/pageContent.reducer';
import { connect } from 'react-redux';
import Loader from '../../partials/Loader';
// import multi from '../../../../_HOC/lang.hoc';
import './project.styl';

class ProjectSingle extends Component {

  componentDidMount() {
    const { getPageContent, lang } = this.props
    const id = window.localStorage.getItem('user-id')
    const { projectId, projectType = 'project', userType } = this.props.match.params;

    getPageContent(lang, `${userType}/${id}/${projectType}/${projectId}`);
  }

  // componentWillUnmount() {
  //   this.props.resetPageContent();
  // }

  render() {
    const { projectId, projectType, userType, userId, dir } = this.props.match.params;
    const { content, lang, savedProjects } = this.props;
    console.log(projectType)
    console.log(userType)
    const hasHeaderStatisticLink = projectType === 'purchasedprojects';
    const enterpreneurButtons = userType !== 'investor';
    let pageContent;
    let crumbs;
    let statisticButtonText;
    let createNewButton = userType === 'investor' ? false : true;

    if (!content.pageContent) {
      pageContent = <Loader />
    } else {
      const titles = content.pageContent[1][lang];
      let projectTypeTitle;

      switch (projectType) {
        case 'purchasedprojects': {
          projectTypeTitle = 'purchase';
          statisticButtonText = titles['stat_btn'];
          break;
        }

        case 'subscribedProjects': {
          projectTypeTitle = 'subscribe';
          break;
        }

        default: {
          projectTypeTitle = false;
        }
      }

      crumbs = [
        {
          path: `dash/${userType}/${userId}/projects/`,
          text: titles['title.my_projects'],
        },
        {
          path: `dash/${userType}/${userId}/projects/${projectType}`,
          text: projectTypeTitle && titles[`title.${projectTypeTitle}`],
        }
      ];
      // console.log(content.project.project_name)
      let projectName = '';
      console.log(projectId)
      for (let i=0; i<savedProjects.length; i++) {
        
        if(projectId == savedProjects[i].id) {
          projectName = savedProjects[i].project_name;
          break
        }
      }
      const secHeaderText = [content.pageContent[0][lang].my_projects, projectName]

      let classForDiv = 'project';
      if (window.localStorage.getItem('user-type') == 'enterpreneur') {
        classForDiv += ' project-enterpreneur'
      }

      pageContent = (
        <div className="" dir={dir}>
          <SecondaryHeader
            statisticLink={false}
            // button={hasHeaderStatisticLink}
            createNewButton={createNewButton}
            statisticButtonText={statisticButtonText}
            projectId={projectId}
            crumbs={crumbs}
            userType={userType}
            text={secHeaderText}
          />
          <main className="dash-inner" dir={dir}>
            <div className={classForDiv}>
              <ProjectSingleItem
                {...this.props}
                projectId={projectId}
                enterpreneurButtons={enterpreneurButtons}
                statisticButton={createNewButton}
              />
            </div>
          </main>
        </div>)
    }

    return (
      <React.Fragment>
        {pageContent}
      </React.Fragment>
    );
  }

}

export default connect(
  state => {
    return {
      content: state.pageContent,
      userType: 'enterpreneur',
      savedProjects: state.saveProjectsTemp
      // userType: 'investor'
    }
  }, { getPageContent, resetPageContent }
)(multilang(ProjectSingle));
