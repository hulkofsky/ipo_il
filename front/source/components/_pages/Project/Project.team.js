import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CarouselTeam from '../../CarouselTeam/CarouselTeam.index'
import multiLang from '../../_HOC/lang.hoc'

ProjectTeam.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Project.index
  contentText: PropTypes.object,
  team: PropTypes.array
}

function ProjectTeam(props) {

  const renderPage = () => {
    const {dir, contentText, team} = props

    if (!contentText || !team) return null

    return (
      <section className="project-page__section project-page__our-team">
        <div className="project-page__our-team-header">
          <h1 className="project-page__subtitle" dir={dir}>
            {contentText[`team.title`]}
          </h1>
          <div className="project-page__text" dir={dir}>
            {contentText[`team.descr`]}
          </div>
        </div>
        <CarouselTeam team={team} />
      </section>
    )
  }

  return (
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

export default multiLang(ProjectTeam)