import React from 'react'
import PropTypes from 'prop-types'
import lang from '../../../_HOC/lang.hoc'
import './talking.styl'

import Carousel from 'nuka-carousel'
import Container from '../../../grid/Container/Container.index'
import { convertArrayToArrayArrays } from '../../../../utils/helpers'

TalkingAboutUs.propTypes = {
  // from lang.hoc
  dir: PropTypes.string,
  lang: PropTypes.string,
  // from Home
  project: PropTypes.object
}

function TalkingAboutUs(props) {
  const {project} = props

  const items = convertArrayToArrayArrays(project.articles, 2)

  const renderItems = items.map(
    (slides, index) => {
      return (
        <div className = "talking__slider-slide" key = {index + Date.now()}>
          {
            slides.map(slide => {
              return (
                <a href = {slide.link} className = "talking-card" target = "_blank">
                  <img src = {slide.logo} alt = {slide.link} />
                </a>
              )
            })
          }
        </div>
      )
    }
  )


  const renderPage = function () {
    const {dir, project} = props

    if (!project.articles) return null

    return (
      <section className = "talking project-page__section">
        <h1 className = "project-page__subtitle" dir = {dir}>
          Talking About Us
        </h1>
        <div className = "talking__slider-wrapper">
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
      </section>
    )
  }


  return (
    <Container>
      {renderPage()}
    </Container>
  )

}

export default lang(TalkingAboutUs)