import React from 'react'
import PropTypes from 'prop-types'
import './HowWorking.style.styl'
import { convertObjectToArray } from '../../../../utils/helpers'

import Container from '../../../grid/Container/Container.index'
import ContentSection from '../../../ContentSection/ContentSection.index'
import PromoItem from './HowWorking.item'
import { Link } from 'react-router-dom'

HowWorking.propTypes = {
  contentText: PropTypes.object,
  contentMedia: PropTypes.object
}

function HowWorking(props) {

  const mergeObjects = function () {
    const objA = props.contentText
    const objB = props.contentMedia
    const objRez = {}

    for (const key in objA) {
      if (objA.hasOwnProperty(key)) {

        if (key.includes(`item`)) {
          const index = key.match(/[0-9]+/g)

          objRez[`item${index}`] = {
            ...{
              ...objRez[`item${index}`],
              [key.split(`.`)[1]]: objA[key]
            },
            image: objB[`img${index}`]
          }
        }

      }
    }

    return objRez
  }

  const Items = convertObjectToArray(mergeObjects())

  const renderItems = Items.map(item => {
    return (
      <PromoItem key={item.title}
        title={item.title}
        titleHover={item.title}
        image={item.image}
        text={item.descr}
      />
    )
  })

  const render = function () {
    const {contentText} = props

    if (!contentText) return null
    return (
      <ContentSection className={`how-working`}>
        <header className="content-section__header">
          <h1 className="content-section__title">
            {contentText.title}
          </h1>
          <div className="content-section__text">
            <p>
              {contentText.descr}
            </p>
          </div>
        </header>
        <div className="how-working__container">
          {renderItems}
        </div>
        <Link to={`/sign-up`} className = "button button-bordered how-working__button-sign-up">Sign up</Link>
      </ContentSection>
    )
  }


  return (
    <Container>
      {render()}
    </Container>
  )

}

export default HowWorking