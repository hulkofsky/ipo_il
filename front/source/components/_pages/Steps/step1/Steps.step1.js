import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'
import Form from './Steps.form'

Step1.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  lang: PropTypes.string,
  // from Steps.index
  checkedDetail: PropTypes.func,
  content: PropTypes.object,
  login: PropTypes.func
}

function Step1(props) {

  const onLinkClick = event => {
    event && event.preventDefault && event.preventDefault()

    const {login} = props
    login()
  }

  const renderPage = () => {
    const {dir, lang, checkedDetail, content} = props

    if (!content) return null

    return (
      <section className = "steps-page__content">
        <header className = "steps-page__header" dir = {dir}>
          <h1 className = "steps-page__title">
            {content[`personal.title`]}
          </h1>
          <div className = "steps-page__text steps-page__text-no-margin">
            {content[`personal.descr`]}
          </div>
          <a
            className = "steps-page__link"
            href = "#"
            onClick = {onLinkClick}
          >
            {content[`already_have`]}
          </a>
        </header>
        <div className = "steps-page__form-wrapper">
          <Form dir = {dir}
                lang = {lang}
                checkedDetail = {checkedDetail}
                content = {content}
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

export default multiLang(Step1)