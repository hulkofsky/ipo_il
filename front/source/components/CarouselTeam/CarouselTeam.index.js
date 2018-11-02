import React from 'react'
import PropTypes from 'prop-types'
import './CarouselTeam.style.styl'

import Carousel from 'nuka-carousel'
import Item from './CarouselTeam.item'
import './CarouselTeam.style.styl'

CarouselTeam.propTypes = {
  // from parent component
  team: PropTypes.array.isRequired
}

function CarouselTeam(props) {

  const generateId = (index) => Date.now() + Math.random() + index

  const renderSlides = () => {
    const {team} = props
    return team.map((item, index) => {
      return (
        <Item key={generateId(index)}
          photo={item.photo}
          fullName={`${item.first_name} ${item.last_name}`}
          post={item.position}
          descr = {item.first_name}
        />
      )
    })
  }

  return (
    <div className="team-carousel">
      <Carousel slidesToShow={3}
        cellAlign="left"
        cellSpacing={20}
        heightMode={`first`}
        initialSlideHeight={360}
        initialSlideWidth={280}
      >
        {renderSlides()}
      </Carousel>
    </div>
  )

}

export default CarouselTeam