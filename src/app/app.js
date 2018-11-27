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
			<section className="sc-app">
				<Provider store={store}>
					<BrowserRouter>
						{/* Router Outlet */}
						<AppRouter/>
					</BrowserRouter>
				</Provider>
			</section>
		);
	}
}

export default App;
