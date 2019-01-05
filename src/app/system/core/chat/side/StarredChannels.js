// react
import React, { Component } from 'react';

// app
import i18n from '../../../../../assets/i18n/i18n';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

class StarredChannels extends Component {
	state = {
		starredChannels: []
	};

	render() {
		const { starredChannels } = this.state;
		const { userColors, userStarred } = this.props;
		const sidePanelColorPrimary = {
			color: userColors.side_panel.color_primary,
			borderColor: userColors.side_panel.background.primary
		};

		return (
			<section className="sc-side-panel-list-wrapper">
				{/* Title */}
				<div className="sc-title">
					<h6 style={sidePanelColorPrimary}>
						{i18n.t('CHAT.SIDE_PANEL.STARRED_CHANNELS.TITLE')}<span>{starredChannels.length}</span>
					</h6>
					<div className="sc-icon-wrapper">
						<div className="sc-icon" style={sidePanelColorPrimary}>
							<Icon onClick={this.handleOpenModal}>star</Icon>
						</div>
					</div>
				</div>

				{/* Channel */}
				<ul className="cd-remove-bullets sc-list">
					{this.displayStarredChannels(userStarred, userColors)}
				</ul>
			</section>
		);
	}

	/**
	 * display starred channels
	 *
	 * @param userStarred
	 */
	displayStarredChannels = userStarred => (
		userStarred && userStarred.length > 0 && userStarred.map(channel => (
			<li
				key={channel.id}
				name={channel.name}
				className="sc-item">
				<Button
					variant="contained"
					type="button"
					fullWidth>
					# {channel.name}
				</Button>
			</li>
		))
	);
}

export default StarredChannels;
