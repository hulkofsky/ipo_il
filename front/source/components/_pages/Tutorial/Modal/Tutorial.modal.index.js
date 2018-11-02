import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {hideOverlay} from '../../../../redux/reducers/overlay.reducer'
import './Modal.style.styl'

class Modal extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element
    ]),
    // from connect
    hideOverlay: PropTypes.func,
    history: PropTypes.object
  }

  state = {
    isOpen: true
  }

  hide = evt => {
    const {hideOverlay, history} = this.props
    evt && evt.preventDefault && evt.preventDefault()
    hideOverlay()
    this.setState({
      isOpen: false
    })
    history.replace(`/home`)
  }

  renderModal() {
    const {children} = this.props
    return (
      <div className="modal">
        <div className="modal__button-wrapper" onClick={this.hide}>
          <a href="#"
            className="modal__button"
          >
            <span className="modal__button-text">Close Modal</span>
          </a>
        </div>
        {children}
      </div>
    )
  }

  render() {

    return (
      <Fragment>
        {this.state.isOpen && this.renderModal()}
      </Fragment>
    )

  }


}

const mapStateToProps = null
const mapDispatchToProps = {hideOverlay}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Modal)
)