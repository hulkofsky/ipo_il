import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './Steps.step3.project.style.styl'
import ProgressBar from '../../../ProgressBarCircle/ProgressBarCircle.index'

Project.propTypes = {
  // from Steps.step3
  dir: PropTypes.string,
  content: PropTypes.object,
  project: PropTypes.object
}

function Project(props) {

  const formatDay  = () => {
    const {project} = props

    const today = Date.now()
    const lastDay = Date.parse(project.project_finish_date)
    const daysToGo = lastDay - today
    return daysToGo > 0 ? Math.floor(daysToGo / 1000 / 60 / 60 / 24) : 0
  }


  const renderPage = () => {
    const {dir, content, project} = props

    if (!content) return null

    return (
      <section className="steps-page__project">
        <h1 className="steps-page__project-title" dir={dir}>
          {project[`project_name`]}
        </h1>
        <div className="steps-page__project-inner-wrapper">
          <div className="steps-page__project-left" dir={dir}>
            <div className="steps-page__project-text">
              <p>
                {project[`project_description`]}
              </p>
            </div>
          </div>
          <div className="steps-page__project-right">
            <div className="steps-page__project-pledged" dir={dir}>
              {project[`money_collected`]} {content[`purchase.ils`]} {content[`pledged`]}
            </div>
            <div className="steps-page__project-progress">
              <ProgressBar dynamicValue={project[`money_collected`]} staticValue={project[`money_to_collect`]} />
            </div>
            <div className="steps-page__project-finish-time" dir={dir}>
              {formatDay()} {content[`days_to_go`]}
            </div>
          </div>
        </div>

      </section>
    )
  }

  return (
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

export default Project