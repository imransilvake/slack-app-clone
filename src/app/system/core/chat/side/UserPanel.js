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
import connect from 'react-redux/es/connect/connect';
import { updateUser } from '../../../../store/actions';
import classNames from 'classnames/bind';

class UserPanel extends Component {
	state = {
		menuOpen: null,
		usersRef: firebase.database().ref('users')
	};

	render() {
		const { menuOpen } = this.state;
		const { currentUser } = this.props;

		const circleClass = classNames({
			'sc-circle': true,
			'sc-1': currentUser.code === '1',
			'sc-2': currentUser.code === '2',
			'sc-3': currentUser.code === '3',
			'sc-4': currentUser.code === '4'
		});

		return (
			<section className="sc-user-panel">
				{/* Button */}
				<Button onClick={this.handleClickMenu}>
					<h5 className="sc-type sc-text-truncate">{currentUser.displayName}</h5>
					<p className="sc-name">
						<span className={circleClass}/>
						{i18n.t(`CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.${currentUser.code}`)}
					</p>
					<img className="sc-avatar" src={currentUser.photoURL} alt={currentUser.displayName}/>
				</Button>

				{/* Menu */}
				<Menu
					className="sc-user-panel-menu"
					anchorEl={menuOpen}
					onClick={this.handleCloseMenu}
					open={Boolean(menuOpen)}>
					<MenuItem>
						<div className="sc-status">
							<button type="button" className="sc-circle sc-1 cd-tooltip" onClick={this.changeStatus} value="1">
								<span className="cd-right">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.1')}</span>
							</button>
							<button type="button" className="sc-circle sc-2 cd-tooltip" onClick={this.changeStatus} value="2">
								<span className="cd-right">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.2')}</span>
							</button>
							<button type="button" className="sc-circle sc-3 cd-tooltip" onClick={this.changeStatus} value="3">
								<span className="cd-left">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.3')}</span>
							</button>
							<button type="button" className="sc-circle sc-4 cd-tooltip" onClick={this.changeStatus} value="4">
								<span className="cd-left">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.4')}</span>
							</button>
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
	 * change user status
	 *
	 * @param event
	 */
	changeStatus = (event) => {
		const { usersRef } = this.state;
		const { currentUser } = this.props;
		const status = { code: event.target.value };

		// update on firebase
		usersRef
			.child(currentUser.uid)
			.update(status)
			.then(() => {
				// update on redux
				this.props.updateUser({ ...currentUser, ...status });
			});

		// close menu
		this.handleCloseMenu();
	};

	/**
	 * handle sign-out
	 */
	handleSignOut = () => {
		firebase
			.auth()
			.signOut()
			.then();
	};
}

export default connect(null, { updateUser })(UserPanel);
