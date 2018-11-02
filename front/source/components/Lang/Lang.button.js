import React from 'react'
import PropTypes from 'prop-types'

SwitchButton.propTypes = {
  // from Lang.switch
  handleLangChange: PropTypes.func.isRequired,
  selectedLang: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  dir: PropTypes.string.isRequired,
}

function SwitchButton(props) {

  const isChecked = () => {
    const {selectedLang, lang} = props
    return lang === selectedLang
  }

  const setClassName = () => {
    let className = `lang-switch__label page-footer-text`
    if (isChecked()) className += ` lang-switch__label--active`
    return className
  }

  const {handleLangChange, lang, context, dir} = props
  return (
    <label className={setClassName()}>
      {lang}
      <input type="radio"
        name="lang"
        className="lang-switch__button"
        value={lang}
        checked={isChecked()}
        onChange={evt => handleLangChange(evt, context, dir)}
      />
    </label>
  )

}

export default SwitchButton