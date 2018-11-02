import React from 'react'
import PropTypes from 'prop-types'
import './ApprovedProjects.style.styl'
import lang from '../../../_HOC/lang.hoc'
import { convertArrayToArrayArrays } from '../../../../utils/helpers'

import Carousel from 'nuka-carousel'
import Container from '../../../grid/Container/Container.index'
import ContentSection from '../../../ContentSection/ContentSection.index'
import ProjectCard from './ApprovedProjects.projectCard'

ApprovedProjects.propTypes = {
  // from lang.hoc
  dir: PropTypes.string,
  // from Home
  contentText: PropTypes.object,
  projects: PropTypes.array
}

function ApprovedProjects(props) {

  const getProjects = function () {
    const {projects} = props

    return projects.filter(project => project.project_statuses.status_name === `approved`)
  }

  const projects = convertArrayToArrayArrays(getProjects(), 2)

  const renderSlides = projects.map((slide, index) => {
    return (
      <div className="approved-projects__slider-inner-wrapper" key={index + Date.now()}>
        {
          slide.map(item => {
            return (
              <ProjectCard key={item.id}
                id={item.id}
                name={item.project_name}
                description={item.project_description}
                price={item.money_to_collect}
                funds={item.money_collected}
                url={item.video_url}
                finishDate={item.project_finish_date}
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
      <ContentSection className={`approved-projects`}>
        <header className="content-section__header" dir={dir}>
          <h1 className="content-section__title">
            {contentText[`approved.title`]}
          </h1>
          <div className="content-section__text">
            <p>
              {contentText[`approved.descr`]}
            </p>
          </div>
        </header>
        <div className="approved-projects__slider-wrapper">
          <Carousel slidesToShow={1}
            cellAlign="left"
            heightMode={`first`}
            initialSlideHeight={480}
            wrapAround
          >
            {renderSlides}
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

export default lang(ApprovedProjects)