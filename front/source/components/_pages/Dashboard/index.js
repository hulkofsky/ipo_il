import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import { getAllProjects } from '../../../redux/reducers/getProjects.reducer';
import { projectsSingle, home } from '../../../utils/routesBack'
import { connect } from 'react-redux';
import multiLang from '../../_HOC/lang.hoc';
import Loader from './partials/Loader';
import PageFooter from '../../PageFooter/PageFooter.index'
import NavLinkButton from './NavLinkButton/NavLinkButton';
// import { home } from '../../../utils/routesBack'

class Dashboard extends Component {

  static propTypes = {
    dir: PropTypes.string,
    lang: PropTypes.string,
    getProjects: PropTypes.func,
    content: PropTypes.object
  }

  state = {
    isNavLinkButtonVisible: true,
    isNavBarButtonVisible: true
  }

	componentDidMount = () => {
    const {lang, getAllProjects} = this.props;
    const userType = window.localStorage.getItem('user-type');
    const projectType = userType === 'investor' ? 'purchasedprojects' : 'myprojects';

    const projectsSingle = `${userType}/${window.localStorage.getItem('user-id')}/${projectType}`

    getAllProjects(lang, projectsSingle)
  }

  onLinkButtonClick = () => {
    console.log('click')
    let sidebar = document.querySelector('.sidebar')
    console.log(sidebar)
    sidebar.classList.add('visible')
    this.setState({
      isNavLinkButtonVisible: false
    })
  }

  onBackdropClick = () => {
    console.log('click on backdrop')
    let sidebar = document.querySelector('.sidebar')
    console.log(sidebar)
    sidebar.classList.remove('visible')
    this.setState({
      isNavLinkButtonVisible: true
    })
  }

  renderPage() {
   const {dir, lang, content, contentForFooter} = this.props;

   if (!content.pageContent) return null
   // const pageFooterText = contentForFooter.pageContent[0][lang]

   
   let navBackdrop = null
   if(!this.state.isNavLinkButtonVisible){
     navBackdrop = <div className='navLinkButtonBackdrop' onClick={this.onBackdropClick}></div>
    } 
    
    
    let pageContent;
    if (!content.pageContent) {
      pageContent = <Loader style={{position: 'fixed', top: "50%", left: "50%"}}/>
    } else {
      pageContent = (
        <div>
          <Header pageHeaderText={content.pageContent[0][lang]}/>
          <Sidebar clickToHideBackdrop={this.onBackdropClick}/>
          <Main />
          <NavLinkButton classNameToProps={this.state.isNavLinkButtonVisible ? 'NavLinkButton show' : 'NavLinkButton hide'} 
                          click={this.onLinkButtonClick}/>
          {navBackdrop}
        </div>
      )
    }

    return(
      <React.Fragment>
        {pageContent}
      </React.Fragment>
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

const mapStateToProps = state => {
  return {
    content: state.allProjects,
    contentForFooter: state.pageContent
  }
}
const mapDispatchToProps = dispatch => {

  return{
    getAllProjects: (lang, projectsSingle) => (dispatch(getAllProjects(lang, projectsSingle))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(Dashboard)
)
