import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './SignUp.entrepreneur.style.styl'
import { formDataToSubmit } from '../../formFields/utils'
import multiLang from '../../_HOC/lang.hoc'
import { imageToBase64 } from '../../formFields/utils'
import { convertObjectToArray } from '../../../utils/helpers'
import axios from 'axios'
import { history } from '../../../history'
import { numberWithCommas } from '../../../utils/helpers'

import { connect } from 'react-redux'

import Input from '../../formFields/FormField.input'
import Select from '../../formFields/FormField.select'
import NDA from './SignUp.entrepreneur.NDA'
import InputFile from '../../formFields/FormField.file'
import TeamMembersFields from './TeamMembersFields'
import { signUp } from '../../../redux/reducers/pageContent.reducer'
import { BASE_URL } from '../../../utils/routesBack'

class EntrepreneurForm extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from SignUp.index
    contentText: PropTypes.object,
    countries: PropTypes.object
  }

  state = {
    company_name: {
      value: ``,
      errors: [],
      validationRules: []
    },
    ceo_name: {
      value: ``,
      errors: [],
      validationRules: []
    },
    company_email: {
      value: ``,
      errors: [],
      validationRules: []
    },
    funding_sum: {
      value: ``,
      errors: [],
      validationRules: []
    },
    password: {
      value: ``,
      errors: [],
      validationRules: []
    },
    vat_number: {
      value: ``,
      errors: [],
      validationRules: []
    },
    country_of_registration: {
      selectedOption: ``,
      value: ``,
      errors: [],
      validationRules: []
    },
    company_phone: {
      value: ``,
      errors: [],
      validationRules: []
    },
    last_year_sales: {
      value: ``,
      errors: [],
      validationRules: []
    },
    confPass: {
      value: ``,
      errors: [],
      validationRules: []
    },
    video_url: {
      optional: true,
      value: ``,
      errors: [],
      validationRules: []
    },
    download: {
      download: false,
      errors: []
    },
    company_presentation: {
      optional: true,
      value: ``,
      errors: [],
      validationRules: []
    },
    financial_report: {
      optional: true,
      value: ``,
      errors: [],
      validationRules: []
    },
    team_members: [
      {
        id: Date.now() + Math.random(),
        first_name: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        last_name: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        position: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        fb_link: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        linkedin_link: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        photo: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        }
      }
    ]
  }

  onDeleteValue = (name, id, node) => {
    const {team_members} = this.state
    const prevStateArray = team_members
    const arr = []

    Promise.all(team_members.map((item, index) => {
      if (id === index && name === `photo`) {
        return new Promise(
          (resolve, reject) => {

            arr.push({...team_members[id], [name]: {...team_members[id][name], value: ``}})
            node.value = ``
            resolve()

          }
        )
      } else {
        return item
      }
    }))
      .then(
        () => {
          const rez = prevStateArray.map(item => {
            if (item.id === arr[0].id) {
              return arr[0]
            }
            return item
          })

          return this.setState({
            team_members: [
              ...rez
            ]
          })
        })

  }

  onUpdateValue = (event, id) => {
    const {value, name, files} = event.target
    const {team_members} = this.state
    const prevStateArray = team_members
    const arr = []

    Promise.all(team_members.map((item, index) => {
      if (id === index && name === `photo`) {
        return new Promise(
          (resolve, reject) => {
            imageToBase64(files[0])
              .then((base64) => {
                arr.push({...team_members[id], [name]: {...team_members[id][name], value: base64}})
                resolve()
              })
          }
        )
      } else if (id === index) {
        return new Promise(
          (resolve, reject) => {
            arr.push({...team_members[id], [name]: {...team_members[id][name], value}})
            resolve()
          }
        )
      } else {
        return item
      }
    }))
      .then(
        () => {
          const rez = prevStateArray.map(item => {
            if (item.id === arr[0].id) {
              return arr[0]
            }
            return item
          })

          return this.setState({
            team_members: [
              ...rez
            ]
          })
        })

  }

  onUpdateErrors = (evt, errors, id) => {
    const {name} = evt.target
    const {team_members} = this.state
    const prevStateArray = team_members
    const arr = []

    Promise.all(team_members.map((item, index) => {
      if (id === index) {
        return new Promise(
          (resolve, reject) => {
            arr.push({...team_members[id], [name]: {...team_members[id][name], errors: [...errors]}})
            resolve()
          }
        )
      } else {
        return item
      }
    }))
      .then(
        () => {
          const rez = prevStateArray.map(item => {
            if (item.id === arr[0].id) {
              return arr[0]
            }
            return item
          })

          return this.setState({
            team_members: [
              ...rez
            ]
          })
        })

  }

  onAddNewTeamMember = () => {
    const {team_members} = this.state
    return this.setState({
      team_members: team_members.concat([
        {
          id: Date.now() + Math.random(),
          first_name: {
            optional: true,
            value: ``,
            errors: [],
            validationRules: []
          },
          last_name: {
            optional: true,
            value: ``,
            errors: [],
            validationRules: []
          },
          position: {
            optional: true,
            value: ``,
            errors: [],
            validationRules: []
          },
          fb_link: {
            optional: true,
            value: ``,
            errors: [],
            validationRules: []
          },
          linkedin_link: {
            optional: true,
            value: ``,
            errors: [],
            validationRules: []
          },
          photo: {
            optional: true,
            value: ``,
            errors: [],
            validationRules: []
          }
        }
      ])
    })
  }

  handleChangeValue = (evt, file) => {
    const {name, type, value, checked} = evt.target

    if (type === `file`) {
      return this.setState({
        [name]: {
          // eslint-disable-next-line
          ...this.state[name],
          value: file
        }
      })
    }
    else if (name === 'funding_sum' || name === 'last_year_sales') {
      return this.setState({
        [name]: {
          // eslint-disable-next-line
          ...this.state[name],
          value: type === `checkbox` ? checked : numberWithCommas(value)
        }
      })
    }
    else {
      return this.setState({
        [name]: {
          // eslint-disable-next-line
          ...this.state[name],
          value: type === `checkbox` ? checked : value
        }
      })
    }
  }

  handlerOnBlur = (event) => {
    const {name, value} = event.target

    if (name !== 'funding_sum') return

    if (!value.length) return
    if (value.length && /NIS/g.test(value)) return

    return this.setState({
      [name]: {
        ...this.state[name],
        value: numberWithCommas(value) + ' NIS'
      }
    })
  }

  handlerOnFocus = (event) => {
    const {name, value} = event.target

    if (name !== 'funding_sum') return

    if (!value.length) return
    if (value.length && /NIS/g.test(value)) {
      this.setState({
        [name]: {
          ...this.state[name],
          value: numberWithCommas(value.split(' ')[0])
        }
      })
    }

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

  handleChangeErrorsFile = (name, errors) => {
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

  handleSubmit = evt => {
    evt && evt.preventDefault && evt.preventDefault()
    const {lang} = this.props

    formDataToSubmit(this.state)
      .then(data => {
        axios({
          method: `post`,
          url: `${BASE_URL}/signupenterpreneur`,
          config: {headers: {'Content-Type': `multipart/form-data`}},
          headers: {
            'language': lang
          },
          data: data
        })
          .then(function (response) {
            console.log(response)
            history.replace(`/log-in`)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
  }

  handleChangeDownload = () => {
    return this.setState({
      download: {
        // eslint-disable-next-line
        ...this.state.download,
        download: true
      }
    })
  }

  disabledButton = () => {
    const array = []
    const errors = []
    const {download} = this.state

    /* eslint-disable */
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {

        if (key === `download`) {
          errors.push(!download.download)
          continue
        }

        if (key === `team_members`) continue

        errors.push(!!this.state[key].errors.length)

        if (this.state[key].optional === true && this.state[key].value === ``) array.push(true)
        else array.push(!!this.state[key].value)
      }
    }
    /* eslint-enabled */
    return (array.includes(false) || errors.includes(true))
  }

  handleChangeSelect = (selectedOption) => {
    return this.setState({
      country_of_registration: {
        // eslint-disable-next-line
        ...this.state.country_of_registration,
        value: selectedOption.value,
        selectedOption
      }
    })
  }

  getSelectOptions() {
    const {countries} = this.props
    const obj = {}

    if (!countries) return {
      value: ``,
      label: ``
    }

    for (const key in countries) {
      if (countries.hasOwnProperty(key)) {
        obj[key] = {
          value: countries[key],
          label: countries[key]
        }
      }
    }

    const arr = convertObjectToArray(obj)

    return arr.map(country => {
      return {
        value: country.value,
        label: country.label
      }
    })

  }

  signUp = () => {
    this.props.signUp('enterpreneur')
  }

  renderPage() {
    const {dir, contentText} = this.props
    const {team_members, financial_report, company_presentation, video_url, confPass, last_year_sales, company_name, ceo_name, company_email, funding_sum, password, vat_number, country_of_registration, company_phone} = this.state

    if (!contentText) return null
    return (
      <form className = "sign-up__entrepreneur"
            noValidate
            onSubmit = {this.handleSubmit}
      >
        <div className = "sign-up__content">
          <div className = "sign-up__title">
            {contentText[`ent.comp_info_req`]}
          </div>
          <div className = "sign-up__container">
            <div className = "sign-up__column">
              <Input type = "text"
                     name = "company_name"
                     {...company_name}
                     label = {contentText[`ent.comp_name`]}
                     labelDone = {contentText[`ent.comp_name.label`]}
                     validation = {[`required`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <Input type = "text"
                     name = "ceo_name"
                     {...ceo_name}
                     label = {contentText[`ent.CEO_name`]}
                     labelDone = {contentText[`ent.CEO_name.label`]}
                     validation = {[`required`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <Input type = "email"
                     name = "company_email"
                     {...company_email}
                     label = {contentText[`ent.comp_email`]}
                     labelDone = {contentText[`ent.comp_email.label`]}
                     validation = {[`required`, `email`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <Input type = "text"
                     name = "funding_sum"
                     {...funding_sum}
                     label = {contentText[`ent.funding_sum`]}
                     labelDone = {contentText[`ent.funding_sum.label`]}
                     validation = {[`required`, `money`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
                     onblur = {this.handlerOnBlur}
                     onfocus = {this.handlerOnFocus}
              />
              <Input type = "password"
                     name = "password"
                     {...password}
                     label = {contentText[`ent.password`]}
                     labelDone = {contentText[`ent.password.label`]}
                     validation = {[`required`, `minText`, `number`, `lowercase`, `uppercase`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
                     changeValidationRules = {this.handleChangeValidationRules}
              />
            </div>
            <div className = "sign-up__column">
              <Input type = "text"
                     name = "vat_number"
                     {...vat_number}
                     label = {contentText[`ent.VAT`]}
                     labelDone = {contentText[`ent.VAT.label`]}
                     validation = {[`required`, `vat`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <Select placeholder = {contentText[`ent.comp_country`]}
                      updateValue = {this.handleChangeSelect}
                      selected = {country_of_registration.selectedOption}
                      value = {country_of_registration.value}
                      options = {this.getSelectOptions()}
                      labelDone = {contentText[`ent.comp_country.label`]}
              />
              <Input type = "text"
                     name = "company_phone"
                     {...company_phone}
                     label = {contentText[`ent.comp_phone`]}
                     labelDone = {contentText[`ent.comp_phone.label`]}
                     validation = {[`required`, `phone`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <Input type = "text"
                     name = "last_year_sales"
                     {...last_year_sales}
                     label = {contentText[`ent.comp_sales`]}
                     labelDone = {contentText[`ent.comp_sales.label`]}
                     validation = {[`required`, `money`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <Input type = "password"
                     name = "confPass"
                     {...confPass}
                     label = {contentText[`ent.confirm_pass`]}
                     labelDone = {contentText[`ent.confirm_pass.label`]}
                     validation = {[`required`, `confirmPassword`]}
                     password = {password.value}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
            </div>
          </div>
        </div>

        <div className = "sign-up__content">
          <div className = "sign-up__title">
            {contentText[`ent.comp_info_req`]}
          </div>
          <div className = "sign-up__container sign-up__container--center">
            <NDA updateValue = {this.handleChangeDownload} content = {contentText} />
          </div>
        </div>

        <div className = "sign-up__content">
          <div className = "sign-up__title">
            {contentText[`ent.comp_info_opt`]}
          </div>
          <div className = "sign-up__container">
            <div className = "sign-up__column">
              <Input type = "text"
                     name = "video_url"
                     {...video_url}
                     label = {contentText[`ent.video_link`]}
                     labelDone = {contentText[`ent.video_link.label`]}
                     validation = {[`youtube`]}
                     changeValue = {this.handleChangeValue}
                     changeErrors = {this.handleChangeErrors}
              />
              <InputFile {...company_presentation}
                         name = "company_presentation"
                         updateValue = {this.handleChangeValue}
                         label = {contentText[`ent.presentation`]}
                         labelDone = {contentText[`ent.presentation.label`]}
                         validation = {[`maxSize`]}
                         updateErrors = {this.handleChangeErrorsFile}
              />
            </div>
            <div className = "sign-up__column">
              <InputFile {...financial_report}
                         name = "financial_report"
                         label = {contentText[`ent.fin_report`]}
                         labelDone = {contentText[`ent.fin_report.label`]}
                         updateValue = {this.handleChangeValue}
                         validation = {[`maxSize`]}
                         updateErrors = {this.handleChangeErrorsFile}
              />
            </div>
          </div>
        </div>

        <div className = "sign-up__content">
          <div className = "sign-up__title">
            {contentText[`ent.team_members`]}
          </div>
          <div className = "sign-up__container">
            <TeamMembersFields config = {team_members}
                               updateValue = {this.onUpdateValue}
                               updateErrors = {this.onUpdateErrors}
                               deletePhoto = {this.onDeleteValue}
                               content = {contentText}
            />
          </div>
          <div className = "sign-up__add-button-wrapper">
            <button className = "sign-up__add-button-my button button-bordered"
                    type = "button"
                    dir = {dir}
                    onClick = {this.onAddNewTeamMember}
            >
              <span className = "sign-up__add-button-text">
                {contentText.team_add_member_btn}
              </span>
            </button>
          </div>
        </div>

        <div className = "sign-up__button-wrapper">
          <button type = "submit"
                  className = "sign-up__submit-button button button-main"
                  disabled = {this.disabledButton()}
                  dir = {dir}
                  onClick = {this.handleSubmit}
          >
            {contentText.sign_up_btn}
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
  ...state,
  token: state.token
})

const mapDispatchToProps = {signUp}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(EntrepreneurForm)
)