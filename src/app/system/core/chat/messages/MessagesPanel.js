// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// firebase
import firebase from '../../../../../firebase';

// app
import MessagesHeader from './MessagesHeader';
import MessageContent from './MessageContent';
import MessagesForm from './MessagesForm';
import i18n from '../../../../../assets/i18n/i18n';
import formatMessageTime from '../../../utilities/helpers/Date';
import setMessages from '../../../../store/actions/MessageAction';
import _ from 'lodash';
import moment from 'moment';
import { scroller } from 'react-scroll'

class MessagesPanel extends Component {
	state = {
		messagesRef: firebase.database().ref('messages'),
		messages: [],
		isMessagesLoading: false,
		keyReference: null,
		isInfiniteScrolling: true,
		isReduxMessagesAccessLocked: false,
		elementScrollTop: 0,
		skipFirstAddedChild: true,
		isUpdateChannelInfo: false
	};

	componentDidMount() {
		const { currentChannel, savedMessages } = this.props;

		// add message listener
		this.addMessageListener(currentChannel.id);

		// add scroll listener
		this.messagesWrapper = document.getElementById('sc-messages');
		if (this.messagesWrapper) this.messagesWrapper.addEventListener('scroll', this.addScrollListener);

		// validate current channel data on redux
		if (savedMessages && savedMessages.length && !!(_.find(savedMessages, e => e.channelId === currentChannel.id))) {
			this.setState({ isReduxMessagesAccessLocked: true });
		}
	}

	componentWillUnmount() {
		const { messagesRef, messages, isInfiniteScrolling, keyReference, isReduxMessagesAccessLocked } = this.state;
		const { currentChannel } = this.props;

		// save loaded messages to redux
		if (!isReduxMessagesAccessLocked && messages.length) {
			this.props.setMessages({
				channelId: currentChannel.id,
				messages,
				isInfiniteScrolling,
				keyReference
			});
		}

		// unlink message ref child
		messagesRef.child(currentChannel.id).off('child_added');

		// remove scroll listener
		this.messagesWrapper.removeEventListener('scroll', this.addScrollListener);
	}

	render() {
		const { messagesRef, messages, isMessagesLoading, isUpdateChannelInfo } = this.state;
		const { currentChannel, currentUser, userStarred, channelTopUsers } = this.props;

		return messagesRef && messages && (
			<section className="sc-message-panel">
				{/* Header */}
				<MessagesHeader
					currentUser={currentUser}
					currentChannel={currentChannel}
					userStarred={userStarred}
					channelTopUsers={channelTopUsers}
					totalMessages={messages.length}
					isUpdateChannelInfo={isUpdateChannelInfo}
				/>

				{/* Content */}
				<section className="sc-messages" id="sc-messages">
					{/* Channel Information */}
					<div className="sc-channel-info">
						<h3>#{currentChannel.name}</h3>
						<p>
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T1', {
								date: formatMessageTime(currentChannel.timestamp, 'MMMM Do, YYYY')
							})}
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T2', { name: currentChannel.name })}
							{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.CHANNEL_INTRO.T3')}
						</p>
					</div>

					{
						/* Loading */
						isMessagesLoading && (
							<div className="sc-loading-message">
								<div className="sc-fake">
									<div className="sc-fake-la sc-fake-el-la-one"/>
									<div className="sc-fake-la sc-fake-el-la-two"/>
									<div className="sc-fake-la sc-fake-el-la-three"/>
									<div className="sc-fake-la sc-fake-el-la-four"/>
								</div>
							</div>
						)
					}

					{/* Message: Empty or List */}
					{!messages && !isMessagesLoading ? this.displayEmptyMessage() : this.displayMessages(messages)}
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
	 * add message listener
	 *
	 * @param channelId
	 */
	addMessageListener = (channelId) => {
		const { messagesRef } = this.state;
		const { savedMessages } = this.props;

		// load cached redux state
		if (savedMessages && savedMessages.length && !!(_.find(savedMessages, e => e.channelId === channelId))) {
			savedMessages.forEach((x) => {
				// validate channel
				if (x && x.channelId === channelId) {
					// set messages
					this.setState({
						messages: x.messages,
						keyReference: x.keyReference,
						isInfiniteScrolling: x.isInfiniteScrolling,
						isMessagesLoading: false
					}, () => {
						// scroll to last message
						if (x.messages && x.messages.length) this.scrollToLastMessage();

						// update new message
						this.updateNewMessage(channelId);
					});
				}
			});
		} else {
			messagesRef
				.child(channelId)
				.orderByChild('timestamp')
				.limitToLast(1)
				.once('child_added')
				.then((snap) => {
					if (snap.exists()) {
						const snapshot = snap.val();

						// set key reference
						this.setState({
							keyReference: snapshot.timestamp,
							isMessagesLoading: false
						}, () => {
							// load messages
							this.loadMessages(channelId);

							// update new message
							this.updateNewMessage(channelId);
						});
					}
				});
		}
	};

	/**
	 * add scroll listener
	 *
	 * @param event
	 */
	addScrollListener = (event) => {
		const { isInfiniteScrolling, elementScrollTop } = this.state;

		// infinite scrolling until active
		if (isInfiniteScrolling) {
			// validate event target
			if (event && event.target && event.target.scrollTop) {
				const { scrollTop } = event.target;
				if (elementScrollTop > scrollTop && elementScrollTop <= 200) {
					// unlock redux access for storing new messages
					this.setState({ isReduxMessagesAccessLocked: false });

					// load messages
					this.loadMessages();
				}

				// update scrollTop
				this.setState({ elementScrollTop: scrollTop });
			}
		}
	};

	/**
	 * listen to firebase in real-time to update new message
	 *
	 * @param channelId
	 */
	updateNewMessage = (channelId) => {
		this.state.messagesRef
			.child(channelId)
			.orderByChild('timestamp')
			.limitToLast(1)
			.on('child_added', (snap) => {
				const { messages, skipFirstAddedChild } = this.state;
				const previousSnapshot = messages.length && messages[messages.length - 1].snapshot;
				const snapshot = snap.val();

				// skip first added child
				if (skipFirstAddedChild) {
					this.setState({ skipFirstAddedChild: false });
					return;
				}

				// message
				const message = {
					snapshot,
					isMessageOnSameDay: this.messageOnSameDay(previousSnapshot, snapshot),
					isMessageOnSameDayBySameUser: this.messageOnSameDayBySameUser(previousSnapshot, snapshot)
				};

				// push message
				messages.push(message);

				// set messages
				// remove loading
				this.setState({
					messages,
					isMessagesLoading: false,
					isUpdateChannelInfo: true
				}, () => {
					// unlock redux access for storing new messages
					this.setState({ isReduxMessagesAccessLocked: false });

					// scroll to last message
					this.scrollToLastMessage();
				});
			});
	};

	/**
	 * load messages on scroll
	 */
	loadMessages = () => {
		const { currentChannel } = this.props;
		const { keyReference, messages, messagesRef } = this.state;
		const messagesLimit = 51;
		const loadedMessages = [];
		let previousSnapshot = null;

		messagesRef
			.child(currentChannel.id)
			.orderByChild('timestamp')
			.endAt(keyReference)
			.limitToLast(messagesLimit)
			.once('value', (snap) => {
				if (snap.exists()) {
					const snaps = snap.val();
					const snapshots = Object.values(snaps);

					// old messages + existing messages
					messages
						.slice(1) // remove first element
						.forEach(message => snapshots.push(message.snapshot));

					// iterate snapshots
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

						// push message
						loadedMessages.push(message);
					});
				}
			})
			.then(() => {
				const loadedMessagesLength = loadedMessages.length;
				const messagesLength = messages.length;

				// set messages
				// set infinite scrolling
				this.setState({
					messages: loadedMessages,
					isInfiniteScrolling: loadedMessagesLength !== messagesLength
				});

				// scroll to last message
				if (loadedMessagesLength !== 0 && !messagesLength) {
					this.scrollToLastMessage();
				}
			})
			.catch();
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
	 * display empty message
	 *
	 * @returns {*}
	 */
	displayEmptyMessage = () => (
		<div className="sc-start-conversation">
			<p>{i18n.t('CHAT.MESSAGES_PANEL.MESSAGES.EMPTY_CHANNEL')}</p>
		</div>
	);

	/**
	 * scroll to the last message
	 */
	scrollToLastMessage = () => {
		const options = {
			duration: 0,
			delay: 0,
			smooth: false,
			containerId: 'sc-messages',
			offset: 50 // scrolls to element + 50 pixels down the page
		};
		scroller.scrollTo('last-message', options);
	};
}

// props
const mapStateFromProps = state => ({
	savedMessages: state.message
});

export default connect(
	mapStateFromProps,
	{ setMessages }
)(MessagesPanel);
