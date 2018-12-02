// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import Input from '@material-ui/core/Input/Input';
import Button from '@material-ui/core/Button/Button';
import i18n from '../../../../../assets/i18n/i18n';

class MessagesForm extends Component {
	state = {
		currentChannel: this.props.currentChannel,
		currentUser: this.props.currentUser,
		message: '',
		errors: [],
		isFormEnabled: false
	};

	render() {
		const { message, isFormEnabled, errors } = this.state;

		return (
			<section className="sc-message-form">
				<Input
					id="message"
					name="message"
					type="text"
					value={message}
					placeholder="Write a message!"
					onChange={this.handleChange}
					error={this.handleInputError(errors, 'email')}
					fullWidth/>

				<Button
					className="sc-button sc-register"
					variant="contained"
					type="submit"
					onClick={this.handleSendMessage}
					disabled={!isFormEnabled || !message}
					fullWidth>
					{i18n.t('CHAT.MESSAGES_PANEL.FORM.T1')}
				</Button>
				{
					errors && errors.length > 0 && (
						/* Errors */
						<p className="cd-error">{this.displayErrors(errors)}</p>
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
			// validate form
			this.setState({ isFormEnabled: this.isMessageValid() });
		});
	};

	/**
	 * handle message send event
	 *
	 * @param event
	 */
	handleSendMessage = (event) => {
		// stop default event
		event.preventDefault();

		// destructuring
		const { messagesRef } = this.props;
		const { currentChannel } = this.state;

		// send message
		messagesRef
			.child(currentChannel.id)
			.push()
			.set(this.createMessage())
			.then(() => {
				// hide loading
				// empty message
				// empty errors
				this.setState({ message: '', errors: [] });
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
		return this.state.message && this.state.message.length > 10;
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

	/**
	 * handle Input Error
	 *
	 * @param errors
	 * @param fieldName
	 * @returns {*|boolean}
	 */
	handleInputError = (errors, fieldName) => {
		return (
			errors && errors.some(
				error => error.message.toLocaleLowerCase().includes(fieldName)
			)
		);
	};
}

export default MessagesForm;
