import React from 'react'
import PropTypes from 'prop-types'

PhotoUploader.propTypes = {
  // from SignUp.entrepreneurForm
  name: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  index: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
  deletePhoto: PropTypes.func,
  content: PropTypes.object
}

function PhotoUploader(props) {

  let photo = undefined
  const setPhotoRef = node => photo = node

  const onButtonClick = evt => {
    const {deletePhoto, name, index} = props
    evt && evt.preventDefault && evt.preventDefault()
    deletePhoto(name, index, photo)
  }

  const renderPreview = () => {
    const {src, alt} = props

    return (
      <div className="sign-up__preview">
        <a href="#"
          className="sign-up__button"
          onClick={onButtonClick}
        >
          <span className="sign-up__button-text">Delete image</span>
        </a>
        <img src={src} alt={alt} />
      </div>
    )
  }

  const renderLabel = () => {
    const {index, name, content} = props

    return (
      <label className="sign-up__photo-text" htmlFor={index ? `${name + index}-id` : `${name}-id`}>
        {content[`team.upload_photo`]}
      </label>
    )
  }

  const {index, name, changeValue, src} = props
  return (
    <div className="sign-up__photo-wrapper">
      {src && renderPreview()}
      {!src && renderLabel()}
      <input type="file"
        ref={setPhotoRef}
        name={name}
        id={index ? `${name + index}-id` : `${name}-id`}
        onChange={event => changeValue(event, index)}
        className="sign-up__photo-input"
      />

    </div>

  )

}

export default PhotoUploader