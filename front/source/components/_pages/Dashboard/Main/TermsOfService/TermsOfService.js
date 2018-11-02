import React, {Component, Fragment} from 'react';
import './TermsOfService.styl';
import SecondaryHeader from '../../SecondaryHeader';

import { getTermsOfService } from '../../../../../redux/reducers/getTermsOfService.reducer';
import { projects, terms_of_service } from '../../../../../utils/routesBack'
import { connect } from 'react-redux';
import multiLang from '../../../../_HOC/lang.hoc'

class TermsOfService extends Component  {


	componentDidMount = () => {
		// console.log(this.props)
	    const {lang, getTermsOfService} = this.props
			const userType = window.localStorage.getItem('user-type');
	    const terms_of_service = `${userType}/${window.localStorage.getItem('user-id')}/terms`
	    getTermsOfService(lang, terms_of_service)
	}


	renderPage() {

		const {lang, terms, dir} = this.props
		if(!terms.pageContent) return null
		const userType = this.props.match.params.userType
			// console.log(terms)
		// console.log(this.props)
		const mainText = terms.pageContent[1][lang].descr
		// console.log(mainText)
		const secHeaderName = [terms.pageContent[0][lang].terms]
		return(
			<div className='TermsOfService'>
				<SecondaryHeader controls={false} button={false} userType={userType} text={secHeaderName} dir={dir}/>

				{/*<div className='TermsOfService__main-header'>
					Terms of service
				</div>*/}
				 <div className="dash-inner">
				 	<div dir={dir}>
						<p dir={dir}>{mainText}</p>
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

const mapStateToProps = state => {
  return {
    terms: state.termsOfService
  }
}
const mapDispatchToProps = {getTermsOfService}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(TermsOfService)
)
// export default TermsOfService
