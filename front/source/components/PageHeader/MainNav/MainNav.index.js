import React from 'react'
import PropTypes from 'prop-types'
import './MainNav.style.styl'

import MainNavLink from './MainNav.item'

MainNav.propTypes = {
  contentText: PropTypes.object
}

function MainNav(props) {

  const {contentText} = props
  const navLinks = [
    {to: `/home`, text: contentText[`nav.home`]},
    {to: `/tutorial`, text: contentText[`nav.how_does_it_work`]},
    {to: `/about`, text: contentText[`nav.about_us`]},
    {to: `/entrepreneur-seeking-funding`, text: contentText[`nav.enterpreneur`]},
    {to: `/contacts`, text: contentText[`nav.contact_us`]},
  ]

  const renderItems = navLinks.map(item => {
    return (
      <li className="main-nav__item" key={item.text}>
        <MainNavLink blockName={`main-nav`} linkData={item} />
      </li>
    )
  })

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {renderItems}
      </ul>
    </nav>
  )

}

export default MainNav