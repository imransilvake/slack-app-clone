// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import i18n from '../../../../../assets/i18n/i18n';

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
					<h5 className="sc-type">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.TITLE')}</h5>
					<p className="sc-name">{currentUser.displayName}</p>
					<img className="sc-avatar" src={currentUser.photoURL} alt={currentUser.displayName}/>
				</Button>

				{/* Menu - User Panel */}
				<Menu
					className="sc-user-panel-menu"
					onClick={this.handleCloseMenu}
					anchorEl={menuOpen}
					open={Boolean(menuOpen)}>
					<MenuItem onClick={this.handleCloseMenu} disabled>
						{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.SIGNED_IN', { username: currentUser.displayName })}
					</MenuItem>
					<Divider/>
					<MenuItem onClick={this.handleCloseMenu}>
						{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.CHANGE_AVATAR')}
					</MenuItem>
					<MenuItem onClick={this.handleSignOut}>
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
