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

					{/* Display Messages */}
					{
						isMessagesLoading && (
							<p>Loading...</p>
						)
					}
					{this.displayMessages(messages)}
				</section>

				{/* Form */}
				<MessagesForm
					messagesRef={messagesRef}
					currentChannel={currentChannel}
					currentUser={currentUser}/>
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
		let userId = null;
		const loadedMessages = [];
		this.state.messagesRef
			.child(channelId)
			.on('child_added', (snap) => {
				const message = {
					data: snap.val(),
					continuousReply: userId ? userId === snap.val().user.id : !!(userId)
				};

				// set previous user id
				userId = snap.val().user.id;

				// push messages
				loadedMessages.push(message);

				// set to messages
				this.setState({ messages: loadedMessages, isMessagesLoading: false });
			});
	};

	/**
	 * display all messages
	 *
	 * @param messages
	 */
	displayMessages = messages => (
		messages.length > 0 && messages.map(message => (
			<MessageContent
				key={message.data.timestamp}
				message={message.data}
				continuousReply={message.continuousReply}
				currentUser={this.state.currentUser}/>
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
