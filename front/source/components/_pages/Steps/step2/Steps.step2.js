import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'

import Form from './Steps.step2.form'

Step2.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Steps.index
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  content: PropTypes.object
}

function Step2(props) {

  const {dir, prevStep, nextStep, content} = props
  return (
    <section className="steps-page__content">
      <header className="steps-page__header" dir={dir}>
        <h1 className="steps-page__title">
          {content[`bank.title`]}
        </h1>
        <div className="steps-page__text">
          {content[`bank.descr`]}
        </div>
      </header>
      <div className="steps-page__form-wrapper">
        <Form dir={dir}
          nextStep={nextStep}
          prevStep={prevStep}
          content = {content}
        />
      </div>
    </section>
  )

}

export default multiLang(Step2)