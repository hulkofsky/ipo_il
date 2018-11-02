import React, { Component } from 'react';
// import SwitchButton from './Lang.button';
import { LangConsumer } from '../../../Lang/Lang.index';

class LangSwitch extends Component {

  state = {
    currentLang: 'en',
  }

  changeLang = (context, dir, langToState) => {
    // currently supported only EN language, so if you to exactly change APP language,
    context.changeLang('en', dir);

    // push to state lang for toggling active className
    this.setState( prev => ({
      currentLang: langToState,
    }))

    // this.props.getData();
    // setTimeout( () => {
    // }, 2000)
  }

  render() {
    return (// setTimeout( () => {
    //
      <LangConsumer>
        { context => {
          const { langs } = this.props;
          const { lang: currentLang } = context;
          const activeLang = this.state.currentLang;

          return (
            <React.Fragment>
              <span className='dash-header__lang-title'>{langs[currentLang].language}</span>
              <span
                className={`dash-header__lang-item ${activeLang === 'en' ? 'active' : ''}`}
                onClick={ () => {this.changeLang(context, 'ltr', 'en')} }
                children={langs[currentLang].en}
              />
              <span
                // currently supported only EN language, so if you to exactly change APP language,
                // change the second parametr for another string
                className={`dash-header__lang-item ${activeLang === 'he' ? 'active' : ''}`}
                onClick={ () => {this.changeLang(context, 'rtl', 'he')} }
                children={langs[currentLang].he}
              />
            </React.Fragment>
          )
        }}
      </LangConsumer>
    );
  }

}

export default LangSwitch;
