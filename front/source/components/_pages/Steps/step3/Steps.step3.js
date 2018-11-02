import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setStatus, setTouched } from '../../../../redux/reducers/steps.reducer'
import { dataToSubmit } from '../../../formFields/utils'
import PersonalDetail from './Steps.step3.detail'
import ProjectDetail from './Steps.step3.project'
import { numberWithCommas, numberWithoutCommas } from '../../../../utils/helpers'

import ProjectTypeA from './ProjectTypeA'
import ProjectTypeB from './ProjectTypeB'

export const ProjectType = {
  A: 'a',
  B: 'b'
}

const unitValue = 10

class Step3 extends Component {
  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    // from Steps.index
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    content: PropTypes.object,
    project: PropTypes.object,
    // from connect
    setStatus: PropTypes.func,
    setTouched: PropTypes.func
  }

  componentDidMount() {
    const { setTouched } = this.props
    setTouched(`step3`)
  }

  componentDidUpdate() {
    dataToSubmit(this.state).then(data => {
      window.sessionStorage.setItem(`stepPurchase`, JSON.stringify(data))
    })
  }

  state = {
    unitCount: {
      type: 'text',
      name: 'unitCount',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount
        : 0,
      errors: []
    },
    totalPrice: {
      type: 'text',
      name: 'totalPrice',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice
        : 0,
      errors: []
    },
    unitCount1: {
      type: 'text',
      name: 'unitCount1',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount1
        : 0,
      errors: []
    },
    totalPrice1: {
      type: 'text',
      name: 'totalPrice1',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice1
        : 0,
      errors: []
    },
    unitValue1: {
      type: 'text',
      name: 'unitValue1',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue1
        : 0,
      errors: []
    },
    unitCount2: {
      optional: true,
      type: 'text',
      name: 'unitCount2',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount2
        : 0,
      errors: []
    },
    totalPrice2: {
      optional: true,
      type: 'text',
      name: 'totalPrice2',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice2
        : 0,
      errors: []
    },
    unitValue2: {
      optional: true,
      type: 'text',
      name: 'unitValue2',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue2
        : 0,
      errors: []
    },
    unitCount3: {
      optional: true,
      type: 'text',
      name: 'unitCount3',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount3
        : 0,
      errors: []
    },
    totalPrice3: {
      optional: true,
      type: 'text',
      name: 'totalPrice3',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice3
        : 0,
      errors: []
    },
    unitValue3: {
      optional: true,
      type: 'text',
      name: 'unitValue3',
      value: window.sessionStorage.getItem('stepPurchase')
        ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue3
        : 0,
      errors: []
    }
  }

  onUpdateValue = event => {
    const { name, value } = event.target

    this.setState({
      [name]: {
        ...this.state[name],
        value: numberWithCommas(value)
        // value: value
      }
    })
  }

  calculateValue = event => {
    const {
      unitCount,
      totalPrice,
      unitCount1,
      totalPrice1,
      unitValue1,
      unitCount2,
      totalPrice2,
      unitValue2,
      unitCount3,
      totalPrice3,
      unitValue3
    } = this.state
    const { name, value } = event.target

    switch (name) {
      case 'unitCount':
        return this.setState({
          totalPrice: {
            ...this.state.totalPrice,
            value: numberWithCommas(Math.ceil(unitValue * numberWithoutCommas(unitCount.value)))
          }
        })

      case 'totalPrice':
        return this.setState({
          unitCount: {
            ...this.state.unitCount,
            value: unitValue == 0 ? 0 : numberWithCommas(Math.ceil(numberWithoutCommas(totalPrice.value) / unitValue))
          }
        })

      case 'unitCount1':
        return this.setState({
          totalPrice1: {
            ...this.state.totalPrice1,
            value: numberWithCommas(Math.ceil(numberWithoutCommas(unitValue1.value) * numberWithoutCommas(unitCount1.value)))
          }
        })

      case 'totalPrice1':
        return this.setState({
          unitCount1: {
            ...this.state.unitCount1,
            value:
              unitValue1.value == 0
                ? 0
                : numberWithCommas(Math.ceil(numberWithoutCommas(totalPrice1.value) / numberWithoutCommas(unitValue1.value)))
          }
        })
      case 'unitCount2':
        return this.setState({
          totalPrice2: {
            ...this.state.totalPrice2,
            value: numberWithCommas(Math.ceil(numberWithoutCommas(unitValue2.value) * numberWithoutCommas(unitCount2.value)))
          }
        })

      case 'totalPrice2':
        return this.setState({
          unitCount2: {
            ...this.state.unitCount2,
            value:
              unitValue2.value == 0
                ? 0
                : numberWithCommas(Math.ceil(numberWithoutCommas(totalPrice2.value) / numberWithoutCommas(unitValue2.value)))
          }
        })
      case 'unitCount3':
        return this.setState({
          totalPrice3: {
            ...this.state.totalPrice3,
            value: numberWithCommas(Math.ceil(numberWithoutCommas(unitValue3.value) * numberWithoutCommas(unitCount3.value)))
          }
        })

      case 'totalPrice3':
        return this.setState({
          unitCount3: {
            ...this.state.unitCount3,
            value:
              unitValue3.value == 0
                ? 0
                : numberWithCommas(Math.ceil(numberWithoutCommas(totalPrice3.value) / numberWithoutCommas(unitValue3.value)))
          }
        })

      default:
        return value
    }
  }

  disabledButton = () => {
    const { project, setStatus } = this.props

    if (!project) return true

    const projectTypeA = project.project_type === ProjectType.A
    const projectTypeB = project.project_type === ProjectType.B

    let array = []
    let errors = []

    /* eslint-disable */
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key) && projectTypeA) {
        array.push(!!this.state.unitCount.value)
        array.push(!!this.state.totalPrice.value)
        errors.push(!!this.state.unitCount.errors.length)
        errors.push(!!this.state.totalPrice.errors.length)
      }

      if (this.state.hasOwnProperty(key) && projectTypeB) {
        array.push(!!this.state.unitCount1.value)
        array.push(!!this.state.totalPrice1.value)
        errors.push(!!this.state.unitCount1.errors.length)
        errors.push(!!this.state.totalPrice1.errors.length)
      }
    }
    /* eslint-enabled */
    setStatus(`step3`, !(array.includes(false) || errors.includes(true)))
    return array.includes(false) || errors.includes(true)
  }

  onButtonPrevClick = event => {
    event && event.preventDefault && event.preventDefault()
    const { prevStep } = this.props

    prevStep()
  }

  onButtonNextClick = event => {
    event && event.preventDefault && event.preventDefault()
    const { nextStep } = this.props

    dataToSubmit(this.state)
      .then(data => {
        window.sessionStorage.setItem(`stepPurchase`, JSON.stringify(data))
        window.sessionStorage.setItem(`stepUnitA`, `${unitValue}`)
      })
      .then(nextStep())
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

  renderPage = () => {
    const { dir, content, project } = this.props

    if (!content || !project) return null

    const projectTypeA = project.project_type === ProjectType.A
    const projectTypeB = project.project_type === ProjectType.B

    return (
      <section className="steps-page__content">
        <header className="steps-page__header" dir={dir}>
          <h1 className="steps-page__title">{content[`purchase.title`]}</h1>
          <div className="steps-page__text">{content[`purchase.descr`]}</div>
        </header>
        <div className="steps-page__form-wrapper">
          {projectTypeA && (
            <ProjectTypeA
              unit={'unit'}
              units={'units'}
              total={'total'}
              ils={'ils'}
              unitValue={unitValue}
              unitCount1={this.state.unitCount}
              totalPrice1={this.state.totalPrice}
              updateValue={this.onUpdateValue}
              calculateValue={this.calculateValue}
              project={project}
              changeErrors = {this.handleChangeErrors}
            />
          )}
          {projectTypeB && (
            <ProjectTypeB
              unit={'unit'}
              units={'units'}
              total={'total'}
              ils={'ils'}
              unitValue={unitValue}
              unitCount1={this.state.unitCount1}
              totalPrice1={this.state.totalPrice1}
              unitValue1={this.state.unitValue1}
              unitCount2={this.state.unitCount2}
              totalPrice2={this.state.totalPrice2}
              unitValue2={this.state.unitValue2}
              unitCount3={this.state.unitCount3}
              totalPrice3={this.state.totalPrice3}
              unitValue3={this.state.unitValue3}
              updateValue={this.onUpdateValue}
              calculateValue={this.calculateValue}
              project={project}
              changeErrors = {this.handleChangeErrors}
            />
          )}
          <PersonalDetail dir={dir} content={content} />
          <ProjectDetail dir={dir} content={content} project={project} />
        </div>
        <div className="steps-page__button-wrapper">
          <button
            className="steps-page__button button button-main"
            type="button"
            onClick={this.onButtonPrevClick}
            dir={dir}
          >
            {content[`back_btn`]}
          </button>
          <button
            className="steps-page__button button button-main"
            form={`stepPurchaseFormId`}
            type="submit"
            disabled={this.disabledButton()}
            onClick={this.onButtonNextClick}
            dir={dir}
          >
            {content[`next_btn`]}
          </button>
        </div>
      </section>
    )
  }

  render() {
    return <Fragment>{this.renderPage()}</Fragment>
  }
}

const mapStateToProps = null
const mapDispatchToProps = { setStatus, setTouched }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(multiLang(Step3))
)
