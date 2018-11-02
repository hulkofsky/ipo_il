import React from 'react'
import PropTypes from 'prop-types'

RadioButton.propTypes = {
  // from parent component
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  label: PropTypes.string
}

function RadioButton(props) {

  const isChecked = () => {
    const {selectedValue, value} = props
    return selectedValue === value
  }

  const setClassName = () => {
    if (isChecked()) return `sign-up__radio-button-label sign-up__radio-button-label--active`
    return  `sign-up__radio-button-label`
  }

  const {name, value, updateValue, label} = props
  return (
    <div className="sign-up__radio-button-wrapper">
      <label className={setClassName()}>
        {label}
        <input className="sign-up__radio-button"
          type="radio"
          name={name}
          value={value}
          onChange={updateValue}
          checked={isChecked()}
        />
      </label>
    </div>
  )

}

export default RadioButton