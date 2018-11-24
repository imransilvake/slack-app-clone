// react
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app
import Home from './frame/home/home';
import Login from './core/auth/login';
import Register from './core/auth/register';

const AppRouting = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route path="/login" component={Login}/>
			<Route path="/register" component={Register}/>
		</Switch>
	</Router>
);

export default AppRouting;
