// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import MessagesHeader from './MessagesHeader';
import MessageContent from './MessageContent';
import MessagesForm from './MessagesForm';
import i18n from '../../../../../assets/i18n/i18n';
import moment from 'moment';

class MessagesPanel extends Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		currentChannel: this.props.currentChannel,
		currentUser: this.props.currentUser,
		messages: [],
		isMessagesLoading: true
	};

	componentDidMount() {
		const { currentUser, currentChannel } = this.state;
		if (currentUser && currentChannel) {
			// init listeners
			this.addListeners(currentChannel.id);
		}
	}

	componentWillUnmount() {
		this.removeMessagesListener();
	}

	render() {
		const { messagesRef, currentChannel, currentUser, messages, isMessagesLoading } = this.state;

		return currentChannel && currentUser && (
			<section className="sc-message-panel">
				{/* Search */}
				<MessagesHeader/>

				{/* Content */}
				<section className="sc-messages">
					{/* Channel Information */}
					<div className="sc-channel-info">
						<h3># {currentChannel.name}</h3>
						<p>
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T1', {
								date: this.channelCreatedDate(currentChannel.timestamp)
							})}
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T2', { name: currentChannel.name })}
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T3')}
						</p>
					</div>

					{/* Messages */}
					{
						// Loading Message
						// Display Messages
						isMessagesLoading ? <p>Loading...</p> : this.displayMessages(messages)
					}
				</section>

				{/* Form */}
				<MessagesForm
					messagesRef={messagesRef}
					currentChannel={currentChannel}
					currentUser={currentUser}
				/>
			</section>
		);
	}

	/**
	 * channel created date
	 *
	 * @param timestamp
	 */
	channelCreatedDate = timestamp => moment(timestamp).format('MMMM Do, YYYY');

	/**
	 * add listeners
	 *
	 * @param channelId
	 */
	addListeners = (channelId) => {
		this.addMessageListener(channelId);
	};

	/**
	 * add message listener
	 *
	 * @param channelId
	 */
	addMessageListener = (channelId) => {
		let previousSnapshot = null;
		const loadedMessages = [];
		this.state.messagesRef
			.child(channelId)
			.on('child_added', (snap) => {
				const snapshot = snap.val();

				// message
				const message = {
					snapshot,
					isContinuousMessage: previousSnapshot && this.validateMessagePattern(previousSnapshot, snapshot)
				};

				// set previous snapshot
				previousSnapshot = snapshot;

				// push messages
				loadedMessages.push(message);

				// set to messages
				this.setState({ messages: loadedMessages, isMessagesLoading: false });
			});
	};

	/**
	 * validate:
	 * 1) if message is from the same user
	 * 2) if message is sent on the same day
	 *
	 * @param previousSnapshot
	 * @param snapshot
	 * @returns {boolean}
	 */
	validateMessagePattern = (previousSnapshot, snapshot) => {
		return (
			previousSnapshot.user.id === snapshot.user.id &&
			moment(snapshot.timestamp).isSame(previousSnapshot.timestamp, 'day') // granularity: day
		)
	};

	/**
	 * display all messages
	 *
	 * @param messages
	 */
	displayMessages = messages => (
		messages.length > 0 && messages.map(message => (
			<MessageContent
				key={message.snapshot.timestamp}
				message={message.snapshot}
				isContinuousMessage={message.isContinuousMessage}
				currentUser={this.state.currentUser}
			/>
		))
	);

	/**
	 * remove channel listener
	 */
	removeMessagesListener = () => {
		this.state.messagesRef.off();
	};
}

export default MessagesPanel;
