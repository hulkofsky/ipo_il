import React, {Component, Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import './Tabs.style.styl'

class Tabs extends Component {

  static  propTypes = {
    defaultActiveTabIndex: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired
  }

  state = {
    // eslint-disable-next-line
    activeTabIndex: this.props.defaultActiveTabIndex
  }

  handleTabClick = (tabIndex) => {
    this.setState({
      activeTabIndex: tabIndex
    })

  }

  renderChildrenWithTabsApiAsProps = () => {
    const {activeTabIndex} = this.state
    const {children} = this.props

    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === activeTabIndex
      })
    })
  }

  renderActiveTabContent = () => {
    const {activeTabIndex} = this.state
    const {children} = this.props

    if (children[activeTabIndex]) return children[activeTabIndex].props.children
  }

  render() {
    const {height, tabsAddClassName } = this.props
    return (
      <div className={`tabs`} >
        <ul className={`tabs__navigation ${tabsAddClassName || ''}`}>
          {this.renderChildrenWithTabsApiAsProps()}
        </ul>
        <div style={{minHeight: height}}>
          {this.renderActiveTabContent()}
        </div>
      </div>
    )
  }

}

export default Tabs
