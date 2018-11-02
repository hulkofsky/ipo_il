import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { dataToSubmit } from '../../../formFields/utils'
import Input from '../../../formFields/FormField.input'
import { showOverlay } from '../../../../redux/reducers/overlay.reducer'
import { setStatus, setTouched } from '../../../../redux/reducers/steps.reducer'
import { authError, authRequest, authSuccess, logout, loginSuccess } from '../../../../redux/reducers/loginUser.reducer'
import Modal from '../../LogIn/LogIn.modal'
import { BASE_URL } from '../../../../utils/routesBack'
import axios from 'axios/index'
import { history } from '../../../../history'
import multilang from '../../../_HOC/lang.hoc'

class StepsForm extends Component {

  static propTypes = {
    // from Steps.step1
    dir: PropTypes.string,
    // from Steps.index
    nextStep: PropTypes.func,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    isModalOpen: PropTypes.bool,
    content: PropTypes.object,
    // from connect
    setStatus: PropTypes.func,
    setTouched: PropTypes.func,
    // from HOC multilang
    lang: PropTypes.string

  }

  state = {
    userEmail: {
      value: window.sessionStorage.getItem(`stepLogin`) ? JSON.parse(window.sessionStorage.getItem(`stepLogin`)).email : ``,
      errors: [],
      validationRules: []
    },
    userPassword: {
      value: window.sessionStorage.getItem(`stepLogin`) ? JSON.parse(window.sessionStorage.getItem(`stepLogin`)).password : ``,
      errors: [],
      validationRules: []
    }
  }

  componentDidMount() {
    const {setTouched} = this.props
    setTouched(`step1`)
  }

  onChangeValue = event => {
    const {name, type, value, checked} = event.target

    return this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        value: type === `checkbox` ? checked : value
      }
    })
  }

  onChangeErrors = (event, errors) => {
    const {name} = event.target
    return this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        errors: [...errors]
      }
    })
  }

  onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    const {nextStep, lang} = this.props

    dataToSubmit(this.state)
      .then(data => {

        this.login(data, lang)
          .then(() => {
            window.sessionStorage.setItem(`stepLogin`, JSON.stringify(data))
          })
          .then(() => {
            window.setTimeout(nextStep, 200)
          })
          .catch(error => {
            window.console.error(`---LOGIN ERROR`, error.message)
          })

      })

  }

  disabledButton = () => {
    const {setStatus} = this.props

    let array = []
    let errors = []

    /* eslint-disable */
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        array.push(!!this.state[key].value)
        errors.push(!!this.state[key].errors.length)
      }
    }
    /* eslint-enabled */
    setStatus(`step1`, !(array.includes(false) || errors.includes(true)))
    return (array.includes(false) || errors.includes(true))
  }

  onClick = () => {
    const {showOverlay, openModal} = this.props
    showOverlay()
    openModal()
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

  renderPage = () => {
    const {userEmail, userPassword} = this.state
    const {dir, isModalOpen, closeModal, content} = this.props

    if (!content) return null

    return (
      <form className="steps-page__form"
        noValidate
        onSubmit={this.onSubmit}
      >
        <div className="steps-page__field-wrapper steps-page__field-wrapper--center">
          <div className="steps-page__control-wrapper">
            <Input type="email"
              name="userEmail"
              {...userEmail}
              label={content[`email_field`]}
              labelDone={content[`email_field.labe`]}
              validation={[`required`, `email`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Input type="password"
              name="userPassword"
              {...userPassword}
              label={content[`password_field`]}
              labelDone={content[`password_field.label`]}
              validation={[`required`, `minText`, `number`, `lowercase`, `uppercase`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
          </div>
          {isModalOpen && <Modal close={closeModal} contentText = {content} />}
          <div className="log-in__forgot">
            <a href="#"
              className="log-in__forgot-link"
              dir={dir}
              onClick={this.onClick}
            >
              {content[`log_in.forgot_link`]}
            </a>
          </div>
        </div>
        <div className="steps-page__button-wrapper steps-page__button-wrapper--center">
          <button className="steps-page__button button button-main"
            type="submit"
            disabled={this.disabledButton()}
          >
            {content[`next_btn`]}
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

const mapStateToProps = (state) => ({
  loading: state.login.loading
})
const mapDispatchToProps = {
  showOverlay,
  setStatus,
  setTouched,
  authError,
  authRequest,
  authSuccess,
  logout,
  loginSuccess
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multilang(StepsForm)
  )
)