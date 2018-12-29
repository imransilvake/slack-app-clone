// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// react color
import { CirclePicker } from 'react-color';

// app
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';
import connect from 'react-redux/es/connect/connect';
import COLORS from '../../../../../assets/json/colors'
import i18n from '../../../../../assets/i18n/i18n';
import { setColor } from '../../../../store/actions';

class ColorPanel extends Component {
	state = {
		openPaletteModal: false,
		usersRef: firebase.database().ref('users')
	};

	render() {
		const { openPaletteModal } = this.state;
		const { colors } = this.props;
		const sidePanelLightStyle = {
			backgroundColor: colors.sidePanelBackground.secondary,
			color: colors.sidePanelBackground.primary
		};

		return (
			<section className="sc-color-panel" style={sidePanelLightStyle}>
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
					open={openPaletteModal}
					onClose={this.handleClosePaletteModal}>
					<div className="sc-palette">
						<h5>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.TITLE')}</h5>
						<div className="sc-colors">
							<div className="sc-block">
								<h6>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.BACKGROUND')}</h6>
								<div className="sc-color">
									<CirclePicker
										colors={COLORS.SIDE_PANEL.BACKGROUND}
										color={colors ? colors.sidePanelBackground.primary : null}
										circleSize={16}
										onChangeComplete={this.onChangeSidePanelBackground}/>
								</div>
							</div>
							<div className="sc-block">
								<h6>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.COLOR.PRIMARY')}</h6>
								<div className="sc-color">
									<CirclePicker
										colors={COLORS.SIDE_PANEL.COLOR.PRIMARY}
										color={colors ? colors.sidePanelColorPrimary : null}
										circleSize={16}
										onChangeComplete={this.onChangeSidePanelColorPrimary}/>
								</div>
							</div>
							<div className="sc-block">
								<h6>{i18n.t('CHAT.SIDE_PANEL.COLOR_PANEL.COLOR.SECONDARY')}</h6>
								<div className="sc-color">
									<CirclePicker
										colors={COLORS.SIDE_PANEL.COLOR.SECONDARY}
										color={colors ? colors.sidePanelColorSecondary : null}
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
	handleOpenPaletteModal = () => {
		this.setState({ openPaletteModal: true });
	};

	/**
	 * handle close palette modal
	 */
	handleClosePaletteModal = () => {
		this.setState({ openPaletteModal: false });
	};

	/**
	 * on change: side panel background
	 *
	 * @param selectedColor
	 */
	onChangeSidePanelBackground = (selectedColor) => {
		// payload
		const payload = {
			primary: selectedColor.hex,
			secondary: this.colorLuminance(selectedColor.hex, 0.1)
		};

		// update state to redux
		this.props.setColor(1, payload);

		// update colors
		this.updateColorsToDatabase();
	};

	/**
	 * on change: side panel color primary
	 *
	 * @param color
	 */
	onChangeSidePanelColorPrimary = (color) => {
		// update state to redux
		this.props.setColor(2, color.hex);

		// update colors
		this.updateColorsToDatabase();
	};

	/**
	 * on change: side panel color secondary
	 *
	 * @param color
	 */
	onChangeSidePanelColorSecondary = (color) => {
		// update state to redux
		this.props.setColor(3, color.hex);

		// update colors
		this.updateColorsToDatabase();
	};

	/**
	 * update colors to database
	 */
	updateColorsToDatabase = () => {
		const { usersRef } = this.state;
		const { currentUser, colors } = this.props;

		// update colors on users database
		usersRef
			.child(currentUser.uid)
			.update({ colors })
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

export default connect(null, { setColor })(ColorPanel);