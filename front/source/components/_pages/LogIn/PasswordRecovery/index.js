import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import multilang from '../../../_HOC/lang.hoc'
import { history } from '../../../../history'

import axios from 'axios'

// style
import './password-recovery.styl'

// components
import Input from '../../../formFields/FormField.input'
import ErrorsAlert from '../../../ErrorsAlert/index'
import { BASE_URL } from '../../../../utils/routesBack'

class RecoveryPassword extends Component {

  static  propTypes = {}

  state = {
    password: {
      value: ``,
      errors: [],
      validationRules: []
    },
    confPass: {
      value: ``,
      errors: [],
      validationRules: []
    },
    errors: []
  }

  changeError = () => {
    this.setState(prevState => ({
      errors: [
        ...prevState.password.errors,
        ...prevState.confPass.errors
      ]
    }))
  }

  handlerChangeValue = event => {
    event && event.preventDefault && event.preventDefault()

    const {name, value} = event.target

    this.setState(prevState => {
      return {
        [name]: {
          ...prevState[name],
          value: value
        }
      }
    })
  }

  handlerChangeErrors = (evt, errors) => {
    const {name} = evt.target
    return this.setState({
      [name]: {
        ...this.state[name],
        errors: [...errors]
      }
    })
  }

  closeError = index => {
    const allErrors = this.state.errors
    allErrors.splice(index, 1)

    this.setState({
      errors: [...allErrors]
    })
  }

  disabledButton = () => {
    const array = []
    const errors = []

    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {

        if (key === `errors`)  continue

        errors.push(!!this.state[key].errors.length)

        if (this.state[key].optional === true && this.state[key].value === ``) array.push(true)
        else array.push(!!this.state[key].value)
      }
    }

    return (array.includes(false) || errors.includes(true))
  }

  handlerSubmit = (event) => {
    event && event.preventDefault && event.preventDefault()

    const {location, lang} = this.props

    axios({
      url: `${BASE_URL}/reset/${location.pathname.split(`/`)[location.pathname.split(`/`).length - 1]}`,
      headers: {
        'language': lang
      },
      method: 'PUT',
      data: {
        password: this.state.password.value,
        confPass: this.state.confPass.value
      }
    })
      .then(response => console.log(response))
      .then(() => history.replace('/log-in'))
      .catch(error => console.log(error))
  }


  render() {
    const {password, confPass, errors} = this.state

    return (
      <section className = "recovery-password">

        <ErrorsAlert errors = {errors} closeAlert = {this.closeError} />

        <div className = "recovery-password__inner-wrapper">
          <h1 className = "content-section__title">
            Recovery password
          </h1>
          <form
            className = "recovery-password__form"
            onSubmit = {this.handlerSubmit}
            noValidate
          >
            <div className = "recovery-password__field">
              <Input
                type = "password"
                name = "password"
                {...password}
                label = {`Enter your new password`}
                labelDone = {`new password`}
                validation = {[`minText`, `number`, `lowercase`, `uppercase`]}
                changeValue = {this.handlerChangeValue}
                changeErrors = {this.handlerChangeErrors}
                err = {this.changeError}
              />
            </div>
            <div className = "recovery-password__field">
              <Input
                type = "password"
                name = "confPass"
                {...confPass}
                label = {`Confirm your new password`}
                labelDone = {`confirm password`}
                validation = {[`confirmPassword`]}
                password = {password.value}
                changeValue = {this.handlerChangeValue}
                changeErrors = {this.handlerChangeErrors}
                err = {this.changeError}
              />
            </div>
            <div className = "sign-up__button-wrapper">
              <button type = "submit"
                      className = "sign-up__submit-button button button-main"
                      disabled = {this.disabledButton()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    )
  }

}

const mapStateToProps = null
const mapDispatchToProps = {}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multilang(RecoveryPassword)
  )
)