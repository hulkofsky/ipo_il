import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'
import multilang from '../../_HOC/lang.hoc'
import { about } from '../../../utils/routesBack'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import WhoAreWe from './WhoAreWe/WhoAreWe.index'
import OurTeam from './OurTeam/OurTeam.index'
import Preloader from '../../Loader/Loader'

class About extends Component {
  static propTypes = {
    // from connect
    getPageContent: PropTypes.func,
    content: PropTypes.object,
    // from lang.hoc
    lang: PropTypes.string,
    dir: PropTypes.string
  }

  state = {
    hide: true
  }

  componentDidMount() {
    const { getPageContent, lang } = this.props

    getPageContent(lang, about).then(() => this.setState({ hide: false }))
  }

  componentWillUnmount() {
    this.setState({ hide: true })
  }

  renderPage() {
    const { dir, content, lang } = this.props

    if (this.state.hide || !content.pageContent) return <Preloader />

    return (
      <BaseLayout
        dir={dir}
        pageHeaderText={content.pageContent[2][lang]}
        pageHeaderMedia={content.pageContent[2].media}
        pageFooterText={content.pageContent[1][lang]}
        path={about}
      >
        <WhoAreWe
          contentText={content.pageContent[0][lang]}
          contentMedia={content.pageContent[0].media}
        />
        <OurTeam
          contentText={content.pageContent[0][lang]}
          team={content.team_members}
        />
      </BaseLayout>
    )
  }

  render() {
    return <Fragment>{this.renderPage()}</Fragment>
  }
}

const mapStateToProps = state => ({ content: state.pageContent })
const mapDispatchToProps = { getPageContent }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(multilang(About))
)
