import React, {Component} from 'react'
import {LangConsumer} from '../Lang/Lang.index'

export default function (WrappedComponent) {
  return class MultiLang extends Component {

    render() {
      return (
        <LangConsumer>
          {
            context => {
              const {dir, lang} = context
              return (
                <WrappedComponent dir={dir}
                  lang={lang}
                  {...this.state}
                  {...this.props}
                />
              )
            }
          }
        </LangConsumer>
      )
    }

  }
}
