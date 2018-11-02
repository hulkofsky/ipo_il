import React from 'react'
import './NavLinkButton.styl'

function NavLinkButton (props) {
    return (
        <div className={props.classNameToProps} onClick={props.click}> 
            <div className='NavLinkButton__button' onClick={props.click}>
                <div className="NavLinkButton__button--line"></div>
                <div className="NavLinkButton__button--line"></div>
                <div className="NavLinkButton__button--line"></div>
            </div>
        </div>
    )
}

export default NavLinkButton
