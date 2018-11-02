import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { showOverlay, hideOverlay } from '../../../redux/reducers/overlay.reducer'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'
import multiLang from '../../_HOC/lang.hoc'
import { tutorial } from '../../../utils/routesBack'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import Container from '../../grid/Container/Container.index'
import MediaPlayer from './MediaPlayer/MediaPlayer.index'
import './Tutorial.style.styl'
import Modal from './Modal/Tutorial.modal.index'
import Preloader from '../../Loader/Loader'

class Tutorial extends Component {

  static propTypes = {
    // from connect
    showOverlay: PropTypes.func,
    hideOverlay: PropTypes.func,
    history: PropTypes.object,
    getPageContent: PropTypes.func,
    content: PropTypes.object,
    // from Lang.hoc
    lang: PropTypes.string
  }

  state = {
    hide: true
  }

  componentDidMount() {
    const {showOverlay, getPageContent, lang} = this.props
    showOverlay()
    getPageContent(lang, tutorial).then(() => this.setState({ hide: false }))
  }

  componentWillUnmount() {
    this.setState({ hide: true })
  }

  onLinkClick = evt => {
    evt && evt.preventDefault && evt.preventDefault()
    const {hideOverlay, history} = this.props
    hideOverlay()
    history.push(`/tutorial/description`)
  }

  renderPage = () => {
    const {content, lang} = this.props

    if(this.state.hide || !content.pageContent) return <Preloader />

    return (
      <BaseLayout pageHeaderText = {content.pageContent[1][lang]}
        pageHeaderMedia = {content.pageContent[1].media}
        pageFooterText = {content.pageContent[0][lang]}
        path = {tutorial}
      >
        <Container>
          <Modal>
            <div className="tutorial__player">
              {content.pageContent[2].media ? <MediaPlayer src={content.pageContent[2].media.video} /> : null }
            </div>
            <div className="tutorial__button-box">
              <a href="#"
                onClick={this.onLinkClick}
                className="tutorial__button button button--small button-bordered"
              >
                {content.pageContent[2][lang] ?  content.pageContent[2][lang].know_more_btn: null}
              </a>
            </div>
          </Modal>
        </Container>
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
const mapDispatchToProps = {showOverlay, hideOverlay, getPageContent}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multiLang(Tutorial)
  )
)