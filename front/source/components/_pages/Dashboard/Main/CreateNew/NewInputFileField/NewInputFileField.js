import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import InputFile from '../../../../../formFields/FormField.file';

NewInputFileField.propTypes = {
  // from SignUp.entrepreneurFrom
  config: PropTypes.array,
  updateValue: PropTypes.func,
  updateErrors: PropTypes.func,
}

function NewInputFileField(props) {

  const renderInputs = () => {
    const {config, name, updateValue, label, labelDone, validation, updateErrors, selfValues, dir} = props

    return config.map((field, index) => {
      // console.log(name)
      return (
        // eslint-disable-next-line
        <Fragment key={index}>
             <InputFile {...field.file}
                id={field.id}
                dir={dir}
                clickInput={props.clickInput}
                name='file'
                updateValue={event => updateValue(event, index)}
                label={label}
                labelDone={labelDone}
                validation={validation}
                updateErrors={updateErrors}
              />
        </Fragment>

      )
    })
  }


  return (
    <Fragment>
      {renderInputs()}
    </Fragment>
  )

}

export default NewInputFileField