import React, { Component, Fragment } from 'react';
import SecondaryHeader from '../../SecondaryHeader';

import { connect } from 'react-redux';
import multiLang from '../../../../_HOC/lang.hoc'
import ProjectsGrid from '../../partials/ProjectsGrid';
import './SearchBoard.styl';

class Search extends Component {

	state = {
		searchString: 'No matches found',
		matchesProjects: []
	}

	componentDidMount = () => {
		
	}

	shouldComponentUpdate = (prevProps, prevState) => {
		if (this.props == prevProps) return false
		else return true
	}


	renderPage() {

		const string = 'No matches found'
		const { dir, lang, pageContent, searchString, actualProjects, savedProjects } = this.props
		const userType = window.localStorage.getItem('user-type')
		const userId = window.localStorage.getItem('user-id')
		if (!pageContent || !searchString) return null
		const secHeaderName = [pageContent[0][lang].my_projects]
		const staticTitles = pageContent[1][lang]
		let projects = null

		if (actualProjects && actualProjects.length != 0) {
			projects = actualProjects
		} else if (savedProjects && savedProjects.length != 0) {
			projects = savedProjects
		}

		let arrayOfProjects = []
		if (projects) {
			for (let i = 0; i < projects.length; i++) {
				if (projects[i].project_name.toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
					arrayOfProjects.push(projects[i])
				}
			}
		}
		if (arrayOfProjects.length > 0) {

			return (
				<div>
					<SecondaryHeader controls={false} button={false} userType={userType} text={secHeaderName} dir={dir} createNewButton={true}/>
					<main className="dash-inner" dir={dir}>
						<ProjectsGrid
							itemsFromProps={arrayOfProjects}
							itemsInRow={2}
							requestUrl={`enterpreneur/${userId}/myprojects`}
							staticTitles={staticTitles}
						/>
					</main>
				</div>
			)
		} else {
			return (
				<div>
					<SecondaryHeader controls={false} button={false} userType={userType} text={secHeaderName} createNewButton={true} dir={dir} />
					<div className="dash-inner">
						<div dir={dir} className='search__no-matches'>
							<p dir={dir}>{string}</p>
						</div>
					</div>
				</div>
			)
		}

	}

	render() {
		return (
			<Fragment>
				{this.renderPage()}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		pageContent: state.allProjects.pageContent,
		searchString: state.searchString,
		actualProjects: state.allProjects.company_projects.projects,
		savedProjects: state.saveProjectsTemp
	}
}
// const mapDispatchToProps = {getTermsOfService}

export default connect(mapStateToProps, null)(
	multiLang(Search)
)
// export default TermsOfService
