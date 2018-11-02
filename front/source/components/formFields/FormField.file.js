import React, { Component } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../_HOC/lang.hoc'
import {validate} from './validate'

class InputFile extends Component {

  static propTypes = {
    // from Form
    name: PropTypes.string.isRequired,
    errors: PropTypes.array.isRequired,
    updateValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    labelDone: PropTypes.string.isRequired,
    validation: PropTypes.array,
    updateErrors: PropTypes.func,
    // from HOC Lang.hoc
    dir: PropTypes.string,
    //func for show backdrop
    clickInput: PropTypes.func
  }

  state = {
    fileName: ``
  }

  inputFile = null
  setInputFileRef = node => this.inputFile = node

  renderMark = () => {
    const {value, errors, labelDone} = this.props

    if (!value) return
    return (
      <span className={`input-file__mark ${errors.length ? `input-file__mark--error` : `` }`}>
        {labelDone}
      </span>
    )
  }

  renderErrors = () => {
    const {errors} = this.props
    return errors.map(error => {
      return (
        <div key={error} className="form-control__error">
          {error}
        </div>
      )
    })
  }

  onUpdateValue = event => {
    const {updateErrors, updateValue, validation, name} = this.props
    const file = event.target.files[0]
    this.setState({fileName: file.name})
    Promise.resolve(updateValue(event, file))
      .then(() => {
        const errors = validate(file, validation)
        // updateErrors(name, errors)
      })
  }

  render = () => {
    const {name, errors, label, value, dir, clickInput} = this.props
    const {fileName} = this.state

    return (
      <div className="input-file" dir={dir}>

        <label className="input-file__label" >
          <span className={`input-file__placeholder
            ${value !== `` ? `input-file__placeholder--value` : `` }
            ${errors.length ? `input-file__placeholder--error` : ``}
            `}
          >
            {value !== `` ? fileName : label}
          </span>
          {this.renderMark()}
          <input className="input-file__field"
            type="file"
            name={name}
            ref={this.setInputFileRef}
            onChange={this.onUpdateValue}
            onClick={clickInput}
          />
        </label>
        {errors.length ? this.renderErrors() : null}
      </div>
    )
  }

}

export default multiLang(InputFile)