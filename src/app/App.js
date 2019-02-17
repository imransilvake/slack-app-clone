// react
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// app
import AppRouter from './AppRouter';
import rootReducer from './store/reducers';

// redux store
const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<React.Fragment>
						<AppRouter/>
					</React.Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default withTranslation()(App);
