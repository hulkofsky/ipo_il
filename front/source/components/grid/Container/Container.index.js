import React from 'react'
import PropTypes from 'prop-types'
import './Container.style.styl'

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ]),
  dir: PropTypes.string
}

function Container(props) {

  const {children, dir} = props
  return (
    <div className="container" dir = {dir}>
      {children}
    </div>
  )

}

export default Container