import React from 'react'
import './SocialLinks.style.styl'
import PropTypes from 'prop-types'

import Container from '../grid/Container/Container.index'
import ContentSection from '../ContentSection/ContentSection.index'
import Link from './SocialLinks.link'

SocialLinks.propTypes = {
  content: PropTypes.array,
  dir: PropTypes.string
}

function SocialLinks(props) {

  const renderLinks = function () {
    const {content} = props

    if(!content) return null
    return content.map(link => {
      return (
        <li className="social-links__item" key={link.id}>
          <Link name={link.contact}
            url={``}
            icon={link.icon}
          />
        </li>
      )
    })

  }


  const {dir} = props
  return (
    <Container>
      <ContentSection className={`social-links`}>
        <ul className="social-links__list" dir = {dir}>
          {renderLinks()}
        </ul>
      </ContentSection>
    </Container>
  )

}

export default SocialLinks