import React, { Component } from 'react'

export default function (WrappedComponent) {
  class Modal extends Component {

    state = {
      isModalOpen: false
    }

    openModal = (event) => {
      event && event.preventDefault && event.preventDefault()

      this.setState({
        isModalOpen: true
      })
    }

    closeModal = (event) => {
      event && event.preventDefault && event.preventDefault()

      this.setState({
        isModalOpen: false
      })
    }

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          openModal = {this.openModal}
          closeModal = {this.closeModal}
        />
      )
    }

  }

  Modal.displayName = `Modal(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return Modal
}