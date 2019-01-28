// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// firebase
import firebase from '../../../../../firebase';

// app
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import i18n from '../../../../../assets/i18n/i18n';
import { setChannelTopUsers } from '../../../../store/actions/ChannelAction';
import _ from 'lodash';
import formatMessageTime from '../../../utilities/helpers/Date';

class ChannelInfoPopover extends Component {
	state = {
		expanded: 'sc-panel1',
		messagesRef: firebase.database().ref('messages'),
		topUsers: null
	};

	componentDidMount() {
		this.addTopUsersListener();
	}

	render() {
		const { expanded, topUsers } = this.state;
		const { currentChannel } = this.props;

		return (
			<section className="sc-channel-info">
				<ExpansionPanel
					className="sc-panel"
					expanded={expanded === 'sc-panel1'}
					onChange={this.handleChangePanel('sc-panel1')}>
					<ExpansionPanelSummary className="sc-head">
						{i18n.t('CHAT.MESSAGES_PANEL.HEADER.CHANNEL_INFO.INFO')}
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className="sc-details">
						<div className="sc-channel">
							<p>{currentChannel.details}</p>
						</div>
						<div className="sc-user sc-border">
							<div className="sc-desc">
								<h6>
									{i18n.t('CHAT.MESSAGES_PANEL.HEADER.CHANNEL_INFO.AUTHOR')}:&nbsp;
									<span>
										<a href={`mailto:${currentChannel.createdBy.email}`}>
											{currentChannel.createdBy.name}
										</a>
									</span>
								</h6>
								<h6>
									{i18n.t('CHAT.MESSAGES_PANEL.HEADER.CHANNEL_INFO.CREATED_DATE')}:&nbsp;
									<span>
										{formatMessageTime(currentChannel.timestamp, 'MMMM Do, YYYY')}
									</span>
								</h6>
							</div>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				{
					topUsers && (
						<ExpansionPanel
							className="sc-panel"
							expanded={expanded === 'sc-panel2'}
							onChange={this.handleChangePanel('sc-panel2')}>
							<ExpansionPanelSummary className="sc-head">
								{i18n.t('CHAT.MESSAGES_PANEL.HEADER.CHANNEL_INFO.TOP_USERS')}
							</ExpansionPanelSummary>
							<ExpansionPanelDetails className="sc-details">
								{
									topUsers.map((user, index) => (
										<ul className="sc-user sc-border" key={index}>
											<li className="sc-desc">
												<img className="sc-avatar" src={user.avatar} alt="channel-author"/>
												<div className="sc-content">
													<a href={`mailto:${user.email}`}>{user.name}</a>
													<p>
														{
															user.count && user.count > 1 ?
																i18n.t('CHAT.MESSAGES_PANEL.HEADER.CHANNEL_INFO.POSTS', { count: user.count }) :
																i18n.t('CHAT.MESSAGES_PANEL.HEADER.CHANNEL_INFO.POSTS', { count: user.count })
																	.slice(0, -1)
														}
													</p>
												</div>
											</li>
										</ul>
									))
								}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					)
				}
			</section>
		);
	}

	/**
	 * handle change in panel
	 *
	 * @param panel
	 * @returns {Function}
	 */
	handleChangePanel = panel => (event, expanded) => {
		this.setState({ expanded: expanded ? panel : false });
	};

	/**
	 * add top users listener
	 */
	addTopUsersListener = () => {
		const { channelTopUsers, currentChannel, totalMessages } = this.props;

		if (channelTopUsers && !!(_.find(channelTopUsers, e => e.channelId === currentChannel.id && e.totalMessages === totalMessages))) {
			const data = channelTopUsers.find(e => e.channelId === currentChannel.id);
			this.setState({ topUsers: data.topUsers });
		} else {
			this.accumulateTopUsers();
		}
	};

	/**
	 * accumulate top users
	 */
	accumulateTopUsers = () => {
		const { messagesRef } = this.state;
		const { currentChannel, totalMessages } = this.props;

		messagesRef
			.child(currentChannel.id)
			.orderByChild('timestamp')
			.once('value', (snap) => {
				if (snap.exists()) {
					const loadedMessages = Object.values(snap.val());
					if (loadedMessages && loadedMessages.length > 0) {
						const topUsers = Object
							.values(
								loadedMessages.reduce((acc, message) => {
									if (message.user.email in acc) {
										acc[message.user.email].count += 1;
									} else {
										acc[message.user.email] = {
											name: message.user.name,
											email: message.user.email,
											avatar: message.user.avatar,
											count: 1
										}
									}
									return acc;
								}, {})
							)
							.sort((a, b) => b.count - a.count)
							.slice(0, 5);

						// set top users
						this.setState({ topUsers }, () => {
							const userInfo = {
								totalMessages,
								channelId: currentChannel.id,
								topUsers
							};

							// set top users to redux
							this.props.setChannelTopUsers(userInfo);
						});
					}
				}
			})
			.then();
	};
}

export default connect(null, { setChannelTopUsers })(ChannelInfoPopover);
