// react
import React, { Component } from 'react';

// app
import HomeBannerL from './../../../assets/images/home/01.png';
import HomeBannerS from './../../../assets/images/home/02.jpg';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';

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

                        {/* Banner - Small Displays */}
                        <div className="sc-banner cd-hide-on-t-up">
                            <img src={HomeBannerS} alt="Home Banner" />
                        </div>
                    </div>
                    <div className="sc-content">
                        <h5>
                            Slack creates alignment and shared understanding across your team, making you more productive,
                            less stressed, and just a little bit happier.
                        </h5>
                    </div>
                    <div className="sc-buttons">
                        <Link to="/login">
                            <Button className="sc-login"
                                    variant="contained">
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className="sc-register"
                                    variant="contained">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Banner - Large Displays */}
                <div className="cd-col cd-col-pm-t-6 cd-hide-on-s-down">
                    <img src={HomeBannerL} alt="Home Banner" />
                </div>
            </section>
        );
    }
}

export default Home;
