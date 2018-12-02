// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// app
import Button from '@material-ui/core/Button/Button';
import HomeBannerL from '../../../../assets/images/home/01.png';
import HomeBannerS from '../../../../assets/images/home/02.jpg';
import i18n from '../../../../assets/i18n/i18n';
import ENV from '../../../../environment/index';

class Home extends Component {
	render() {
		return (
			<section className="cd-container sc-home cd-row">
				{/* Content */}
				<div className="cd-col cd-col-pm-t-6">
					<div className="sc-title">
						<h1>{i18n.t('HOME.TITLE')}</h1>
						<h6>
							<span>{i18n.t('HOME.SUBTITLE.T1')}</span>
							<span>{i18n.t('HOME.SUBTITLE.T2')}</span>
							<span>{i18n.t('HOME.SUBTITLE.T3')}</span>
						</h6>

						{/* Banner - Small Displays */}
						<div className="sc-banner cd-hide-on-t-up">
							<img src={HomeBannerS} alt={i18n.t('HOME.SUBTITLE.T3')}/>
						</div>
					</div>
					<div className="sc-content">
						<h5>{i18n.t('HOME.CONTENT')}</h5>
					</div>
					<div className="sc-buttons">
						<Link to={ENV.ROUTING.AUTH.LOGIN}>
							<Button
								className="sc-login"
								variant="contained">
								{i18n.t('HOME.BUTTONS.T1')}
							</Button>
						</Link>
						<Link to={ENV.ROUTING.AUTH.REGISTER}>
							<Button
								className="sc-register"
								variant="contained">
								{i18n.t('HOME.BUTTONS.T2')}
							</Button>
						</Link>
					</div>
				</div>

				{/* Banner - Large Displays */}
				<div className="cd-col cd-col-pm-t-6 cd-hide-on-s-down">
					<img src={HomeBannerL} alt={i18n.t('HOME.SUBTITLE.T3')}/>
				</div>
			</section>
		);
	}
}

export default Home;
