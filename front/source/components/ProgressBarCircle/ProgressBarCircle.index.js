import React from 'react'
import PropTypes from 'prop-types'
import './ProgressBarCircle.style.styl'

ProgressBarCircle.propTypes = {
  // from parent component
  dynamicValue: PropTypes.number.isRequired,
  staticValue: PropTypes.number.isRequired
}

function ProgressBarCircle(props) {

  const radius = 45
  const contour = 2 * Math.PI * radius

  const calculatePercent = () => {
    const {dynamicValue, staticValue} = props
    return Math.floor(dynamicValue / staticValue * 100)
  }

  const calculateProgress = () => {
    const percent = calculatePercent()
    const step = contour / 100
    if (percent > 100) return 0
    return (100 - percent) * step
  }

  return (
    <div className="progress-bar-circle">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle r={radius}
          cx="50%"
          cy="50%"
          fill="none"
          className="progress-bar-circle__first"
          transform="rotate(-90, 50, 50)"
        />
        <circle r={radius}
          cx="50%"
          cy="50%"
          fill="none"
          className="progress-bar-circle__second"
          transform="rotate(-90, 50, 50)"
          strokeDasharray={`${calculateProgress()} ${contour}`}
        />
      </svg>
      <div className="progress-bar-circle__percent">
        {calculatePercent()}%
      </div>
    </div>
  )

}

export default ProgressBarCircle
