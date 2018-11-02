import React from 'react';
import Carousel from '../../partials/Carousel';
import Tabs from '../../../../Tabs/Tabs.index';
import Tab from '../../../../Tabs/Tabs.item';
import DownloadButton from '../../../../DownloadButton/DownloadButton.index';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';
import Player from 'react-player';
import Loader from '../../partials/Loader';
import multi from '../../../../_HOC/lang.hoc';
import file from '../../../SignUp/images/Edo.pdf'

class ProjectSingle extends React.Component {
  render() {
    const { props } = this;
    const { lang, content, statisticButton, dir, match } = props;
    const { projectId } = match.params;
    const { pageContent, project } = content;
    let titles;

    if(pageContent[0][lang]['to_be_collected']) {
      titles = pageContent[0][lang];
    } else if(pageContent[1][lang]['to_be_collected']) {
      titles = pageContent[1][lang];
    }

    const { userId } = props.match.params;

    if(!project) {
      return <Loader />;
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

    return (
      <div dir={dir}>
        <div className="project-top project-block">
          <div className="project-top__video-wrap">
            <div
              className="project-top__video"
              >
                <Player url={getVideoUrl(project['video_url'])}
                  width='100%'
                  height='100%'
                  controls
                />
              </div>
            </div>
            <div className="project-top__info">
              <div className="project-top__info-list">
                <div className="project-top__info-item project-top__info-item-field">
                  <div className="project-top__info-field project-top__info-title">
                    {project['project_field']}
                  </div>
                </div>
                <div className="project-top__info-item">
                  <div className="project-top__info-title">
                    {titles['to_be_collected']}
                  </div>
                  <div className="project-top__info-value">
                    {project['money_to_collect']}
                  </div>
                </div>
                <div className="project-top__info-item">
                  <div className="project-top__info-title">
                    {titles['already_collected']}
                  </div>
                  <div className="project-top__info-value">
                    {project['money_collected']}
                  </div>
                </div>
                <div className="project-top__info-item">
                  <div className="project-top__info-title">
                    {titles['invested_amount']}
                  </div>
                  <div className="project-top__info-value invested">
                    {project['money_invested']}
                  </div>
                </div>
                <div className="project-top__info-item">
                  <div className="project-top__info-days">
                    {
                      daysAtAll( project['project_start_date'], project['project_finish_date'])
                    } {titles['days'] }
                  </div>
                  <div className="project-top__info-days">
                    {daysLeft(project['project_finish_date'])} {titles['days_left']}
                  </div>
                </div>
                {
                  statisticButton
                  && (
                    <div className="project-top__info-item statistic-button">
                      <Link to={`/dash/enterpreneur/${userId}/projects/${projectId}/statistic`} className=''>
                      <div className="project-top__statistic-button">
                        {titles['stat_btn']}
                      </div>
                    </Link>
                  </div>
                )
              }
            </div>
            <div className="project-top__info-descr-wrap">
              <div className="project-top__info-descr-title">
                {titles['project_summery']}
              </div>
              <div className="project-top__info-descr-text">
                {project['project_description']}
              </div>
            </div>
          </div>
        </div>
        <div className="project-bottom ">
          <div className="project__team project-block">
            <div className="project__team-header">
              <div className="project__team-title">
                {titles['our_team']}
              </div>
              <div className="project__team-members">
                {project['project_team'].length} {titles['members']}
              </div>
            </div>
            <div className="project__team-carsl">
              <Carousel
                rows={10}
                item={carslItem}
                items={ createItemsArray(project['project_team']) }
                itemsWrapper={carsItemsWrap}
              />
            </div>
          </div>
          <div className="project__docs project-block">
            <div className="project__docs-header">
              {titles['documentation']}
            </div>
            <div className="project__docs-tabs">
              <Tabs defaultActiveTabIndex={0} height={30} tabsAddClassName={'project__docs-tabs-tabs'}>
                <Tab title={titles['tashkif']}>
                  <div className="project__docs-download-wrap">
                    {
                      (
                        <DownloadButton
                          className="project__docs-tabs-button"
                          label={project['tashkif_file']}
                          text={titles['download_file']}
                          multiple={false}
                          file={file}
                        />
                      )
                    }
                  </div>
                </Tab>
                <Tab title={titles['other_docs']}>
                  <div className="project__docs-download-wrap">
                    {/* {project['project_files'].map( file => {
                      return (
                        <DownloadButton
                          className="project__docs-tabs-button"
                          label="Presentation Name. pptx"
                          text={titles['download_file']}
                          multiple={false}
                        />
                      )
                    })} */}
                    <DownloadButton
                      className="project__docs-tabs-button"
                      label="Presentation Name. pptx"
                      text={titles['download_file']}
                      multiple={false}
                      file={file}
                    />
                    <DownloadButton
                      className="project__docs-tabs-button"
                      label="File Name.xls"
                      text={titles['download_file']}
                      multiple={false}
                      file={file}
                    />
                    <DownloadButton
                      className="project__docs-tabs-button"
                      label="Report.pdf"
                      text={titles['download_file']}
                      multiple={false}
                      file={file}
                    />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function daysAtAll(startDate, finishDate) {
  const differentMs = new Date(finishDate) - new Date(startDate);
  return Math.ceil(differentMs / 1000 / 60 / 60 / 24);
}

function daysLeft(date) {
  const currentDate = new Date();
  const finishDate = new Date(date);
  const differentMs = finishDate.valueOf() - currentDate.valueOf();

  const days = Math.ceil(differentMs / 1000 / 60 / 60 / 24);
  return days;
}

function createItemsArray(items) {
  return items.map( item => {
    return carslItem(item);
  })
}

function carsItemsWrap({children}) {
  return (
    <div className="project__team-items-column">
      {children}
    </div>
  )
}

function carslItem(props) {

  return (
    <div className="project__team-item" key={uuid()}>
      <div className="project__team-item-img-wrap">
        <img className="project__tem-item-img" src={props['photo']} />
      </div>
      <div className="project__team-item-desrc">
        <div className="project__team-item-name">
          {props['first_tname']} {props['last_name']}
        </div>
        <div className="project__team-item-posе">
          {props['position']}
        </div>
      </div>
    </div>
  )
}

export default multi(ProjectSingle);
