import React, {Component} from 'react'

export default function (WrappedComponent) {
  return class toggleInputTooltip extends Component {

    state = {
      isOpen: false
    }

    showTooltip = () => this.setState(({isOpen: true}))

    hideTooltip = () => this.setState(({isOpen: false}))

    render() {
      return (
        <WrappedComponent {...this.state}
          {...this.props}
          showTooltip={this.showTooltip}
          hideTooltip={this.hideTooltip}
        />
      )
    }

  }
}