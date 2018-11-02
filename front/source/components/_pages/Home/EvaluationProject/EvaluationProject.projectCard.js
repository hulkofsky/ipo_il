import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import multiLang from '../../../_HOC/lang.hoc'

import ReactPlayer from 'react-player'

ProjectCard.propTypes = {
  // from EvaluationProjects.index
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  // from HOC Lang.hoc
  dir: PropTypes.string
}

function ProjectCard(props) {

  const {id, name, url, dir} = props
  return (
    <article className="evaluation-project-card">
      <Link to={`/home/${name}/${id}`} className="evaluation-project-card__player-wrapper">
        <div className="evaluation-project-card__player-mask" />
        <ReactPlayer url={url}
          width={290}
          height={150}
        />
      </Link>
      <div className="evaluation-project-card__info">
        <div className="evaluation-project-card__item" dir={dir}>
          <Link to={`/home/${name}/${id}`} className="evaluation-project-card__title">
            {name}
          </Link>
          <div className="evaluation-project-card__field">Field</div>
        </div>
      </div>
    </article>
  )

}

export default multiLang(ProjectCard)