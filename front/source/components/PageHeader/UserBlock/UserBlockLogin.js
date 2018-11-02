import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from "../../../redux/reducers/loginUser.reducer"
import {Link} from 'react-router-dom'

// style
import './UsertBlockLogin.styl'
import icon from './images/profile.svg'
import login from "../../../redux/reducers/loginUser.reducer"

UserBlockLogin.propTypes = {
  // from connect
  logout: PropTypes.func,
  user: PropTypes.any,
  // from PageHeader.index
  contentText: PropTypes.object
}

function UserBlockLogin(props) {

  const {user} = props

  const userType = window.localStorage.getItem(`user-type`) ? window.localStorage.getItem(`user-type`) : ``
  const userId = window.localStorage.getItem(`user-id`) ? window.localStorage.getItem(`user-id`) : ``

  const getUserName = () => {
    if (window.localStorage.getItem(`user-name`)) return window.localStorage.getItem(`user-name`)
    return `${user.first_name} ${user.last_name}`
  }

  const logout = event => {
    event && event.preventDefault && event.preventDefault()

    const {logout} = props

    logout()
  }

  const {contentText} = props
  return (
    <div className="user-block-login__wrapper">
      <div className="user-block-login__column">
        <div className="user-block-login__image-wrapper">
          <img src={icon} alt="" />
        </div>
        <div className="user-block-login__name">
          {getUserName()}
        </div>

        <div className="user-block-login__hover-wrapper">
          <ul className="user-block-login__list">
            <li className="user-block-login__item">
              <Link to={`/dash/${userType}/${userId}/profile`} className="user-block-login__link">
                {contentText[`menu.my_profile`]}
              </Link>
            </li>
            <li className="user-block-login__item">
              <Link to={`/dash/${userType}/${userId}/settings`} className="user-block-login__link">
                {contentText[`menu.settings`]}
              </Link>
            </li>
            <li className="user-block-login__item">
              <a href="#"
                 onClick={logout}
                 className="user-block-login__link"
              >
                {contentText[`menu.log_out`]}
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )

}

const mapStateToProps = state => ({user : state.login.profile})
const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(UserBlockLogin)