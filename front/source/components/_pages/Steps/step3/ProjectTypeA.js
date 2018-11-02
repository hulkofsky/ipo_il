import React from 'react'
import PropTypes from 'prop-types'

// style
import './projectType.styl'

// components
import Input from '../../../formFields/FormField.input'

ProjectTypeA.propTypes = {
  // from Step3.index
  unit: PropTypes.string,
  units: PropTypes.string,
  total: PropTypes.string,
  ils: PropTypes.string,
  unitValue: PropTypes.any,
  unitCount1: PropTypes.any,
  totalPrice1: PropTypes.any,
  updateValue: PropTypes.func,
  calculateValue: PropTypes.func,
  project: PropTypes.object,
  changeErrors: PropTypes.func
}

function ProjectTypeA(props) {
  const onBlur = event => {
    const { calculateValue } = props
    calculateValue(event)
  }

  const {
    unit,
    units,
    total,
    ils,
    unitValue,
    updateValue,
    unitCount1,
    totalPrice1,
    changeErrors,
    project
  } = props

  return (
    <div className="project-type__form">
      <div className="project-type__item">
        <span className="project-type__text">
          1 {unit} = {unitValue} {ils}
        </span>
      </div>
      <div className="project-type__item">
        <Input
          // validation={[`min`, `max`]}
          validation={[``]}
          min={
            Math.ceil(project["min_total_price1"]/unitValue)
          }
          max={
            Math.ceil(project["max_total_price1"]/unitValue)
          }
          changeValue={updateValue}
          changeErrors={changeErrors}
          {...unitCount1}
          onblur={onBlur}
        />
        <span className="project-type__text">{units}</span>
      </div>
      <div className="project-type__item">
        <span className="project-type__text">{total} =</span>
        <span className="project-type__field-wrapper">
          <Input
            //validation={[`required`, `min`, `max`]}
            validation={[`required`]}
            min={project["min_total_price1"]}
            max={project["max_total_price1"]}
            changeValue={updateValue}
            changeErrors={changeErrors}
            {...totalPrice1}
            onblur={onBlur}
          />
          <span className="project-type__text">{ils}</span>
        </span>
      </div>
    </div>
  )
}

export default ProjectTypeA
