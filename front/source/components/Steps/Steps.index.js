import React, {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import './Steps.style.styl'
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import multiLang from '../_HOC/lang.hoc'

Steps.propTypes = {
  activeStepIndex: PropTypes.number,
  children: PropTypes.array.isRequired,
  isCheck: PropTypes.bool,
  setActiveStep: PropTypes.func,
  // from connect
  steps: PropTypes.object
}

function Steps(props) {

  const renderChildrenWithStepsApiAsProps = () => {
    const {activeStepIndex, children, isCheck, setActiveStep, steps} = props

    return Children.map(children, (child, index) => {
      const step = steps[`step${index + 1}`].passed
      const touched = steps[`step${index + 1}`].touched

      return cloneElement(child, {
        index: index,
        activeStepIndex: activeStepIndex,
        isActive: activeStepIndex === index,
        isPassed: step,
        isCheck: isCheck,
        setActiveStep: setActiveStep,
        steps: steps,
        touched: touched
      })
    })
  }

  const renderActiveStepsContent = () => {
    const {activeStepIndex, children} = props

    if (children[activeStepIndex]) return children[activeStepIndex].props.children
  }

  return (
    <div className="steps">
      <ul className="steps__progress">
        {renderChildrenWithStepsApiAsProps()}
      </ul>
      <div className="steps__content">
        {renderActiveStepsContent()}
      </div>
    </div>
  )

}

const mapStateToProps = state => ({steps: state.steps})
const mapDispatchToProps = null

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multiLang(Steps)
  )
)