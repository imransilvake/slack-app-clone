// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import moment from 'moment';

class MessageContent extends Component {
	render() {
		const { message, currentUser, continuousMessage } = this.props;
		const messageContentClass = classNames({
			'sc-message-content sc-different': !continuousMessage,
			'sc-message-content sc-continuous': continuousMessage
		});
		const contentClass = classNames({
			'sc-content': true,
			'sc-self': this.isMessageByAuthenticatedUser(message, currentUser) && !continuousMessage
		});

		return (
			<article className={messageContentClass}>
				{ /* time */}
				{
					!continuousMessage && (
						<span className="sc-time-one">{this.formatMessageTime(message.timestamp, 'dddd, MMMM Do')}</span>
					)
				}

				{ /* avatar */}
				{!continuousMessage && <img className="sc-avatar" src={message.user.avatar} alt={message.user.name}/>}

				{ /* content */}
				<div className={contentClass}>
					{
						// if continuous messages from the same user
						continuousMessage && (
							<p className="sc-time-two cd-tooltip">
								{this.formatMessageTime(message.timestamp, 'LT')}
								<span className="cd-arrow cd-top cd-fixed-left">
									{this.formatMessageTime(message.timestamp, 'llll')}
								</span>
							</p>
						)
					}

					{
						// if message by different user
						!continuousMessage && (
							<h6 className="sc-name">
								{message.user.name}
								<span>{this.formatMessageTime(message.timestamp)}</span>
							</h6>
						)
					}

					{ /* description */}
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
	 * format message time
	 *
	 * @param timestamp
	 * @param format
	 */
	formatMessageTime = (timestamp, format) => {
		if (format) {
			return moment(timestamp).format(format);
		}

		return moment(timestamp).fromNow();
	};
}

export default MessageContent;
