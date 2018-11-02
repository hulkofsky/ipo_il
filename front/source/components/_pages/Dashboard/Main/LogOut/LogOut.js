import React, {Component} from 'react';
import './LogOut.styl';
import { logout } from '../../../../../redux/reducers/loginUser.reducer';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import Logout from '../../partials/Logout';


class LogOut extends Component {

	logOut = () => {
		this.props.logout()
	}

	render() {

	const {dir, click, toOutQuestion, logOutRedux, text} = this.props


	return (
		<div className='LogOut' onClick={click} dir={dir}>
			<div className='LogOut__backdrop' >
			</div>
			<div className='LogOut__modal-wrapper' dir={dir}>
				<div className='LogOut__close-button' onClick={click}>
					{closeButtonSvg()}
				</div>
				<div className='LogOut__text' dir={dir}> {toOutQuestion} {/*Are you sure you want to log out*/} </div>
				<div className='LogOut__button' onClick={this.logOut} dir={dir}>
				{text}
					{/*LOG OUT*/}
				</div>
			</div>
		</div>
	)
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		logOutRedux: () => dispatch({type: 'LOGOUT'})
	}
}

export default withRouter(
  connect(null, {logout})(LogOut)
);

function closeButtonSvg () {
	return (
		<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="22.5" cy="22.5" r="22.5" fill="#36436B"/>
			<rect width="3.57089" height="28.5672" rx="1.78545" transform="translate(11.5531 13.5555) scale(0.987754 1.0121) rotate(-45)" fill="white"/>
			<rect width="3.57089" height="28.5672" rx="1.78545" transform="translate(30.9526 11.0001) scale(0.987754 1.0121) rotate(45)" fill="white"/>
		</svg>
	)
}
