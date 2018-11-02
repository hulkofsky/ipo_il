import React from 'react'
import PropTypes from 'prop-types'
import uid from 'uid'
import multilang from '../../../_HOC/lang.hoc'
import './EvaluationProject.style.styl'

import Carousel from 'nuka-carousel'
import Container from '../../../grid/Container/Container.index'
import ContentSection from '../../../ContentSection/ContentSection.index'
import ProjectCard from './EvaluationProject.projectCard'
import { convertArrayToArrayArrays } from '../../../../utils/helpers'

EvaluationProject.propTypes = {
  // from lang.hoc
  dir: PropTypes.string,
  lang: PropTypes.string,
  // from Home
  contentText: PropTypes.object,
  projects: PropTypes.array
}

function EvaluationProject(props) {

  const getVideoId = (src) => {
    let videoId = src.split(`v=`)[1]
    const questionMarkPosition = videoId.indexOf(`?`)

    if (questionMarkPosition !== -1) {
      videoId = videoId.substring(0, questionMarkPosition)
    }

    return videoId
  }

  const getVideoUrl = (src) => {
    const firstPart = '//www.youtube.com/embed/'
    const secondPart = `?showinfo=0&enablejsapi=1&origin=${window.location.href}`
    return firstPart + getVideoId(src) + secondPart
  }


  const getProjects = function () {
    const {projects} = props

    return projects.filter(project => project.project_statuses.status_name === `under_eval`)
  }

  const projects = convertArrayToArrayArrays(getProjects(), 4)

  const renderProjects = projects.map((slides) => {
    return (
      <div className = "evaluation-projects__slider-slide" key = {slides[0].id}>
        {
          slides.map(slide => {
            return (
              <ProjectCard
                key = {slide.id}
                id = {slide.id}
                name = {slide.project_name}
                url = {getVideoUrl(slide.video_url)}
              />
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
      <ContentSection className = {`evaluation-projects`}>
        <header className = "content-section__header" dir = {dir}>
          <h1 className = "content-section__title">
            {contentText[`evaluation.title`]}
          </h1>
          <div className = "content-section__text">
            <p>
              {contentText[`evaluation.descr`]}
            </p>
          </div>
        </header>
        <div className = "evaluation-projects__slider-wrapper">
          <Carousel slidesToShow = {1}
                    cellAlign = "left"
                    heightMode = {`first`}
                    initialSlideHeight = {600}
                    wrapAround
          >
            {renderProjects}
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

export default multilang(EvaluationProject)