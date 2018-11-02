import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPageContent } from '../../../redux/reducers/pageContent.reducer'
import { getData } from '../../../redux/reducers/stepsData'
import { withRouter } from 'react-router-dom'
import lang from '../../_HOC/lang.hoc'
import './Steps.style.styl'

import BaseLayout from '../../grid/BaseLayout/BaseLayout.index'
import ContentSection from '../../ContentSection/ContentSection.index'
import Container from '../../grid/Container/Container.index'
import Steps from '../../Steps/Steps.index'
import Step from '../../Steps/Steps.item'
import Step1 from './step1/Steps.step1'
import Step1LogIn from './step1/Steps.step1.logIn'
import Step1Registration from './step1/Steps.step1.registration'
import Step2 from './step2/Steps.step2'
import Step3 from './step3/Steps.step3'
import Step4 from './step4/Steps.step4'
import Step5 from './step5/Steps.step5'
import Preloader from '../../Loader/Loader'

class PageSteps extends Component {
  static propTypes = {
    // from App.routes
    projectId: PropTypes.string,
    projectName: PropTypes.string,
    // from lang.hoc
    dir: PropTypes.string,
    lang: PropTypes.string,
    // from connect
    steps: PropTypes.object,
    content: PropTypes.object,
    getPageContent: PropTypes.func
  }

  state = {
    activeStepIndex: 0,
    isCheck: false,
    isLogIn: !!window.localStorage.getItem(`user-token`),
    isModalOpen: false,
    toLogin: false
  }

  componentDidMount() {
    const { getPageContent, lang, projectId } = this.props

    getPageContent(lang, `project/${projectId}/purchase`)
  }

  onToLoginClick = event => {
    event && event.preventDefault && event.preventDefault()

    this.setState({
      toLogin: true
    })
  }

  openModal = () => this.setState({ isModalOpen: true })
  closeModal = () => this.setState({ isModalOpen: false })

  nextStep = () => {
    this.setState(prevState => {
      return {
        activeStepIndex: prevState.activeStepIndex + 1
      }
    })
  }

  prevStep = () => {
    this.setState(prevState => {
      return {
        activeStepIndex:
          prevState.activeStepIndex === 0
            ? prevState.activeStepIndex
            : prevState.activeStepIndex - 1
      }
    })
  }

  setActiveStep = index => {
    const { steps } = this.props

    if (steps[`step${index + 1}`].touched) {
      this.setState({
        activeStepIndex: index
      })
    }
  }

  personalDetailsChecked = () => {
    this.setState({
      isCheck: true
    })
  }

  renderFirstStep = () => {
    const { isCheck, isLogIn, isModalOpen, toLogin } = this.state
    const { content, lang, emailExist } = this.props

    if (content.branch)
      window.localStorage.setItem(`branch`, JSON.stringify(content.branch))

    if (toLogin)
      return (
        <Step1LogIn
          nextStep={this.nextStep}
          openModal={this.openModal}
          closeModal={this.closeModal}
          isModalOpen={isModalOpen}
          content={content.pageContent[2][lang]}
        />
      )

    if (emailExist && isCheck)
      return (
        <Step1LogIn
          nextStep={this.nextStep}
          openModal={this.openModal}
          closeModal={this.closeModal}
          isModalOpen={isModalOpen}
          content={content.pageContent[2][lang]}
        />
      )

    if (!emailExist && isCheck)
      return (
        <Step1Registration
          nextStep={this.nextStep}
          content={content.pageContent[2][lang]}
          banks={content.banks}
          checkedDetail={this.personalDetailsChecked}
        />
      )

    if (isCheck && isLogIn)
      return (
        <Step1LogIn
          nextStep={this.nextStep}
          openModal={this.openModal}
          closeModal={this.closeModal}
          isModalOpen={isModalOpen}
          content={content.pageContent[2][lang]}
        />
      )

    if (isLogIn)
      return (
        <Step2
          content={content.pageContent[2][lang]}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
        />
      )

    if (isCheck && !isLogIn)
      return (
        <Step1Registration
          nextStep={this.nextStep}
          content={content.pageContent[2][lang]}
          banks={content.banks}
          checkedDetail={this.personalDetailsChecked}
        />
      )

    if (!isCheck)
      return (
        <Step1
          checkedDetail={this.personalDetailsChecked}
          content={content.pageContent[2][lang]}
          login={this.onToLoginClick}
        />
      )
  }

  renderPage = () => {
    const { activeStepIndex, isCheck, isModalOpen } = this.state
    const { projectId, projectName, dir, content, lang } = this.props

    if (!content.pageContent && !content.user) return <Preloader />

    return (
      <BaseLayout
        dir={dir}
        pageHeaderText={content.pageContent[1][lang]}
        pageHeaderMedia={content.pageContent[1].media}
        pageFooterText={content.pageContent[0][lang]}
        path={`project/${projectId}/purchase`}
      >
        <Container>
          <ContentSection className={`steps-page`}>
            <header className="content-section__header" dir={dir}>
              <h1 className="content-section__title">
                {content.pageContent[2][lang]
                  ? content.pageContent[2][lang].title
                  : null}
              </h1>
            </header>
            <div dir={dir}>
              <Steps
                activeStepIndex={activeStepIndex}
                isCheck={isCheck}
                nextStep={this.nextStep}
                setActiveStep={this.setActiveStep}
                dir={dir}
                openModal={this.openModal}
                closeModal={this.closeModal}
                isModalOpen={isModalOpen}
              >
                <Step
                  title={
                    content.pageContent[2][lang]
                      ? content.pageContent[2][lang][`step_1.label`]
                      : null
                  }
                >
                  {this.renderFirstStep()}
                </Step>
                <Step
                  title={
                    content.pageContent[2][lang]
                      ? content.pageContent[2][lang][`step_2.label`]
                      : null
                  }
                >
                  <Step2
                    content={content.pageContent[2][lang]}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                  />
                </Step>
                <Step
                  title={
                    content.pageContent[2][lang]
                      ? content.pageContent[2][lang][`step_3.label`]
                      : null
                  }
                >
                  <Step3
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    content={content.pageContent[2][lang]}
                    project={content.project}
                  />
                </Step>
                <Step
                  title={
                    content.pageContent[2][lang]
                      ? content.pageContent[2][lang][`step_4.label`]
                      : null
                  }
                >
                  <Step4
                    content={content.pageContent[2][lang]}
                    project={content.project}
                    branch={content.branch}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    user={content.user}
                  />
                </Step>
                <Step
                  title={
                    content.pageContent[2][lang]
                      ? content.pageContent[2][lang][`step_5.label`]
                      : null
                  }
                >
                  <Step5
                    content={content.pageContent[2][lang]}
                    projectId={projectId}
                    projectName={projectName}
                    project={content.project}
                  />
                </Step>
              </Steps>
            </div>
          </ContentSection>
        </Container>
      </BaseLayout>
    )
  }

  render() {
    return <Fragment>{this.renderPage()}</Fragment>
  }
}

const mapStateToProps = state => ({
  steps: state.steps,
  emailExist: state.steps.emailExist,
  content: state.pageContent,
  isAuthenticated: !!state.login.token
})
const mapDispatchToProps = { getPageContent, getData }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(lang(PageSteps))
)
