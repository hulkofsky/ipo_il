import React, {Component} from 'react'
import SecondaryHeader from '../../SecondaryHeader';
import './TeamMemberEdit.styl';
import TeamMembersFields from '../../../SignUp/TeamMembersFields';
import Input from '../../../../formFields/FormField.input'
import PhotoUploader from '../../../SignUp/SignUp.photoUploader'
import unknownUser from '../CreateNew/Backdrop/img/Unknown-avatar.jpg'
import CreateNewProjectButton  from '../../partials/CreateNewProjectButton'
import { connect } from 'react-redux';
import multiLang from '../../../../_HOC/lang.hoc'
import axios from 'axios'
import { history } from '../../../../../history'


import {BASE_URL, teamMember} from '../../../../../utils/routesBack'
import {getTeamMember} from '../../../../../redux/reducers/getTeamMemberEdit.reducer'

import {createNew} from '../../../../../utils/routesBack'
import {getCreateNewProject} from '../../../../../redux/reducers/getCreateNewProject.reducer'
import { getAllProjects, clearProjects } from '../../../../../redux/reducers/getProjects.reducer';



class TeamMemberEdit extends Component {

	state = {
		// isReady: false,
		id: this.props.match.params.id,

        firstName: {
          optional: true,
          value: `John`,
          errors: [],
          validationRules: []
        },
        lastName: {
          optional: true,
          value: `Dou`,
          errors: [],
          validationRules: []
        },
        position: {
          optional: true,
          value: `CEO`,
          errors: [],
          validationRules: []
        },
        linkFacebook: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        linkLinkedIn: {
          optional: true,
          value: ``,
          errors: [],
          validationRules: []
        },
        photo: {
          optional: true,
          value: unknownUser,
          errors: [],
          validationRules: []
        }
	}

	componentDidMount = () => {

		const {lang, getTeamMember, getCreateNewProject} = this.props
	    const teamMember = `enterpreneur/${window.localStorage.getItem('user-id')}/team`
		const createNew = `enterpreneur/${window.localStorage.getItem('user-id')}/createproject`
		getTeamMember(lang, teamMember)
		getCreateNewProject(lang, createNew)
		console.log(this.props)
		console.log(this.props.match.params.id)

		let member = null
		let len = this.props.content.company_projects.team_members.length
		for(let i = 0; i < len; i++) {
			if (i == this.props.match.params.id) {
				member = this.props.content.company_projects.team_members[i]
			}
		}

		console.log(member)
		this.setState({
			isReady: true,
			id: this.props.match.params.id,
	        firstName: {
	          optional: true,
	          value: member.first_name,
	          errors: [],
	          validationRules: []
	        },
	        lastName: {
	          optional: true,
	          value: member.last_name,
	          errors: [],
	          validationRules: []
	        },
	        position: {
	          optional: true,
	          value: member.position,
	          errors: [],
	          validationRules: []
	        },
	        linkFacebook: {
	          optional: true,
	          value: member.fb_link,
	          errors: [],
	          validationRules: []
	        },
	        linkLinkedIn: {
	          optional: true,
	          value: member.linkedin_link,
	          errors: [],
	          validationRules: []
	        },
	        photo: {
	          optional: true,
	          value: member.photo,
	          errors: [],
	          validationRules: []
	        }
		})
	}

	// shouldComponentUpdate = (nextProps, nextState) => {
	// 	if(this.props.match.params.id != nextProps.match.params.id) return true
	// 		else if(this.state.firstName.value != nextState.firstName.value) return true
	// 		else return false
	// }
	updateErrors = () => {
		return true
	}

	handleChangeValue = (evt, file) => {
	    const {name, type, value, checked} = evt.target
	    if (type === `file`) {
	      return this.setState({
	        [name]: {
	          // eslint-disable-next-line
	          ...this.state[name],
	          value: file.name
	        }
	      })
	    } else {
	      return this.setState({
	        [name]: {
	          // eslint-disable-next-line
	          ...this.state[name],
	          value: type === `checkbox` ? checked : value
	        }
	      })
	    }
  	}

  	handleChangeErrors = (evt, errors) => {
	    const {name} = evt.target
	    return this.setState({
	      [name]: {
	        // eslint-disable-next-line
	        ...this.state[name],
	        errors: [...errors]
	      }
	    })
	}

	addPhoto = event => {

		event.stopPropagation();
		let myEvent = new MouseEvent('click', {bubbles: true})
		let input = document.getElementById('Backdrop--hidden-input');
		input.dispatchEvent(myEvent)

		let changeState = (path) => {
			this.setState((prevState) => {
				return {
					photo: {
						...prevState.photo,
						value: path
					}
				}
			})
		}

		input.addEventListener('change', (e) => {
			let reader = new FileReader();

			reader.onload = function (event) {
				changeState(event.target.result)
			}
			reader.readAsDataURL(e.target.files[0])
		}, false)
	}



	dropEvent = event => {
		event.preventDefault();

		let changeState = (file) => {
			this.setState((prevState) => {
				return {
					photo: {
						...prevState.photo,
						value: file
					}
				}
			})
		}
		

		if (event.dataTransfer.items) {
		    for (var i = 0; i < event.dataTransfer.items.length; i++) {
		      if (event.dataTransfer.items[i].kind === 'file') {

		        var file = event.dataTransfer.items[i].getAsFile();
		        let reader = new FileReader();

				reader.onload = function (ev) {
					changeState(ev.target.result)
				}
				reader.readAsDataURL(file)

		      }
		    }
		  } else {
		    for (var i = 0; i < event.dataTransfer.files.length; i++) {
		    }
		  } 
	}

	dragEnterEvent = event => {
		event.preventDefault();
	}
	dragOverEvent = event => {
		event.preventDefault();
	}


	saveTeamMember = () => {
				const userType = window.localStorage.getItem('user-type')
				const userId = window.localStorage.getItem('user-id')
				const updateData = () => {
					const {lang, getAllProjects} = this.props
					const projects = `enterpreneur/${window.localStorage.getItem('user-id')}/myprojects`
					getAllProjects(lang, projects)
				}
		
		axios({
			method: 'put',
		    url: `${BASE_URL}/${userType}/${userId}/teammember/${this.state.id}`,
		    headers: {token: window.localStorage.getItem('user-token')},
		    data:{
		        first_name: this.state.firstName.value,
		        last_name: this.state.lastName.value,
		        position: this.state.position.value,
		        fb_link: this.state.linkFacebook.value,
		        linkedin_link: this.state.linkLinkedIn.value,
		        photo: this.state.photo.value
		    }
		})
		.then(function (response) {
				console.log(response);
				
				// const userType = window.localStorage.getItem('user-type')
				// const userId = window.localStorage.getItem('user-id')
				updateData()

				setTimeout(()=> {
					history.replace(`/dash/${userType}/${userId}/profile`)
				},1000)

	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	}

	renderPage() {
		const {firstName, lastName, position, linkFacebook, linkLinkedIn, photo} = this.state
		const {userType} = this.props.match.params
		const {lang, teamMember, content, createNew, dir} = this.props
		if(!content) return null
		if (!teamMember.pageContent) return null
		if (!createNew.pageContent) return null

		const secHeaderName = [teamMember.pageContent[0][lang][`title.my_project`], teamMember.pageContent[0][lang][`title.team_members_edit`] ]

		const value = createNew.pageContent
		const data = teamMember.pageContent
		

		return(
			
				<div className='TeamMemberEdit'>
				<SecondaryHeader controls={false} button={true} text={secHeaderName} userType={userType}/>
					{/*<div className='createNewTab__main-header'>
			            <span>My profile</span> / <span>Team Member Edit</span>
			            <CreateNewProjectButton/>
			        </div>*/}
					 <div className='dash-inner'>
					 	<div className='TeamMemberEdit__header' dir={dir}>
					 		{data[0][lang][`title.team_members_edit`]}
					 	</div>
					 	<div className='TeamMemberEdit__save-button' onClick={this.saveTeamMember} dir={dir}> 
					 		{data[0][lang][`save_btn`]}
					 	</div>
					 	<div className='TeamMemberEdit__main-container'>
					 		<div className='TeamMemberEdit__photo-container'>
								<div className="sign-up__column sign-up__column--mb sign-up__column--pt">
						            <div className='Backdrop__photo-container--empty' 
						            	 onDrop={this.dropEvent} onDragEnter={this.dragEnterEvent} onDragOver={this.dragOverEvent}
						            	 style={{ backgroundImage: `url(${photo.value})`, }}>
										<div className='Backdrop__icon'>
											{getIcon()}
										</div>

										<div className='Backdrop__text' dir={dir}> {value[0][lang].drag} <br/> {value[0][lang].or} </div>

										<button className='Backdrop__button-add-file' onClick={this.addPhoto} dir={dir}>
											{value[0][lang].browse_btn}
										</button>
										<input id='Backdrop--hidden-input' type='file' style={{display: 'none'}} />
									</div>	
						        </div>
					        </div>
							<div className="sign-up__column sign-up__column--mb">
								<Input type="text"
					                name="firstName"
					                {...firstName}
					                dir={dir}
					                label={data[0][lang][`team.first_name_field`]}
					                labelDone={data[0][lang][`team.first_name_field.label`]}
					                validation={[`text`]}
					                changeValue={this.handleChangeValue}
					                changeErrors={this.handleChangeErrors}
					              />
					              <Input type="text"
					                name="lastName"
					                {...lastName}
					                dir={dir}
					                label={data[0][lang][`team.last_name_field`]}
					                labelDone={data[0][lang][`team.last_name_field.label`]}
					                validation={[`text`]}
					                changeValue={this.handleChangeValue}
					                changeErrors={this.handleChangeErrors}
					              />
					              <Input type="text"
					                name="position"
					                {...position}
					                dir={dir}
					                label={data[0][lang][`team.position_field`]}
					                labelDone={data[0][lang][`team.position_field.label`]}
					                validation={[`text`]}
					                changeValue={this.handleChangeValue}
					                changeErrors={this.handleChangeErrors}
					              />
					              <Input type="text"
					                name="linkFacebook"
					                {...linkFacebook}
					                dir={dir}
					                label={data[0][lang][`team.facebook_field`]}
					                labelDone={data[0][lang][`team.facebook_field.label`]}
					                validation={[`facebook`]}
					                changeValue={this.handleChangeValue}
					                changeErrors={this.handleChangeErrors}
					              />
					              <Input type="text"
					                name="linkLinkedIn"
					                {...linkLinkedIn}
					                dir={dir}
					                label={data[0][lang][`team.linked_field`]}
					                labelDone={data[0][lang][`team.linked_field.label`]}
					                validation={[`linkedIn`]}
					                changeValue={this.handleChangeValue}
					                changeErrors={this.handleChangeErrors}
					              />
					          </div>
					 	</div>
					 </div>
				</div>
		)
	}

	render() {
		if(!this.props.content) return null
		return(
			<React.Fragment>
			{this.renderPage()}
			</React.Fragment>
			)
	}
}

const mapStateToProps = state => ({
	content: state.allProjects,
	teamMember: state.teamMember,
	createNew: state.createNew
	// content: state.pageContent,
	// items: state.projects.items
})
const mapDispatchToProps = dispatch => {
	return {
		getTeamMember: (lang, teamMember) => (dispatch(getTeamMember(lang, teamMember))),
		getCreateNewProject: (lang, createNew) => (dispatch(getCreateNewProject(lang, createNew))),
		getAllProjects: (lang, projects) => (dispatch(getAllProjects(lang, projects)))

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(
	multiLang(TeamMemberEdit)
);


// export default TeamMemberEdit

function getIcon () {
	return (
		<svg width="64" height="57" viewBox="0 0 64 57" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.34783 8.14286V0H13.913V8.14286H22.2609V13.5714H13.913V21.7143H8.34783V13.5714H0V8.14286H8.34783ZM16.6957 24.4286V16.2857H25.0435V8.14286H44.5217L49.5304 13.5714H58.4348C61.4957 13.5714 64 16.0143 64 19V51.5714C64 54.5571 61.4957 57 58.4348 57H13.913C10.8522 57 8.34783 54.5571 8.34783 51.5714V24.4286H16.6957ZM36.1739 48.8571C43.9652 48.8571 50.087 42.8857 50.087 35.2857C50.087 27.6857 43.9652 21.7143 36.1739 21.7143C28.3826 21.7143 22.2609 27.6857 22.2609 35.2857C22.2609 42.8857 28.3826 48.8571 36.1739 48.8571ZM27.2696 35.2857C27.2696 40.1714 31.1652 43.9714 36.1739 43.9714C41.1826 43.9714 45.0783 40.1714 45.0783 35.2857C45.0783 30.4 41.1826 26.6 36.1739 26.6C31.1652 26.6 27.2696 30.4 27.2696 35.2857Z" fill="#F2F2F2"/>
		</svg>
	)	
}

