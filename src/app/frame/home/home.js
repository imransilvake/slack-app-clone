// react
import React, { Component } from 'react';

// app
import HomeBanner from './../../../assets/images/home/01.png';

class Home extends Component {
    render() {
        return (
            <section className="sc-home cd-row">
                <div className="cd-col cd-col-pm-s-6">
                    <img src={HomeBanner} alt="Home Banner" />
                </div>
                <div className="cd-col cd-col-pm-s-6">
                    <p>Hello World!</p>
                </div>
            </section>
        );
    }
}

export default Home;

/**

 <section class="sc-home cd-row" style="
 padding: 40px 0;
 background: #fff;
 margin-top: 40px;
 "><div class="cd-col cd-col-pm-t-6" style="
 padding: 0 50px;
 ">
 <h1>Slack</h1>
 <h6 style="
 "><span style="
 color: #e1270d;
 font-weight: 700;
 font-size: 18px;
 ">Let</span> <span style="
 color: #eeb524;
 font-size: 18px;
 font-weight: 700;
 ">Work</span> <span style="
 color: #4cc49f;
 font-weight: 700;
 font-size: 18px;
 ">Flow</span><p></p></h6>

 <div style="
 margin-top: 30px;
 ">
 <h5>
 Slack creates alignment and shared understanding across your team, making you more productive, less stressed, and just a little bit happier.
 </h5>
 </div>
 </div><div class="cd-col cd-col-pm-t-6" style="
 text-align: center;
 "><img src="/static/media/03.5ba159f4.png" alt="Home Banner" style="
 max-width: 450px;
 width: 100%;
 margin-top: 50px;
 "></div></section>

 */