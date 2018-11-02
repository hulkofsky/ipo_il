import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../_HOC/lang.hoc'

Link.propTypes = {
  // from SocialLinks.index
  icon: PropTypes.node,
  url: PropTypes.string,
  name: PropTypes.string,
  // from HOC Lang.hoc
  dir: PropTypes.string
}

function Link(props) {

  const {dir, icon, name, url} = props
  return (
    <a href={url}
      className="social-Links__link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="social-Links__icon-wrapper">
        <img src={icon} alt={name} />
      </div>
      <div className="social-Links__text" dir={dir}>
        {name}
      </div>
    </a>
  )

}

export default multiLang(Link)