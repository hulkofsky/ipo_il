import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'
import Form from './Steps.registrationForm'

Step1Registration.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Steps.index
  nextStep: PropTypes.func,
  content: PropTypes.object,
  banks: PropTypes.array,
  checkedDetail: PropTypes.func
}

function Step1Registration(props) {

  const renderPage = () => {
    const {
      dir,
      nextStep,
      content,
      banks,
      checkedDetail
    } = props

    if (!content) return null

    return (
      <section className="steps-page__content">
        <header className="steps-page__header" dir={dir}>
          <h1 className="steps-page__title">
            {content[`registration.title`]}
          </h1>
          <div className="steps-page__text">
            {content[`registration.descr`]}
          </div>
        </header>
        <div className="steps-page__form-wrapper">
          <Form dir={dir}
            nextStep={nextStep}
            content = {content}
            banks = {banks}
            checkedDetail = {checkedDetail}
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

export default multiLang(Step1Registration)