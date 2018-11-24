// react
import React, { Component } from 'react';

// app
import AppRouting from './app-routing';

class App extends Component {
	render() {
		return (
			<div className="sc-app">
				{/* Header */}

				{/* Routing */}
				<AppRouting />

				{/* Footer */}
			</div>
		);
	}
}

export default App;
