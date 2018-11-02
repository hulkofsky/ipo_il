import React, { Component } from 'react';
import Loader from './Loader';
import ProjectItem from './ProjectItem';
import { getPageContent, resetPageContent } from '../../../../redux/reducers/pageContent.reducer';
import { deleteProjectSuccess } from '../../../../redux/reducers/getProjects.reducer';
import { connect } from 'react-redux';
import multilang from '../../../_HOC/lang.hoc'
import config from '../../../../utils/config';
import axios from 'axios';

class ProjectsGrid extends Component {


  componentDidMount() {
    const { getPageContent, lang, requestUrl, investor } = this.props;

    if(!investor) {
      return;
    }

    const userId = window.localStorage.getItem('user-id');
    this.props.getAllProjects(lang, `investor/${userId}/${this.props.projectTypeRequest}`)
    // getPageContent(lang, requestUrl);
  }


  componentDidUpdate(prevProps) {
    const { getPageContent, lang, requestUrl, investor } = this.props;
    // DON'T FORGET ABOUT THIS
    if(prevProps.requestUrl === requestUrl) {
      return;
    }

    if(!investor) {
      return;
    }

    const userId = window.localStorage.getItem('user-id');
    this.props.getAllProjects(lang, `investor/${userId}/${this.props.projectTypeRequest}`)
  }


  // componentWillUnmount() {
  //   this.props.resetPageContent();
  // }


  deleteProject = projectId => {
    const { lang, requestUrl, getPageContent, projectTypeRequest, projectType, investor } = this.props;
    const userId = window.localStorage.getItem('user-id');

    axios.delete(`${config.domain}/investor/${userId}/${projectTypeRequest}/${projectId}`)
      .then( res => {
        this.props.deleteProjectSuccess(projectId, projectType);
      });
  }


  render() {
    let { content, projectType, lang, items, investor, staticTitles } = this.props;
    let itemsList;

    if(investor) {
      if(!content.pageContent) {
        return <Loader/>;
      }
      // waiting for data
      if(!content.data) {
        return <Loader />
      }

      items = content.data[projectType];

      staticTitles = content.pageContent[1][lang];
    }

    if(!items) {
      itemsList = <Loader/>
    } else if(items.length === 0) {
      itemsList = <div>Projects was not found</div>
    } else {
      itemsList = items.map( item => {
        return (
          <ProjectItem
            item={item}
            key={item.id}
            titles={staticTitles}
            investor={investor}
            deleteProject={this.deleteProject}
          />
        )
      })
    }

    return (
      <div className="projects-grid-wrap">
        <div className={`projects-grid projects-grid__${this.props.itemsInRow}`}>
          {itemsList}
        </div>
      </div>
    );
  }

}

export default connect(
  state => {
    return {
      content: state.allProjects,
    }
  }, { getPageContent, resetPageContent, deleteProjectSuccess }
)(multilang(ProjectsGrid));
