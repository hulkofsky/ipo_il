import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { hideOverlay } from '../../../redux/reducers/overlay.reducer'

LogInModal.propTypes = {
  contentText: PropTypes.object,
  // from connect
  hideOverlay: PropTypes.func,
  // from LogIn.index
  close: PropTypes.func,
  // from HOC Lang.hoc
  dir: PropTypes.string
}

function LogInModal(props) {

  const closeModal = () => {
    const {close, hideOverlay} = props
    close()
    hideOverlay()
  }

  const renderPage = () => {
    const {dir, contentText} = props

    if (!contentText) return null

    return (
      <div className="log-in-modal" dir={dir}>
        <div className="log-in-modal__button-wrapper" onClick={closeModal}>
          <a href="#"
            className="log-in-modal__button"
          >
            <span className="log-in-modal__button-text">Close Modal</span>
          </a>
        </div>
        <h1 className="log-in__title">
          {contentText[`log_in.forgot_link`]}
        </h1>
        <div className="log-in__text">
          {contentText[`log_in.modal.we_sent`]}
          {` email@email.com `}
          {contentText[`log_in.modal.with_a_link`]}
        </div>
        <div className="log-in__text-small">
          {contentText[`log_in.modal.dont_receive`]}
          <a href="#" className="log-in__text-link">
            {contentText[`log_in.modal.try_again_link`]}
          </a>
        </div>

        <div className="log-in-modal__button-ok-wrapper" onClick={closeModal}>
          <a href="#"
            className="log-in-modal__button-ok button button-main"
          >
            {contentText[`log_in.modal.ok_btn`]}
          </a>
        </div>
      </div>
    )
  }


  return (
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

const mapStateToProps = null
const mapDispatchToProps = {hideOverlay}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    multiLang(LogInModal)
  )
)