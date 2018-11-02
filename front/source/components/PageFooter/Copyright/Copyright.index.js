import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'
import './Copyright.style.styl'

Copyright.propTypes = {
  contentText: PropTypes.object,
  // from HOC Lang.hoc
  dir: PropTypes.string
}

function Copyright(props) {

  const date = new Date()
  const year = date.getFullYear()

  const render = function () {
    const {dir, contentText} = props

    if (!contentText) return null
    return (
      <div className="copyright__text">
        <span dir={dir}>
          {contentText[`footer.copyright1`]}
          {year}
          {contentText[`footer.copyright2`]}
        </span>
        <a href="#"
          className="copyright__text text-separator"
        >
          {contentText[`footer.privacy`]}
        </a>
        <a href="#"
          className="copyright__text text-separator"
        >
          {contentText[`footer.terms`]}
        </a>
        <a href="#"
          className="copyright__text text-separator"
        >
          {contentText[`footer.disclaimer`]}
        </a>
        <a href="#"
          className="copyright__text text-separator"
        >
          {contentText[`footer.security`]}
        </a>
      </div>
    )
  }

  return (
    <div className="copyright">
      {render()}
    </div>
  )

}

export default multiLang(Copyright)