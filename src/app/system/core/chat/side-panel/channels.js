// react
import React, { Component } from 'react';

// app
import Icon from '@material-ui/core/Icon/Icon';
import i18n from '../../../../../assets/i18n/i18n';
import Modal from '@material-ui/core/Modal/Modal';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Input from '@material-ui/core/Input/Input';
import Button from '@material-ui/core/Button/Button';
import SlackLogo from '../../../../../assets/svg/general/slack-logo.svg';

class Channels extends Component {
	state = {
		openModal: false,
		channels: [],
		channelName: '',
		channelDetails: '',
		isFormEnabled: false
	};

	render() {
		const { channels, channelName, channelDetails, isFormEnabled } = this.state;

		return (
			<section className="sc-channels">
				{/* Title */}
				<div className="sc-title">
					<h6>Channels ({ channels.length })</h6>
					<div className="cd-tooltip sc-icon-wrapper">
						<div className="sc-icon">
							<Icon onClick={this.handleOpenModal}>add_circle</Icon>
						</div>
						<span className="cd-arrow cd-top">{i18n.t('CHAT.SIDE_PANEL.CHANNELS.CREATE_CHANNEL')}</span>
					</div>
				</div>

				{/* Channel */}
				<ul className="cd-remove-bullets">
					<li><p>Channel 1</p></li>
					<li><p>Channel 2</p></li>
					<li><p>Channel 3</p></li>
					<li><p>Channel 4</p></li>
					<li><p>Channel 5</p></li>
				</ul>

				{/* Modal */}
				<Modal
					open={this.state.openModal}
					onClose={this.handleCloseModal}>
					<div className="cd-h-center sc-channels-modal">
						{/* Header */}
						<header className="sc-header">
							<img src={SlackLogo} alt={i18n.t('CHAT.SIDE_PANEL.CHANNELS.MODAL.HEADER.LOGO.ALT')}/>
						</header>

						{/* Form */}
						<section className="cd-col sc-form">
							<form className="sc-form-fields" onSubmit={this.handleFormSubmit}>
								<FormControl className="sc-form-field" fullWidth>
									<InputLabel htmlFor="channel-name">{i18n.t('CHAT.SIDE_PANEL.CHANNELS.MODAL.FORM.CHANNEL_NAME')}</InputLabel>
									<Input
										id="channel-name"
										name="channelName"
										value={channelName}
										onChange={this.handleInputChange}/>
								</FormControl>
								<FormControl className="sc-form-field" fullWidth>
									<InputLabel htmlFor="password">{i18n.t('CHAT.SIDE_PANEL.CHANNELS.MODAL.FORM.CHANNEL_DETAILS')}</InputLabel>
									<Input
										id="channel-details"
										name="channelDetails"
										value={channelDetails}
										onChange={this.handleInputChange}/>
								</FormControl>
								<Button
									className="sc-button"
									variant="contained"
									type="submit"
									disabled={!isFormEnabled}
									fullWidth>
									{i18n.t('CHAT.SIDE_PANEL.CHANNELS.MODAL.BUTTON_TEXT')}
								</Button>
							</form>
						</section>
					</div>
				</Modal>
			</section>
		);
	}

	/**
	 * handle open modal
	 */
	handleOpenModal = () => {
		this.setState({ openModal: true });
	};

	/**
	 * handle close modal
	 */
	handleCloseModal = () => {
		this.setState({ openModal: false });
	};

	/**
	 * handle input change event
	 *
	 * @param event
	 */
	handleInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value }, () => {
			// remove errors
			if (this.state.errors && this.state.errors.length > 0) {
				this.setState({ errors: null });
			}

			// validate form
			this.setState({ isFormEnabled: this.isFormValid() });
		});
	};

	/**
	 * handle form submit event
	 *
	 * @param event
	 */
	handleFormSubmit = (event) => {
		// stop default event
		event.preventDefault();
	};

	/**
	 * check form validation
	 *
	 * @returns {boolean}
	 */
	isFormValid = () => {
		return !this.isFormEmpty(this.state);
	};

	/**
	 * check whether form is empty or not
	 *
	 * @param channelName
	 * @param channelDetails
	 * @returns {boolean}
	 */
	isFormEmpty = ({ channelName, channelDetails }) => {
		return !channelName.length || !channelDetails.length;
	};
}

export default Channels;
