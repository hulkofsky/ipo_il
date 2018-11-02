import React from 'react'

// style
import './notice.styl'

// icon
import icon from './images/question.svg'

function Notice() {
  return (
    <section className = "notice">
      <div className="notice__image-wrapper">
        <img src = {icon} alt = "question mark" />
      </div>
      <div className = "notice__hover">
        All information is visible on the site without registration. In order to purchase, you must sign-up.
      </div>
    </section>
  )
}

export default Notice