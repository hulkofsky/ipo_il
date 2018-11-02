import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../_HOC/lang.hoc'
import ReactSelect  from 'react-select'

Select.propTypes = {
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from Form
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string,
  options: PropTypes.array,
  updateValue: PropTypes.func.isRequired,
  labelDone: PropTypes.string,
  selected: PropTypes.any
}

function Select(props) {

  const {dir, value, selected, updateValue, placeholder, options, labelDone} = props

  return (
    <div style={{position: `relative`}} dir={dir} >
      {value && <span className={`form-control__label form-control__label--short form-control__label--short form-control__label-show`}>
        {labelDone}
      </span>}
      <ReactSelect isRtl={dir === `rtl`}
      style={{pading: '40px'}}
        className="my-select"
        options={options}
        placeholder={placeholder}
        value={selected}
        onChange={updateValue}
      />
    </div>
  )

}

export default multiLang(Select)