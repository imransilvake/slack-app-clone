// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import moment from 'moment';

class MessageContent extends Component {
	render() {
		const { message, currentUser, continuousReply } = this.props;
		const messageContentClass = classNames({
			'sc-message-content sc-different': !continuousReply,
			'sc-message-content sc-continuous': continuousReply
		});
		const contentClass = classNames({
			'sc-content': true,
			'sc-self': this.isMessageByAuthenticatedUser(message, currentUser) && !continuousReply
		});

		return (
			<article className={messageContentClass}>
				{ /* time */}
				{
					!continuousReply && (
						<span className="sc-time-one">{this.messageTimeFromNow(message.timestamp, 'dddd, MMMM Do')}</span>
					)
				}

				{ /* avatar */}
				{!continuousReply && <img className="sc-avatar" src={message.user.avatar} alt={message.user.name}/>}

				{ /* content */}
				<div className={contentClass}>
					{
						// if continuous messages from the same user
						continuousReply && (
							<p className="sc-time-two cd-tooltip">
								{this.messageTimeFromNow(message.timestamp, 'LT')}
								<span className="cd-arrow cd-top cd-fixed-left">
									{this.messageTimeFromNow(message.timestamp, 'llll')}
								</span>
							</p>
						)
					}

					{
						// if message by different user
						!continuousReply && (
							<h6 className="sc-name">
								{message.user.name}
								<span>{this.messageTimeFromNow(message.timestamp)}</span>
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
	 * message time from now
	 *
	 * @param timestamp
	 * @param format
	 */
	messageTimeFromNow = (timestamp, format) => {
		if (format) {
			return moment(timestamp).format(format);
		}

		return moment(timestamp).fromNow();
	};
}

export default MessageContent;
