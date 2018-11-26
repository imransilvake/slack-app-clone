// react
import React, { Component } from 'react';

// firebase
import firebase from '../../../../../firebase';

// app
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';

class UserPanel extends Component {
	state = {
		menuOpen: false,
		currentUser: this.props.currentUser
	};

	render() {
		const { menuOpen, currentUser } = this.state;

		return (
			<section className="sc-user-panel">
				{/* Button */}
				<Button onClick={this.handleClick}>
					<h5 className="sc-type">Slack</h5>
					<p className="sc-name">{currentUser.displayName}</p>
					<img className="sc-avatar" src={currentUser.photoURL} alt={currentUser.displayName}/>
				</Button>

				{/* Menu - User Panel */}
				<Menu className="user-panel-menu"
					onClick={this.handleCloseMenu}
					open={menuOpen}>
					<MenuItem onClick={this.handleCloseMenu} disabled>
						Signed in as {currentUser.displayName}
					</MenuItem>
					<Divider/>
					<MenuItem onClick={this.handleCloseMenu}>
						Change Avatar
					</MenuItem>
					<MenuItem onClick={this.handleSignOut}>
						Logout
					</MenuItem>
				</Menu>
			</section>
		);
	}

	/**
	 * handle button click
	 */
	handleClick = () => {
		this.setState({ menuOpen: true });
	};

	/**
	 * handle close menu
	 */
	handleCloseMenu = () => {
		this.setState({ menuOpen: false });
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
