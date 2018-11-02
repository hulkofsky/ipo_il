import React, { Component } from 'react'
import RadioButton from '../../SignUp/SignUp.radio'

class Swithcer extends Component {

  render() {
    const {selectedValue, onUpdateSelectedValue} = this.props

    return (
      <div className = "steps__switch">
        <div className="steps__radio">
          <RadioButton
            name = "email"
            value = "email"
            selectedValue = {selectedValue}
            updateValue = {onUpdateSelectedValue}
            label = {'Email'}
          />
        </div>
        <div className="steps__radio">
          <RadioButton
            name = "push"
            value = "push"
            selectedValue = {selectedValue}
            updateValue = {onUpdateSelectedValue}
            label = {'Notification'}
          />
        </div>
      </div>
    )
  }
}

export default Swithcer