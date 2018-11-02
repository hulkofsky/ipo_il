import React from 'react'
import PropTypes from 'prop-types'
import {LangConsumer} from './Lang.index'

TranslatableText.propTypes = {
  // from parent component
  dictionary: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

function TranslatableText(props) {

  const {dictionary, id} = props
  return (
    <LangConsumer>
      {
        context => {
          const {lang} = context
          return dictionary[lang][id]
        }
      }
    </LangConsumer>
  )

}

export default TranslatableText
