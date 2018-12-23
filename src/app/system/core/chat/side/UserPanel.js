// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button/Button';
import i18n from '../../../../../assets/i18n/i18n';
import Icon from '@material-ui/core/es/Icon/Icon';

class UserPanel extends Component {
	state = {
		menuOpen: null,
		currentUser: this.props.currentUser
	};

	render() {
		const { menuOpen, currentUser } = this.state;

		return (
			<section className="sc-user-panel">
				{/* Button */}
				<Button onClick={this.handleClickMenu}>
					<h5 className="sc-type sc-text-truncate">{currentUser.displayName}</h5>
					<p className="sc-name">
						<span className="sc-circle"/>active
					</p>
					<img className="sc-avatar" src={currentUser.photoURL} alt={currentUser.displayName}/>
				</Button>

				{/* Menu */}
				<Menu
					className="sc-user-panel-menu"
					onClick={this.handleCloseMenu}
					anchorEl={menuOpen}
					open={Boolean(menuOpen)}>
					<MenuItem onClick={this.handleCloseMenu}>
						<div className="sc-status">
							<p className="sc-circle cd-tooltip">
								<span className="cd-right">Active</span>
							</p>
							<p className="sc-circle cd-tooltip sc-shift-1">
								<span className="cd-right">Away</span>
							</p>
							<p className="sc-circle cd-tooltip sc-shift-2">
								<span className="cd-left">Busy</span>
							</p>
							<p className="sc-circle cd-tooltip sc-shift-3">
								<span className="cd-left">Offline</span>
							</p>
						</div>
					</MenuItem>
					<MenuItem onClick={this.handleCloseMenu}>
						<Icon>supervised_user_circle</Icon>
						{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.CHANGE_AVATAR')}
					</MenuItem>
					<MenuItem onClick={this.handleSignOut}>
						<Icon>power_settings_new</Icon>
						{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.LOGOUT')}
					</MenuItem>
				</Menu>
			</section>
		);
	}

	/**
	 * handle button click
	 *
	 * @param event
	 */
	handleClickMenu = (event) => {
		this.setState({ menuOpen: event.currentTarget });
	};

	/**
	 * handle close menu
	 */
	handleCloseMenu = () => {
		this.setState({ menuOpen: null });
	};

	/**
	 * handle sign-out
	 */
	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then()
			.catch();
	};
}

export default UserPanel;
