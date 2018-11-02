import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'

FormField.propTypes = {
  // from form
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  changeValue: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
}

function FormField(props) {

  const {name, value, changeValue, onBlur} = props

  return (
    <div className = "form-control">
      <input
        className = {`form-control__field`}
        type = "text"
        name = {name}
        value = {value}
        onChange = {changeValue}
        onBlur = {onBlur}
      />
    </div>
  )

}

export default multiLang(FormField)
