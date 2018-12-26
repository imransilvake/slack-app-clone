// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import FileUploadModal from './FileUploadModal';
import i18n from '../../../../../assets/i18n/i18n';
import Textarea from '@material-ui/core/InputBase/Textarea';
import Icon from '@material-ui/core/es/Icon/Icon';
import { regexEmptyString, regexConvertUrlsToLinks } from '../../../utilities/helpers/Regex';

class MessagesForm extends Component {
	state = {
		currentChannel: this.props.currentChannel,
		currentUser: this.props.currentUser,
		message: '',
		errors: [],
		openFileModal: false
	};

	render() {
		const { message, errors, openFileModal } = this.state;

		return (
			<section className="sc-message-form">
				{/* Error */}
				<div className="sc-error">
					{
						errors && errors.length > 0 && (
							<p>{this.displayErrors(errors)}</p>
						)
					}
				</div>

				{/* Form */}
				<div className="sc-form">
					{/* Textarea */}
					<Textarea
						name="message"
						rows="2"
						value={message}
						onChange={this.handleChange}
						onKeyDown={this.prepareMessage}
						placeholder={i18n.t('CHAT.MESSAGES_PANEL.FORM.TEXTAREA_PLACEHOLDER')}
					/>

					{/* Buttons */}
					<div className="sc-buttons">
						<div className="cd-tooltip">
							<div>
								<Icon onClick={this.handleOpenFileModal}>insert_photo</Icon>
							</div>
							<span className="cd-arrow cd-top cd-fixed-right">
								{i18n.t('CHAT.MESSAGES_PANEL.FORM.TOOLTIP.IMAGE')}
							</span>
						</div>
						<div className="cd-tooltip">
							<div>
								<Icon>insert_emoticon</Icon>
							</div>
							<span className="cd-arrow cd-top cd-fixed-right">
								{i18n.t('CHAT.MESSAGES_PANEL.FORM.TOOLTIP.EMOJI')}
							</span>
						</div>
					</div>
				</div>

				{
					// File Upload Modal
					openFileModal && (
						<FileUploadModal
							uploadPath="chat/public/"
							openFileModal={openFileModal}
							handleCloseFileModal={this.handleCloseFileModal}
							prepareMediaToUpload={this.prepareMediaToUpload}
						/>
					)
				}
			</section>
		);
	}

	/**
	 * handle input change event
	 *
	 * @param event
	 */
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value }, () => {
			// remove errors
			if (this.state.errors && this.state.errors.length > 0) {
				this.setState({ errors: null });
			}
		});
	};

	/**
	 * prepare message
	 *
	 * @param event
	 */
	prepareMessage = (event) => {
		// pressed key: Enter
		if (event.keyCode === 13 && this.isMessageValid()) {
			// pressed key: Shift
			if (!event.shiftKey) {
				// stop default event
				event.preventDefault();

				// empty message
				this.setState({ message: '' });

				// destructuring
				const { messagesRef } = this.props;
				const { currentChannel } = this.state;

				// send message
				this.handleSendMessage(messagesRef, currentChannel);
			}
		}
	};

	/**
	 * prepare message with media
	 *
	 * @param fileUrl
	 */
	prepareMediaToUpload = (fileUrl) => {
		const { messagesRef } = this.props;
		const { currentChannel } = this.state;

		// send message
		this.handleSendMessage(messagesRef, currentChannel, fileUrl);
	};

	/**
	 * send message
	 *
	 * @param messagesRef
	 * @param currentChannel
	 * @param fileUrl
	 */
	handleSendMessage = (messagesRef, currentChannel, fileUrl = null) => {
		// send message
		messagesRef
			.child(currentChannel.id)
			.push()
			.set(this.createMessage(fileUrl))
			.then(() => {
				// empty errors
				this.setState({ errors: [] });
			})
			.catch((error) => {
				this.setState({ errors: [error] });
			});
	};

	/**
	 * check message validation
	 *
	 * @returns {boolean}
	 */
	isMessageValid = () => {
		const { message } = this.state;
		return !!(message) && message.length > 0 && regexEmptyString(message);
	};

	/**
	 * return message data
	 *
	 * @param fileUrl
	 * @returns {{timestamp: Object, content: string, user: {id: string, name: *, avatar: string}}}
	 */
	createMessage = (fileUrl = null) => {
		const { currentUser, message } = this.state;
		const data = {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			content: regexConvertUrlsToLinks(message),
			user: {
				id: currentUser.uid,
				name: currentUser.displayName,
				email: currentUser.email,
				avatar: currentUser.photoURL
			}
		};

		// when image is uploaded
		if (fileUrl !== null) {
			data.image = fileUrl;
		}

		return data;
	};

	/**
	 * display errors
	 *
	 * @param errors
	 * @returns {*}
	 */
	displayErrors = errors => errors.map((error, i) => <span key={i}>{error.message}</span>);

	/**
	 * handle open file modal
	 */
	handleOpenFileModal = () => {
		this.setState({ openFileModal: true });
	};

	/**
	 * handle close file modal
	 */
	handleCloseFileModal = () => {
		this.setState({ openFileModal: false });
	};
}

export default MessagesForm;
