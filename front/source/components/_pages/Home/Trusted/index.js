import React from 'react'
import PropTypes from 'prop-types'
import lang from '../../../_HOC/lang.hoc'
import './trusted.styl'

import Carousel from 'nuka-carousel'
import Container from '../../../grid/Container/Container.index'
import ContentSection from '../../../ContentSection/ContentSection.index'
import { convertArrayToArrayArrays } from '../../../../utils/helpers'

EvaluationProject.propTypes = {
  // from lang.hoc
  dir: PropTypes.string,
  lang: PropTypes.string,
  // from Home
  contentText: PropTypes.object,
  trusted: PropTypes.array
}

function EvaluationProject(props) {
  const {trusted} = props

  const items = convertArrayToArrayArrays(trusted, 4)

  const renderItems = items.map((slides, index) => {
    return (
      <div className = "trusted__slider-slide" key = {index + Date.now()}>
        {
          slides.map(slide => {
            return (
              <div className = "trusted-card">
                <img src = {slide.logo} alt = {slide.company_name} />
              </div>
            )
          })
        }
      </div>
    )
  })


  const renderPage = function () {
    const {dir, contentText} = props

    if (!contentText) return null
    return (
      <ContentSection className = {`trusted`}>
        <header className = "content-section__header" dir = {dir}>
          <h1 className = "content-section__title">
            {contentText[`trusted_by`]}
          </h1>
        </header>
        <div className = "trusted__slider-wrapper">
          <Carousel
            slidesToShow = {1}
            cellAlign = "left"
            heightMode = {`first`}
            initialSlideHeight = {150}
            wrapAround
          >
            {renderItems}
          </Carousel>
        </div>
      </ContentSection>
    )
  }


  return (
    <Container>
      {renderPage()}
    </Container>
  )

}

export default lang(EvaluationProject)