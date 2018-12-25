// react
import React, { Component } from 'react';

// app
import Modal from '@material-ui/core/es/Modal/Modal';

class FileUploadModal extends Component {
	render() {
		const { modalOpen, onClick } = this.props;

		return modalOpen && (
			<Modal open={Boolean(modalOpen)}>
				<section className="sc-modal-wrapper">
					<div className="sc-modal sc-file-upload-modal">
						<h6 onClick={onClick}>a</h6>
					</div>
				</section>
			</Modal>
		);
	}
}

export default FileUploadModal;
