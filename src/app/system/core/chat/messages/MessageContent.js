// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import formatMessageTime from '../../../utilities/helpers/Date';
import Icon from '@material-ui/core/es/Icon/Icon';

class MessageContent extends Component {
	state = {
		isImageZoom: false,
		isImageLoaded: false
	};

	render() {
		const { isImageZoom, isImageLoaded } = this.state;
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

		const imageLoaderClass = classNames({
			'sc-loader-wrapper': true,
			'sc-image-loading': !isImageLoaded
		});

		const imageLoadedClass = classNames({
			'sc-image': true,
			'sc-image-loading': !isImageLoaded
		});

		return (
			<article className={messageContentClass}>
				{/* message time */}
				{
					!isMessageOnSameDayBySameUser && (
						<div className={timeLineClass}>
							{!isMessageOnSameDay && (
								<span>
									{formatMessageTime(message.timestamp, 'dddd, MMMM Do')}
								</span>
							)}
						</div>
					)
				}

				{/* avatar */}
				{!isMessageOnSameDayBySameUser &&
				<img className="sc-avatar" src={message.user.avatar} alt={message.user.name}/>}

				{/* content */}
				<div className="sc-content">
					{/* non-continuous message */}
					{!isMessageOnSameDayBySameUser && this.nonContinuousMessage(message, selfMessageClass)}

					{/* continuous message */}
					{isMessageOnSameDayBySameUser && this.continuousMessage(message.timestamp)}

					{/* description */}
					{
						message.content && (
							<p
								className="sc-description"
								dangerouslySetInnerHTML={{ __html: message.content }}
							/>
						)
					}

					{/* image loader */}
					{
						message.image && !isImageLoaded && (
							<div className={imageLoaderClass}>
								<div className="sc-loader"/>
							</div>
						)
					}

					{/* image */}
					{
						message.image && (
							<button className={imageLoadedClass} type="button" onClick={this.handleShowImageZoom}>
								<img
									src={message.image}
									onLoad={this.handleImageLoaded}
									alt={`file-${message.timestamp}`}/>
							</button>

						)
					}

					{/* image - full size */}
					{isImageZoom && this.displayImageFullSize(message.image, `file-${message.timestamp}`)}
				</div>
			</article>
		);
	}

	/**
	 * handle image loaded
	 */
	handleImageLoaded = () => {
		this.setState({ isImageLoaded: true });
	};

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

	/**
	 * handle show image in large size
	 */
	handleShowImageZoom = () => {
		this.setState({ isImageZoom: true });
	};

	/**
	 * handle close image in large size
	 */
	handleCloseImageZoom = () => {
		this.setState({ isImageZoom: false });
	};

	/**
	 * display image full size
	 *
	 * @param src
	 * @param alt
	 * @returns {*}
	 */
	displayImageFullSize = (src, alt) => (
		<section className="sc-preview-image">
			<img src={src} alt={alt} className="cd-vh-center"/>
			<Icon onClick={this.handleCloseImageZoom}>close</Icon>
		</section>
	);
}

export default MessageContent;
