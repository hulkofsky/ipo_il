import React, { Component } from 'react';

import { connect } from 'react-redux';

function EmptyPhotoContainer (props) {
	return(
		<div className='Backdrop__photo-container--empty' onDrop={props.dropEvent} onDragEnter={props.dragEnterEvent} onDragOver={props.dragOverEvent}>
			<img src='' id='Backdrop-img-container' alt='backdrop img' style={{display: 'none'}}/>
			<div className='Backdrop__icon'>
				{getIcon()}
			</div>

			<div className='Backdrop__text'> DRAG & DROP FILE HERE <br/> or </div>

			<button className='Backdrop__button-add-file' onClick={props.click}>
				BROWSE FILE
			</button>
			<input id='Backdrop--hidden-input' type='file' style={{display: 'none'}} />
		</div>	
	)
}

export default EmptyPhotoContainer

function getIcon () {
	return (
		<svg width="64" height="57" viewBox="0 0 64 57" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.34783 8.14286V0H13.913V8.14286H22.2609V13.5714H13.913V21.7143H8.34783V13.5714H0V8.14286H8.34783ZM16.6957 24.4286V16.2857H25.0435V8.14286H44.5217L49.5304 13.5714H58.4348C61.4957 13.5714 64 16.0143 64 19V51.5714C64 54.5571 61.4957 57 58.4348 57H13.913C10.8522 57 8.34783 54.5571 8.34783 51.5714V24.4286H16.6957ZM36.1739 48.8571C43.9652 48.8571 50.087 42.8857 50.087 35.2857C50.087 27.6857 43.9652 21.7143 36.1739 21.7143C28.3826 21.7143 22.2609 27.6857 22.2609 35.2857C22.2609 42.8857 28.3826 48.8571 36.1739 48.8571ZM27.2696 35.2857C27.2696 40.1714 31.1652 43.9714 36.1739 43.9714C41.1826 43.9714 45.0783 40.1714 45.0783 35.2857C45.0783 30.4 41.1826 26.6 36.1739 26.6C31.1652 26.6 27.2696 30.4 27.2696 35.2857Z" fill="#F2F2F2"/>
		</svg>
	)	
}