import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../_HOC/lang.hoc'
Item.propTypes = {
  // from lang.hoc
  dir: PropTypes.string,
  // from OurTeam.index
  photo: PropTypes.any,
  fullName: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  descr: PropTypes.string
}

function Item(props) {
  const {dir, photo, fullName, post, descr} = props

  return (
    <article className="team-card">
      <div className="team-card__photo-wrapper">
        <img src={photo} alt={fullName} />
      </div>
      <div className="team-card__detail" dir={dir}>
        <h2 className="team-card__full-name">
          {fullName}
        </h2>
        <div className="team-card__post">
          {post}
        </div>
      </div>
    </article>
  )

}

export default multiLang(Item)