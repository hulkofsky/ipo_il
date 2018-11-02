import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router';

import Footer from "./components/common/Footer";
import Page from "./containers/Page";
import Login from "./containers/Login";

import { toLogin } from './helper'
import ls from 'local-storage';
import history from './history';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-datetime/css/react-datetime.css';
import './assets/css/App.css';
import Background from './assets/images/Background.svg';

class App extends Component {
	componentWillMount() {
		let token = ls.get('token')
		if (!token)
			toLogin()
	}

	render() {
		return (
			<Router history={history}>
				<React.Fragment>
					<div className="App"
						style={{
							backgroundImage: `url(${Background})`,
							backgroundColor: '#F5F6F8',
							backgroundRepeat: 'repeat-y',
							backgroundPositionX: 'unset',
							backgroundSize: 'contain',
						}}
					>
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route component={Page} />
						</Switch>
					</div>
					<Footer />
				</React.Fragment>
			</Router>
		);
	}
}

export default App;
