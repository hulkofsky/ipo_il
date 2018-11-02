import React from 'react'
import PropTypes from 'prop-types'
import { numberWithoutCommas } from '../../../../utils/helpers'

// style
import './projectType.styl'

// components
import FormField from './FormField'
import Input from '../../../formFields/FormField.input'

ProjectTypeB.propTypes = {
  // from Step3.index
  unit: PropTypes.string,
  units: PropTypes.string,
  total: PropTypes.string,
  ils: PropTypes.string,
  unitValue: PropTypes.any,
  unitCount1: PropTypes.any,
  totalPrice1: PropTypes.any,
  unitValue1: PropTypes.any,
  unitCount2: PropTypes.any,
  totalPrice2: PropTypes.any,
  unitValue2: PropTypes.any,
  unitCount3: PropTypes.any,
  totalPrice3: PropTypes.any,
  unitValue3: PropTypes.any,
  updateValue: PropTypes.func,
  calculateValue: PropTypes.func,
  changeErrors: PropTypes.func,
  project: PropTypes.object
}

function ProjectTypeB(props) {
  const onBlur = event => {
    const { calculateValue } = props
    calculateValue(event)
  }

  const {
    unit,
    units,
    total,
    ils,
    updateValue,
    unitCount1,
    totalPrice1,
    unitValue1,
    unitCount2,
    totalPrice2,
    unitValue2,
    unitCount3,
    totalPrice3,
    unitValue3,
    changeErrors,
    project
  } = props

  return (
    <div>
      <div className="project-type__form">
        <div className="project-type__item">
          <span className="project-type__text">1 {unit} =</span>
          <FormField
            {...unitValue1}
            changeValue={updateValue}
            onBlur={onBlur}
          />
          <span className="project-type__text project-type__text-ml">
            {ils}
          </span>
        </div>
        <div className="project-type__item">
          <Input
            // validation={[`required`, `min`, `max`]}
            validation={[`required`]}
            min={Math.ceil(project['min_total_price1'] / numberWithoutCommas(unitValue1.value))}
            max={Math.ceil(project['max_total_price1'] / numberWithoutCommas(unitValue1.value))}
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
              // validation={[`required`, `min`, `max`]}
              validation={[`required`]}
              min={project['min_total_price1']}
              max={project['max_total_price1']}
              changeValue={updateValue}
              changeErrors={changeErrors}
              {...totalPrice1}
              onblur={onBlur}
            />
            <span className="project-type__text">{ils}</span>
          </span>
        </div>
      </div>
      <div className="project-type__form">
        <div className="project-type__item">
          <span className="project-type__text">1 {unit} =</span>
          <FormField
            {...unitValue2}
            changeValue={updateValue}
            onBlur={onBlur}
          />
          <span className="project-type__text project-type__text-ml">
            {ils}
          </span>
        </div>
        <div className="project-type__item">
          <Input
            // validation={[`min`, `max`]}
            validation={[``]}
            min={Math.ceil(project['min_total_price2'] / numberWithoutCommas(unitValue2.value))}
            max={Math.ceil(project['max_total_price2'] / numberWithoutCommas(unitValue2.value))}
            changeValue={updateValue}
            changeErrors={changeErrors}
            {...unitCount2}
            onblur={onBlur}
          />
          <span className="project-type__text">{units}</span>
        </div>
        <div className="project-type__item">
          <span className="project-type__text">{total} =</span>
          <span className="project-type__field-wrapper">
            <Input
              // validation={[`required`, `min`, `max`]}
              validation={[`required`]}
              min={project['min_total_price2']}
              max={project['max_total_price2']}
              changeValue={updateValue}
              changeErrors={changeErrors}
              {...totalPrice2}
              onblur={onBlur}
            />
            <span className="project-type__text">{ils}</span>
          </span>
        </div>
      </div>
      <div className="project-type__form">
        <div className="project-type__item">
          <span className="project-type__text">1 {unit} =</span>
          <FormField
            {...unitValue3}
            changeValue={updateValue}
            onBlur={onBlur}
          />
          <span className="project-type__text project-type__text-ml">
            {ils}
          </span>
        </div>
        <div className="project-type__item">
          <Input
            // validation={[`min`, `max`]}
            validation={[``]}
            min={Math.ceil(project['min_total_price3'] / numberWithoutCommas(unitValue3.value))}
            max={Math.ceil(project['max_total_price3'] / numberWithoutCommas(unitValue3.value))}
            changeValue={updateValue}
            changeErrors={changeErrors}
            {...unitCount3}
            onblur={onBlur}
          />
          <span className="project-type__text">{units}</span>
        </div>
        <div className="project-type__item">
          <span className="project-type__text">{total} =</span>
          <span className="project-type__field-wrapper">
            <Input
              // validation={[`required`, `min`, `max`]}
              validation={[`required`]}
              min={project['min_total_price3']}
              max={project['max_total_price3']}
              changeValue={updateValue}
              changeErrors={changeErrors}
              {...totalPrice3}
              onblur={onBlur}
            />
            <span className="project-type__text">{ils}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectTypeB
