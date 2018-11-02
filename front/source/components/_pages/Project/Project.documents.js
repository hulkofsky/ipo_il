import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'

import Tabs from '../../Tabs/Tabs.index'
import Tab from '../../Tabs/Tabs.item'
import DownloadButton from '../../DownloadButton/DownloadButton.index'
import axios from 'axios'

// mockData
import file2 from './images/19_Adorable-Puppy-Pictures-that-Will-Make-You-Melt_391191067_chris_tina-760x506.jpg'
import file5 from './images/shutterstock-100765450.jpg'
import { BASE_URL } from '../../../utils/routesBack'


class ProjectDocuments extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    // from Project.index
    contentText: PropTypes.object,
    project: PropTypes.object
  }

  state = {
    projectDoc: '',
    companyFiles: ''
  }

  componentDidMount() {
    const {project, lang} = this.props
    axios({
      method: `GET`,
      url: `${BASE_URL}/project/${project.id}/downloadProjectFiles`,
      headers: {
        'language': lang
      }
    })
      .then(response => {
        console.log(response.data.data.link)

        this.setState({
          projectDoc: response.data.data.link
        })

      })
      .catch(error => console.log(error.message))

    axios({
      method: `GET`,
      url: `${BASE_URL}/project/${project.enterpreneur_id}/downloadCompanyFiles`,
      headers: {
        'language': lang
      }
    })
      .then(response => {
        console.log(response.data.data.link)

        this.setState({
          companyFiles: response.data.data.link
        })

      })
      .catch(error => console.log(error.message))
  }

  companyPresentation = undefined
  setCompanyPresentationRef = node => this.companyPresentation = node

  companyStateman = undefined
  setCompanyStatemanRef = node => this.companyStateman = node

  renderDocuments = () => {
    const {contentText, project} = this.props

    if (!contentText || !project) return null

    if (
      !project.project_files ||
      project.project_files === null ||
      typeof project.project_files === 'undefined'
    ) return null


    return project.project_files.map(file => {
      const nameArray = file.split('/')
      const name = nameArray[nameArray.length - 1]

      return (
        <DownloadButton
          key = {file}
          file = {file}
          className = {`project-page__tabs-button`}
          multiple = {false}
          text = {contentText.download_file}
          label = {name}
        />
      )
    })
  }

  renderPage = () => {
    const {dir, contentText, project} = this.props

    if (!contentText || !project) return null
    console.log('---project', project)

    return (
      <div>
        <section className = "project-page__section" dir = {dir}>
          <h1 className = "project-page__subtitle">
            {contentText[`doc.title`]}
          </h1>
          <div className = "project-page__text">
            <p>
              {contentText[`doc.descr`]}
            </p>
          </div>
          <div className = "project-page__tabs">
            <Tabs defaultActiveTabIndex = {0} height = {100}>
              <Tab title = {contentText.tashkif_tab}>
                <div className = "project-page__tabs-content">
                  <DownloadButton
                    file = {(!project.tashkif_file || project.tashkif_file === null || typeof project.tashkif_file === 'undefined') ? '' : project.tashkif_file}
                    className = {`project-page__tabs-button-center`}
                    multiple = {false}
                    text = {contentText.download_file}
                  />
                </div>
              </Tab>
              <Tab title = {contentText.project_docs_tab}>
                <div className = "project-page__tabs-content">
                  {this.renderDocuments()}
                </div>
                <div className = "project-page__tabs-content project-page__tabs-content--footer">
                  <DownloadButton
                    multiple
                                  dir = {dir}
                                  className = {`project-page__tabs-button-center`}
                                  text = {contentText.download_all_btn}
                                  file = {this.state.projectDoc}
                  />
                </div>
              </Tab>
              <Tab title = {contentText.company_docs_tab}>
                <div className = "project-page__tabs-content project-page__tabs-content--center">
                  <DownloadButton
                    file = {project.enterpreneur ? project.enterpreneur.company_presentation: ''}
                                  className = {`project-page__tabs-button-center`}
                                  multiple = {false}
                                  text = {contentText.download_file}
                                  label = {`Company Presentation.pptx`}
                                  setRef = {this.setCompanyPresentationRef}
                  />
                  <DownloadButton
                    file = {project.enterpreneur ? project.enterpreneur.financial_report : ''}
                                  className = {`project-page__tabs-button-center`}
                                  multiple = {false}
                                  text = {contentText.download_file}
                                  label = {`Financial statement/report.pdf`}
                                  setRef = {this.setCompanyStatemanRef}
                  />
                </div>
                <div className = "project-page__tabs-content project-page__tabs-content--footer">
                  <DownloadButton
                    multiple
                                  className = {`project-page__tabs-button-center`}
                                  text = {contentText.download_all_btn}
                                  file = {this.state.companyFiles}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </section>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderPage()}
      </Fragment>
    )
  }


}

export default multiLang(ProjectDocuments)