import React, { Component } from 'react';
import ls from 'local-storage';
import axios from '../axiosConfig';
import { Form, FormGroup, Input, Button } from 'reactstrap';

class PageContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
		}
	}

	handleChange(e) {
		const { target } = e
		this.setState({ [target.name]: target.value })
	}

	handleSubmit(e) {
		e.preventDefault()
		const { username, password } = this.state
		if (username && password) {
			axios.post('/adminpanel/signin', {
				"username": username,
				"password": password,
			})
				.then((response) => {
					if (response.statusText === "OK" && response.data.token) {
						ls.set('token', response.data.token)
						this.props.history.push('/')
					}
				})
				.catch((error) => {
					console.error('Wrong username or password')
				})
		} else {
			console.error('All inputs must be field')
		}
	}

	render() {
		return (
			<Form onSubmit={(e) => this.handleSubmit(e)} className="form-signin text-center">
				<FormGroup>
					<h1 className="h3 mb-3 font-weight-normal">
						Please sign in
                    </h1>
					<Input
						name="username"
						value={this.state.username}
						onChange={(e) => this.handleChange(e)}
						className="form-control"
						placeholder="Email address"
						required
						autoFocus
					/>
					<Input
						name="password"
						type="password"
						value={this.state.password}
						onChange={(e) => this.handleChange(e)}
						className="form-control"
						placeholder="Password"
						required
					/>
					<Button block size="lg" className="signin_button">
						SIGN IN
                    </Button>
				</FormGroup>
			</Form>
		);
	};
}

export default PageContainer;