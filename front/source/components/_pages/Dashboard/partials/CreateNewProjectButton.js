import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import multiLang from '../../../_HOC/lang.hoc'



class createNewProjectButton extends Component {

	renderPage() {
		const {content, lang, dir} = this.props

		const userType = window.localStorage.getItem('user-type')
		const userId = window.localStorage.getItem('user-id')
		if(!content) return
		return (
			<Link to={`/dash/${userType}/${userId}/projects/createNew`} className='CreateNewProjectButton'>
				<div className='' dir={dir}>
					{content.pageContent[1][lang].create_btn}
				</div>
			</Link>
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


const mapStateToProps = state => {
  return {
    content: state.allProjects
  }
}

export default withRouter(
	connect(mapStateToProps, null)
	(multiLang(createNewProjectButton)
  ));
