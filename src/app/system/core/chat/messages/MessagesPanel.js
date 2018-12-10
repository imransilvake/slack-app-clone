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
import formatMessageTime from '../../../utilities/helpers/Date';

class MessagesPanel extends Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		currentChannel: this.props.currentChannel,
		currentUser: this.props.currentUser,
		messages: [],
		uniqueUsers: [],
		isMessagesLoading: true
	};

	componentDidMount() {
		this.addListeners();
	}

	componentWillUnmount() {
		this.removeMessagesListener();
	}

	render() {
		const { messagesRef, currentChannel, currentUser, messages, uniqueUsers, isMessagesLoading } = this.state;

		return currentChannel && currentUser && (
			<section className="sc-message-panel">
				{/* Search */}
				<MessagesHeader
					currentChannel={currentChannel}
					uniqueUsers={uniqueUsers}
					totalMessages={messages.length}
				/>

				{/* Content */}
				<section className="sc-messages" id="sc-messages">
					{/* Channel Information */}
					<div className="sc-channel-info">
						<h3># {currentChannel.name}</h3>
						<p>
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T1', {
								date: formatMessageTime(currentChannel.timestamp, 'MMMM Do, YYYY')
							})}
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T2', { name: currentChannel.name })}
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T3')}
						</p>
					</div>

					{/* Loading */}
					{ isMessagesLoading && this.loadingMessage() }

					{/* Messages */}
					{ messages.length === 0 && !isMessagesLoading ? this.emptyChannelMessage() : this.displayMessages(messages) }
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
	 * add listeners
	 *
	 */
	addListeners = () => {
		const { currentUser, currentChannel } = this.state;
		if (currentUser && currentChannel) {
			// message listener
			this.addMessageListener(currentChannel.id);
		}
	};

	/**
	 * add message listener
	 *
	 * @param channelId
	 */
	addMessageListener = (channelId) => {
		let previousSnapshot = null;
		const loadedUniqueUsers = [];
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

				// unique users
				if (loadedUniqueUsers && !loadedUniqueUsers.some(u => u.id === snapshot.user.id)) {
					loadedUniqueUsers.push(snapshot.user);
				}

				// set messages, set unique users remove loading
				this.setState({ messages: loadedMessages, uniqueUsers: loadedUniqueUsers, isMessagesLoading: false }, () => {
					// scroll to last message
					this.scrollToLastMessage();
				});
			});

		// check if child has any item(s)
		this.state.messagesRef
			.child(channelId)
			.once('value', (res) => {
				if (!res.exists()) {
					this.setState({ isMessagesLoading: false });
				}
			})
			.then();
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
	 * display loading message
	 *
	 * @returns {*}
	 */
	loadingMessage = () => (
		<div className="sc-loading-message">
			<div className="sc-fake">
				<div className="sc-fake-la sc-fake-el-la-one"/>
				<div className="sc-fake-la sc-fake-el-la-two"/>
				<div className="sc-fake-la sc-fake-el-la-three"/>
				<div className="sc-fake-la sc-fake-el-la-four"/>
			</div>
		</div>
	);

	/**
	 * display message on empty channel
	 *
	 * @returns {*}
	 */
	emptyChannelMessage = () => (
		<div className="sc-start-conversation">
			<p>{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.EMPTY_CHANNEL')}</p>
		</div>
	);

	/**
	 * remove channel listener
	 */
	removeMessagesListener = () => {
		this.state.messagesRef.off();
	};
}

export default MessagesPanel;
