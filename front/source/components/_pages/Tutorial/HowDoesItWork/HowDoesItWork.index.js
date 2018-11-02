import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPageContent } from '../../../../redux/reducers/pageContent.reducer'
import { tutorial } from '../../../../utils/routesBack'
import multiLang from '../../../_HOC/lang.hoc'
import './HowDoesItWork.style.styl'

import ContentSection from '../../../ContentSection/ContentSection.index'
import Container from '../../../grid/Container/Container.index'
import BaseLayout from '../../../grid/BaseLayout/BaseLayout.index'

class HowDoesItWork extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // form connect
    content: PropTypes.object,
    getPageContent: PropTypes.func
  }

  componentDidMount() {
    const {lang, getPageContent} = this.props

    getPageContent(lang, tutorial)
  }

  renderPage() {
    const {content, dir, lang} = this.props

    if (!content.pageContent) return null

    return (
      <BaseLayout pageHeaderText={content.pageContent[1][lang]}
        pageHeaderMedia={content.pageContent[1].media}
        pageFooterText={content.pageContent[0][lang]}
        path={tutorial}
      >
        <Container>
          <ContentSection className={`how-work`}>
            <h2 className="content-section__title" dir={dir}>
              {content.pageContent[2][lang] ?  content.pageContent[2][lang][`par_title1`] : null}
            </h2>
            <div className="how-work__text" dir={dir}>
              {content.pageContent[2][lang] ?  content.pageContent[2][lang][`par_descr1`] : null}
            </div>
            <h2 className="content-section__title" dir={dir}>
              {content.pageContent[2][lang] ?  content.pageContent[2][lang][`par_title2`] : null}
            </h2>
            <div className="how-work__text" dir={dir}>
              {content.pageContent[2][lang] ?  content.pageContent[2][lang][`par_descr2`] : null}
            </div>
            <h2 className="content-section__title" dir={dir}>
              {content.pageContent[2][lang] ?  content.pageContent[2][lang][`par_title3`] : null}
            </h2>
            <div className="how-work__text" dir={dir}>
              {content.pageContent[2][lang] ?  content.pageContent[2][lang][`par_descr3`] : null}
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
  multiLang(HowDoesItWork)
)