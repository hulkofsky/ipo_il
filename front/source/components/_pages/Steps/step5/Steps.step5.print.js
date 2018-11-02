import React from 'react'
import PropTypes from 'prop-types'

PrintButton.propTypes = {
  // from parent component
  file: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  text: PropTypes.string.isRequired,
  label: PropTypes.string,
  setRef: PropTypes.func,
}

function PrintButton(props) {

  const printDocument = event => {
    event && event.preventDefault && event.preventDefault()
    window.frames[`iframe`].print()
  }



  const {file, text, label} = props
  return (
    <div className={`download-button-wrapper`}>
      <iframe src={file}
        name="iframe"
        style={{display: `none`}}
      />
      <a className = "button download-button print-button"
        href="#"
        target="_self"
        onClick={printDocument}
      >
        {text}
      </a>
      <div className="download-button__filename">
        {label}
      </div>
    </div>

  )

}

export default PrintButton