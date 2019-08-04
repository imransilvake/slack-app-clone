// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// firebase
import firebase from '../../../../../firebase';

// react color
import { CirclePicker } from 'react-color';

// app
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';
import COLORS from '../../../../../assets/json/colors'
import i18n from '../../../../../assets/i18n/i18n';
import { updateUserColors } from '../../../../store/actions/UserAction';

class ColorPanel extends Component {
	state = {
		openPaletteModal: null,
		usersRef: firebase.database().ref('users')
	};

	render() {
		const { openPaletteModal } = this.state;
		const { userColors } = this.props;
		const colorPanelStyle = {
			backgroundColor: userColors.background.secondary,
			color: userColors.background.primary
		};

		return (
			<section className="sc-color-panel" style={colorPanelStyle}>
				{/* Palette Icon */}
				<div
					className="sc-palette"
					onClick={this.handleOpenPaletteModal}
					role="presentation">
					<Icon className="sc-icon">palette</Icon>
					<span className="sc-circle sc-1"/>
					<span className="sc-circle sc-2"/>
					<span className="sc-circle sc-3"/>
					<span className="sc-circle sc-4"/>
				</div>

				{/* Palette Popover */}
				<Popover
					className="sc-palette-popover"
					anchorEl={openPaletteModal}
					open={Boolean(openPaletteModal)}
					onClose={this.handleClosePaletteModal}>
					<div className="sc-palette">
						<h5>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.TITLE')}</h5>
						<div className="sc-colors">
							<div className="sc-block">
								<h6>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.BACKGROUND')}</h6>
								<div className="sc-color">
									<CirclePicker
										colors={COLORS.SIDE_PANEL.BACKGROUND}
										color={userColors ? userColors.background.primary : null}
										circleSize={16}
										onChangeComplete={this.onChangeSidePanelBackground}/>
								</div>
							</div>
							<div className="sc-block">
								<h6>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.COLOR.PRIMARY')}</h6>
								<div className="sc-color">
									<CirclePicker
										colors={COLORS.SIDE_PANEL.COLOR.PRIMARY}
										color={userColors ? userColors.color_primary : null}
										circleSize={16}
										onChangeComplete={this.onChangeSidePanelColorPrimary}/>
								</div>
							</div>
							<div className="sc-block">
								<h6>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.COLOR.SECONDARY')}</h6>
								<div className="sc-color">
									<CirclePicker
										colors={COLORS.SIDE_PANEL.COLOR.SECONDARY}
										color={userColors ? userColors.color_secondary : null}
										circleSize={16}
										onChangeComplete={this.onChangeSidePanelColorSecondary}/>
								</div>
							</div>
						</div>
					</div>
				</Popover>
			</section>
		);
	}

	/**
	 * handle open palette modal
	 */
	handleOpenPaletteModal = (event) => {
		this.setState({ openPaletteModal: event.currentTarget });
	};

	/**
	 * handle close palette modal
	 */
	handleClosePaletteModal = () => {
		this.setState({ openPaletteModal: null });
	};

	/**
	 * on change: side panel background
	 *
	 * @param selectedColor
	 */
	onChangeSidePanelBackground = (selectedColor) => {
		// payload
		const payload = {
			background: {
				primary: selectedColor.hex,
				secondary: this.colorLuminance(selectedColor.hex, 0.2)
			}
		};

		// update state to redux
		this.props.updateUserColors(payload);

		// update colors
		this.updateColorsToDatabase();
	};

	/**
	 * on change: side panel color primary
	 *
	 * @param color
	 */
	onChangeSidePanelColorPrimary = (color) => {
		// payload
		const payload = {
			color_primary: color.hex
		};

		// update state to redux
		this.props.updateUserColors(payload);

		// update colors
		this.updateColorsToDatabase();
	};

	/**
	 * on change: side panel color secondary
	 *
	 * @param color
	 */
	onChangeSidePanelColorSecondary = (color) => {
		// payload
		const payload = {
			color_secondary: color.hex
		};

		// update state to redux
		this.props.updateUserColors(payload);

		// update colors
		this.updateColorsToDatabase();
	};

	/**
	 * update colors to database
	 */
	updateColorsToDatabase = () => {
		const { usersRef } = this.state;
		const { currentUser, userColors } = this.props;

		// update colors on users database
		usersRef
			.child(currentUser.uid)
			.update({ colors: userColors })
			.then();
	};

	/**
	 * light or dark hex color
	 *
	 * @param hex
	 * @param lum
	 * @returns {string}
	 */
	colorLuminance = (hex, lum) => {
		const hexValue = hex.replace('#', '');
		let rgb = '#';
		let c;
		let i;

		// convert to decimal and change luminosity
		for (i = 0; i < 3; i += 1) {
			c = parseInt(hexValue.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += (`00${c}`).substr(c.length);
		}

		return rgb;
	}
}

export default connect(null, { updateUserColors })(ColorPanel);
