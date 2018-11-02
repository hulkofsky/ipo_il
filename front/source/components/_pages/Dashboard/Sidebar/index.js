import React, { Component, Fragment } from 'react';
import Logout from '../partials/Logout';
import { Link, NavLink } from 'react-router-dom';
import './sidebar.styl';
import LogOut from '../Main/LogOut/LogOut'
import { connect } from 'react-redux';
import multiLang from '../../../_HOC/lang.hoc'



class Sidebar extends Component {

  state = {
    isLogoutBackdropShow: false
  }

  showLogoutBackdrop = () => {
    this.setState({
      isLogoutBackdropShow: true
    })
  }

  hideLogoutBackdrop = () => {
    this.setState({
      isLogoutBackdropShow: false
    })
  }

  renderPage() {
    const {content, lang, dir } = this.props
    const userType = window.localStorage.getItem('user-type')
    const userId = window.localStorage.getItem('user-id')

    if(!content.pageContent) return null
    if(!content) return null;

    let projectsText = content.pageContent[0][lang].my_projects;

    const links = [
      {
        link: `/dash/${userType}/${userId}/projects`,
        text: content.pageContent[0][lang].my_projects,
        addedClass: 'projects',
      },
      {
        link: `/dash/${userType}/${userId}/profile`,
        text: content.pageContent[0][lang].my_profile,
        addedClass: 'profile',
      },
      {
        link: `/dash/${userType}/${userId}/settings`,
        text: content.pageContent[0][lang].settings,
        addedClass: 'settings',
      },
      {
        link: `/dash/${userType}/terms`,
        text: content.pageContent[0][lang].terms,
        addedClass: 'terms',
      },
      // {
      //   link: `/dash/${userType}/help`,
      //   text: content.pageContent[0][lang].help,
      //   addedClass: 'help',
      // },
    ];

    const listItemClass = 'sidebar__list-item';
    const linkClass = 'sidebar__list-link';

    const linksDom = links.map( item => {
      return (
        <li className={`${listItemClass} ${'sidebar__list-' + item.addedClass}`} key={item.text}>
          <NavLink exact={false} to={item.link} className={linkClass}>
            {item.text}
          </NavLink>
        </li>
      )
    })

    linksDom.push(
      <li className={listItemClass + ' sidebar__list-logout'} key='logout'>
        <Logout className={linkClass} logout={this.showLogoutBackdrop}
          click={this.showLogoutBackdrop}
          text={content.pageContent[0][lang].log_out}
        />
      </li>
    )

    let logout = this.state.isLogoutBackdropShow && (
      <LogOut click={this.hideLogoutBackdrop}
        dir={dir}
        text={content.pageContent[0][lang].log_out_btn}
        toOutQuestion={content.pageContent[0][lang].log_out_message}
      />
    )

    return (
      <React.Fragment>
        {logout}
        <aside className="sidebar">
          <ul className="sidebar__list" onClick={this.props.clickToHideBackdrop}>
            {linksDom}
          </ul>
        </aside>
      </React.Fragment>
    );
  }
  render() {
    return(
      <Fragment>
      {this.renderPage()}
      </Fragment>
    )
  }

}


const mapStateToProps = state => {
  return {
    content: state.allProjects,
    userType: state.pageContent.userType,
    userId: state.pageContent.userId,
  }
}

export default connect(mapStateToProps, null, null, {pure: false})(
  multiLang(Sidebar)
  );
