import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'

ProjectSummery.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Project.index
  contentText: PropTypes.object,
  description: PropTypes.string
}

function ProjectSummery(props) {

  const renderPage = () => {
    const {dir, contentText, description} = props

    if(!contentText || !description) return null
    return (
      <section className="project-page__section" dir={dir}>
        <h1 className="project-page__subtitle">
          {contentText.project_summery}
        </h1>
        <div className="project-page__text">
          <p>{description}</p>
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

export default multiLang(ProjectSummery)