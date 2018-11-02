import React, { Component, Fragment } from 'react';
import SecondaryHeader from '../../SecondaryHeader';
import ProjectItem from '../../partials/ProjectItem';
import ProjectsGrid from '../../partials/ProjectsGrid';
import Tabs from '../../../../Tabs/Tabs.index';
import Tab from '../../../../Tabs/Tabs.item';
import { getProjects } from '../../../../../redux/actions/projectsActions';
import { Link } from 'react-router-dom'
import axios from 'axios'

import { formDataToSubmit } from '../../../../formFields/utils.js'
import './MyProfile.styl';
import Input from '../../../../formFields/FormField.input';
import Textarea from '../../../../formFields/FormField.textarea';
import InputFile from '../../../../formFields/FormField.file';
import TeamMembersFields from '../../../SignUp/TeamMembersFields';
import Select from '../../../../formFields/FormField.select'
import { dataToSubmit } from '../../../../formFields/utils'
import { imageToBase64 } from '../../../../formFields/utils'
import SignUp from '../../../SignUp/SignUp.index.js'
import Entrepreneur from '../../../SignUp/SignUp.entrepreneurForm'
import NDA from '../../../SignUp/SignUp.entrepreneur.NDA'
import file from '../../../SignUp/images/Edo.pdf'
import TeamMemberItem from './TeamMemberItem/TeamMemberItem'
import CreateNewProjectButton from '../../partials/CreateNewProjectButton';

import unknownUser from '../CreateNew/Backdrop/img/Unknown-avatar.jpg';

import { getMyProfileData, clearTeamMembers } from '../../../../../redux/reducers/getMyProfileData.reducer'
import { removeTeamMembers } from '../../../../../redux/reducers/getProjects.reducer'
import { connect } from 'react-redux';
import multiLang from '../../../../_HOC/lang.hoc'
import { BASE_URL, profile } from '../../../../../utils/routesBack'

const options = [
	{ value: `AF`, label: `Afghanistan` },
	{ value: `AX`, label: `Åland Islands` },
	{ value: `AL`, label: `Albania` },
	{ value: `DZ`, label: `Algeria` },
	{ value: `AS`, label: `American Samoa` }
]

class MyProfile extends Component {

	state = {
		activeButtonEdit: true,
		activeButtonSave: true,
		companyName: {
			value: ``,
			errors: [],
			validationRules: []
		},
		ceoName: {
			value: ``,
			errors: [],
			validationRules: []
		},
		companyEmail: {
			value: ``,
			errors: [],
			validationRules: []
		},
		fundingSumToThisPoint: {
			value: ``,
			errors: [],
			validationRules: []
		},
		companyPassword: {
			value: ``,
			errors: [],
			validationRules: []
		},
		companyNumberVat: {
			value: ``,
			errors: [],
			validationRules: []
		},
		country: {
			selectedOption: ``,
			value: ``,
			errors: [],
			validationRules: []
		},
		companyPhone: {
			value: ``,
			errors: [],
			validationRules: []
		},
		companySales: {
			value: ``,
			errors: [],
			validationRules: []
		},
		confirmCompanyPassword: {
			value: ``,
			errors: [],
			validationRules: []
		},




		linkCompanyVideo: {
			optional: true,
			value: ``,
			errors: [],
			validationRules: []
		},
		companyPresentation: {
			optional: true,
			value: ``,
			errors: [],
			validationRules: []
		},
		financialReport: {
			optional: true,
			value: ``,
			errors: [],
			validationRules: []
		},


		download: {
			download: false,
			errors: []
		},


		teamMembers: []
	}

	handleChangeValue = (evt, file) => {
		const { name, type, value, checked } = evt.target
		if (type === `file`) {
			return this.setState({
				[name]: {
					// eslint-disable-next-line
					...this.state[name],
					value: file
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
		const { name } = evt.target
		return this.setState({
			[name]: {
				// eslint-disable-next-line
				...this.state[name],
				errors: [...errors]
			}
		})
	}

	handleChangeSelect = (selectedOption) => {
		return this.setState({
			country: {
				// eslint-disable-next-line
				...this.state.country,
				value: selectedOption.value,
				selectedOption
			}
		})
	}

	handleChangeErrorsFile = (name, errors) => {
		return this.setState({
			[name]: {
				// eslint-disable-next-line
				...this.state[name],
				errors: [...errors]
			}
		})
	}

	componentDidMount = () => {
		console.log('My profile did mount_-----------')
		setTimeout(() => {
			let inputs = [...document.querySelectorAll('.MyProfile input ')]
			// console.log(inputs)
			inputs.forEach((item, i) => {
				if (this.state.activeButtonEdit == true) {
					item.readOnly = true
				}
				else {
					item.readOnly = false
				}
			})



		}, 300)


		const { lang, content, getMyProfileData, profile } = this.props
		const profileUrl = `enterpreneur/myprofile/${window.localStorage.getItem('user-id')}`
		getMyProfileData(lang, profileUrl)

		if (!content) return
		if (!content.company_projects) return
		console.log(profile)

		const info = content.company_projects;

		let members = info.team_members.map((item, i) => {
			return ({
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
					value: item.photo,
					errors: [],
					validationRules: []
				}


			})
		})
		this.setState((prevState) => {
			return ({
				...prevState,
				companyName: {
					value: info.company_name,
					errors: [],
					validationRules: []
				},
				ceoName: {
					value: info.ceo_name,
					errors: [],
					validationRules: []
				},
				companyEmail: {
					value: info.company_email,
					errors: [],
					validationRules: []
				},
				fundingSumToThisPoint: {
					value: `${info.funding_sum}`,
					errors: [],
					validationRules: []
				},
				companyPassword: {
					value: '',
					errors: [],
					validationRules: []
				},
				companyNumberVat: {
					value: info.vat_number,
					errors: [],
					validationRules: []
				},
				country: {
					selectedOption: ``,
					value: info.country_of_registration,
					errors: [],
					validationRules: []
				},
				companyPhone: {
					value: info.company_phone.replace(/\s/g, ''),
					errors: [],
					validationRules: []
				},
				companySales: {
					value: `${info.last_year_sales}`,
					errors: [],
					validationRules: []
				},
				confirmCompanyPassword: {
					value: '',
					errors: [],
					validationRules: []
				},

				linkCompanyVideo: {
					optional: true,
					value: info.video_url || ``,
					errors: [],
					validationRules: []
				},
				companyPresentation: {
					optional: true,
					value: ``,
					errors: [],
					validationRules: []
				},
				financialReport: {
					optional: true,
					value: ``,
					errors: [],
					validationRules: []
				},

				teamMembers: [
					...prevState.teamMembers,
					...members
				]


			}
			)

		})


	}



	onTeamMemberClick = (id) => {
		console.log('click', id)
	}
	onTeamMemberEdit = (e) => {
		console.log('edit')
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log('updated')
		console.log(this.state.activeButtonEdit)
		if (prevState.activeButtonEdit != this.state.activeButtonEdit) {

			let inputs = [...document.querySelectorAll('.MyProfile input')]

			inputs.forEach((item, i) => {
				if (this.state.activeButtonEdit == true) {
					item.readOnly = true
				}
				else {
					item.readOnly = false
				}
			})
			console.log(inputs)
		}
	}

	componentWillUnmount = () => {
		// const { clearTeamMembers, removeTeamMembers } = this.props
		// removeTeamMembers()

	}


	changeActiveButtonEdit = () => {
		this.setState((prevState) => {
			return {
				activeButtonEdit: !prevState.activeButtonEdit
			}
		})
	}
	changeActiveButtonSave = () => {
		this.setState((prevState) => {
			return {
				activeButtonSave: false
			}
		})
		setTimeout(() => {
			this.setState({
				activeButtonSave: true
			})
		}, 300)



		let temp = this.state
		if (temp.companyPassword.value != temp.confirmCompanyPassword.value) {
			console.log("Password fields aren't equal!")
			return
		}

		let promise = new Promise((resolve, reject) => {

			const data = new FormData()

			data.append('company_name', temp.companyName.value)
			data.append('vat_number', temp.companyNumberVat.value)
			data.append('ceo_name', temp.ceoName.value)
			data.append('country_of_registration', temp.country.value)
			data.append('company_email', temp.companyEmail.value)
			data.append('company_phone', temp.companyPhone.value)
			data.append('funding_sum', temp.fundingSumToThisPoint.value)
			data.append('last_year_sales', temp.companySales.value)
			data.append('password', temp.companyPassword.value)
			data.append('confPass', temp.confirmCompanyPassword.value)
			data.append('video_url', temp.linkCompanyVideo.value)


			let companyPresentationPromise = new Promise((resolve, reject) => {
				console.log('2')
				resolve(data.append('company_presentation', temp.companyPresentation.value))
			})

			let financialReportPromise = new Promise((resolve, reject) => {
				console.log('3')
				resolve(data.append('financial_report', temp.financialReport.value))
			})

			Promise.all([companyPresentationPromise, financialReportPromise])
				.then(() => {
					resolve(data)
				})

		})


		promise.then(data => {


			for (let p of data) {
				console.log(p);
			}
			const userType = window.localStorage.getItem('user-type')
			const userId = window.localStorage.getItem('user-id')

			axios({
				method: 'put',
				url: `${BASE_URL}/${userType}/${userId}/myprofile`,
				headers: { token: window.localStorage.getItem('user-token') },
				data: data
			})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		})
			.catch(error => { console.log(error.message) })




	}


	renderPage() {
		const { profile, lang, dir } = this.props
		const userType = window.localStorage.getItem('user-type')
		const userId = window.localStorage.getItem('user-id')
		// debugger
		if (!profile.pageContent) return null
		// if (this.state.companyName.value == '') return null
		// if(!profile.profile.team_members.length != 0) return null

		const data = profile.pageContent
		console.log(this.props)

		const secHeaderName = [data[1][lang].title]
		const langObj = data[3][lang]
		const countries = [];
		for (let key in langObj) {
			countries.push({
				value: key,
				label: langObj[key]
			})
		}

		//--------------
		data[1][lang][`ent.video_link.label`]
		data[1][lang][`ent.stat_report.label`]
		data[1][lang][`ent.stat_report.label`]
		//-------------

		const { teamMembers, financialReport, companyPresentation, linkCompanyVideo, confirmCompanyPassword, companySales, companyName, ceoName, companyEmail, fundingSumToThisPoint, companyPassword, companyNumberVat, country, companyPhone } = this.state
		const teamMembersFromProps = this.props.profile.profile.team_members
		console.log(teamMembersFromProps)
		// if (!teamMembersFromProps) return null
		// debugger
		// const teamMembersList = teamMembersFromProps.map((item, index) => {
		// 		return <TeamMemberItem  dir={dir} key={item.id} config={item} id={index} click={this.onTeamMemberClick} path={this.props.match.url} props/>
		// 	})
		const teamMembersList = teamMembers.map((item, index) => {
			return <TeamMemberItem dir={dir} key={item.id} config={item} id={index} click={this.onTeamMemberClick} path={this.props.match.url} props />
		})
		return (
			<div className='MyProfile'>
				<SecondaryHeader controls={false} button={true} text={secHeaderName} createNewButton={true} userType={userType} />
				<div className='dash-inner'>
					<div className='MyProfile__board'>
						<div className='MyProfile__switch-button-container'>
							<div className={!this.state.activeButtonEdit ? 'MyProfile__switch-button' : 'MyProfile__switch-button active'}
								onClick={this.changeActiveButtonEdit}>
								{data[1][lang].edit_btn}
							</div>
							<div className={!this.state.activeButtonSave ? 'MyProfile__switch-button' : 'MyProfile__switch-button active'}
								onClick={this.changeActiveButtonSave}>
								{data[1][lang].save_btn}
							</div>
						</div>
						<div className='createNewTab__header'>
							{data[1][lang].conpany_info_req}
						</div>
						<div className="sign-up__container sign-up__container--enterpreneur">
								<Input type="text"
									name="companyName"
									{...companyName}
									label={data[1][lang][`ent.comp_name`]}
									labelDone={data[1][lang][`ent.comp_name.label`]}
									validation={[`required`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Input type="text"
									name="companyNumberVat"
									{...companyNumberVat}
									label={data[1][lang][`ent.VAT`]}
									labelDone={data[1][lang][`ent.VAT.label`]}
									validation={[`required`, `vat`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Input type="text"
									name="ceoName"
									{...ceoName}
									label={data[1][lang][`ent.CEO_name`]}
									labelDone={data[1][lang][`ent.CEO_name.label`]}
									validation={[`required`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Select placeholder={data[1][lang][`ent.comp_country`]}
									updateValue={this.handleChangeSelect}
									selected={country.selectedOption}
									value={country.value}
									options={countries}
									labelDone={data[1][lang][`ent.comp_country.label`]}
								/>
								<Input type="email"
									name="companyEmail"
									{...companyEmail}
									label={data[1][lang][`ent.comp_email`]}
									labelDone={data[1][lang][`ent.comp_email.label`]}
									validation={[`required`, `email`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Input type="text"
									name="companyPhone"
									{...companyPhone}
									label={data[1][lang][`ent.comp_phone`]}
									labelDone={data[1][lang][`ent.comp_phone.label`]}
									validation={[`required`, `phone`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Input type="text"
									name="fundingSumToThisPoint"
									{...fundingSumToThisPoint}
									label={data[1][lang][`ent.funding_sum`]}
									labelDone={data[1][lang][`ent.funding_sum.label`]}
									validation={[`required`, `money`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Input type="text"
									name="companySales"
									{...companySales}
									label={data[1][lang][`ent.comp_sales`]}
									labelDone={data[1][lang][`ent.comp_sales.label`]}
									validation={[`required`, `money`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
								<Input type="password"
									name="companyPassword"
									{...companyPassword}
									label={data[1][lang][`ent.password`]}
									labelDone={data[1][lang][`ent.password.label`]}
									validation={[`required`, `minText`, `number`, `lowercase`, `uppercase`]}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
									changeValidationRules={this.handleChangeValidationRules}
								/>
								<Input type="password"
									name="confirmCompanyPassword"
									{...confirmCompanyPassword}
									label={data[1][lang][`ent.password`]}
									labelDone={data[1][lang][`ent.password.label`]}
									validation={[`required`, `confirmPassword`]}
									password={companyPassword.value}
									changeValue={this.handleChangeValue}
									changeErrors={this.handleChangeErrors}
								/>
						</div>
					</div>
				</div>

				<div className='dash-inner--wrapper'>
					<div className='dash-inner dash-inner--wrapper-item'>
						<div className='MyProfile__board-title'>

						</div>
						<div className='MyProfile__board'>
							<div className="sign-up__title">{data[1][lang][`ent.comp_info_opt`]}</div>

							<div className="sign-up__container">
								<div className="sign-up__column">
									<Input type="text"
										name="linkCompanyVideo"
										{...linkCompanyVideo}
										label={data[1][lang][`ent.video_link`]}
										labelDone={data[1][lang][`ent.video_link.label`]}
										validation={[]}
										changeValue={this.handleChangeValue}
										changeErrors={this.handleChangeErrors}
									/>
									<InputFile {...companyPresentation}
										name="companyPresentation"
										updateValue={this.handleChangeValue}
										label={data[1][lang][`ent.presentation`]}
										labelDone={data[1][lang][`ent.presentation`]}
										validation={[`maxSize`]}
										updateErrors={this.handleChangeErrorsFile}
									/>
								</div>
								<div className="sign-up__column">
									<InputFile {...financialReport}
										name="financialReport"
										label={data[1][lang][`ent.stat_report`]}
										labelDone={``}
										updateValue={this.handleChangeValue}
										validation={[`maxSize`]}
										updateErrors={this.handleChangeErrorsFile}
									/>
								</div>
							</div>
						</div>

					</div>
					<div className='dash-inner dash-inner--wrapper-item'>
						<div className="MyProfile__NDA sign-up__title">{data[1][lang][`ent.NDA_signing`]}</div>
						<div className='MyProfile__NDA__content'>
							<div className='MyProfile__NDA__link'>
								<a href={file}
									download
									className="sign-up__download-link"

								>
									{data[1][lang][`ent.download`]}
								</a>
							</div>
							<div className="MyProfile__NDA sign-up__title-download-link">
								{data[1][lang][`ent.pre_signed`]}
							</div>
						</div>
					</div>
				</div>
				<div className='dash-inner'>
					<div className='MyProfile__NDA--team-members'>
						<div className="sign-up__title">{data[1][lang][`ent.team_members`]}</div>
						<div className='team-members--statistic'>
							<div>{teamMembers.length} {data[1][lang][`members`]}</div>
							<Link to={`${this.props.match.url}/all_team_edit`} >
								<div onClick={this.onTeamMemberEdit}>{data[1][lang][`team_edit`]}</div>
							</Link>
						</div>
						<div className='team-members-content'>
							{teamMembersList}
						</div>
					</div>
				</div>



			</div>
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

const mapStateToProps = state => ({
	content: state.allProjects,
	profile: state.profile,
	// items: state.projects.items
})

const mapDispatchToProps = dispatch => {
	return {
		getMyProfileData: (lang, profile) => (dispatch(getMyProfileData(lang, profile))),
		clearTeamMembers: () => (dispatch(clearTeamMembers())),
		removeTeamMembers: () => (dispatch(removeTeamMembers()))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(
	multiLang(MyProfile)
);
