import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'
import { home } from '../../../utils/routesBack'
import multiLang from '../../_HOC/lang.hoc'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import ApprovedProjects from './ApprovedProjects/ApprovedProjects.index'
import EvaluationProject from './EvaluationProject/EvaluationProject.index'
import TrustedBy from './Trusted/index'
import Preloader from '../../Loader/Loader'


class Home extends Component {

  static propTypes = {
    // from connect
    getPageContent: PropTypes.func,
    content: PropTypes.object,
    // from lang.hoc
    lang: PropTypes.string
  }

  componentDidMount() {
    const {getPageContent, lang} = this.props

    getPageContent(lang, home)
  }

  renderPage() {
    const {content, lang} = this.props

    if (!content.pageContent || !content.projects) return <Preloader />

    console.log(content)

    return <BaseLayout pageHeaderText={content.pageContent[1][lang]} pageHeaderMedia={content.pageContent[1].media} pageFooterText={content.pageContent[0][lang]} path={home}>
        <ApprovedProjects contentText={content.pageContent[2][lang]} projects={content.projects} />
        <EvaluationProject contentText={content.pageContent[2][lang]} projects={content.projects} />
        <TrustedBy contentText={content.pageContent[2][lang]} trusted={content.trusted_by} />
      </BaseLayout>
  }

  render() {

    return (
      <Fragment>
        {this.renderPage()}
      </Fragment>
    )
  }

}

const mapStateToProps = state => ({content: state.pageContent})
const mapDispatchToProps = {getPageContent}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multiLang(Home)
  )
)