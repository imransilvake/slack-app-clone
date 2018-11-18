// react
import React, { Component } from 'react';

// app
import AppRouting from './app-routing';

class App extends Component {
    render() {
        return (
            <div className="sc-app">
                {/* Header */}
                <header></header>

                {/* Routing */}
                <AppRouting/>

                {/* Footer */}
                <footer></footer>
            </div>
        );
    }
}

export default App;
