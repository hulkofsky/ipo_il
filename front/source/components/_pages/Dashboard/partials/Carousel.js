import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import uuid from 'uuid/v4';

class CarouselCustom extends Component {

  renderControl = (className, onClick) => {
    const { items } = this.props;
    if(items.length <= 10) {
      return null;
    }

    return (
      <span
        onClick={onClick}
        className={`project__team-control project__team-control-${className}`}
      />
    )
  }

  render() {
    const { items, item: Item, itemsWrapper: ItemsWrapper, rows } = this.props;
    let itemsToRender = [];
    let currentItem = 0;

    if(rows === 1) {
      itemsToRender = items;
    } else {
      for(let i = 0; i < items.length;) {
        const itemsPack = (
          <ItemsWrapper key={uuid()}>
            { fillWrapper() }
          </ItemsWrapper>
        )

        itemsToRender.push(itemsPack);

        currentItem += rows;
        i += rows;

        function fillWrapper() {
          return items.slice(currentItem, currentItem + rows);
        }
      }
    }

    return (
      <Carousel
        slidesToShow={1}
        renderControls={true}
        initialSlideWidth={740}
        initialSlideHeight={450}
        cellSpacing={66}
        dragging={false}
        renderTopLeftControls={({ previousSlide }) => this.renderControl('prev', previousSlide) }
        renderTopRightControls={({ nextSlide }) => this.renderControl('next', nextSlide) }
      >
        {itemsToRender}
      </Carousel>
    );
  }

}

export default CarouselCustom;
