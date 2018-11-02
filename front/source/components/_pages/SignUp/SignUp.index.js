import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../_HOC/lang.hoc'
import { connect } from 'react-redux'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'
import { Link } from 'react-router-dom'
import { home, signup } from '../../../utils/routesBack'
import './SignUp.style.styl'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import ContentSection from '../../ContentSection/ContentSection.index'
import Container from '../../grid/Container/Container.index'
import RadioButton from './SignUp.radio'
import Investor from './SignUp.investorForm'
import Entrepreneur from './SignUp.entrepreneurForm'
import Preloader from '../../Loader/Loader'

class SignUp extends Component {

  static propTypes = {
    // from HOC Lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from connect
    getPageContent: PropTypes.func,
    content: PropTypes.object
  }

  state = {
    selectedValue: `investor`
  }

  componentDidMount() {
    const {lang, getPageContent} = this.props

    getPageContent(lang, signup)
  }

  onUpdateSelectedValue = evt => {
    const {value} = evt.target
    this.setState({
      selectedValue: value
    })
  }

  renderSignUp = () => {
    const {content, lang} = this.props
    const {selectedValue} = this.state
    
    return (selectedValue === `investor`)
    ? <Investor contentText = {content.pageContent[3] ? content.pageContent[3][lang] : null} banks = {content.banks} />
    : <Entrepreneur contentText = {content.pageContent[3] ? content.pageContent[3][lang] : null} countries = {content.pageContent[0][lang]} />
  }

  renderPage() {
    const {dir, lang, content} = this.props
    const {selectedValue} = this.state

    if (!content.pageContent) return <Preloader />

    return (
      <BaseLayout pageHeaderText = {content.pageContent[2][lang]}
        pageHeaderMedia = {content.pageContent[2].media}
        pageFooterText = {content.pageContent[1][lang]}
        path = {signup}
      >
        <Container>
          <ContentSection className={`sign-up`}>
            <header className="content-section__header" dir={dir}>
              <h1 className="content-section__title">
                {(content.pageContent[3] && content.pageContent[3][lang]) ? content.pageContent[3][lang].title : null}
              </h1>
              <div className="content-section__text">
                <p>
                  {(content.pageContent[3] && content.pageContent[3][lang]) ? content.pageContent[3][lang].descr : null}
                </p>
              </div>
            </header>
            <div className="sign-up__switch" dir={dir}>
              <RadioButton name="user"
                value="investor"
                selectedValue={selectedValue}
                updateValue={this.onUpdateSelectedValue}
                label={(content.pageContent[3] && content.pageContent[3][lang]) ? content.pageContent[3][lang].investor_rb : null}
              />
              <RadioButton name="user"
                value="entrepreneur"
                selectedValue={selectedValue}
                updateValue={this.onUpdateSelectedValue}
                label={(content.pageContent[3] && content.pageContent[3][lang]) ? content.pageContent[3][lang].enterpreneur_rb : null}
              />
            </div>
            <div className="sign-up-container" dir={dir}>
              {this.renderSignUp()}
            </div>
            <div className="sign-up__login" dir={dir}>
              <div className="sign-up__login-text">
                {(content.pageContent[3] && content.pageContent[3][lang]) ? content.pageContent[3][lang].already_have : null}
              </div>
              <Link to="/log-in" className="sign-up__link">
                {(content.pageContent[3] && content.pageContent[3][lang]) ? content.pageContent[3][lang].log_in_link : null}
              </Link>
            </div>
          </ContentSection>
        </Container>
      </BaseLayout>
    )
  }

  render() {

    return (
      <Fragment>
        {this.renderPage()}
      </Fragment>
    )
  }

}

const mapStateToProps = state => ({content: state.pageContent})
const mapDispatchToProps = {getPageContent}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(SignUp)
)
