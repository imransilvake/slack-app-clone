// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// scroll
import { scroller } from 'react-scroll'

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
				<section className="sc-messages" id="sc-messages">
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
					isMessageOnSameDay: this.messageOnSameDay(previousSnapshot, snapshot),
					isMessageOnSameDayBySameUser: this.messageOnSameDayBySameUser(previousSnapshot, snapshot)
				};

				// set previous snapshot
				previousSnapshot = snapshot;

				// push messages
				loadedMessages.push(message);

				// set messages
				this.setState({ messages: loadedMessages, isMessagesLoading: false }, () => {
					// scroll to last message
					this.scrollToLastMessage();
				});
			});
	};

	/**
	 * if message is sent on the same day
	 *
	 * @param previousSnapshot
	 * @param snapshot
	 * @returns {boolean}
	 */
	messageOnSameDay = (previousSnapshot, snapshot) => {
		return (
			!!(previousSnapshot) &&
			moment(snapshot.timestamp).isSame(previousSnapshot.timestamp, 'day') // granularity: day
		)
	};

	/**
	 * check:
	 * 1) if message is sent on the same day
	 * 2) if message is from the same user
	 *
	 * @param previousSnapshot
	 * @param snapshot
	 * @returns {boolean}
	 */
	messageOnSameDayBySameUser = (previousSnapshot, snapshot) => {
		return (
			!!(previousSnapshot) &&
			this.messageOnSameDay(previousSnapshot, snapshot) &&
			previousSnapshot.user.id === snapshot.user.id
		)
	};

	/**
	 * display all messages
	 *
	 * @param messages
	 */
	displayMessages = messages => (
		messages.length > 0 && messages.map((message, index) => (
			<MessageContent
				key={message.snapshot.timestamp}
				message={message.snapshot}
				isMessageOnSameDayBySameUser={message.isMessageOnSameDayBySameUser}
				isMessageOnSameDay={message.isMessageOnSameDay}
				isLastMessage={messages.length - 1 === index}
				currentUser={this.state.currentUser}
			/>
		))
	);

	/**
	 * scroll to the last message
	 *
	 * @param params
	 */
	scrollToLastMessage = (params) => {
		const options = {
			duration: 1000,
			delay: 100,
			...params,
			smooth: true,
			containerId: 'sc-messages',
			offset: 50 // scrolls to element + 50 pixels down the page
		};
		scroller.scrollTo('last-message', options);
	};

	/**
	 * remove channel listener
	 */
	removeMessagesListener = () => {
		this.state.messagesRef.off();
	};
}

export default MessagesPanel;
