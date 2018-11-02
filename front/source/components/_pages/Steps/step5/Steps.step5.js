import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'
import { history } from '../../../../history'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  clearStatus,
  setStatus,
  setTouched
} from '../../../../redux/reducers/steps.reducer'
import Review from './Steps.step5.review'
import DownloadButton from '../../../DownloadButton/DownloadButton.index'
import Switcher from './Switcher'
import axios from 'axios'
import { BASE_URL } from '../../../../utils/routesBack'
import modalWindow from '../../../_HOC/modalWindow'
import Modal from '../../../ModalWindow/index'

class Step5 extends Component {
  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    // from HOC modalWindow
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    // from Steps.index
    projectId: PropTypes.string,
    projectName: PropTypes.string,
    project: PropTypes.object,
    content: PropTypes.object,
    // from connect
    setStatus: PropTypes.func,
    clearStatus: PropTypes.func,
    setTouched: PropTypes.func,
    pdfLink: PropTypes.string
  }

  state = {
    selectedValue: `email`,
    phoneNumber: window.localStorage.getItem(`branch`)
      ? JSON.parse(window.localStorage.getItem(`branch`)).phone
      : ``
  }

  componentDidMount() {
    const { setStatus, setTouched } = this.props
    setStatus(`step5`, true)
    setTouched(`step5`)
  }

  onUpdateSelectedValue = evt => {
    const { value } = evt.target
    this.setState({
      selectedValue: value
    })
  }

  clearStorage = () => {
    window.sessionStorage.clear()
  }

  fetchData = () => {
    const { pdfLink, match, lang, openModal } = this.props
    const { selectedValue } = this.state

    return new Promise((resolve, reject) => {
      const data = {
        email: window.sessionStorage.getItem(`stepCheck`)
          ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).email
          : window.localStorage.getItem(`user-email`)
            ? window.localStorage.getItem(`user-email`)
            : ``,
        first_name: window.sessionStorage.getItem(`stepCheck`)
          ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).first_name
          : window.localStorage.getItem(`user-first-name`)
            ? window.localStorage.getItem(`user-first-name`)
            : ``,
        last_name: window.sessionStorage.getItem(`stepCheck`)
          ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).last_name
          : window.localStorage.getItem(`user-last-name`)
            ? window.localStorage.getItem(`user-last-name`)
            : ``,
        project_name: match.params.projectName,
        link: pdfLink,
        is_email: selectedValue === 'email'
      }

      const userId = window.localStorage.getItem('user-id')

      axios({
        method: `post`,
        url: `${BASE_URL}/${userId}/done/${match.params.id}`,
        data: data,
        headers: {
          language: lang
        }
      })
        .then(response => {
          if ((response.statusText = 'OK')) {
            openModal()
            resolve()
          } else {
            throw Error('Fetch data fail.')
          }
        })
        .catch(errors => {
          window.console.log('---errors step 5 page', errors)
          reject(errors)
        })
    })
  }

  onButtonDoneClick = event => {
    event && event.preventDefault && event.preventDefault()

    localStorage.removeItem('registerInvestorDataBank')
    localStorage.removeItem('registerInvestorDataBranch')
    this.fetchData()
  }

  handlerButtonCloseModalClick = event => {
    event && event.preventDefault && event.preventDefault()

    const { projectId, projectName, clearStatus, closeModal } = this.props

    closeModal()
    this.clearStorage()
    clearStatus()
    history.replace(`/home/${projectName}/${projectId}`)
  }

  renderPage = () => {
    const { dir, content, pdfLink, project, isModalOpen } = this.props
    const { selectedValue, phoneNumber } = this.state

    if (!content) return null

    return (
      <section className="steps-page__content">
        {isModalOpen && (
          <Modal closeModal={this.handlerButtonCloseModalClick}>
            <div className="steps-page__content__modal">
              <div className="steps-page__content-modal-text">
                {content.steps_done_popup1} {phoneNumber} {content.steps_done_popup2}
                </div>

              <div className="steps-page__button-close-modal-wrapper">
                <button
                  className="steps-page__button-close-modal button button-main"
                  type="button"
                  onClick={this.handlerButtonCloseModalClick}
                >
                  <span className="steps-page__button-close-modal-text">
                    Ok
                  </span>
                </button>
              </div>
            </div>
          </Modal>
        )}
        <header className="steps-page__header" dir={dir}>
          <h1 className="steps-page__title">{content[`rewiew.title`]}</h1>
          <div className="steps-page__text">{content[`rewiew.descr`]}</div>
        </header>
        <Review content={content} project={project} />
        <div className="steps-page__buttons-wrapper">
          <Switcher
            selectedValue={selectedValue}
            onUpdateSelectedValue={this.onUpdateSelectedValue}
          />
          <DownloadButton
            multiple={false}
            text={content[`rewiew.download`]}
            file={pdfLink}
          />
        </div>
        <div className="steps-page__button-wrapper steps-page__button-wrapper--center">
          <button
            className="steps-page__button button button-main"
            type="button"
            onClick={this.onButtonDoneClick}
          >
            {content[`done.btn`]}
          </button>
        </div>
      </section>
    )
  }

  render() {
    return <Fragment>{this.renderPage()}</Fragment>
  }
}

const mapStateToProps = state => ({ pdfLink: state.pdf.pdfLink })
const mapDispatchToProps = { clearStatus, setStatus, setTouched }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(multiLang(modalWindow(Step5)))
)
