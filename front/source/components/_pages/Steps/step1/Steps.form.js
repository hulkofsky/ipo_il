import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { dataToSubmit } from '../../../formFields/utils'
import { connect } from 'react-redux'
import { emailExists } from '../../../../redux/reducers/steps.reducer'
import Input from '../../../formFields/FormField.input'
import axios from 'axios'
import {BASE_URL} from "../../../../utils/routesBack"

class StepsForm extends Component {

  static propTypes = {
    // from Steps.step1
    dir: PropTypes.string,
    lang: PropTypes.string,
    content: PropTypes.object,
    // from Steps.index
    checkedDetail: PropTypes.func,
    // from connect
    emailExists: PropTypes.func
  }

  state = {
    first_name: {
      value:  window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).first_name : ``,
      errors: [],
      validationRules: []
    },
    last_name: {
      value: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).last_name : ``,
      errors: [],
      validationRules: []
    },
    email: {
      value: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).email : ``,
      errors: [],
      validationRules: []
    },
    phone: {
      value: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).phone : ``,
      errors: [],
      validationRules: []
    }
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
    const {checkedDetail, lang, emailExists} = this.props

    dataToSubmit(this.state)
      .then(data => {
        window.sessionStorage.setItem(`stepCheck`, JSON.stringify(data))

        axios({
          url: `${BASE_URL}/firstcheck`,
          method: `POST`,
          headers: {
            'language': lang
          },
          data: data
        })
          .then(response => {
            if (!response.data.success) {
              emailExists(true)
            }
            else {
              emailExists(false)
            }

          })
          .catch(error => window.console.error(error))

      })
      .then(() => checkedDetail())
  }

  disabledButton = () => {
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

    return (array.includes(false) || errors.includes(true))
  }

  renderPage = () => {
    const {first_name, last_name, email, phone} = this.state
    const {content} = this.props

    if (!content) return null

    return (
      <form className="steps-page__form"
        noValidate
        onSubmit={this.onSubmit}
      >
        <div className="steps-page__field-wrapper">
          <div className="steps-page__control-wrapper">
            <Input type="text"
              name="first_name"
              {...first_name}
              label={content[`first_name_field`]}
              labelDone={content[`first_name_field.label`]}
              validation={[`required`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Input type="text"
              name="last_name"
              {...last_name}
              label={content[`last_name_field`]}
              labelDone={content[`last_name_field.labe`]}
              validation={[`required`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Input type="email"
              name="email"
              {...email}
              label={content[`email_field`]}
              labelDone={content[`email_field.labe`]}
              validation={[`required`, `email`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Input type="text"
              name="phone"
              {...phone}
              label={content[`phone_field`]}
              labelDone={content[`phone_field.labe`]}
              validation={[`required`, `phone`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
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

const mapStateToProps = null
const mapDispatchToProps = { emailExists }

export default connect(mapStateToProps, mapDispatchToProps)(StepsForm)