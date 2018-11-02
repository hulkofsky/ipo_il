import React from 'react'
import PropTypes from 'prop-types'
import './PageFooter.style.styl'
import multilang from '../_HOC/lang.hoc'

import Container from '../grid/Container/Container.index'
import Copyright from './Copyright/Copyright.index'
import LangSwitch from '../Lang/Lang.switch'

PageFooter.propTypes = {
  // from HOC Lang
  dir: PropTypes.string,
  contentText: PropTypes.object,
  path: PropTypes.string
}

function PageFooter(props) {

  const {contentText, path, dir} = props
  return (
    <footer className = "page-footer">
      <Container dir = {dir}>
        <div className = "page-footer__copyright">
          <Copyright contentText = {contentText} />
        </div>
        {/*<div className = "page-footer__lang">*/}
          {/*<LangSwitch contentText = {contentText} path = {path} />*/}
        {/*</div>*/}
      </Container>
    </footer>
  )
}

export default multilang(PageFooter)