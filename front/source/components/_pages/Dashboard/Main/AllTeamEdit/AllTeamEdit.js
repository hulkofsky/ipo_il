import React, {Component, Fragment} from 'react'
import SecondaryHeader from '../../SecondaryHeader';
import './AllTeamEdit.styl'
import NewTeamMember from '../CreateNew/newTeamMember/NewTeamMember';
import TeamMembersFields from '../../../SignUp/TeamMembersFields';
import Input from '../../../../formFields/FormField.input'
import {formDataToSubmit} from '../../../../formFields/utils'
import {imageToBase64} from '../../../../formFields/utils'
import axios from 'axios'

import TeamMemberEditItem from './TeamMemberEditItem/TeamMemberEditItem';
import CreateNewProjectButton from '../../partials/CreateNewProjectButton'

import multiLang from '../../../../_HOC/lang.hoc'
import { connect } from 'react-redux';

import {BASE_URL, teamMember} from '../../../../../utils/routesBack'
import {getTeamMember} from '../../../../../redux/reducers/getTeamMemberEdit.reducer'
import { history } from '../../../../../history'
import { getAllProjects, clearProjects } from '../../../../../redux/reducers/getProjects.reducer';


class AllTeamEdit extends Component {
	state = {
	}

	componentDidMount = () => {
		const {content, lang, getTeamMember} = this.props;
		const teamMember = `enterpreneur/${window.localStorage.getItem('user-id')}/team`
		getTeamMember(lang, teamMember);

		if(!content) return 
		let data = content.company_projects.team_members
		// console.log(data)
		let members = data.map((item, i) => {
			return({
				id: Date.now() + Math.random(),
		        firstName: {
		          optional: true,
		          value: item.first_name,
		          errors: [],
		          validationRules: []
		        },
		        lastName: {
		          optional: true,
		          value: item.last_name,
		          errors: [],
		          validationRules: []
		        },
		        position: {
		          optional: true,
		          value: item.position,
		          errors: [],
		          validationRules: []
		        },
		        linkFacebook: {
		          optional: true,
		          value: item.fb_link,
		          errors: [],
		          validationRules: []
		        },
		        linkLinkedIn: {
		          optional: true,
		          value: item.linkedin_link,
		          errors: [],
		          validationRules: []
		        },
		        photo: {
		          optional: true,
		          value: ``,
		          path: item.photo,
		          errors: [],
		          validationRules: []
		        }
			})
		})
		this.setState((prevState)=> {
			return({
				teamMembers: [
				...members
				]
			})
		})
	}
	clickOnInput = (e) => {
	}

	onUpdateValue = (event, id) => {

	    const {value, name, files} = event.target
	    const {teamMembers} = this.state
	    const prevStateArray = teamMembers
	    const arr = []

	    Promise.all(teamMembers.map((item, index) => {
	      if (id === index && name === `photo`) {
	        return new Promise(
	          (resolve, reject) => {
	            imageToBase64(files[0])
	              .then((base64) => {
	                arr.push({...teamMembers[id], [name]: {...teamMembers[id][name], path: base64, value: files[0].name}})
	                resolve()
	              })
	          }
	        )
	      } else if (id === index) {
	        return new Promise(
	          (resolve, reject) => {
	            arr.push({...teamMembers[id], [name]: {...teamMembers[id][name], value}})
	            resolve()
	          }
	        )
	      } else {
	        return item
	      }
	    }))
	      .then(
	        () => {
	          const rez = prevStateArray.map(item => {
	            if (item.id === arr[0].id) {
	              return arr[0]
	            }
	            return item
	          })

	          return this.setState({
	            teamMembers: [
	              ...rez
	            ]
	          })
	        })

	}

	onUpdateErrors = (evt, errors, id) => {
	    const {name} = evt.target
	    const {teamMembers} = this.state
	    const prevStateArray = teamMembers
	    const arr = []

	    Promise.all(teamMembers.map((item, index) => {
	      if (id === index) {
	        return new Promise(
	          (resolve, reject) => {
	            arr.push({...teamMembers[id], [name]: {...teamMembers[id][name], errors: [...errors]}})
	            resolve()
	          }
	        )
	      } else {
	        return item
	      }
	    }))
	      .then(
	        () => {
	          const rez = prevStateArray.map(item => {
	            if (item.id === arr[0].id) {
	              return arr[0]
	            }
	            return item
	          })

	          return this.setState({
	            teamMembers: [
	              ...rez
	            ]
	          })
	        })
	}

	saveTeamMembers = evt => {
		// console.log(this.state)

		const allTeamMembersForBack = this.state.teamMembers.map((item, i) => {
			return {
				first_name: item.firstName.value,
		        last_name: item.lastName.value,
		        position: item.position.value,
		        fb_link: item.linkFacebook.value,
		        linkedin_link: item.linkLinkedIn.value,
		        photo: item.photo.path
			}
		})

		let data = new FormData()
		data.append('user_data', JSON.stringify(allTeamMembersForBack) )

		// console.log(JSON.stringify(allTeamMembersForBack))

			const userType = window.localStorage.getItem('user-type')
			const userId = window.localStorage.getItem('user-id')

			const updateData =() => {
				const {lang, getAllProjects} = this.props
				const projects = `enterpreneur/${window.localStorage.getItem('user-id')}/myprojects`
				getAllProjects(lang, projects)
			}

			axios({
				method: 'put',
			    url: `${BASE_URL}/${userType}/${userId}/team`,
			    headers: {'Content-Type': `application/x-www-form-urlencoded;charset=UTF-8`,
						token: window.localStorage.getItem('user-token')},
			    data: data
			})
			.then(function (response) {
						
						updateData()

						setTimeout(()=> {
							history.replace(`/dash/${userType}/${userId}/profile`)
						},1000)

			    })
			    .catch(function (error) {
			      console.log(error);
			    });

	  }


	renderPage () {

		const teamMembers = this.state.teamMembers
		const {lang, team, dir} = this.props
		if(!teamMembers) return null
		if(!team.pageContent) return null

		const secHeaderName = [team.pageContent[0][lang][`title.my_project`], team.pageContent[0][lang][`title.member_edit`] ]

		const data = team.pageContent

		return (
			<div className='AllTeamEdit'> 
				<SecondaryHeader controls={false} button={true} text={secHeaderName} userType='enterpreneur'/>
	        	<div className='dash-inner'>
				 	<div className='AllTeamEdit__header' dir={dir}>
				 		{data[0][lang][`title.member_edit`]}
				 	</div>
				 	<div className='AllTeamEdit__save-button' onClick={this.saveTeamMembers} dir={dir}>
				 		{data[0][lang][`save_btn`]}
				 	</div>
				 	<div className='AllTeamEdit__main-container'>
					 	<div className="sign-up__container">
					 		<NewTeamMember config={teamMembers}
					 			data={data[0][lang]}
					 			dir={dir}
					 			showPosition={true}
			                    clickInput={this.clickOnInput}
			                    updateValue={this.onUpdateValue}
			                    updateErrors={this.onUpdateErrors}
			                />
		                </div>
				 	</div>
			 	</div>
			</div>
		)
	}

	render() {
		return(
		<Fragment> 
		{this.renderPage()}
		</Fragment>
			)
	}
}


const mapStateToProps = state => ({
	content: state.allProjects,
	team: state.teamMember
})
const mapDispatchToProps = dispatch => {
	return {
		getTeamMember: (lang, teamMember) => (dispatch(getTeamMember(lang, teamMember))),
		getAllProjects: (lang, projects) => (dispatch(getAllProjects(lang, projects)))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(
	multiLang(AllTeamEdit)
);
