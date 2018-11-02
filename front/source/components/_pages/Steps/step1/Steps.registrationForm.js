import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setStatus, setTouched } from '../../../../redux/reducers/steps.reducer'
import { loginSuccess } from "../../../../redux/reducers/loginUser.reducer"
import { dataToSubmit } from "../../../formFields/utils"
import multiLang from '../../../_HOC/lang.hoc'

import Select from '../../../formFields/FormField.select'
import Input from '../../../formFields/FormField.input'
import Checkbox from '../../SignUp/SignUp.checkbox'
import axios from "axios"
import {BASE_URL} from "../../../../utils/routesBack"

class StepsFormRegistration extends Component {

  static propTypes = {
    // from Steps.step1.registration
    dir: PropTypes.string,
    nextStep: PropTypes.func,
    content: PropTypes.object,
    banks: PropTypes.array,
    checkedDetail: PropTypes.func,
    // from connect
    setStatus: PropTypes.func,
    setTouched: PropTypes.func,
    loginSuccess: PropTypes.func,
    // from HOC lang
    lang: PropTypes.string
  }

  componentDidMount() {
    const {setTouched} = this.props
    setTouched(`step1`)
  }

  state = {
    account_number: {
      value: window.sessionStorage.getItem(`stepRegistration`) ? JSON.parse(window.sessionStorage.getItem(`stepRegistration`)).account_number : ``,
      errors: [],
      validationRules: []
    },
    password: {
      value: window.sessionStorage.getItem(`stepRegistration`) ? JSON.parse(window.sessionStorage.getItem(`stepRegistration`)).password : ``,
      errors: [],
      validationRules: []
    },
    confPass: {
      value: window.sessionStorage.getItem(`stepRegistration`) ? JSON.parse(window.sessionStorage.getItem(`stepRegistration`)).confPass : ``,
      errors: [],
      validationRules: []
    },
    bank: {
      selectedOption: localStorage.getItem('registerInvestorDataBank') ? JSON.parse(localStorage.getItem('registerInvestorDataBank')).selectedOption : '',
      value: localStorage.getItem('registerInvestorDataBank') ? JSON.parse(localStorage.getItem('registerInvestorDataBank')).value : '',
      errors: [],
      validationRules: []
    },
    branch_code: {
      selectedOption: localStorage.getItem('registerInvestorDataBranch') ? JSON.parse(localStorage.getItem('registerInvestorDataBranch')).selectedOption : '',
      value: localStorage.getItem('registerInvestorDataBranch') ? JSON.parse(localStorage.getItem('registerInvestorDataBranch')).value : '',
      errors: [],
      validationRules: []
    },
    agree: {
      value: window.sessionStorage.getItem(`stepRegistration`) ? JSON.parse(window.sessionStorage.getItem(`stepRegistration`)).agree : false,
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

  onChangeValidationRules = (event, rules) => {
    const {name} = event.target
    return this.setState({
      [name]: {
        // eslint-disable-next-line
        ...this.state[name],
        validationRules: [...rules]
      }
    })
  }

  handleChangeSelectBranch = (selectedOption) => {
    return this.setState({
      branch_code: {
        // eslint-disable-next-line
        ...this.state.branch_code,
        value: selectedOption.value,
        selectedOption
      }
    })
  }

  onChangeSelect = (selectedOption) => {
    return this.setState({
      bank: {
        // eslint-disable-next-line
        ...this.state.bank,
        value: selectedOption.value,
        selectedOption
      }
    })
  }

  onSubmit = event => {
    event && event.preventDefault && event.preventDefault()
    const {nextStep, lang, loginSuccess} = this.props

    dataToSubmit(this.state)
      .then((data) => {

        window.sessionStorage.setItem(`stepRegistration`, JSON.stringify(data))
        localStorage.setItem('registerInvestorDataBank', JSON.stringify(this.state.bank))
        localStorage.setItem('registerInvestorDataBranch', JSON.stringify(this.state.branch_code))

        const sendData = {
          first_name: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).first_name : ``,
          last_name: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).last_name : ``,
          email: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).email : ``,
          phone: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).phone : ``,
          account_number: this.state.account_number.value,
          password: this.state.password.value,
          confPass: this.state.confPass.value,
          bank_name: this.state.bank.value,
          branch_code: this.state.branch_code.value,
          agree: this.state.agree.value
        }

        axios({
          url: `${BASE_URL}/signupinvestor`,
          method: `POST`,
          headers: {
            'language': lang
          },
          data: sendData
        })
          .then(response => {

            axios({
              method: `POST`,
              url: `${BASE_URL}/signin`,
              headers: {
                'language': lang
              },
              data: {
                userEmail: sendData.email,
                userPassword: sendData.password
              },
            })
              .then(response => {

                loginSuccess(response)
                window.localStorage.setItem(`user-token`, response.data.token)
                window.localStorage.setItem(`user-name`, response.data.user.ceo_name ? response.data.user.ceo_name : `${response.data.user.first_name} ${response.data.user.last_name}`)
                window.localStorage.setItem(`user-type`, response.data.user.ceo_name ? `enterpreneur` : `investor`)
                window.localStorage.setItem(`user-id`, response.data.user.id)

                window.localStorage.setItem(`branch`, JSON.stringify(response.data.branch))

                window.localStorage.setItem(`user-first-name`, response.data.user.first_name)
                window.localStorage.setItem(`user-last-name`, response.data.user.last_name)
                window.localStorage.setItem(`user-email`, response.data.user.email)
                window.localStorage.setItem(`user-phone`, response.data.user.phone)
                window.localStorage.setItem(`user-account`, `${response.data.user.account_number}`)
                response.data.user.ceo_name ? window.localStorage.setItem(`user-bank`, JSON.stringify('')) : window.localStorage.setItem(`user-bank`, JSON.stringify(response.data.user.banks.name))
              })
              .catch(error => window.console.error(error))
          })
          .catch(error => window.console.error(error))


      })
      .then(
        setTimeout(nextStep, 300)
      )
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

  getSelectOptions = () => {
    const {banks} = this.props

    if (!banks) return [{
      value: ``,
      label: ``
    }]

    return banks.map(bank => {
      const bankArray = bank.name.split('"')
      const bankName = bankArray[1] ? `${bankArray.slice(1)}"${bankArray[0]}` : `${bankArray[0]}`

      return {
        value: bank.name,
        label: bankName
      }
    })
  }

  getSelectOptionsBranch() {
    const {banks} = this.props
    const {bank} = this.state

    if (!banks) return [{
      value: ``,
      label: ``
    }]

    const bank1 = banks.find(item => item.name === bank.value) || ``

    if (!bank1) return

    return bank1.branches.map(branch => {
      return {
        value: branch.branch_code,
        label: branch.branch_name
      }
    })

  }

  saveData = () => {
    const {checkedDetail} = this.props

    dataToSubmit(this.state)
      .then(data => {
        checkedDetail()
        window.sessionStorage.setItem(`stepRegistration`, JSON.stringify(data))
        localStorage.setItem('registerInvestorDataBank', JSON.stringify(this.state.bank))
        localStorage.setItem('registerInvestorDataBranch', JSON.stringify(this.state.branch_code))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  renderPage = () => {
    const {dir, content} = this.props
    const {agree, bank, account_number, password, confPass, branch_code} = this.state

    if (!content) return null

    return (
      <form className="steps-page__form"
        noValidate
        onSubmit={this.onSubmit}
      >
        <div className="steps-page__field-wrapper">
          <div className="steps-page__control-wrapper">
            <Select placeholder={content[`bank_field`]}
              updateValue={this.onChangeSelect}
              selected={bank.selectedOption}
              value={bank.value}
              options={this.getSelectOptions()}
              labelDone={content[`bank_label.label`]}
            />
          </div>

          <div className="steps-page__control-wrapper">
          <Select placeholder = "Select branch"
            //placeholder={contentText[`investor.bank`]}
                  updateValue={this.handleChangeSelectBranch}
                  selected={branch_code.selectedOption}
                  value={branch_code.value}
                  options={this.getSelectOptionsBranch()}
                  labelDone = "Bank branch"
            // labelDone={contentText[`investor.bank.label`]}
          />
          </div>

          <div className="steps-page__control-wrapper">
            <Input type="text"
              name="account_number"
              {...account_number}
              label={content[`bank.account_number_field`]}
              labelDone={content[`bank.account_number_field.label`]}
              validation={[`required`, `accountNumber`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Input type="password"
              name="password"
              {...password}
              label={content[`password_field`]}
              labelDone={content[`password_field.label`]}
              validation={[`required`, `minText`, `number`, `lowercase`, `uppercase`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
              changeValidationRules={this.onChangeValidationRules}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Input type="password"
              name="confPass"
              {...confPass}
              label={content[`confirm_pass_field`]}
              labelDone={content[`password_field.label`]}
              validation={[`required`, `confirmPassword`]}
              changeValue={this.onChangeValue}
              changeErrors={this.onChangeErrors}
              password={confPass.value}
            />
          </div>
          <div className="steps-page__control-wrapper">
            <Checkbox name="agree"
              {...agree}
              changeValue={this.onChangeValue}
              content = {content}
              onclick = {this.saveData}
            />
          </div>
        </div>
        <div className="steps-page__button-wrapper steps-page__button-wrapper--center" dir={dir}>
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
const mapDispatchToProps = {setStatus, setTouched, loginSuccess}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multiLang(StepsFormRegistration)
  )
)
