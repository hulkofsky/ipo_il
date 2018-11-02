import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// style
import './article.styl'

// components
import FormFieldInput from '../../../../../formFields/FormField.input'
import FormFieldFile from '../../../../../formFields/FormField.file'

ArticleFields.propTypes = {
  // from CreateNew form
  fieldsConfig: PropTypes.array,
  updateFieldFileValue: PropTypes.func,
  updateFieldInputValue: PropTypes.func,
  updateFieldInputErrors: PropTypes.func,
}

function ArticleFields(props) {

  const renderFormFields = () => {
    const {
      fieldsConfig,
      updateFieldInputValue,
      updateFieldFileValue,
      updateFieldInputErrors
    } = props

    return fieldsConfig.map((field, index) => {
      return (
        <Fragment key = {index}>
          <FormFieldInput
            type = "text"
            name = "link"
            {...field.link}
            label = "Enter article link"
            labelDone = "Article link"
            validation = {['required']}
            index = {index}
            changeValue = {(event) => updateFieldInputValue(event, index)}
            changeErrors = {updateFieldInputErrors}
          />
          <FormFieldFile
            name = "logo"
            {...field.logo}
            label = "Choose article logo"
            labelDone = "Article logo"
            validation = {[]}
            index = {index}
            updateValue = {(event) => updateFieldFileValue(event, index)}
          />
        </Fragment>
      )
    })
  }

  return (
    <Fragment>
      {renderFormFields()}
    </Fragment>
  )
}

export default ArticleFields