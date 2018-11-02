import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'
import Detail from './Steps.step4.detail'
import Signature from './Steps.step4.signature'

Step4.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Steps.index
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  content: PropTypes.object,
  project: PropTypes.object,
}

function Step4(props) {

  const renderPage = () => {
    const {dir, nextStep, prevStep, content, project} = props

    if (!content || !project) return null

    return (
      <section className="steps-page__content">
        <header className="steps-page__header" dir={dir}>
          <h1 className="steps-page__title">
            {content[`signin.title`]}
          </h1>
          <div className="steps-page__text">
            {content[`signin.descr`]}
          </div>
        </header>
        <Detail content = {content} project = {project} />
        <Signature content = {content}
          project = {project}
          nextStep={nextStep}
          prevStep={prevStep}
        />

      </section>
    )
  }

  return (
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

export default multiLang(Step4)