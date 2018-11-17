// react
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// app
import '../node_modules/@imransilvake/scss-framework/dist/css/main.min.css';
import './assets/scss/app.scss';
import Root from './app/app-routing';

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
