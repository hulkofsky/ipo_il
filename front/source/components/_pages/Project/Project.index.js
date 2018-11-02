import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import Container from '../../grid/Container/Container.index'
import ContentSection from '../../ContentSection/ContentSection.index'
import Header from './Project.header'
import Documents from './Project.documents'
import Summery from './Project.summery'
import AboutCompany from './Project.aboutCompany'
import OurTeam from './Project.team'
import './Project.style.styl'
import { history } from '../../../history'
import { connect } from 'react-redux'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'
import multiLang from '../../_HOC/lang.hoc'
import { projects } from '../../../utils/routesBack'
import Preloader from '../../Loader/Loader'
import TalkingAboutUs from './TalkingAboutUs/index'

class ProjectPage extends Component {
  static propTypes = {
    // from App.routes
    projectId: PropTypes.string,
    projectName: PropTypes.string,
    // from connect
    getPageContent: PropTypes.func,
    content: PropTypes.object,
    // from Lang.hoc
    lang: PropTypes.string,
    dir: PropTypes.string
  }

  componentDidMount() {
    const { getPageContent, lang, projectId } = this.props

    getPageContent(lang, `${projects}${projectId}`)
  }

  onPurchaseButtonClick = event => {
    event && event.preventDefault && event.preventDefault()
    const { projectId, projectName } = this.props
    history.push(`/home/${projectName}/${projectId}/steps`)
  }

  renderPurchaseButton = () => {
    const { content, lang } = this.props
    const isEntrepreneur =
      window.localStorage.getItem(`user-type`) === `enterpreneur`

    if (
      !isEntrepreneur &&
      content.project.project_statuses.status_name === 'approved'
    ) {
      return (
        <button
          type="button"
          className="project-page__button-footer button button-main"
          onClick={this.onPurchaseButtonClick}
        >
          {content.pageContent[2][lang]
            ? content.pageContent[2][lang].purchase_btn
            : ``}
        </button>
      )
    }
  }

  renderLearnMoreButton = () => {
    const { content, lang } = this.props

    console.log("---CONTENT", content )

    if (content.project.learn_more) {
      return (
        <a
          href={content.project.company_link}
          className="project-page__button-footer button button-main"
          target = "_blank"
        >
          {content.pageContent[2][lang]
            ? content.pageContent[2][lang].learn_more
            : ``}
        </a>
      )
    }
  }

  renderPage() {
    const { content, lang, dir, projectId } = this.props

    if (!content.pageContent || !content.project) return <Preloader />

    const isTalkingAboutUs = content.project.is_talking_about_us

    return (
      <BaseLayout
        dir={dir}
        pageHeaderText={content.pageContent[1][lang]}
        pageHeaderMedia={content.pageContent[1].media}
        pageFooterText={content.pageContent[0][lang]}
        path={`${projects}${projectId}`}
      >
        <Container>
          <ContentSection className={`project-page`}>
            <Header
              purchaseButtonClick={this.onPurchaseButtonClick}
              contentText={content.project}
              contentButtonText={content.pageContent[2][lang]}
              project={content.project}
            />
            <Documents
              contentText={content.pageContent[2][lang]}
              project={content.project}
            />
            {isTalkingAboutUs &&
              content.project.articles && (
                <TalkingAboutUs project={content.project} />
              )}
            <Summery
              contentText={content.pageContent[2][lang]}
              description={
                content.project ? content.project.project_description : null
              }
            />

            {content.project
              ? content.project.enterpreneur && (
                  <AboutCompany
                    contentText={content.pageContent[2][lang]}
                    videoUrl={content.project.enterpreneur.video_url}
                  />
                )
              : null}
            <OurTeam
              contentText={content.pageContent[2][lang]}
              team={content.project ? content.project.project_team : null}
            />
            <div className="project-page__buttons-wrapper-footer">
              {this.renderLearnMoreButton()}
              {this.renderPurchaseButton()}
            </div>
          </ContentSection>
        </Container>
      </BaseLayout>
    )
  }

  render() {
    return <Fragment>{this.renderPage()}</Fragment>
  }
}

const mapStateToProps = state => ({ content: state.pageContent })
const mapDispatchToProps = { getPageContent }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multiLang(ProjectPage))
