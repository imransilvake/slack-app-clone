// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import moment from 'moment';

class MessageContent extends Component {
	render() {
		const { message, currentUser } = this.props;
		const messageContentClass = classNames({
			'sc-content': true,
			'sc-self': this.isMessageByAuthenticatedUser(message, currentUser)
		});

		return (
			<article className="sc-message-content">
				<img className="sc-avatar" src={currentUser.photoURL} alt={currentUser.displayName}/>
				<div className={messageContentClass}>
					<h6 className="sc-name">
						{currentUser.displayName}
						<span>{ this.messageTimeFromNow(message.timestamp) }</span>
					</h6>
					<p className="sc-type">{ message.content }</p>
				</div>
			</article>
		);
	}

	/**
	 * detect if the message is from the authenticated user
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
	 */
	messageTimeFromNow = (timestamp) => moment(timestamp).fromNow();
}

export default MessageContent;
