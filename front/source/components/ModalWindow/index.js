import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

// style
import './modal-window.styl'

class Modal extends Component {

  static propTypes = {
    // from parent component
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node
    ]),
    closeModal: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handlerKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handlerKeyUp)
  }

  handlerKeyUp = (event) => {
    event && event.preventDefault && event.preventDefault()

    const {code} = event
    const {closeModal} = this.props

    if (code === 'Escape') closeModal(event)
  }

  render() {
    const {children, closeModal} = this.props

    return createPortal(
      <section className = "modal-window__wrapper">
        <div className = "modal-window__window">
          <button
            className = "modal-window__button-close"
            type = "button"
            onClick = {closeModal}
          >
            <span className = "modal-window__button-close-text">
              Close modal
            </span>
          </button>
          {children}
        </div>
      </section>,
      document.getElementById('portal')
    )
  }

}

export default Modal