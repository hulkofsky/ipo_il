import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmptyPhotoContainer from './EmptyPhotoContainer/EmptyPhotoContainer';
import FullPhotoContainer from './FullPhotoContainer/FullPhotoContainer';
import unknownUser from './img/Unknown-avatar.jpg';


import './Backdrop.styl'

class Backdrop extends Component {

	state = {
		isPhotoAdd: false,
		photo: unknownUser,
		name: '',
		percentages: '0',
		addPhotoToTheField: ''
	}

	addPhoto = event => {

		event.stopPropagation();
		let myEvent = new MouseEvent('click', {bubbles: true})
		let input = this.props.target;
		input.dispatchEvent(myEvent)

		let changeState = (path, name) => {
			this.setState({
				isPhotoAdd: true,
				photo: path,
				name: name,
				percentages: '100'
				
			})

			setTimeout(()=> {
				// console.log(this.state)
				this.props.hideBackdrop();
				this.props.addPhotoToTheField({
					name: this.state.name,
					path: this.state.photo
				})
			}, 1000)
		}

		let changeStatePercentages = (per) => {
			this.setState({
				percentages: per
			})
		}

		input.addEventListener('change', (e) => {
			let reader = new FileReader();

			reader.onprogress = function (ev) {
					let loadProgresSize = ev.loaded / ev.total * 100;
					loadProgresSize = loadProgresSize.toFixed(0); 
					changeStatePercentages(loadProgresSize);
				}

			reader.onload = function (event) {
				let img = document.getElementById('Backdrop-img-container');

				img.onload = function() {
					changeState(event.target.result, e.target.files[0].name)
				}

				img.src = event.target.result;

			}
			reader.readAsDataURL(e.target.files[0])
		}, false)
	}


	deleteImgFile = event => {
		this.setState({
			isPhotoAdd: false,
			photo: '',
			name: '',
			percentages: '0'
		})
	}

	onDropEvent = event => {
		event.preventDefault();

		const changeStateOnDrop = (file, fullFile) => {
			this.setState({
				isPhotoAdd: true,
				photo: file,
				// name: file.name,
				name: fullFile.name,
				fullFile: fullFile,
				percentages: '100'
			})

			setTimeout(()=> {
				// console.log(this.state)
				console.log(file)
				console.log(fullFile.name)
				console.log(fullFile)
				this.props.hideBackdrop();
				this.props.returnFile(file, fullFile)
			}, 1000)
		}

		const changeStateOnDropFullFile = (file) => {
			this.setState({
				isPhotoAdd: true,
				photo: file,
				name: file.name,
				percentages: '100'
			})

			setTimeout(()=> {
				// console.log(this.state)
				console.log(file.name)
				debugger
				this.props.hideBackdrop();
				this.props.returnFile(file)
			}, 1000)
		}

		if (event.dataTransfer.items) {
		    for (var i = 0; i < event.dataTransfer.items.length; i++) {
		      if (event.dataTransfer.items[i].kind === 'file') {

				var file = event.dataTransfer.items[i].getAsFile();
					// changeStateOnDropFullFile(file)
		        let reader = new FileReader();

				reader.onload = function (ev) {
					changeStateOnDrop(ev.target.result, file)
				}
				reader.readAsDataURL(file)

		      }
		    }
		  } else {
		    for (var i = 0; i < event.dataTransfer.files.length; i++) {
		    }
		  } 
	}

	// onDropEvent = event => {
	// 	event.preventDefault();

	// 	this.setState({
	// 		isPhotoAdd: true,
	// 		dataTransfer: event.dataTransfer

	// 	})


	// 	let changeState = (path, name) => {
	// 		this.setState({
	// 			photo: path,
	// 			name: name
				
	// 		})

	// 		setTimeout(()=> {
	// 			console.log(this.state)
	// 			this.props.hideBackdrop();
	// 			this.props.addPhotoToTheField({
	// 				name: this.state.name,
	// 				path: this.state.photo
	// 			})
	// 		},1000)

	// 	}


	// 	let changeStatePercentages = (per) => {
	// 		this.setState({
	// 			percentages: per
	// 		})
	// 	}

	// 	if (event.dataTransfer.items) {
	// 	    for (var i = 0; i < event.dataTransfer.items.length; i++) {
	// 	      if (event.dataTransfer.items[i].kind === 'file') {

	// 	        var file = event.dataTransfer.items[i].getAsFile();
	// 	        console.log(file)

	// 	        let reader = new FileReader();

	// 	        reader.onprogress = function (ev) {
		        	
	// 				let loadProgresSize = ev.loaded / ev.total * 100;
	// 				loadProgresSize = loadProgresSize.toFixed(0); 

	// 				changeStatePercentages(loadProgresSize);
	// 			}

	// 			reader.onload = function (ev) {
	// 				let img = document.getElementById('Backdrop-img-container');

	// 				img.onload = function() {
	// 					changeState(ev.target.result, file.name)
	// 				}

	// 				img.src = ev.target.result;

	// 			}
	// 			reader.readAsDataURL(file)


	// 	      }
	// 	    }
	// 	  } else {
	// 	    for (var i = 0; i < event.dataTransfer.files.length; i++) {
	// 	    }
	// 	  } 
	// }

	dragPreventEvent = event => {
		event.preventDefault();
	}

	componentDidUpdate = () => {
		console.log(this.state)
	}

	render() {
		let isPhoto = this.state.isPhotoAdd ? (
				<FullPhotoContainer 
					photo={this.state.photo} 
					name={this.state.name} 
					percentages={this.state.percentages} 
					click={this.deleteImgFile} 
				/>
			) :
			(
				<EmptyPhotoContainer 
					click={this.addPhoto} 
					dropEvent={this.onDropEvent} 
					dragEnterEvent={this.dragPreventEvent} 
					dragOverEvent={this.dragPreventEvent}
				/>
			)

		return (

			<div className='Backdrop' >
				<div className='Backdrop__layout' onClick={this.props.close}>
				</div>
					<div className='Backdrop__photo-container-wrapper' >
						<div className='Backdrop__photo-container-photo' >
							{isPhoto}
						</div>
					</div>
			</div>


		)
	}
}

export default Backdrop



