// react
import React, { Component } from 'react';

// app
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/es/Modal/Modal';
import { TwitterPicker } from 'react-color';

class ColorPanel extends Component {
	state = {
		openPaletteModal: false
	};

	render() {
		const { openPaletteModal } = this.state;

		return (
			<section className="sc-color-panel">
				{/* Palette Icon */}
				<div className="sc-palette" onClick={this.handleOpenPaletteModal}>
					<Icon>palette</Icon>
					<span className="sc-circle sc-1"/>
					<span className="sc-circle sc-2"/>
					<span className="sc-circle sc-3"/>
					<span className="sc-circle sc-4"/>
				</div>

				{
					// Palette Modal
					openPaletteModal && (
						<Modal open={openPaletteModal}>
							<div className="sc-modal-wrapper sc-palette-modal">
								<TwitterPicker />
								<Icon onClick={this.handleClosePaletteModal}>close</Icon>
							</div>
						</Modal>
					)
				}
			</section>
		);
	}

	/**
	 * handle open palette modal
	 */
	handleOpenPaletteModal = () => {
		this.setState({ openPaletteModal: true });
	};

	/**
	 * handle close palette modal
	 */
	handleClosePaletteModal = () => {
		this.setState({ openPaletteModal: false });
	};
}

export default ColorPanel;
