// react
import React from 'react';

const LoadingAnimation = () => {
    return (
        <section className="sc-loading-animation">
            <div className="cd-vh-center">
                { /* slack animation */}
                <svg version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     x="0px" y="0px"
                     viewBox="9.5 -14.5 105 100"
                >
                    <g className="st0">
                        <line x1="39" y1="-3" x2="39" y2="78"/>
                    </g>
                    <g className="st1">
                        <line x1="21" y1="60" x2="102" y2="60"/>
                    </g>
                    <g className="st2">
                        <line x1="84" y1="78" x2="84" y2="-3"/>
                    </g>
                    <g className="st3">
                        <line x1="102" y1="15" x2="21" y2="15"/>
                    </g>
                </svg>
            </div>
        </section>
    )
};

export default LoadingAnimation;
