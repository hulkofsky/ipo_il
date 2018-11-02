import React from 'react'
import PropTypes from 'prop-types'
import multiLang from '../../../_HOC/lang.hoc'

import ContentSection from '../../../ContentSection/ContentSection.index'
import Container from '../../../grid/Container/Container.index'
import CarouselTeam from '../../../CarouselTeam/CarouselTeam.index'


OurTeam.propTypes = {
  contentText: PropTypes.object,
  team: PropTypes.array,
  // from lang.hoc
  dir: PropTypes.string
}

function OurTeam(props) {

  const render = function () {
    const {dir, contentText, team} = props

    if (!contentText || !team) return null

    return (
      <ContentSection className={`our-team`}>
        <header className="content-section__header" dir={dir}>
          <h1 className="content-section__title">
            {contentText.team_title}
          </h1>
          <div className="content-section__text">
            <p>
              {contentText.team_descr}
            </p>
          </div>
        </header>
        <CarouselTeam team={team} />
      </ContentSection>
    )
  }

  return (
    <Container>
      {render()}
    </Container>
  )

}

export default multiLang(OurTeam)