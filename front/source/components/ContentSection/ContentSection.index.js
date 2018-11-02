import React from 'react'
import PropTypes from 'prop-types'
import './ContentSection.style.styl'

ContentSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node
  ]),
  className: PropTypes.string
}

function ContentSection(props) {

  const setClassName = () => {
    const {className} = props
    let template = `content-section`
    if (className.length) template += ` ${className}`
    return template
  }

  const {children} = props
  return (
    <section className={setClassName()}>
      {children}
    </section>
  )

}

export default ContentSection