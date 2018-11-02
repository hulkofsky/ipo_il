import React, { Component, Fragment } from 'react';
import Logo from '../../../PageHeader/PageLogo/PageLogo.index';
import Search from './Search';
import ProfileMenu from './ProfileMenu';
import Langs from './LangSwitch';
import { getAllProjects } from '../../../../redux/reducers/getProjects.reducer';
import './header.styl';
import { connect } from 'react-redux';
import multiLang from '../../../_HOC/lang.hoc'
import { projects } from '../../../../utils/routesBack';
import MainNav from '../../../PageHeader/MainNav/MainNav.index'

class Header extends Component {

  getData = () => {
    const {lang, dir, getAllProjects} = this.props
    const projects = `enterpreneur/${window.localStorage.getItem('user-id')}/myprojects`
    getAllProjects(lang, projects)
  }

  renderPage() {
    const {content, lang} = this.props

    if(!content.pageContent || !content.pageContent[2]) return null
    const pageHeaderText = content.pageContent[2][lang]

    return (
      <header className="page-header dash-header">
        <Logo
          path="dash"
          logo={content.pageContent[0].media.logo}
        />
        <div className='main_nav-wrapper'>
          <MainNav contentText = {pageHeaderText}/>
        </div>
        <div className="dash-header__menu">
          <Search placeholder={content.pageContent[0][lang].search}/>
          <div className="dash-header__settings">
            <div className="dash-header__lang">
              <Langs
                langs={content.pageContent[0]}
                getData={this.getData}
              />
            </div>
            <ProfileMenu />
          </div>
        </div>
      </header>
    );
  }
  render () {
    return(
      <Fragment>
        {this.renderPage()}
      </Fragment>
      )
  }

}

const mapStateToProps = state => {
  return {
    content: state.allProjects
  }
}

export default connect(mapStateToProps, { getAllProjects })(
  multiLang(Header)
  );
