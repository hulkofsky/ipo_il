import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import file from './images/Edo.pdf'

NDA.propTypes = {
  // from SignUp.entrepreneur
  updateValue: PropTypes.func,
  content: PropTypes.object
}

function NDA(props) {

  const renderPage = () => {
    const {updateValue, content} = props

    if (!content) return null

    return (
      <Fragment>
        <div className="sign-up__title-download-link">
          {content[`ent.pre_signed`]}
        </div>
        <a href={file}
          download
          className="sign-up__download-link"
          onClick={updateValue}
        >
          {content[`ent.download`]}
        </a>
      </Fragment>
    )

  }

  return (
    <Fragment>
      {renderPage()}
    </Fragment>
  )

}

export default NDA