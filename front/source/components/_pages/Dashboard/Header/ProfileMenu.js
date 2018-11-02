import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHeaderMenu } from '../../../../redux/actions/headerActions';
import { withRouter } from 'react-router-dom';
import multiLang from '../../../_HOC/lang.hoc'
import { Link } from 'react-router-dom';
import Logout from '../partials/Logout';
import multilang from '../../../_HOC/lang.hoc';
import LogOut from '../Main/LogOut/LogOut'

class ProfileMenu extends Component {

  state = {
    isMenuOpen: false,
    isLogoutBackdropShow: false

  }

  toggleMenu = () => {

    this.setState((prevState)=>{
      return{
        isMenuOpen: !prevState.isMenuOpen
      }
    })

    this.props.toggleHeaderMenu();
  }


  hideBackdrop = () => {
    this.setState({
      isMenuOpen: false
    })
    this.props.toggleHeaderMenu();
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

    const { content, lang, dir} = this.props;
    const userType = window.localStorage.getItem('user-type')
    const userId = window.localStorage.getItem('user-id')
    const header  = this.props.header;
    let name;

    if(content.company_projects) {
      name = content.company_projects.ceo_name
    } else {
      name = `${content.data.first_name} ${content.data.last_name}`;
    }

    const titles = content.pageContent[0][lang];
    const isOpenClass = header ? 'open' : '';
    const linkClassName = 'dash-header__dropdown-link';

    const links = [
      {
        link: `/dash/${userType}/${userId}/profile`,
        text: titles['my_profile'],
      },
      {
        link: `/dash/${userType}/${userId}/settings`,
        text: titles['settings'],
      }
    ];

    const linksDom = links.map( item => {
      return (
        <li className="dash-header__dropdown-item" key={item.link}>
          <Link to={item.link} className={linkClassName} onClick={this.hideBackdrop}>
            {item.text}
          </Link>
        </li>
      )
    });

    linksDom.push(
      <li className="dash-header__dropdown-item" key="logout" onClick={this.hideBackdrop}>
        <Logout className={linkClassName} text={titles.log_out} logout={this.showLogoutBackdrop} click={this.showLogoutBackdrop}/>
      </li>
    )

    let backdrop = null
    if(this.state.isMenuOpen) {
      backdrop = <div className="dash-header_profile--backdrop" onClick={this.hideBackdrop}/>
    }

    let logout = this.state.isLogoutBackdropShow && (
      <LogOut click={this.hideLogoutBackdrop}
        dir={dir}
        text={content.pageContent[0][lang].log_out_btn}
        toOutQuestion={content.pageContent[0][lang].log_out_message}
      />
    )

    if(!content) {return null}

    return (
      <div className="dash-header__profile">
        {logout}
        {backdrop}
        <div className="dash-header__button" onClick={this.toggleMenu}>
          {name}
        </div>
        <div className={`dash-header__profile-dropdown ${isOpenClass}`}>
          <ul className="dash-header__dropdown-list">
            {linksDom}
          </ul>
        </div>
      </div>
    );
  }



render() {
  return(
    <React.Fragment>
    {this.renderPage()}
    </React.Fragment>
    )
}
}

const mapProps = state => ({
  header: state.header.isMenuOpened,
  content: state.allProjects,
  // userType: state.pageContent.userType,
  // userId: state.pageContent.userId,
})

export default withRouter(
  connect(mapProps, { toggleHeaderMenu } )(
    multilang(ProfileMenu)
  )
)

