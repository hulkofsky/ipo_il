import React, { Component } from 'react'
import PropTypes from 'prop-types'
import lang from '../_HOC/lang.hoc'

class StepsItem extends Component {

  static propTypes = {
    // from Steps.index
    title: PropTypes.string,
    index: PropTypes.number,
    isActive: PropTypes.bool,
    isPassed: PropTypes.bool,
    isCheck: PropTypes.bool,
    setActiveStep: PropTypes.func,
    steps: PropTypes.object,
    touched: PropTypes.bool,
    // from lang.hoc
    dir: PropTypes.string
  }

  setClassName = () => {
    const {isActive, isPassed, index, isCheck, steps, touched} = this.props
    const isAuthorized = !!window.localStorage.getItem(`user-token`)
    const step = steps[`step${index + 1}`]

    if (isAuthorized && index < 1) return `step__item step__item--passed`
    if (isPassed && step) return `step__item step__item--passed`
    if (touched) return `step__item`
    if (isActive && isCheck) return `step__item`
    if (isActive && step && isCheck) return `step__item step__item--passed`
    return `step__item step__item--default`
  }

  onItemClick = () => {
    const {index, setActiveStep} = this.props

    setActiveStep(index)
  }

  render() {
    const {title, index, dir} = this.props
    return (
      <li className={this.setClassName()}
        dir={dir}
        onClick={this.onItemClick}
      >
        <div className="steps__title">{title}</div>
        <div className="steps__number-wrapper">
          <div className="steps__number">{index + 1} step</div>
        </div>
      </li>
    )
  }

}

export default lang(StepsItem)