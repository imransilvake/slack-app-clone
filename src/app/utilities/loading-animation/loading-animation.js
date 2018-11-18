// react
import React from 'react';

// app
import PreLoader from './../../../assets/svg/pre-loaders/01.svg';

const LoadingAnimation = () => {
    return (
        <section className="sc-loading-animation">
            <div className="sc-svg-wrapper cd-vh-center">
                <img src={PreLoader} alt="loading"/>
            </div>
        </section>
    )
};

export default LoadingAnimation;
