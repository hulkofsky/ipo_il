import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

Error.propTypes = {
  // from index
  error: PropTypes.string,
  close: PropTypes.func
}

function Error(props) {

  const {error, close} = props

  return (
    <Fragment>
      <div className = "errors__icon-wrap">
        <svg xmlns = "http://www.w3.org/2000/svg" width = "40" height = "40" viewBox = "0 0 488.451 488.451"
             className = "errors__icon">
          <path
            d = "M484.125 412.013l-212.2-367.6c-12.3-21.3-43.1-21.3-55.4 0l-212.2 367.6c-12.3 21.3 3.1 48 27.7 48h424.4c24.6 0 40-26.7 27.7-48zm-239.6-254.4c13.6 0 24.6 11.3 24.2 24.9l-4 139.6c-.3 11-9.3 19.7-20.3 19.7s-20-8.8-20.3-19.7l-3.9-139.6c-.3-13.6 10.6-24.9 24.3-24.9zm-.3 252.5c-13.9 0-25.2-11.3-25.2-25.2 0-13.9 11.3-25.2 25.2-25.2s25.2 11.3 25.2 25.2-11.3 25.2-25.2 25.2z" />
        </svg>
      </div>
      <div className = "errors__text">
        <p>
          {error}
        </p>
      </div>
      <div className = "errors__btn-wrap">
        <a href = "#" className = "errors__btn btn btn-close" onClick = {close}>
          <span className = "btn-close__text">Close</span>
          <span className = "btn-close__icon-wrap">
              <svg xmlns = "http://www.w3.org/2000/svg" width = "15" height = "15" viewBox = "0 0 26.392 26.015"
                   className = "btn-close__icon">
                <path fillRule = "evenodd" clipRule = "evenodd"
                      d = "M25.896 21.943l-8.963-8.949 8.951-8.938c.787-.786.628-2.219-.355-3.201-.984-.982-2.42-1.142-3.206-.356l-9.181 9.167L4.039.558C3.257-.223 1.833-.064.858.912c-.977.977-1.135 2.401-.354 3.182l8.881 8.884-8.893 8.896c-.779.779-.616 2.207.364 3.189.981.98 2.409 1.145 3.188.363l9.081-9.083 9.188 9.175c.786.784 2.225.62 3.214-.367.99-.986 1.155-2.423.369-3.208z" />
              </svg>
          </span>
        </a>
      </div>
    </Fragment>
  )

}

export default Error

