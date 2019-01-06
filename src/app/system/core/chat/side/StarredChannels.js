// react
import React, { Component } from 'react';

// app
import i18n from '../../../../../assets/i18n/i18n';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import setChannel from '../../../../store/actions/ChannelAction';

class StarredChannels extends Component {
	render() {
		const { userColors, userStarred } = this.props;
		const sidePanelColorPrimary = {
			color: userColors.color_primary,
			borderColor: userColors.background.primary
		};

		return (
			<section className="sc-side-panel-list-wrapper">
				{/* Title */}
				<div className="sc-title">
					<h6 style={sidePanelColorPrimary}>
						{i18n.t('CHAT.SIDE_PANEL.STARRED_CHANNELS.TITLE')}<span>{userStarred.length}</span>
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
	 * @param userColors
	 */
	displayStarredChannels = (userStarred, userColors) => (
		userStarred && userStarred.length > 0 && userStarred.map(channel => (
			<li
				key={channel.id}
				name={channel.name}
				className={this.props.currentChannel && this.props.currentChannel.id === channel.id ? 'sc-item sc-active' : 'sc-item'}
				style={
					{
						backgroundColor:
							this.props.currentChannel &&
							this.props.currentChannel.id === channel.id ? userColors.background.primary : null
					}
				}>
				<Button
					style={{ color: userColors.color_secondary }}
					variant="contained"
					type="button"
					onClick={() => this.changeChannel(channel)}
					fullWidth>
					# {channel.name}
				</Button>
			</li>
		))
	);

	/**
	 * change channel
	 *
	 * @param channel
	 */
	changeChannel = (channel) => {
		// set current channel
		this.props.setChannel(channel);
	};
}

export default connect(null, { setChannel })(StarredChannels);
