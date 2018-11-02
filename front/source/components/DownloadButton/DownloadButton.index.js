import React from 'react'
import PropTypes from 'prop-types'
import './DownloadButton.style.styl'

DownloadButton.propTypes = {
  // from parent component
  file: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  text: PropTypes.string,
  multiple: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  setRef: PropTypes.func,
  className: PropTypes.string,
  dir: PropTypes.string
}

function DownloadButton(props) {

  const setClassName = () => {
    const {multiple} = props

    if (multiple) return `button download-button-multiple`
    return `button download-button`
  }

  const {text, file, multiple, label, onClick, setRef, className, dir} = props
  return (
    <div className={`download-button-wrapper ${className || ``}`}>
      <a className={setClassName()}
        href={file}
        target="_blank"
        download={!multiple}
        onClick={onClick}
        ref={setRef}
        dir={dir}
      >
        {text || `Download file`}
      </a>
      <div className="download-button__filename">
        {label}
      </div>
    </div>

  )

}

export default DownloadButton
