import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import './Steps.step3.detail.style.styl'

class PersonalDetail extends Component {

  static  propTypes = {
    // from Steps.step3
    dir: PropTypes.string,
    content: PropTypes.object
  }

  state = {
    firstName: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).first_name :
      window.localStorage.getItem(`user-first-name`) ? window.localStorage.getItem(`user-first-name`) : ``,
    lastName: window.sessionStorage.getItem(`stepCheck`) ? JSON.parse(window.sessionStorage.getItem(`stepCheck`)).last_name :
      window.localStorage.getItem(`user-last-name`) ? window.localStorage.getItem(`user-last-name`) : ``,
    email: window.localStorage.getItem(`user-email`) ? window.localStorage.getItem(`user-email`) : ``,
    phone: window.localStorage.getItem(`user-phone`) ? window.localStorage.getItem(`user-phone`) : ``
  }

  renderPage = () => {
    const {firstName, lastName, email, phone} = this.state
    const {dir, content} = this.props

    if (!content) return null

    return (
      <div className="steps-page__personal-detail" dir={dir}>
        <div className="steps-review__wrapper">
          <table className="steps-review__inner">
            <tbody>
            <tr>
              <td className="steps-review__title">{content[`contact.first_name`]}</td>
              <td className="steps-review__text">{firstName}</td>
            </tr>
            <tr>
              <td className="steps-review__title">{content[`contact.last_name`]}</td>
              <td className="steps-review__text">{lastName}</td>
            </tr>
            </tbody>
          </table>

          <table className="steps-review__inner">
            <tbody>
            <tr>
              <td className="steps-review__title">{content[`contact.email`]}</td>
              <td className="steps-review__text">{email}</td>
            </tr>
            <tr>
              <td className="steps-review__title">{content[`contact.phone`]}</td>
              <td className="steps-review__text">{phone}</td>
            </tr>
            </tbody>
          </table>
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

export default PersonalDetail