// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import Modal from '@material-ui/core/es/Modal/Modal';
import Icon from '@material-ui/core/es/Icon/Icon';
import InputBase from '@material-ui/core/InputBase';
import NoImage from '../../../../../assets/images/chat/no-photo.png';
import i18n from '../../../../../assets/i18n/i18n';
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel';

class FileUploadModal extends Component {
	state = {
		storageMessagesRef: firebase.storage().ref('messages'),
		file: null,
		preview: null,
		supportedTypes: ['image/jpeg', 'image/png'],
		isImageUploading: false,
		isUploadPaused: false,
		uploadPercentage: null,
		uploadTask: null,
		errors: []
	};

	componentWillUnmount() {
		this.setState({ file: null });
	}

	render() {
		const { file, preview, isImageUploading, errors, uploadPercentage, isUploadPaused } = this.state;
		const { openFileModal, onClick } = this.props;

		return (
			<Modal open={Boolean(openFileModal)}>
				<section className="sc-modal-wrapper">
					{/* Close Modal */}
					<div className="sc-close-modal">
						<Icon onClick={onClick}>close</Icon>
					</div>

					{/* Upload Image */}
					<div className="sc-modal sc-file-upload-modal">
						<div className="sc-image">
							<img src={preview ? preview : NoImage} alt="file"/>
						</div>

						<div className="sc-content">
							<div className="sc-file">
								<InputLabel htmlFor="file" className="cd-tooltip">
									{
										!isImageUploading && (
											<div className="sc-icon">
												<Icon>cloud_upload</Icon>
											</div>
										)
									}
									{uploadPercentage && (<div className="sc-upload-percentage">{ uploadPercentage }</div>)}
									<span className="cd-arrow cd-bottom">
										{i18n.t('CHAT.MESSAGES_PANEL.FILE_UPLOAD.TOOLTIP')}
									</span>
								</InputLabel>
								<InputBase
									id="file"
									name="file"
									type="file"
									accept="image/png, image/jpeg"
									className="sc-input"
									onChange={this.handleChange}
								/>
							</div>

							{
								// actions: upload, remove
								file && !isImageUploading && (
									<div className="sc-actions">
										<Icon onClick={this.handleSubmit}>check</Icon>
										<Icon onClick={this.handleResetFile}>delete_forever</Icon>
									</div>
								)
							}

							{
								// actions: pause, resume, cancel
								file && isImageUploading && (
									<div className="sc-actions">
										{!isUploadPaused && (<Icon onClick={this.handlePauseUpload}>pause</Icon>)}
										{isUploadPaused && (<Icon onClick={this.handleResumeUpload}>play_arrow</Icon>)}
										{!isUploadPaused && (<Icon onClick={this.handleCancelUpload}>delete_forever</Icon>)}
									</div>
								)
							}
						</div>

						{
							// Errors
							errors && errors.length > 0 && (
								<div className="sc-errors">
									<p className="sc-error">{this.displayErrors(errors)}</p>
								</div>
							)
						}
					</div>
				</section>
			</Modal>
		);
	}

	/**
	 * handle change event
	 *
	 * @param event
	 */
	handleChange = (event) => {
		const { supportedTypes } = this.state;
		const file = event.target && event.target.files[0];

		if (file) {
			// type validation
			if (file.type && supportedTypes.includes(file.type)) {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.addEventListener('load', () => {
					// file, preview, error
					this.setState({ file, preview: reader.result, errors: [] });
				});
			} else {
				// file, preview, error
				this.setState({
					file: null,
					preview: null,
					errors: [{ message: i18n.t('CHAT.MESSAGES_PANEL.FILE_UPLOAD.WRONG_TYPE', { type: file.type }) }]
				});
			}
		}
	};

	/**
	 * upload image to firebase
	 */
	handleSubmit = () => {
		const { file, storageMessagesRef } = this.state;
		if (file) {
			// show loading
			this.setState({ isImageUploading: true });

			// upload
			const name = (+new Date()) + '-' + file.name;
			const metadata = { contentType: file.type };
			const task = storageMessagesRef.child(name).put(file, metadata);
			task.on('state_changed', (snapshot) => {
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				this.setState({ uploadTask: task, uploadPercentage: `${progress}%` });

				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED:
						this.setState({ isUploadPaused: true });
						break;
					case firebase.storage.TaskState.RUNNING:
						this.setState({ isUploadPaused: false });
						break;
					default:
						// file, preview, upload percentage, image loading, upload task, upload paused, error
						this.setState({
							file: null,
							preview: null,
							uploadPercentage: null,
							isImageUploading: false,
							uploadTask: null,
							isUploadPaused: false,
							errors: [{ message: i18n.t('CHAT.MESSAGES_PANEL.FILE_UPLOAD.UPLOAD_CANCELLED') }]
						});
				}
			}, (error) => {
				this.setState({
					file: null,
					preview: null,
					uploadPercentage: null,
					isImageUploading: false,
					uploadTask: null,
					isUploadPaused: false,
					errors: [error]
				});
			}, () => {
				task.snapshot.ref
					.getDownloadURL()
					.then(() => {
						// upload percentage, hide loading, file, uploadTask
						this.setState({
							uploadPercentage: null,
							isImageUploading: false,
							uploadTask: null,
							file: null
						});
					});
			});
		}
	};

	/**
	 * handle reset file
	 */
	handleResetFile = () => {
		// file, preview
		this.setState({ file: null, preview: null });
	};

	/**
	 * handle pause upload file
	 */
	handlePauseUpload = () => {
		const { uploadTask } = this.state;
		if (uploadTask) uploadTask.pause();
	};

	/**
	 * handle resume upload file
	 */
	handleResumeUpload = () => {
		const { uploadTask } = this.state;
		if (uploadTask) uploadTask.resume();
	};

	/**
	 * handle cancel upload file
	 */
	handleCancelUpload = () => {
		const { uploadTask } = this.state;
		if (uploadTask) uploadTask.cancel();
	};

	/**
	 * display errors
	 *
	 * @param errors
	 * @returns {*}
	 */
	displayErrors = errors => errors.map((error, i) => <span key={i}>{error.message}</span>);
}

export default FileUploadModal;
