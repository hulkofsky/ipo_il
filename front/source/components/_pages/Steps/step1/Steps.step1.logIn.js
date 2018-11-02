import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'
import Form from './Steps.formLogin'

class Step1LogIn extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    // from Steps.index
    nextStep: PropTypes.func,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    content: PropTypes.object
  }

  renderPage = () => {
    const {
      dir,
      nextStep,
      openModal,
      closeModal,
      isModalOpen,
      content
    } = this.props

    if (!content) return null

    return (
      <section className = "steps-page__content">
        <header className = "steps-page__header" dir = {dir}>
          <h1 className = "steps-page__title">
            {content[`log_in.title`]}
          </h1>
          <div className = "steps-page__text">
            {content[`log_in.descr`]}
          </div>
        </header>
        <div className = "steps-page__form-wrapper">
          <Form
            dir = {dir}
            nextStep = {nextStep}
            openModal = {openModal}
            closeModal = {closeModal}
            isModalOpen = {isModalOpen}
            content = {content}
          />
        </div>
      </section>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderPage()}
      </Fragment>
    )
  }

}

export default multiLang(Step1LogIn)