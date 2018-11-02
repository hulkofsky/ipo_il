import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multilang from '../../_HOC/lang.hoc'
import axios from 'axios'

import ReactPlayer from 'react-player'
import ProgressBarCircle from '../../ProgressBarCircle/ProgressBarCircle.index'
import { BASE_URL } from '../../../utils/routesBack'

ProjectHeader.propTypes = {
  // from lang.hoc
  dir: PropTypes.string,
  lang: PropTypes.string,
  // from Project.index
  purchaseButtonClick: PropTypes.func,
  // from Project.index
  contentText: PropTypes.object,
  contentButtonText: PropTypes.object,
  project: PropTypes.object
}

function ProjectHeader(props) {

  const isEntrepreneur = window.localStorage.getItem(`user-type`) === `enterpreneur`

  const handleSubscribe = (event) => {
    event && event.preventDefault && event.preventDefault()

    const {lang, contentText} = props
    const projectId = contentText.id
    const investorId = window.localStorage.getItem(`user-id`)

    axios({
      url: `${BASE_URL}/project/${investorId}/subscribe/${projectId}`,
      method: `POST`,
      headers: {
        'language': lang
      },
      data: ``
    })
      .then((response) => window.console.log('--- projectPage/project ', response))
      .catch((error) => window.console.log('--- projectPage/project/ERROR', error))
  }

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

  const formatDay = () => {
    const {contentText} = props

    const today = Date.now()
    const lastDay = Date.parse(contentText.project_finish_date)
    const daysToGo = lastDay - today
    return daysToGo > 0 ? Math.floor(daysToGo / 1000 / 60 / 60 / 24) : 0
  }

  const renderPurchaseButton = () => {
    const {
      project,
      purchaseButtonClick,
      contentButtonText
    } = props

    if (
      !isEntrepreneur &&
      (project.project_statuses.status_name === 'approved')
    ) {
      return (
        <button
          onClick = {purchaseButtonClick}
          type = "button"
          className = "project-page__button button button-main"
        >
          {contentButtonText.purchase_btn}
        </button>
      )

    }

  }

  const renderSubscribeButton = () => {
    const {
      project,
      contentButtonText
    } = props

    if (
      !isEntrepreneur &&
      project.project_statuses.status_name === 'under_eval'
    ) {
      return (
        <button
          type = "button"
          className = "project-page__button button button-bordered"
          onClick = {handleSubscribe}
        >
          {contentButtonText.subscribe_btn}
        </button>
      )
    }

  }

  const renderPage = () => {
    const {dir, contentText, contentButtonText} = props

    if (!contentText || !contentButtonText) return null

    return (
      <header className = "content-section__header">
        <h1 className = "content-section__title">
          {contentText.project_name}
        </h1>
        <div className = "project-page__container" dir = {dir}>
          <div className = "project-page__project-video">
            <ReactPlayer
              url = {getVideoUrl(contentText.video_url)}
              width = {595}
              height = {375}
              controls
              playing
            />
          </div>
          <div className = "project-page__detail">
            <div className = "project-page__progress-bar">
              <ProgressBarCircle
                dynamicValue = {contentText.money_collected}
                staticValue = {contentText.money_to_collect}
              />
            </div>
            <div className = "project-page__funds">
              {contentText.money_collected} ILS Pledged
            </div>
            <div className = "project-page__finish-date">
              {formatDay()} days to go
            </div>
            <div className = "project-page__buttons-wrapper">
              {renderPurchaseButton()}
              {renderSubscribeButton()}
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <Fragment>
      {renderPage()}
    </Fragment>

  )

}

export default multilang(ProjectHeader)