// react
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

// firebase
import firebase from '../firebase';

// app
import Login from './core/auth/login';
import Register from './core/auth/register';
import Home from './frame/home/home';
import Chat from './frame/chat/chat';
import { setUser, clearUser } from './store/actions';
import LoadingAnimation from './utilities/loading-animation/loading-animation';

class AppRouter extends Component {
	componentDidMount() {
		// check user login state and redirect to the app route
		firebase
			.auth()
			.onAuthStateChanged((user) => {
				if (user) {
					// set user to store
					this.props.setUser(user);

					// navigate to chat route
					this.props.history.push('/chat');
				} else {
					// clear user from store
					this.props.clearUser();

					// navigate to home route
					this.props.history.push('/');
				}
			});
	}

	render() {
		return this.props.isAnimationLoading ? <LoadingAnimation/> : (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
				<Route path="/chat" component={Chat}/>
			</Switch>
		);
	}
}

// props
const mapStateFromProps = state => ({
	isAnimationLoading: state.user.isAnimationLoading
});

export default withRouter(
	connect(
		mapStateFromProps,
		{ setUser, clearUser }
	)(AppRouter)
);
