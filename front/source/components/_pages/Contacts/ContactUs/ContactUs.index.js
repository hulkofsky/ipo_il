import React from 'react'
import PropTypes from 'prop-types'
import './ContactUs.style.styl'

import Container from '../../../grid/Container/Container.index'
import ContentSection from '../../../ContentSection/ContentSection.index'
import Form from '../Form/Form.index'

ContactUs.propTypes = {
  // Contacts.index
  contentText: PropTypes.object,
  contentMedia: PropTypes.object,
  dir: PropTypes.string
}

function ContactUs(props) {

  const render = function () {
    const {contentText, contentMedia, dir} = props

    if (!contentMedia || !contentText) return null
    return (
      <ContentSection className={`contact-us`}>
        <header className="content-section__header" dir={dir}>
          <h1 className="content-section__title">
            {contentText.title}
          </h1>
          <div className="content-section__text">
            <p>
              {contentText.descr}
            </p>
          </div>
        </header>
        <div className="contact-us__container" dir={dir}>
          <div className="contact-us__item">
            <Form contentText = {contentText} />
          </div>
          <div className="contact-us__item contact-us__image-wrapper">
            <img src={contentMedia.img} alt="contact us" />
          </div>
        </div>
      </ContentSection>
    )
  }

  return (
    <Container>
      {render()}
    </Container>
  )

}

export default ContactUs