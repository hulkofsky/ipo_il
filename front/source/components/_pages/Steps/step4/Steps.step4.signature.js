import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './Steps.step4.signature.style.styl'
import SignatureCanvas from 'react-signature-canvas'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setStatus, setTouched } from '../../../../redux/reducers/steps.reducer'
import { addPdfLink } from '../../../../redux/reducers/pdf.reducer'
import multilang from '../../../_HOC/lang.hoc'
import axios from 'axios'
import { BASE_URL } from '../../../../utils/routesBack'
import { ProjectType } from '../step3/Steps.step3'

class Signature extends Component {
  static propTypes = {
    // from Lang.hoc
    lang: PropTypes.string,
    // from Steps.step4
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    content: PropTypes.object,
    project: PropTypes.object,
    // from connect
    setStatus: PropTypes.func,
    setTouched: PropTypes.func,
    addPdfLink: PropTypes.func,
    totalPrice: PropTypes.any,
    user: PropTypes.object
  }

  state = {
    signature: ``
  }

  componentDidMount() {
    const { setTouched } = this.props
    setTouched(`step4`)
  }

  canvas = undefined
  setCanvasRef = node => (this.canvas = node)

  clearCanvas = () => {
    this.canvas.clear()
    this.setState({
      signature: ``
    })
  }

  getDataToSend = () => {
    const { project, totalPrice } = this.props

    return new Promise((resolve, reject) => {
      const projectTypeA = project.project_type === ProjectType.A

      const data = {
        bank_name: window.localStorage.getItem(`user-bank`)
          ? JSON.parse(window.localStorage.getItem(`user-bank`))
          : ``,
        branch_name: window.localStorage.getItem(`branch`)
          ? JSON.parse(window.localStorage.getItem(`branch`)).branch_name
          : ``,
        fax: window.localStorage.getItem(`branch`)
          ? JSON.parse(window.localStorage.getItem(`branch`)).fax
          : ``,
        total_price: totalPrice,
        unit_price: project.min_unit_price,
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
        investor_phone_number: window.sessionStorage.getItem(`stepCheck`)
          ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).phone
          : window.localStorage.getItem(`user-phone`)
            ? window.localStorage.getItem(`user-phone`)
            : ``,
        project_name: this.props.match.params.projectName,
        account_number: window.sessionStorage.getItem(`stepBank`)
          ? JSON.parse(window.sessionStorage.getItem(`stepBank`)).accountNumber
          : ``,
        signature: this.state.signature,
        unit_name1: project.unit_name1,
        unit_name2: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue2
            ? project.unit_name2
            : ''
          : '',
        unit_name3: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue3
            ? project.unit_name3
            : ''
          : '',
        total_price1: projectTypeA
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice
          : JSON.parse(window.sessionStorage.getItem('stepPurchase'))
              .totalPrice1,
        total_price2: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase'))
              .totalPrice2
          : 0,
        total_price3: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase'))
              .totalPrice3
          : 0,
        unit_price1: projectTypeA
          ? window.sessionStorage.getItem('stepUnitA')
          : JSON.parse(window.sessionStorage.getItem('stepPurchase'))
              .unitValue1,
        unit_price2: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue2
          : 0,
        unit_price3: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitValue3
          : 0,
        unit_count1: projectTypeA
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount
          : JSON.parse(window.sessionStorage.getItem('stepPurchase'))
              .unitCount1,
        unit_count2: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount2
          : 0,
        unit_count3: window.sessionStorage.getItem('stepPurchase')
          ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount3
          : 0
      }

      resolve(data)
    })
  }

  sendData = () => {
    const { lang, match } = this.props
    const userId = window.localStorage.getItem('user-id')

    return new Promise((resolve, reject) => {
      this.getDataToSend().then(data => {
        axios({
          method: `post`,
          url: `${BASE_URL}/${userId}/purchase/${match.params.id}`,
          data: data,
          headers: {
            language: lang
          }
        }).then(res => {
          resolve(res.data.data.link)
        })
      })
    })
  }

  onButtonNextClick = event => {
    event && event.preventDefault && event.preventDefault()
    const { nextStep, addPdfLink } = this.props

    this.sendData()
      .then(linkToPdf => {
        addPdfLink(linkToPdf)
      })
      .then(nextStep())
  }

  onEnd = async () => {
    const signature = await this.canvas.toDataURL(`base64string`)
    window.sessionStorage.setItem(`stepSignature`, signature)
    this.setState({
      signature: signature
    })
  }

  onButtonPrevClick = event => {
    event && event.preventDefault && event.preventDefault()
    const { prevStep } = this.props

    prevStep()
  }

  disableButton = () => {
    const { setStatus } = this.props
    const { signature } = this.state
    setStatus(`step4`, !!signature)
    return !signature
  }

  renderPage = () => {
    const { content } = this.props

    if (!content) return null

    return (
      <div className="page-steps__signature-wrapper">
        <div className="page-steps__signature-inner-wrapper">
          <div className="page-steps__signature-text">
            {content[`signin.signature`]}
          </div>
          <button
            className="page-steps__signature-button button"
            type={`button`}
            onClick={this.clearCanvas}
          >
            {content[`signin.clear`]}
          </button>
        </div>

        <SignatureCanvas
          ref={this.setCanvasRef}
          canvasProps={{
            width: 1000,
            height: 220,
            className: `page-steps__signature`
          }}
          minWidth={1}
          maxWidth={1}
          onEnd={this.onEnd}
        />

        <div className="steps-page__button-wrapper">
          <button
            className="steps-page__button button button-main"
            type="button"
            onClick={this.onButtonPrevClick}
          >
            {content[`back_btn`]}
          </button>
          <button
            className="steps-page__button button button-main"
            type="button"
            onClick={this.onButtonNextClick}
            disabled={this.disableButton()}
          >
            {content[`next_btn`]}
          </button>
        </div>
      </div>
    )
  }

  render() {
    return <Fragment>{this.renderPage()}</Fragment>
  }
}

const mapStateToProps = state => ({
  totalPrice: state.totalAmount
})
const mapDispatchToProps = { setStatus, setTouched, addPdfLink }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(multilang(Signature))
)
