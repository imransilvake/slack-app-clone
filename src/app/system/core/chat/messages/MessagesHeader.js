// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// firebase
import firebase from '../../../../../firebase';

// app
import ChannelInfoPopover from './ChannelInfoPopover';
import Icon from '@material-ui/core/es/Icon/Icon';
import Popover from '@material-ui/core/Popover';
import { updateUserStarred } from '../../../../store/actions/UserAction';
import _ from 'lodash';

class MessagesHeader extends Component {
	state = {
		usersRef: firebase.database().ref('users'),
		isChannelStarred: false,
		openChannelInfoPopover: null
	};

	componentDidMount() {
		// validate channel starred
		this.validateChannelStarred();
	}

	render() {
		const { isChannelStarred, openChannelInfoPopover } = this.state;
		const { currentChannel, totalMessages, channelTopUsers } = this.props;

		return (
			<section className="sc-messages-header">
				<div className="cd-row">
					{/* Information */}
					<div className="cd-col">
						{/* Title */}
						<h5 className="sc-title">#{currentChannel.name}</h5>

						{/* Icons */}
						<div className="sc-info">
							<span
								className="sc-icon-wrapper sc-l2"
								onClick={this.handleStarState}
								role="presentation">
								{!isChannelStarred && (<Icon className="sc-icon sc-hover">star_border</Icon>)}
								{isChannelStarred && (<Icon className="sc-icon sc-hover sc-active">star</Icon>)}
							</span>
							<span
								className="sc-icon-wrapper sc-l3"
								onClick={this.handleOpenChannelInfoPopover}
								role="presentation">
								<Icon className="sc-icon sc-hover">info_outline</Icon>
							</span>
							<span className="sc-icon-wrapper sc-l2">
								<Icon className="sc-icon sc-hover">search</Icon>
							</span>
							<span className="sc-icon-wrapper sc-l1">
								<Icon className="sc-icon">chat_bubble_outline</Icon>
								<span className="sc-value">{totalMessages}</span>
							</span>
						</div>
					</div>
				</div>

				{/* Channel Info Popover */}
				<Popover
					className="sc-channel-info-popover"
					anchorEl={openChannelInfoPopover}
					open={Boolean(openChannelInfoPopover)}
					onClose={this.handleCloseChannelInfoPopover}>
					<ChannelInfoPopover
						currentChannel={currentChannel}
						channelTopUsers={channelTopUsers}
					/>
				</Popover>
			</section>
		);
	}

	/**
	 * validate channel starred
	 */
	validateChannelStarred = () => {
		const { currentChannel, userStarred } = this.props;
		const isChannelStarred = !!(userStarred && _.find(userStarred, e => e.id === currentChannel.id));
		this.setState({ isChannelStarred });
	};

	/**
	 * set state: isChannelStarred
	 */
	handleStarState = () => {
		this.setState(prevState => ({
			isChannelStarred: !prevState.isChannelStarred
		}), () => this.toggleStarChannel());
	};

	/**
	 * star/un-star channel
	 */
	toggleStarChannel = () => {
		const { isChannelStarred, usersRef } = this.state;
		const { currentUser, currentChannel } = this.props;
		const star = { [currentChannel.id]: currentChannel };

		// star / un-star
		if (isChannelStarred) {
			usersRef
				.child(`${currentUser.uid}/starred`)
				.update(star)
				.then(() => {
					// update user star state in redux
					this.props.updateUserStarred(star[currentChannel.id]);
				});
		} else {
			usersRef
				.child(`${currentUser.uid}/starred`)
				.child(currentChannel.id)
				.remove()
				.then(() => {
					// update user star state in redux
					this.props.updateUserStarred(star[currentChannel.id]);
				})
		}
	};

	/**
	 * handle open channel info popover
	 *
	 * @param event
	 */
	handleOpenChannelInfoPopover = (event) => {
		this.setState({ openChannelInfoPopover: event.currentTarget });
	};

	/**
	 * handle close channel info popover
	 */
	handleCloseChannelInfoPopover = () => {
		this.setState({ openChannelInfoPopover: null });
	};
}

export default connect(null, { updateUserStarred })(MessagesHeader);
