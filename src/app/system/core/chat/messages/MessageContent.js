// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import formatMessageTime from '../../../utilities/helpers/Date';

class MessageContent extends Component {
	render() {
		const { message, currentUser, isContinuousMessage } = this.props;
		const messageContentClass = classNames({
			'sc-message-content sc-different': !isContinuousMessage,
			'sc-message-content sc-continuous': isContinuousMessage
		});
		const selfClass = classNames({
			'sc-name': true,
			'sc-self': this.isMessageByAuthenticatedUser(message, currentUser) && !isContinuousMessage
		});

		return (
			<article className={messageContentClass}>
				{/* time */}
				{
					!isContinuousMessage && (
						<span className="sc-time-one">{formatMessageTime(message.timestamp, 'dddd, MMMM Do')}</span>
					)
				}

				{/* avatar */}
				{!isContinuousMessage && <img className="sc-avatar" src={message.user.avatar} alt={message.user.name}/>}

				{/* content */}
				<div className="sc-content">
					{/* continuous messages from the same user */}
					{
						isContinuousMessage && (
							<p className="sc-time-two cd-tooltip">
								{formatMessageTime(message.timestamp, 'LT')}
								<span className="cd-arrow cd-top cd-fixed-left">
									{formatMessageTime(message.timestamp, 'llll')}
								</span>
							</p>
						)
					}

					{/* message by different user */}
					{
						!isContinuousMessage && (
							<h6 className={selfClass}>
								{message.user.name}
								<span className="sc-time cd-tooltip">
									{formatMessageTime(message.timestamp, 'LT')}
									<span className="cd-arrow cd-top cd-fixed-left">
										{formatMessageTime(message.timestamp, 'llll')}
									</span>
								</span>
							</h6>
						)
					}

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
}

export default MessageContent;
