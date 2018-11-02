import React from 'react'
import PropTypes from 'prop-types'

TabsItem.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  isActive: PropTypes.bool,
}

function TabsItem(props) {

  const setClassName = () => {
    const {isActive} = props
    if (isActive) return `tabs__nav-button button tabs__nav-button--active`
    return `tabs__nav-button button`
  }

  const onButtonClick = event => {
    const {onClick, tabIndex} = props
    event && event.preventDefault && event.preventDefault()
    onClick(tabIndex)
  }

  const {title} = props
  return (
    <li className="tabs__nav-item">
      <button className={setClassName()}
        type="button"
        onClick={onButtonClick}
      >
        {title}
      </button>
    </li>
  )

}

export default TabsItem