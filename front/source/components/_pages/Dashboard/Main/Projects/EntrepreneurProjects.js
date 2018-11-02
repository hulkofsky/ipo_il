import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import SecondaryHeader from '../../SecondaryHeader';
import ProjectItem from '../../partials/ProjectItem';
import ProjectsGrid from '../../partials/ProjectsGrid';
import { getAllProjects, clearProjects } from '../../../../../redux/reducers/getProjects.reducer';
import {saveProjectsTemp} from '../../../../../redux/reducers/tempProjectsSaver.reducer';
import { projects } from '../../../../../utils/routesBack'
import { projectsSingle } from '../../../../../utils/routesBack'
import { connect } from 'react-redux';
import './project.styl';
import multiLang from '../../../../_HOC/lang.hoc'
import Loader from '../../partials/Loader';

class Projects extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from connect
    getProjects: PropTypes.func,
    content: PropTypes.object
  }

	componentDidMount = () => {
    const {lang, getAllProjects, content } = this.props
    const projects = `enterpreneur/${window.localStorage.getItem('user-id')}/myprojects`
    if(content.company_projects.projects && content.company_projects.projects.length == 0) {
      getAllProjects(lang, projects)
    }

  }

  componentWillUnmount = () => {
    const { clearProjects, saveProjectsTemp, content } = this.props
    const projectsToSave = content.company_projects.projects
    saveProjectsTemp(projectsToSave)
    clearProjects()
  }


  renderPage (){

    const {dir, lang, content} = this.props;
    const userId = window.localStorage.getItem('user-id')
    let staticTitles;
    const userType = window.localStorage.getItem('user-type')
    const secHeaderText = [content.pageContent[0][lang].my_projects]
    staticTitles = content.pageContent[1][lang];

    // if (!content.company_projects || !content.company_projects.projects.length != 0) {
    //   return <Loader  style={{position: 'fixed', top: "50%", left: "60%"}}/>
    // }
    if (!content.company_projects || !content.company_projects.projects.length != 0) {
      return (
        <div>
          <SecondaryHeader controls={true} button={true} createNewButton={true}  text={secHeaderText} userType={userType}/>
        </div>
      )
    }



    //----------Filter all projects without status ''suspended''
    const filteredProjects = content.company_projects.projects.filter((item, i) => {
        if(item.statuses.status_name == 'suspended') return false
        else return true 
    })
    //-------------change itemsFromProps in line 65 to filteredProjects
    return(
      <div>
        <SecondaryHeader controls={true} button={true} createNewButton={true}  text={secHeaderText} userType={userType}/>
        <main className="dash-inner" dir={dir}>
          <ProjectsGrid
            itemsFromProps={filteredProjects}
            itemsInRow={2}
            requestUrl={`enterpreneur/${userId}/myprojects`}
            staticTitles={staticTitles}
            getProjects={this.getProjects}
          />
        </main>
      </div>

    )
  }

  render() {
    return(
      <Fragment>
        {this.renderPage()}
      </Fragment>
    )
  }

}

const mapStateToProps = state => {
  return {
    content: state.allProjects,
    userId: state.pageContent.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: (lang, projects) => (dispatch(getAllProjects(lang, projects))),
    clearProjects: () => (dispatch(clearProjects())),
    deleteProjectItem: (index) => (dispatch(deleteProjectItem(index))),
    saveProjectsTemp: (projectsToSave) => (dispatch(saveProjectsTemp(projectsToSave)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(Projects)
)
