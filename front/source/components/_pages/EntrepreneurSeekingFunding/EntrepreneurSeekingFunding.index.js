import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import lang from '../../_HOC/lang.hoc'
import { entrepreneurSeekingFunding } from '../../../utils/routesBack'
import { connect } from 'react-redux'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'


import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import HowWorking from './HowWorking/HowWorking.index'
import SocialLinks from '../../SocialLinks/SocialLinks.index'
import Preloader from '../../Loader/Loader'

class EntrepreneurSeekingFunding extends Component {

  static propTypes = {
    // from lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from connect
    getPageContent: PropTypes.func,
    content: PropTypes.object
  }

  state = {
    hide: true
  }

  componentDidMount() {
    const { getPageContent, lang } = this.props

    getPageContent(lang, entrepreneurSeekingFunding).then(() => this.setState({ hide: false }))
  }

  componentWillUnmount() {
    this.setState({ hide: true })
  }

  renderPage() {
    const {dir, content, lang} = this.props

    if(this.state.hide || !content.pageContent) return <Preloader />

    return (
      <BaseLayout path = {entrepreneurSeekingFunding}
        pageHeaderText = {content.pageContent[2][lang]}
        pageHeaderMedia = {content.pageContent[2].media}
        pageFooterText = {content.pageContent[1][lang]}
      >
        <div dir={dir}>
          <HowWorking contentText = {content.pageContent[0][lang]} contentMedia = {content.pageContent[0].media} />
          <SocialLinks content = {content.contacts} dir = {dir} />
        </div>
      </BaseLayout>
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

const mapStateToProps = state => ({content: state.pageContent})
const mapDispatchToProps = {getPageContent}

export default connect(mapStateToProps, mapDispatchToProps)(
  lang(EntrepreneurSeekingFunding)
)