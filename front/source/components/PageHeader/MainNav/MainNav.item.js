import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import multiLang from '../../_HOC/lang.hoc'

NavItem.propTypes = {
  // from MainNav.index
  linkData: PropTypes.object.isRequired,
  blockName: PropTypes.string,
  // from HOC Lang.hoc
  dir: PropTypes.string
}

function NavItem(props) {
  const {linkData, blockName = ``, dir} = props
  return (
    <NavLink to={linkData.to}
      className={`${blockName}__link`}
      activeClassName={`${blockName}__link--active`}
    >
      <span className={`${blockName}__link-text`} dir={dir}>
        {linkData.text}
      </span>
    </NavLink>
  )

}

export default multiLang(NavItem)