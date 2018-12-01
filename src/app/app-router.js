// react
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

// firebase
import firebase from '../firebase';

// app
import Login from './system/core/auth/login';
import Register from './system/core/auth/register';
import Home from './system/frame/home/home';
import Chat from './system/core/chat/chat';
import ENV from '../environment/index';
import { setUser, clearUser } from './store/actions';
import LoadingAnimation from './system/utilities/loading-animation/loading-animation';

class AppRouter extends Component {
	componentDidMount() {
		// redirect to the chat route on user logged-in state
		firebase
			.auth()
			.onAuthStateChanged((user) => {
				if (user) {
					// set user to store
					this.props.setUser(user);

					// navigate to chat route
					this.props.history.push(ENV.ROUTING.CHAT);
				} else {
					// navigate to home route
					this.props.history.push(ENV.ROUTING.HOME);

					// clear user from store
					this.props.clearUser();
				}
			});
	}

	render() {
		return this.props.isAnimationLoading ? <LoadingAnimation/> : (
			<Switch>
				<Route exact path={ENV.ROUTING.HOME} component={Home}/>
				<Route path={ENV.ROUTING.AUTH.LOGIN} component={Login}/>
				<Route path={ENV.ROUTING.AUTH.REGISTER} component={Register}/>
				<Route path={ENV.ROUTING.CHAT} component={Chat}/>
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
