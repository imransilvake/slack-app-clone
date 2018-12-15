// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import i18n from '../../../../../assets/i18n/i18n';
import Textarea from '@material-ui/core/InputBase/Textarea';
import { regexEmptyString } from '../../../utilities/helpers/Regex';
import Icon from '@material-ui/core/es/Icon/Icon';

class MessagesForm extends Component {
	state = {
		currentChannel: this.props.currentChannel,
		currentUser: this.props.currentUser,
		message: '',
		errors: []
	};

	render() {
		const { message, errors } = this.state;

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
						onKeyDown={this.handleSendMessage}
						placeholder={i18n.t('CHAT.MESSAGES_PANEL.FORM.TEXTAREA_PLACEHOLDER')}
					/>

					{/* Buttons */}
					<div className="sc-buttons">
						<Icon>insert_photo</Icon>
						<Icon>insert_emoticon</Icon>
					</div>
				</div>
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
	 * handle message send event
	 *
	 * @param event
	 */
	handleSendMessage = (event) => {
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
				messagesRef
					.child(currentChannel.id)
					.push()
					.set(this.createMessage())
					.then(() => {
						// empty errors
						this.setState({ errors: [] });
					})
					.catch((error) => {
						this.setState({ errors: [error] });
					});
			}
		}
	};

	/**
	 * check message validation
	 *
	 * @returns {boolean}
	 */
	isMessageValid = () => {
		const { message } = this.state;
		return !!(message) && this.state.message.length > 0 && regexEmptyString(message);
	};

	/**
	 * return message data
	 *
	 * @returns {{timestamp: Object, content: string, user: {id: string, name: *, avatar: string}}}
	 */
	createMessage = () => {
		return {
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			content: this.state.message,
			user: {
				id: this.state.currentUser.uid,
				name: this.state.currentUser.displayName,
				email: this.state.currentUser.email,
				avatar: this.state.currentUser.photoURL
			}
		};
	};

	/**
	 * display errors
	 *
	 * @param errors
	 * @returns {*}
	 */
	displayErrors = errors => errors.map((error, i) => <span key={i}>{error.message}</span>);
}

export default MessagesForm;
