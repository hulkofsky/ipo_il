import React , { Component } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'
import {dataToSubmit} from "../../formFields/utils"
import { history } from "../../../history"
import axios from 'axios'

// components
import Input from '../../formFields/FormField.input'
import {BASE_URL} from "../../../utils/routesBack"


export class FormForgotPassword extends Component {

  static PropTypes = {
    // from Login.index
    restorePassword: PropTypes.func,
    // from HOC lang
    lang: PropTypes.string,
    dir: PropTypes.string
  }

  state = {
    email: {
      value: ``,
      errors: [],
      validationRules: []
    },
  }

  handleChangeValue = (evt, file) => {
    const {name, type, value, checked} = evt.target

    return this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        value: type === `checkbox` ? checked : value
      }
    })
  }

  handleChangeErrors = (evt, errors) => {
    const {name} = evt.target
    return this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        errors: [...errors]
      }
    })
  }

  disabledButton = () => {
    const array = []
    const errors = []

    /* eslint-disable */
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        errors.push(!!this.state[key].errors.length)

        if (this.state[key].optional === true && this.state[key].value === ``) array.push(true)
        else array.push(!!this.state[key].value)
      }
    }
    /* eslint-enabled */
    return (array.includes(false) || errors.includes(true))
  }

  handlerSubmit = event => {
    event && event.preventDefault && event.preventDefault()

    const {restorePassword, lang} = this.props

    dataToSubmit(this.state)
      .then(data => {
        axios({
          url: `${BASE_URL}/forgotpassword`,
          method: `POST`,
          headers: {
            'language': lang
          },
          data: data
        })
          .then(response => {
            history.replace(`/password-recovery/${response.data.data.token}`)
          })
          .catch(error => window.console.log(error))
      })

    restorePassword()
  }

  render() {
    const {email} = this.state

    return (
      <form className = "login__form-forgot-p"
            noValidate
            onSubmit = {this.handlerSubmit}
      >
        <div className="login__form-forgot-p-field">
          <Input type="email"
                 name="email"
                 {...email}
                 label={`Enter your email`}
                 labelDone={`email`}
                 validation={[]}
                 changeValue={this.handleChangeValue}
                 changeErrors={this.handleChangeErrors}
          />
          <div className="sign-up__button-wrapper">
            <button type="submit"
                    className="sign-up__submit-button button button-main"
                    disabled={this.disabledButton()}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default multiLang(FormForgotPassword)