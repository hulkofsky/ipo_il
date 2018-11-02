import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'
import './TermsOfService.style.styl'
import { history } from '../../../history'
import { connect } from 'react-redux'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import ContentSection from '../../ContentSection/ContentSection.index'
import Container from '../../grid/Container/Container.index'
import Preloader from '../../Loader/Loader'
import {signup} from "../../../utils/routesBack"
import { getPageContent } from "../../../redux/reducers/pageContent.reducer"


class TermsOfService extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from connect
    getPageContent: PropTypes.func,
    content: PropTypes.object
  }


  componentDidMount() {
    const {lang, getPageContent} = this.props

    getPageContent(lang, signup)
  }

  renderPage = () => {
    const {lang, dir, content} = this.props

    if (!content.pageContent) return <Preloader />

    return (
      <BaseLayout pageHeaderText = {content.pageContent[2][lang]}
                  pageHeaderMedia = {content.pageContent[2].media}
                  pageFooterText = {content.pageContent[1][lang]}
                  path = {signup}
      >
        <Container>
          <ContentSection className={`terms-of-service`}>
            <header className="content-section__header" dir={dir}>
              <h1 className="content-section__title">
                {(content.pageContent[3] && content.pageContent[3][lang] ) ? content.pageContent[3][lang][`investor.terms_link`] : null}
              </h1>
            </header>
            <div className="terms-of-service__text" dir={dir}>
              {(content.pageContent[3] && content.pageContent[3][lang] ) ? content.pageContent[3][lang][`investor.terms_descr`] : null}
            </div>
            <div className="terms-of-service__button-wrapper">
              <button type="button"
                      className="terms-of-service__button button button-main"
                      onClick={() => history.goBack()}
              >
                {(content.pageContent[3] && content.pageContent[3][lang] ) ? content.pageContent[3][lang][`investor.back_btn`] : null}
              </button>
            </div>
          </ContentSection>
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
const mapDispatchToProps = {getPageContent}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(TermsOfService)
)