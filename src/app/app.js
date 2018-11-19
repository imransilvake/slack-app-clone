// react
import React, { Component } from 'react';

// app
import AppRouting from './app-routing';
import Header from './frame/header/header';
import Footer from './frame/footer/footer';

class App extends Component {
    render() {
        return (
            <div className="sc-app">
                {/* Header */}
                <Header/>

                {/* Routing */}
                <AppRouting/>

                {/* Footer */}
                <Footer/>
            </div>
        );
    }
}

export default App;
