import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import multiLang from '../../_HOC/lang.hoc'
import './UserBlock.style.styl'
import Notice from '../Notice/index'

UserBlock.propTypes = {
  contentText: PropTypes.object,
  // from HOC Lang.hoc
  dir: PropTypes.string
}

function UserBlock(props) {

  const {dir, contentText} = props
  return (
    <div className="user-block">
      <Link to={`/log-in`}
        className="user-block__link link link--blue"
        dir={dir}
      >
        {contentText[`nav.login`]}
      </Link>
      <Link to={`/sign-up`}
        className="user-block__button button button--small button-bordered"
        dir={dir}
      >
        {contentText[`nav.sign_up`]}
      </Link>
      <Notice />
    </div>
  )

}

export default multiLang(UserBlock)