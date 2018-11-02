import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Input from '../../../formFields/FormField.input'

Step3Form.propTypes = {
  // from Steps.step3
  dir: PropTypes.string,
  id: PropTypes.string,
  count: PropTypes.any,
  submit: PropTypes.func,
  changeErrors: PropTypes.func,
  onChangeValue: PropTypes.func,
  plus: PropTypes.func,
  minus: PropTypes.func,
  content: PropTypes.object,
  project: PropTypes.object
}

function Step3Form(props) {
  const calculateTotal = () => {
    const { project, count } = props

    return +project[`min_unit_price`] * +count.value
  }

  const renderPage = () => {
    const {
      count,
      id,
      changeErrors,
      onChangeValue,
      submit,
      plus,
      minus,
      dir,
      content,
      project
    } = props

    if (!content || !project) return null

    return (
      <form className="steps-page__form" id={id} noValidate onSubmit={submit}>
        <div className="steps-page__field-wrapper steps-page__field-wrapper--center steps-page__field-wrapper--count">
          <div className="steps-page__count-text" dir={dir}>
            1 {content[`purchase.unit`]} = {project[`min_unit_price`]}{' '}
            {content[`purchase.ils`]}
          </div>

          <button
            className="button button-count button-count--minus"
            type="button"
            onClick={minus}
          >
            -
          </button>
          <div className="steps-page__control-wrapper steps-page__control-wrapper--count">
            <Input
              type="text"
              name="count"
              {...count}
              label={content[`purchase.unit_field`]}
              validation={[`required`, `onlyNumber`]}
              changeValue={onChangeValue}
              changeErrors={changeErrors}
            />
          </div>
          <button
            className="button button-count button-count--plus"
            type="button"
            onClick={plus}
          >
            +
          </button>

          <div className="steps-page__count-text" dir={dir}>
            {content[`puchase.total`]} = {calculateTotal()}{' '}
            {content[`purchase.ils`]}
          </div>
        </div>
      </form>
    )
  }

  return <Fragment>{renderPage()}</Fragment>
}

export default Step3Form
