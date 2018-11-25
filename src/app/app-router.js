// react
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// firebase
import firebase from '../firebase';

// app
import Login from './core/auth/login';
import Register from './core/auth/register';
import Home from './frame/home/home';
import Chat from './frame/chat/chat';

class AppRouter extends Component {
	componentDidMount() {
		// check user login state and redirect to the app route
		firebase
			.auth()
			.onAuthStateChanged((user) => {
				if (user) {
					this.props.history.push('/chat');
				}
			});
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/chat" component={Chat} />
			</Switch>
		);
	}
}

export default withRouter(AppRouter);
