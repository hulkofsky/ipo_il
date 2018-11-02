import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPageContent } from '../../redux/reducers/pageContent.reducer'
import multiLang from '../_HOC/lang.hoc'
import { LangConsumer } from './Lang.index'

import SwitchButton from './Lang.button'

class LangSwitch extends Component {

  static propTypes = {
    contentText: PropTypes.object,
    path: PropTypes.string,
    // from HOC Lang.hoc
    dir: PropTypes.string,
    // from connect
    getPageContent: PropTypes.func
  }

  state = {
    selectedLang: `he`
  }

  componentDidMount() {
    const lang = window.localStorage.getItem(`lang`)

    if (!lang) return
    this.setState({
      selectedLang: lang
    })
  }

  handleLangChange = (evt, context, dir) => {
    const {getPageContent, path} = this.props
    const {value} = evt.target
    const {changeLang} = context
    this.setState({selectedLang: value})
    changeLang(value, dir)
    window.localStorage.setItem(`lang`, value)
    window.localStorage.setItem(`dir`, dir)
    getPageContent(value, path)
  }

  renderLangSwitch = context => {
    const {selectedLang} = this.state
    const {dir, contentText} = this.props

    if (!contentText) return null
    return (
      <div className="lang-switch">
        <div className="lang-switch__text page-footer-text">
          <span dir={dir}>{contentText[`footer.lang`]}</span>
          <SwitchButton context={context}
            selectedLang={selectedLang}
            lang="he"
            dir="rtl"
            handleLangChange={this.handleLangChange}
          />
          |
          <SwitchButton context={context}
            selectedLang={selectedLang}
            lang="en"
            dir="ltr"
            handleLangChange={this.handleLangChange}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <LangConsumer>
        {context => this.renderLangSwitch(context)}
      </LangConsumer>
    )
  }

}

const mapStateToProps = null
const mapDispatchToProps = {getPageContent}

export default connect(mapStateToProps, mapDispatchToProps)(multiLang(LangSwitch))
