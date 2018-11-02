import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader'

import Routes from '../_routes/App.routes'
import LangProvider from '../Lang/Lang.index'

function App() {

  return (
    <Fragment>
      <LangProvider>
        <Routes />
      </LangProvider>
    </Fragment>
  )

}

export default hot(module)(App)