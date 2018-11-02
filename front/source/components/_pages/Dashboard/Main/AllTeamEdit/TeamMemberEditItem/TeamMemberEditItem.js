import React, {Component} from 'react';
import './TeamMemberEditItem.styl'
import NewTeamMember from '../../CreateNew/newTeamMember/NewTeamMember'
import Input from '../../../../../formFields/FormField.input';
import InputFile from '../../../../../formFields/FormField.file';

class TeamMemberEditItem extends Component {


	clickOnInput = () => {
		console.log('click')
	}
	onUpdateValue = () => {
		console.log('update')
	}
	onUpdateErrors = () => {
		console.log('errors')
	}
	render() {
		const {firstName, lastName, position, linkFacebook, linkLinkedIn, photo} = this.props.config
		const len = this.props.length;
		const index = this.props.index + 1;

		return (
			<div className='TeamMemberEditItem'>
				<div className='TeamMemberEditItem__header'>
					{index} of {len} Members
				</div>
				<div className='TeamMemberEditItem__form-container'>
					<div className="sign-up__container">
	                   <div className="sign-up__column sign-up__column--mb">
			              <Input type="text"
			                name="firstName"
			                {...firstName}
			                label="Enter Team Member First Name"
			                labelDone="First Name"
			                validation={[`text`]}
			                changeValue={this.onUpdateValue}
			                changeErrors={this.onUpdateErrors}
			              />
			              <Input type="text"
			                name="position"
			                {...position}
			                label="Enter Position of a Team Member"
			                labelDone="Position"
			                validation={[`text`]}
			                changeValue={this.onUpdateValue}
			                changeErrors={this.onUpdateErrors}
			              />
			              <Input type="text"
			                name="linkFacebook"
			                {...linkFacebook}
			                label="Enter a Link to Facebook"
			                labelDone="Facebook"
			                validation={[`facebook`]}
			                changeValue={this.onUpdateValue}
			                changeErrors={this.onUpdateErrors}
			              />
			            </div>
			            <div className='NewTeamMember__group'>
			              <Input type="text"
			                name="lastName"
			                {...lastName}
			                label="Enter Team Member Last Name"
			                labelDone="Last Name"
			                validation={[`text`]}
			                changeValue={this.onUpdateValue}
			                changeErrors={this.onUpdateErrors}
			              />
			              <InputFile 
			                name="photo"
			             
			                {...photo}
			               
			                updateValue={event => updateValue(event, index)}
			                label={`Upload Photo of a Team Member`}
			                labelDone={`Member photo`}
			                validation={[`maxSize`]}
			                updateErrors={this.onUpdateErrors}
			               
			              />
			              <Input type="text"
			                name="linkLinkedIn"
			                {...linkLinkedIn}
			                label="Enter a Link to LinkedIn"
			                labelDone="LinkedIn"
			                validation={[`linkedIn`]}
			                changeValue={this.onUpdateValue}
			                changeErrors={this.onUpdateErrors}
			              />
			            </div>
	                </div>
				</div>
			</div>
		)
	}
}

export default TeamMemberEditItem

