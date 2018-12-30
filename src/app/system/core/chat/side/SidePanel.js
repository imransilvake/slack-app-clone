// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import ColorPanel from './ColorPanel';
import UserPanel from './UserPanel';
import Channels from './Channels';

class SidePanel extends Component {
	render() {
		const { currentUser, userStatus, isMobileView, userColors } = this.props;
		const sidePanelDarkStyle = { backgroundColor: userColors.side_panel.background.primary };
		const sidePanelLightStyle = { backgroundColor: userColors.side_panel.background.secondary };
		const sidePanelClass = classNames({
			'cd-col sc-side-panel': true,
			'sc-view-fixed': isMobileView
		});

		return (
			<section className="sc-side-panel-wrapper">
				{/* Color Area */}
				<div className="sc-color-panel-wrapper" style={sidePanelDarkStyle}>
					<ColorPanel
						currentUser={currentUser}
						userColors={userColors}/>
				</div>

				{/* Content */}
				<div className={sidePanelClass} style={sidePanelLightStyle}>
					{/* Header */}
					<header className="sc-header">
						<UserPanel
							currentUser={currentUser}
							userStatus={userStatus}
							userColors={userColors}/>
					</header>

					{/* Channels */}
					<Channels
						currentUser={currentUser}
						userColors={userColors}/>
				</div>
			</section>
		);
	}
}

export default SidePanel;
