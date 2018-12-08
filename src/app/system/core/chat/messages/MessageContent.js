// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import formatMessageTime from '../../../utilities/helpers/Date';

class MessageContent extends Component {
	render() {
		const { message, currentUser, isContinuousMessage, isLastMessage } = this.props;
		const messageContentClass = classNames({
			'sc-message-content': true,
			'sc-different': !isContinuousMessage,
			'sc-continuous': isContinuousMessage,
			'last-message': isLastMessage
		});

		const selfMessageClass = classNames({
			'sc-name': true,
			'sc-self': this.isMessageByAuthenticatedUser(message, currentUser) && !isContinuousMessage
		});

		return (
			<article className={messageContentClass}>
				{/* time */}
				{
					!isContinuousMessage && (
						<span className="sc-time-one">
							{formatMessageTime(message.timestamp, 'dddd, MMMM Do')}
						</span>
					)
				}

				{/* avatar */}
				{!isContinuousMessage && <img className="sc-avatar" src={message.user.avatar} alt={message.user.name}/>}

				{/* content */}
				<div className="sc-content">
					{/* non-continuous message */}
					{!isContinuousMessage && this.nonContinuousMessage(message, selfMessageClass)}

					{/* continuous message */}
					{isContinuousMessage && this.continuousMessage(message.timestamp)}

					{/* description */}
					<p className="sc-description">{message.content}</p>
				</div>
			</article>
		);
	}

	/**
	 * detect if the message is from authenticated user
	 *
	 * @param message
	 * @param currentUser
	 * @returns {string}
	 */
	isMessageByAuthenticatedUser = (message, currentUser) => {
		return message.user.id === currentUser.uid;
	};

	/**
	 * not a continuous message
	 *
	 * @param message
	 * @param selfMessageClass
	 * @returns {*}
	 */
	nonContinuousMessage = (message, selfMessageClass) => (
		<h6 className={selfMessageClass}>
			{message.user.name}
			<span className="sc-time cd-tooltip">
				{formatMessageTime(message.timestamp, 'LT')}
				<span className="cd-arrow cd-top cd-fixed-left">
					{formatMessageTime(message.timestamp, 'llll')}
				</span>
			</span>
		</h6>
	);

	/**
	 * continuous message
	 *
	 * @param timestamp
	 * @returns {*}
	 */
	continuousMessage = timestamp => (
		<p className="sc-time-two cd-tooltip">
			{formatMessageTime(timestamp, 'LT')}
			<span className="cd-arrow cd-top cd-fixed-left">
				{formatMessageTime(timestamp, 'llll')}
			</span>
		</p>
	);
}

export default MessageContent;
