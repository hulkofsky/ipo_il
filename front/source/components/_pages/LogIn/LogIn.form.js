import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { dataToSubmit } from '../../formFields/utils'
import multilang from '../../_HOC/lang.hoc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { showOverlay } from '../../../redux/reducers/overlay.reducer'
import {loginSuccess, logout, authError, authRequest, authSuccess} from "../../../redux/reducers/loginUser.reducer"
import './LogIn.style.styl'
import axios from "axios"
import {BASE_URL} from "../../../utils/routesBack"
import { history } from "../../../history"

import Input from '../../formFields/FormField.input'
import Loader from '../../Loader/Loader'

class LogInForm extends Component {

  static propTypes = {
    contentText: PropTypes.object,
    // from LogIn.form
    openModal: PropTypes.func,
    forgotPassword: PropTypes.func,
    // // from lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from connect
    showOverlay: PropTypes.func,
    authRequest: PropTypes.func,
    authSuccess: PropTypes.func,
    loginSuccess: PropTypes.func,
    authError: PropTypes.func,
    logout: PropTypes.func,
    login: PropTypes.func,
    loading: PropTypes.bool
  }

  state = {
    userEmail: {
      value: ``,
      errors: [],
      validationRules: []
    },
    userPassword: {
      value: ``,
      errors: [],
      validationRules: []
    }
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

  handleChangeValidationRules = (evt, rules) => {
    const {name} = evt.target
    return this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        validationRules: [...rules]
      }
    })
  }

  login = (userData, lang) => {
    const {authRequest, authSuccess, loginSuccess, authError, logout} = this.props

    return new Promise((resolve, reject) => {

      authRequest()

      axios({
        method: `POST`,
        url: `${BASE_URL}/signin`,
        headers: {
          'language': lang
        },
        data: userData,
      })
        .then(response => {

          if (response) {
            authSuccess()
            loginSuccess(response)
            window.localStorage.setItem(`user-token`, response.data.token)
            window.localStorage.setItem(`user-name`, response.data.user.ceo_name ? response.data.user.ceo_name : `${response.data.user.first_name} ${response.data.user.last_name}`)
            window.localStorage.setItem(`user-type`, response.data.user.ceo_name ? `enterpreneur` : `investor`)
            window.localStorage.setItem(`user-id`, response.data.user.id)

            window.localStorage.setItem(`user-first-name`, response.data.user.first_name)
            window.localStorage.setItem(`user-last-name`, response.data.user.last_name)
            window.localStorage.setItem(`user-email`, response.data.user.email)
            window.localStorage.setItem(`user-phone`, response.data.user.phone)
            window.localStorage.setItem(`user-account`, `${response.data.user.account_number}`)
            response.data.user.ceo_name ? window.localStorage.setItem(`user-bank`, JSON.stringify('')) : window.localStorage.setItem(`user-bank`, JSON.stringify(response.data.user.banks.name))

            resolve(response)
          }
          else {
            throw new Error(`Cannot fetch data`)
          }
        })
        .catch(error => {
          authError()
          logout()
          reject(error)
        })

    })
  }

  handleSubmit = evt => {
    evt && evt.preventDefault && evt.preventDefault()

    const {lang} = this.props

    dataToSubmit(this.state)
      .then(data => {

        this.login(data, lang)
          .then(response => {

            response.data.user.ceo_name ?
              history.replace(`dash/enterpreneur/${response.data.user.id}/projects`)
              :
              history.replace(`dash/investor/${response.data.user.id}/purchasedprojects`)
          })
          .catch(error => {
            window.console.error(`---LOGIN ERROR`, error.message)
          })
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

  onClick = () => {
    // const {showOverlay, openModal} = this.props
    // showOverlay()
    // openModal()
    const {forgotPassword} = this.props
    forgotPassword()
  }

  renderPage() {
    const {dir, lang, contentText, loading} = this.props
    const {userEmail, userPassword} = this.state

    if (!contentText) return null

    if (loading) return <Loader />
    return (
      <form className="log-in"
        noValidate
        onSubmit={this.handleSubmit}
      >

        <div className="log-in__container">
          <Input type="email"
            name="userEmail"
            {...userEmail}
            label={contentText[`log_in.email_field`]}
            labelDone={contentText[`log_in.email_field.label`]}
            validation={[`required`, `email`]}
            changeValue={this.handleChangeValue}
            changeErrors={this.handleChangeErrors}
          />
          <Input type="password"
            name="userPassword"
            {...userPassword}
            label={contentText[`log_in.pass_field`]}
            labelDone={contentText[`log_in.pass_field.label`]}
            validation={[`required`]}
            changeValue={this.handleChangeValue}
            changeErrors={this.handleChangeErrors}
          />
          <div className="log-in__forgot" dir={dir}>
            <a href="#"
              className="log-in__forgot-link"
              dir={dir}
              onClick={this.onClick}
            >
              {contentText[`log_in.forgot_link`]}
            </a>
          </div>
        </div>


        <div className="sign-up__button-wrapper">
          <button type="submit"
            className="sign-up__submit-button button button-main"
            disabled={this.disabledButton()}
            dir={dir}
          >
            Log In
          </button>
        </div>

      </form>
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

const mapStateToProps = state => ({
  loading: state.login.loading
})
const mapDispatchToProps = {showOverlay,  authError, authRequest, authSuccess, logout, loginSuccess}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multilang(LogInForm)
  )
)