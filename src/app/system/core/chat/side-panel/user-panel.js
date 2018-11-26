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
		anchorEl: null,
		currentUser: this.props.currentUser
	};

	render() {
		const { anchorEl, currentUser } = this.state;

		return (
			<section className="sc-user-panel">
				{/* Button */}
				<Button
					aria-owns={anchorEl ? 'user-panel-menu' : undefined}
					aria-haspopup="true"
					onClick={this.handleClick}>
					<h5>Personal</h5>
					<p>{ currentUser.displayName }</p>
				</Button>

				{/* Menu - User Panel */}
				<Menu
					id="user-panel-menu"
					anchorEl={anchorEl}
					onClick={this.handleCloseMenu}
					open={Boolean(anchorEl)}>
					<MenuItem onClick={this.handleCloseMenu} disabled>
						Signed in as { currentUser.displayName }
					</MenuItem>
					<Divider />
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
	 *
	 * @param event
	 */
	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	/**
	 * handle close menu
	 */
	handleCloseMenu = () => {
		this.setState({ anchorEl: null });
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
