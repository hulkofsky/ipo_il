import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import multiLang from '../../../_HOC/lang.hoc';
import { hideOverlay } from '../../../../redux/reducers/overlay.reducer';

aLogInModal.propTypes = {
  contentText: PropTypes.object,
  hideOverlay: PropTypes.func,
  close: PropTypes.func,
  dir: PropTypes.string
};

function aLogInModal(props) {
  const closeModal = () => {
    const { close, hideOverlay } = props;
    close();
    hideOverlay();
  };
  const renderPage = () => {
    const { dir, contentText } = props;
    if (!contentText) return null;
    return (
      <div className="log-in-modal" dir={ dir }>
        <div className="log-in-modal__button-wrapper" onClick={ closeModal }>
          <a href="#"
            className="log-in-modal__button"
          >
            <span className="log-in-modal__button-text">Close Modal</span>
          </a>
        </div>
        <h1 className="log-in__title">
          { contentText['admin_log_in.forgot_link'] }
        </h1>
        <div className="log-in__text">
          { contentText['admin_log_in.modal.we_sent'] }
          { 'email@email.com' }
          { contentText['admin_log_in.modal.with_a_link'] }
        </div>
        <div className="log-in__text-small">
          { contentText['admin_log_in.modal.dont_receive'] }
          <a href="#" className="log-in__text-link">
            { contentText['admin_log_in.modal.try_again_link'] }
          </a>
        </div>
        <div className="log-in-modal__button-ok-wrapper" onClick={ closeModal }>
          <a href="#"
            className="log-in-modal__button-ok button button-main"
          >
            { contentText['admin_log_in.modal.ok_btn'] }
          </a>
        </div>
      </div>
    )
  };
  return (
    <Fragment>
      { renderPage() }
    </Fragment>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = { hideOverlay };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(multiLang(aLogInModal)))