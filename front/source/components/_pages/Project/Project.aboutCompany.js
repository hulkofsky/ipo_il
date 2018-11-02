import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'

import ReactPlayer from 'react-player'

ProjectAboutCompany.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Project.index
  contentText: PropTypes.object,
  videoUrl: PropTypes.string
}

function ProjectAboutCompany(props) {

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

  const renderPage = () => {
    const {dir, contentText, videoUrl} = props

    if (!contentText || !videoUrl) return null

    return (
      <section className="project-page__section">
        <h1 className="project-page__subtitle" dir={dir}>
          {contentText.about_company}
        </h1>
        <div className="project-page__video-about-company">
          <ReactPlayer url={getVideoUrl(videoUrl)}
            width={400}
            height={250}
            controls
          />
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

export default multiLang(ProjectAboutCompany)