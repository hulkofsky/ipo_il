// import React from 'react'
// import './TeamMemberItem.styl'
// import { Link } from 'react-router-dom'

// function TeamMemberItem (props) {
	
// 	return(
// 		<Link to={`${props.path}/${props.id}`} key={props.config.id}>
// 			<div className='TeamMemberItem' onClick={()=> props.click(props.config.id)}>
// 				<div className='TeamMemberItem__photo'>
// 					<img src={props.config.photo.value} alt='Team member' />
// 				</div>
// 				<div className='TeamMemberItem__name' dir={props.dir}>{props.config.firstName.value} {props.config.lastName.value}</div>
// 				<div className='TeamMemberItem__position' dir={props.dir}>{props.config.position.value}</div>
// 			</div>
// 		</Link>

// 	)
// }

// export default TeamMemberItem

import React from 'react'
import './TeamMemberItem.styl'
import { Link } from 'react-router-dom'

function TeamMemberItem (props) {
	
	return(
		<Link to={`${props.path}/${props.id}`} key={props.config.id}>
			<div className='TeamMemberItem' onClick={()=> props.click(props.config.id)}>
				<div className='TeamMemberItem__photo'>
					<img src={props.config.photo.value} alt='Team member' />
				</div>
				<div className='TeamMemberItem__name' dir={props.dir}>{props.config.firstName.value} {props.config.lastName.value}</div>
				<div className='TeamMemberItem__position' dir={props.dir}>{props.config.position.value}</div>
			</div>
		</Link>

	)
}

export default TeamMemberItem













