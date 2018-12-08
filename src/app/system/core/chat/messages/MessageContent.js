// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import formatMessageTime from '../../../utilities/helpers/Date';

class MessageContent extends Component {
	render() {
		const { message, currentUser, isMessageOnSameDay, isMessageOnSameDayBySameUser, isLastMessage } = this.props;
		const messageContentClass = classNames({
			'sc-message-content': true,
			'sc-different': !isMessageOnSameDayBySameUser,
			'sc-continuous': isMessageOnSameDayBySameUser,
			'last-message': isLastMessage
		});

		const timeLineClass = classNames({
			'sc-time-one': true,
			'sc-border-dark': !isMessageOnSameDay
		});

		const selfMessageClass = classNames({
			'sc-name': true,
			'sc-self': this.isMessageByCurrentUser(message, currentUser) && !isMessageOnSameDayBySameUser
		});

		return (
			<article className={messageContentClass}>
				{/* message time */}
				{
					!isMessageOnSameDayBySameUser && (
						<div className={timeLineClass}>
							{ !isMessageOnSameDay && (
								<span>
									{ formatMessageTime(message.timestamp, 'dddd, MMMM Do')}
								</span>
							)}
						</div>
					)
				}

				{/* avatar */}
				{!isMessageOnSameDayBySameUser && <img className="sc-avatar" src={message.user.avatar} alt={message.user.name}/>}

				{/* content */}
				<div className="sc-content">
					{/* non-continuous message */}
					{!isMessageOnSameDayBySameUser && this.nonContinuousMessage(message, selfMessageClass)}

					{/* continuous message */}
					{isMessageOnSameDayBySameUser && this.continuousMessage(message.timestamp)}

					{/* description */}
					<p className="sc-description">{message.content}</p>
				</div>
			</article>
		);
	}

	/**
	 * detect if the message is from current user
	 *
	 * @param message
	 * @param currentUser
	 * @returns {string}
	 */
	isMessageByCurrentUser = (message, currentUser) => {
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
