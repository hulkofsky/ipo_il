import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Steps.step5.review.style.styl'
import { withRouter } from 'react-router-dom'
import { ProjectType } from '../step3/Steps.step3'

Review.propTypes = {
  // from Step.index
  content: PropTypes.object,
  // from connect
  amount: PropTypes.number
}

function Review(props) {

  const data = {
    firstName: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).first_name :
      window.localStorage.getItem(`user-first-name`) ? window.localStorage.getItem(`user-first-name`) : ``,
    lastName: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).last_name :
      window.localStorage.getItem(`user-last-name`) ? window.localStorage.getItem(`user-last-name`) : ``,
    email: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).email :
      window.localStorage.getItem(`user-email`) ? window.localStorage.getItem(`user-email`) : ``,
    phone: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).phone :
      window.localStorage.getItem(`user-phone`) ? window.localStorage.getItem(`user-phone`) : ``,
    ownerName: window.sessionStorage.getItem(`stepBank`) ? JSON.parse(window.sessionStorage.getItem(`stepBank`)).ownerName : ``,
    projectName: props.match.params.projectName,
    accountNumber: window.sessionStorage.getItem(`stepBank`) ? JSON.parse(window.sessionStorage.getItem(`stepBank`)).accountNumber : ``,
    signature: window.sessionStorage.getItem(`stepSignature`) ? window.sessionStorage.getItem(`stepSignature`) : ``,
    total_price1A: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice : 0,
    total_price1B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice1 : 0,
    total_price2: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice2 : 0,
    total_price3: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).totalPrice3 : 0,
    unit_count1A: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount : 0,
    unit_count1B: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount1: 0,
    unit_count2: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount2 : 0,
    unit_count3: window.sessionStorage.getItem('stepPurchase') ? JSON.parse(window.sessionStorage.getItem('stepPurchase')).unitCount3 : 0,
  }

  const renderPage = () => {
    const {content, project} = props

    if (!content || !project) return null

    const projectTypeA = project.project_type === ProjectType.A
    const projectTypeB = project.project_type === ProjectType.B

    return (
      <section className="steps-review">
        <div className="steps-review__wrapper">

          <table className="steps-review__inner">
            <tbody>
              <tr>
                <td className="steps-review__title">{content[`contact.first_name`]}</td>
                <td className="steps-review__text">{data.firstName}</td>
              </tr>
              <tr>
                <td className="steps-review__title">{content[`contact.last_name`]}</td>
                <td className="steps-review__text">{data.lastName}</td>
              </tr>
            </tbody>
          </table>

          <table className="steps-review__inner">
            <tbody>
              <tr>
                <td className="steps-review__title">{content[`contact.email`]}</td>
                <td className="steps-review__text">{data.email}</td>
              </tr>
              <tr>
                <td className="steps-review__title">{content[`contact.phone`]}</td>
                <td className="steps-review__text">{data.phone}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div className="steps-review__wrapper">

          <table className="steps-review__inner">
            <tbody>
              <tr>
                <td className="steps-review__title">{content[`bank.account_owner_field.label`]}</td>
                <td className="steps-review__text">{data.ownerName}</td>
              </tr>
              <tr>
                <td className="steps-review__title">{content[`bank.account_number_field.label`]}</td>
                <td className="steps-review__text">{data.accountNumber}</td>
              </tr>
              <tr>
                <td className="steps-review__title">{content[`signin.project_name`]}</td>
                <td className="steps-review__text">{data.projectName}</td>
              </tr>
              {projectTypeA && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]}</td>
                <td className="steps-review__text">{data.unit_count1A}</td>
              </tr>}
              {projectTypeB && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]}</td>
                <td className="steps-review__text">{data.unit_count1B}</td>
              </tr>}
              {projectTypeB && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]}</td>
                <td className="steps-review__text">{data.unit_count2}</td>
              </tr>}
              {projectTypeB && <tr>
                <td className="steps-review__title">{content[`signin.number_of_units`]}</td>
                <td className="steps-review__text">{data.unit_count3}</td>
              </tr>}
            </tbody>
          </table>

          <div className="steps-review__inner steps-review__inner--total">
            {projectTypeA && <div className="steps-review__text-wrapper">
              <div className="steps-review__title steps-review__title">
                {content[`signin.total_ils`]}
              </div>
              <div className="steps-review__text">{data.total_price1A} {content[`purchase.ils`]}</div>
            </div>}
            {projectTypeB && <div className="steps-review__text-wrapper">
              <div className="steps-review__title steps-review__title">
                {content[`signin.total_ils`]}
              </div>
              <div className="steps-review__text">{data.total_price1B} {content[`purchase.ils`]}</div>
            </div>}
            {projectTypeB && <div className="steps-review__text-wrapper">
              <div className="steps-review__title steps-review__title">
                {content[`signin.total_ils`]}
              </div>
              <div className="steps-review__text">{data.total_price2} {content[`purchase.ils`]}</div>
            </div>}
            {projectTypeB && <div className="steps-review__text-wrapper">
              <div className="steps-review__title steps-review__title">
                {content[`signin.total_ils`]}
              </div>
              <div className="steps-review__text">{data.total_price3} {content[`purchase.ils`]}</div>
            </div>}
          </div>
          <div className="steps-review__inner steps-review__inner--signature">
            <div className="steps-review__text-wrapper">
              <div className="steps-review__title">
                {content[`rewiew.signature`]}
              </div>
              <div className="steps-review__text">
                <img src={data.signature} alt={`signature ${data.firstName}`} />
              </div>
            </div>
          </div>

        </div>
      </section>
    )
  }

  return (
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

const mapStateToProps = null
const mapDispatchToProps = null

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Review)
)