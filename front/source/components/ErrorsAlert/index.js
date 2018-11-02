import React from 'react'
import PropTypes from 'prop-types'
import uid from 'uid'

// style
import './errors-alert.styl'

// components
import Error from './Error'

ErrorsAlert.propTypes = {
  errors: PropTypes.array,
  closeAlert: PropTypes.func
}

function ErrorsAlert(props) {

  const renderError = () => {
    const {errors, closeAlert} = props

    return errors.map((error, index) => (
      <li className = "errors__item" key = {uid(`10`)}>
        <Error error = {error} close = {() => closeAlert(index)} />
      </li>
    ))
  }

  return (
    <section className = "errors">
      <ul className = "errors__list">
        {renderError()}
      </ul>
    </section>
  )

}

export default ErrorsAlert

