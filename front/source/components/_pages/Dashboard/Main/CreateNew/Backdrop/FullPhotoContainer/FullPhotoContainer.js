import React, { Component } from 'react';

import { connect } from 'react-redux';

class FullPhotoContainer extends Component {
	state = {

	}

	componentDidMount = () => {

	}

	render() {
		let src = this.props.photo == '' ? unknowUser : this.props.photo
		return(
			<div className='Backdrop__photo-container--full'>
				<img src={this.props.photo} id='Backdrop-img-container' alt='backdrop img' />
				<div className='Backdrop__row row--first'>
					<div className='Backdrop__file-name'>{this.props.name}</div>
					<div className='Backdrop__percentages'>{this.props.percentages}%</div>
				</div>
				<div className='Backdrop__row'>
					<div className='Backdrop__progress-bar'>
						<div className='Backdrop__progress-bar--background' style={{transform: 'translateX(' + this.props.percentages + '%)'}}/>
					</div>
					<div className='Backdrop__close-button' onClick={this.props.click}>
						{this.props.percentages !== '100' ? (closeCloseSvg()) : (showDoneSvg()) }
						
					</div>
				</div>
			</div>
		)
	}
}

export default FullPhotoContainer

function closeCloseSvg () {
	return (
		<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="22.5" cy="22.5" r="22.5" fill="#36436B"/>
			<rect width="3.57089" height="28.5672" rx="1.78545" transform="translate(11.5531 13.5555) scale(0.987754 1.0121) rotate(-45)" fill="white"/>
			<rect width="3.57089" height="28.5672" rx="1.78545" transform="translate(30.9526 11.0001) scale(0.987754 1.0121) rotate(45)" fill="white"/>
		</svg>
	)
}

function showDoneSvg () {
	return (
		<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11.5" cy="11.5" r="11.5" fill="#36436B"/>
<path d="M0 3.37773L3.57753 6.65644L7.72217 0" transform="translate(8.30078 7.57593) rotate(9.45563)" stroke="white" />
</svg>

	)
}
