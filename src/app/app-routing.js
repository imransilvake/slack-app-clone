// react
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app
import AppComponent from './app.component';
import Login from './components/auth/login.component';
import Register from './components/auth/register.component';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={AppComponent}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>
);

export default Root;
