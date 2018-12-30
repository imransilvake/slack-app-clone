// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import ColorPanel from './ColorPanel';
import UserPanel from './UserPanel';
import Channels from './Channels';
import Icon from '@material-ui/core/Icon';

class SidePanel extends Component {
	render() {
		const { currentUser, userStatus, isMobileView, userColors } = this.props;
		const sidePanelDarkStyle = { backgroundColor: userColors.side_panel.background.primary };
		const sidePanelLightStyle = { backgroundColor: userColors.side_panel.background.secondary };
		const sidePanelPrimaryColor = { color: userColors.side_panel.color_primary };
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

					{/* Icons */}
					<div className="sc-icons" style={sidePanelPrimaryColor}>
						<Icon className="sc-icon">search</Icon>
						<Icon className="sc-icon">error_outline</Icon>
					</div>
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
