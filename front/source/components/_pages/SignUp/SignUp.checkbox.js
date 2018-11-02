import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import multiLang from '../../_HOC/lang.hoc'

Checkbox.propTypes = {
  // from SignUp.investorForm
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  changeValue: PropTypes.func.isRequired,
  content: PropTypes.object,
  // from HOC Lang.hoc
  dir: PropTypes.string,
  // from parent component
  onclick: PropTypes.func
}

function Checkbox(props) {

  const setClassName = () => {
    const {value} = props

    if (value) return `sign-up__checkbox-label sign-up__checkbox-label--active`
    return  `sign-up__checkbox-label`
  }

  const renderPage = () => {
    const {name, value, changeValue, dir, content, onclick} = props

    if (!content) return null

    return (
      <div className="sign-up__checkbox-wrapper">
        <label className={setClassName()}>
          <span dir={dir}>{content[`investor.i_have_read`]} </span>
          <Link to={`/terms-of-service`}
            className="sign-up__link"
            dir={dir}
            onClick = {onclick}
          >
            {content[`investor.terms_link`]}
          </Link>
          <input className="sign-up__checkbox"
            type="checkbox"
            name={name}
            checked={value}
            onChange={changeValue}
          />
        </label>
      </div>
    )
  }

  return(
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

export default multiLang(Checkbox)