// react
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// app
import AppRouter from './app-router';
import rootReducer from './store/reducers';

// redux store
const store = createStore(rootReducer, composeWithDevTools());

class App extends Component {
	render() {
		return (
			<div className="sc-app">
				{/* Header */}

				{/* Router Outlet */}
				<Provider store={store}>
					<BrowserRouter>
						<AppRouter/>
					</BrowserRouter>
				</Provider>

				{/* Footer */}
			</div>
		);
	}
}

export default App;
