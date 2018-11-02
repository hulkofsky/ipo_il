import React from 'react'
import PropTypes from 'prop-types'
import lang from '../../../_HOC/lang.hoc'
import './WhoAreWe.style.styl'

import Container from '../../../grid/Container/Container.index'
import ContentSection from '../../../ContentSection/ContentSection.index'
import Preloader from '../../../Loader/Loader'

WhoAreWe.propTypes = {
  contentText: PropTypes.object,
  contentMedia: PropTypes.object,
  // from lang.hoc
  dir: PropTypes.string
}

function WhoAreWe(props) {

  const render = function () {
    const {dir, contentText, contentMedia} = props

    if (!contentText || !contentMedia) return <Preloader />
    return (
      <ContentSection className={`who-are-we`}>
        <header className="content-section__header" dir={dir}>
          <h1 className="content-section__title">
            {contentText.title}
          </h1>
        </header>
        <div className="who-are-we__container" dir={dir}>
          <div className="who-are-we__item">
            <img src={contentMedia.img} alt="who-are-we" />
            <h2 className="content-section__title content-section__title--secondary">
              {contentText.par_title1}
            </h2>
            <p>
              {contentText.par_descr1}
            </p>
            <h2 className="content-section__title content-section__title--secondary">
              {contentText.par_title2}
            </h2>
            <p>
              {contentText.par_descr2}
            </p>
          </div>
        </div>
      </ContentSection>
    )
  }

  return (
    <Container>
      {render()}
    </Container>
  )

}

export default lang(WhoAreWe)