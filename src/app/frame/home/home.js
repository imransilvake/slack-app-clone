// react
import React, { Component } from 'react';

// app
import HomeBanner from './../../../assets/images/home/01.png';

class Home extends Component {
    render() {
        return (
            <section className="sc-home cd-row">
                {/* Content */}
                <div className="cd-col cd-col-pm-t-6">
                    <div className="sc-title">
                        <h1>Slack</h1>
                        <h6>
                            <span>Let</span>
                            <span>Work</span>
                            <span>Flow</span>
                        </h6>
                    </div>
                    <div className="sc-content">
                        <h5>
                            Slack creates alignment and shared understanding across your team, making you more productive,
                            less stressed, and just a little bit happier.
                        </h5>
                    </div>
                </div>

                {/* Banner */}
                <div className="cd-col cd-col-pm-t-6">
                    <img src={HomeBanner} alt="Home Banner" />
                </div>
            </section>
        );
    }
}

export default Home;
