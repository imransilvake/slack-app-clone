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
import { setMessages } from '../../../../store/actions';
import connect from 'react-redux/es/connect/connect';

class MessagesPanel extends Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		messages: [],
		uniqueUsers: [],
		isMessagesLoading: true,
		keyReference: null,
		isInfiniteScrolling: true,
		isAccessLocked: false,
		elementScrollTop: 0
	};

	componentDidMount() {
		const { currentChannel } = this.props;

		// add message listener
		this.addMessageListener(currentChannel.id);

		// add scroll listener
		this.messagesWrapper = document.getElementById('sc-messages');
		if (this.messagesWrapper) this.messagesWrapper.addEventListener('scroll', this.addScrollListener);
	}

	componentWillUnmount() {
		const { messagesRef, messages, uniqueUsers, isInfiniteScrolling, keyReference } = this.state;
		const { currentChannel } = this.props;

		// save loaded messages to redux
		this.props.setMessages({
			channelId: currentChannel.id,
			messages,
			uniqueUsers,
			isInfiniteScrolling,
			keyReference
		});

		// unlink message ref child
		messagesRef
			.child(currentChannel.id)
			.off('child_added');

		// remove scroll listener
		this.messagesWrapper.removeEventListener('scroll', this.addScrollListener);
	}

	render() {
		const { currentChannel, currentUser } = this.props;
		const { messagesRef, messages, uniqueUsers, isMessagesLoading } = this.state;

		return messagesRef && messages && (
			<section className="sc-message-panel">
				{/* Header */}
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

					{/* Message: Empty or List */}
					{ !messages && !isMessagesLoading ? this.emptyChannelMessage() : this.displayMessages(messages) }
				</section>

				{/* Form */}
				<MessagesForm
					messagesRef={messagesRef}
					currentChannel={currentChannel}
					currentUser={currentUser}
					totalMessages={messages.length}
				/>
			</section>
		);
	}

	/**
	 * add message listener
	 *
	 * @param channelId
	 */
	addMessageListener = (channelId) => {
		const { savedMessages } = this.props;
		if (savedMessages && savedMessages.length > 0 && savedMessages.some(x => x.channelId === channelId)) {
			savedMessages.forEach((x) => {
				if (x.channelId === channelId) {
					// load saved messages (redux)
					this.setState({
						messages: x.messages,
						uniqueUsers: x.uniqueUsers,
						keyReference: x.keyReference,
						isInfiniteScrolling: x.isInfiniteScrolling,
						isMessagesLoading: false
					});
				}
			});
		} else {
			// load new messages
			this.loadNewMessages(channelId);
		}
	};

	/**
	 * add scroll listener
	 *
	 * @param event
	 */
	addScrollListener = (event) => {
		const { isInfiniteScrolling, elementScrollTop, isAccessLocked } = this.state;

		// infinite scrolling until active
		if (isInfiniteScrolling) {
			// validate event target
			if (event && event.target && event.target.scrollTop) {
				const { scrollTop } = event.target;
				if (elementScrollTop > scrollTop && elementScrollTop <= 200 && !isAccessLocked) {
					// lock access temporarily
					this.setState({ isAccessLocked: true });

					// load old messages
					this.loadOldMessages();
				}

				// update scrollTop
				this.setState({ elementScrollTop: scrollTop });
			}
		}
	};

	/**
	 * load new messages
	 *
	 * @param channelId
	 */
	loadNewMessages = (channelId) => {
		const messagesLimit = 30;
		const loadedUniqueUsers = [];
		let loadedMessages = [];
		let previousSnapshot = null;

		this.state.messagesRef
			.child(channelId)
			.orderByChild('timestamp')
			.limitToLast(messagesLimit)
			.on('child_added', (snap) => {
				const { keyReference, messages } = this.state;
				const snapshot = snap.val();

				// save key for infinite scrolling
				if (!keyReference) {
					this.setState({ keyReference: snapshot.timestamp });
				}

				// message
				const message = {
					snapshot,
					isMessageOnSameDay: this.messageOnSameDay(previousSnapshot, snapshot),
					isMessageOnSameDayBySameUser: this.messageOnSameDayBySameUser(previousSnapshot, snapshot)
				};

				// set previous snapshot
				previousSnapshot = snapshot;

				// push existing messages and a new message
				loadedMessages = messages;
				loadedMessages.push(message);

				// unique users
				if (loadedUniqueUsers && !loadedUniqueUsers.some(u => u.id === snapshot.user.id)) {
					loadedUniqueUsers.push(snapshot.user);
				}

				// set messages, set unique users, remove loading
				this.setState({ messages: loadedMessages, uniqueUsers: loadedUniqueUsers, isMessagesLoading: false }, () => {
					// scroll to last message
					this.scrollToLastMessage();
				});
			});
	};

	/**
	 * load old messages
	 */
	loadOldMessages = () => {
		const { currentChannel } = this.props;
		const { keyReference, messages, uniqueUsers } = this.state;
		const messagesLimit = 51;
		const loadedMessages = [];
		let previousSnapshot = null;

		this.state.messagesRef
			.child(currentChannel.id)
			.orderByChild('timestamp')
			.endAt(keyReference)
			.limitToLast(messagesLimit)
			.once('value', (snap) => {
				if (snap.exists()) {
					// all snapshots
					const snapshots = this.combineAllMessages(messages, snap);

					// loop
					snapshots.forEach((snapshot, index) => {
						// remember key
						if (index === 0) {
							this.setState({ keyReference: snapshot.timestamp });
						}

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
						if (uniqueUsers && !uniqueUsers.some(u => u.id === snapshot.user.id)) {
							uniqueUsers.push(snapshot.user);
						}
					});

					// set messages
					// set unique users
					// set infinite scrolling
					this.setState({ messages: loadedMessages, uniqueUsers, isInfiniteScrolling: Object.keys(snap.val()).length === messagesLimit }, () => {
						// unlock access to load more messages
						this.setState({ isAccessLocked: false });
					});
				} else {
					// remove loading
					this.setState({ isMessagesLoading: false });
				}
			})
			.then()
			.catch();
	};

	/**
	 * combine messages
	 *
	 * @param messages
	 * @param snap
	 * @returns {Array}
	 */
	combineAllMessages = (messages, snap) => {
		const snaps = snap.val();
		const snapshots = [];

		// new messages
		for (const key in snaps) {
			if (Object.prototype.hasOwnProperty.call(snaps, key)) {
				snapshots.push(snaps[key])
			}
		}

		// old messages
		messages
			.slice(1) // remove first element
			.forEach((message) => {
				snapshots.push(message.snapshot);
			});

		return snapshots;
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
		messages && messages.length > 0 && messages.map((message, index) => (
			<MessageContent
				key={message.snapshot.timestamp}
				message={message.snapshot}
				isMessageOnSameDayBySameUser={message.isMessageOnSameDayBySameUser}
				isMessageOnSameDay={message.isMessageOnSameDay}
				isLastMessage={messages.length - 1 === index}
				currentUser={this.props.currentUser}
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
}

// props
const mapStateFromProps = state => ({
	savedMessages: state.message
});

export default connect(
	mapStateFromProps,
	{ setMessages }
)(MessagesPanel);
