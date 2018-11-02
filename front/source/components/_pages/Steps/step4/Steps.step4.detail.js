import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addAmount } from '../../../../redux/reducers/totalAmount'
import { withRouter } from 'react-router-dom'
import './Steps.step4.detail.style.styl'
import { ProjectType } from '../step3/Steps.step3'

class PersonalDetail extends Component {

  static  propTypes = {
    // from Steps.step3
    dir: PropTypes.string,
    content: PropTypes.object,
    project: PropTypes.object,
    // from connect
    addAmount: PropTypes.func
  }

  state = {
    account: window.sessionStorage.getItem(`stepBank`) ? JSON.parse(window.sessionStorage.getItem(`stepBank`)).ownerName : ``,
    projectName: this.props.match.params.projectName,
    accountNumber: window.sessionStorage.getItem(`stepBank`) ? JSON.parse(window.sessionStorage.getItem(`stepBank`)).accountNumber : ``,
    unitsA: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount : 0,
    totalA: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice : 0,
    units1B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount1 : 0,
    total1B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice1 : 0,
    units2B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount2 : 0,
    total2B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice2 : 0,
    units3B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount3 : 0,
    total3B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice3 : 0,
  }

  renderPage = () => {
    const {account, projectName, accountNumber, unitsA, totalA, units1B, total1B, total2B, total3B, units2B, units3B} = this.state
    const {dir, content, project} = this.props

    if (!content || !project) return null

    const projectTypeA = project.project_type === ProjectType.A
    const projectTypeB = project.project_type === ProjectType.B

    return (
      <div className="steps-page__personal-detail steps-page__personal-detail--step-4" dir={dir}>
        <div className="steps-review__wrapper">

          <table className="steps-review__inner">
            <tbody>
              <tr>
                <td className="steps-review__title">{content[`signin.account_owner_label`]}</td>
                <td className="steps-review__text">{account}</td>
              </tr>
              <tr>
                <td className="steps-review__title">{content[`signin.account_number_label`]}</td>
                <td className="steps-review__text">{accountNumber}</td>
              </tr>
              <tr>
                <td className="steps-review__title">{content[`signin.project_name`]}</td>
                <td className="steps-review__text">{projectName}</td>
              </tr>
              {projectTypeA && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]}</td>
                <td className="steps-review__text">{unitsA}</td>
              </tr>}
              {projectTypeB && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]} 1</td>
                <td className="steps-review__text">{units1B}</td>
              </tr>}
              {projectTypeB && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]} 2</td>
                <td className="steps-review__text">{units2B}</td>
              </tr>}
              {projectTypeB && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]} 3</td>
                <td className="steps-review__text">{units3B}</td>
              </tr>}
            </tbody>
          </table>

          <div className="steps-review__inner steps-review__inner--total">
            {projectTypeA && <div className="steps-review__text-wrapper">
              <div className="steps-review__title">
                {content[`signin.total_ils`]}
              </div>
              <div className="steps-review__text">{totalA} {content[`purchase.ils`]}</div>
            </div>}
            {projectTypeB && <div className="steps-review__text-wrapper">
              <div className="steps-review__title">
                {content[`signin.total_ils`]} 1
              </div>
              <div className="steps-review__text">{total1B} {content[`purchase.ils`]}</div>
            </div>}
            {projectTypeB && <div className="steps-review__text-wrapper">
              <div className="steps-review__title">
                {content[`signin.total_ils`]} 2
              </div>
              <div className="steps-review__text">{total2B} {content[`purchase.ils`]}</div>
            </div>}{projectTypeB && <div className="steps-review__text-wrapper">
            <div className="steps-review__title">
              {content[`signin.total_ils`]} 3
            </div>
            <div className="steps-review__text">{total3B} {content[`purchase.ils`]}</div>
          </div>}

          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderPage()}
      </Fragment>
    )
  }

}

const mapStateToProps = null
const mapDispatchToProps = {addAmount}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PersonalDetail)
)