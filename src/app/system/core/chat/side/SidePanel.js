// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import ColorPanel from './ColorPanel';
import UserPanel from './UserPanel';
import Channels from './Channels';
import Icon from '@material-ui/core/Icon';
import StarredChannels from './StarredChannels';

class SidePanel extends Component {
	render() {
		const { currentUser, currentChannel, userStatus, isMobileView, userColors, userStarred } = this.props;
		const sidePanelDarkStyle = { backgroundColor: userColors.background.primary };
		const sidePanelLightStyle = { backgroundColor: userColors.background.secondary };
		const sidePanelPrimaryColor = { color: userColors.color_primary };
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

					{/* Starred Channels */}
					{
						userColors && userStarred && userStarred.length > 0 && (
							<StarredChannels
								currentChannel={currentChannel}
								userColors={userColors}
								userStarred={userStarred}/>
						)
					}

					{/* Channels */}
					<Channels
						currentUser={currentUser}
						currentChannel={currentChannel}
						userColors={userColors}/>
				</div>
			</section>
		);
	}
}

export default SidePanel;
