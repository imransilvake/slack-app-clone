// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import ColorPanel from './ColorPanel';
import UserPanel from './UserPanel';
import Channels from './Channels';
import StarredChannels from './StarredChannels';

class SidePanel extends Component {
	render() {
		const { currentUser, currentChannel, userStatus, isMobileView, userColors, userStarred } = this.props;
		const colorPanelStyle = { backgroundColor: userColors.background.primary };
		const userPanelStyle = { backgroundColor: userColors.background.secondary };
		const sidePanelClass = classNames({
			'cd-col sc-side-panel': true,
			'sc-view-fixed': isMobileView
		});

		return (
			<section className="sc-side-panel-wrapper">
				{/* Color Area */}
				<div className="sc-color-panel-wrapper" style={colorPanelStyle}>
					<ColorPanel
						currentUser={currentUser}
						userColors={userColors}/>
				</div>

				{/* Content */}
				<div className={sidePanelClass} style={userPanelStyle}>
					{/* Header */}
					<header className="sc-header">
						<UserPanel
							currentUser={currentUser}
							userStatus={userStatus}
							userColors={userColors}/>
					</header>

					{/* Content */}
					<div className="sc-content">
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
				</div>
			</section>
		);
	}
}

export default SidePanel;
