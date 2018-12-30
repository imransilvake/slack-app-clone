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
import { updateUserAvatar, updateUserStatus } from '../../../../store/actions/UserAction';
import classNames from 'classnames/bind';
import FileUploadModal from '../common/FileUploadModal';

class UserPanel extends Component {
	state = {
		usersRef: firebase.database().ref('users'),
		openMenu: null,
		openFileModal: false
	};

	render() {
		const { openMenu, openFileModal } = this.state;
		const { currentUser, userStatus, userColors } = this.props;
		const sidePanelColorPrimary = { color: userColors.side_panel.color_primary };
		const sidePanelColorSecondary = { color: userColors.side_panel.color_secondary };

		const circleClass = classNames({
			'sc-circle': true,
			'sc-1': userStatus === '1',
			'sc-2': userStatus === '2',
			'sc-3': userStatus === '3',
			'sc-4': userStatus === '4'
		});

		return (
			<section className="sc-user-panel">
				{/* Button */}
				<Button onClick={this.handleOpenMenu}>
					<h5 className="sc-type sc-text-truncate" style={sidePanelColorPrimary}>
						{currentUser.displayName}
					</h5>
					<p className="sc-name" style={sidePanelColorSecondary}>
						<span className={circleClass}/>
						{i18n.t(`CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.${userStatus}`)}
					</p>
					<img className="sc-avatar" src={currentUser.photoURL} alt={currentUser.displayName}/>
				</Button>

				{/* Menu */}
				<Menu
					className="sc-user-panel-menu"
					anchorEl={openMenu}
					onClick={this.handleCloseMenu}
					open={Boolean(openMenu)}>
					<MenuItem>
						<div className="sc-status">
							<button
								type="button"
								className="sc-circle sc-1 cd-tooltip"
								onClick={this.handleChangeStatus}
								value="1"
								disabled={userStatus === '1'}>
								<span className="cd-right">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.1')}</span>
							</button>
							<button
								type="button"
								className="sc-circle sc-2 cd-tooltip"
								onClick={this.handleChangeStatus}
								value="2"
								disabled={userStatus === '2'}>
								<span className="cd-right">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.2')}</span>
							</button>
							<button
								type="button"
								className="sc-circle sc-3 cd-tooltip"
								onClick={this.handleChangeStatus}
								value="3"
								disabled={userStatus === '3'}>
								<span className="cd-left">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.3')}</span>
							</button>
							<button
								type="button"
								className="sc-circle sc-4 cd-tooltip"
								onClick={this.handleChangeStatus}
								value="4"
								disabled={userStatus === '4'}>
								<span className="cd-left">{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.STATUS_CODE.4')}</span>
							</button>
						</div>
					</MenuItem>
					<MenuItem onClick={this.handleOpenFileModal}>
						<Icon>supervised_user_circle</Icon>
						{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.CHANGE_AVATAR')}
					</MenuItem>
					<MenuItem onClick={this.handleSignOut}>
						<Icon>power_settings_new</Icon>
						{i18n.t('CHAT.SIDE_PANEL.USER_PANEL.LOGOUT')}
					</MenuItem>
				</Menu>

				{
					// File Upload Modal
					openFileModal && (
						<FileUploadModal
							uploadPath="settings/profile/"
							openFileModal={openFileModal}
							imagePreview={currentUser.photoURL}
							handleCloseFileModal={this.handleCloseFileModal}
							prepareMediaToUpload={this.handleChangeAvatar}
						/>
					)
				}
			</section>
		);
	}

	/**
	 * handle open menu
	 *
	 * @param event
	 */
	handleOpenMenu = (event) => {
		this.setState({ openMenu: event.currentTarget });
	};

	/**
	 * handle close menu
	 */
	handleCloseMenu = () => {
		this.setState({ openMenu: null });
	};

	/**
	 * change user status
	 *
	 * @param event
	 */
	handleChangeStatus = (event) => {
		const { usersRef } = this.state;
		const { currentUser } = this.props;
		const status = { code: event.target.value };

		// update on firebase
		usersRef
			.child(currentUser.uid)
			.update(status)
			.then(() => {
				// update on redux
				this.props.updateUserStatus(status.code);

				// close menu
				this.handleCloseMenu();
			});
	};

	/**
	 * handle change avatar
	 *
	 * @param fileUrl
	 */
	handleChangeAvatar = (fileUrl) => {
		const { usersRef } = this.state;
		const { currentUser } = this.props;

		// upload image on storage
		firebase
			.auth()
			.currentUser
			.updateProfile({ photoURL: fileUrl })
			.then(() => {
				const updatedUser = firebase.auth().currentUser;

				// update on redux
				this.props.updateUserAvatar(updatedUser);
			});

		// update image on database
		usersRef
			.child(currentUser.uid)
			.update({ avatar: fileUrl })
			.then();
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

	/**
	 * handle open file modal
	 */
	handleOpenFileModal = () => {
		this.setState({ openFileModal: true });
	};

	/**
	 * handle close file modal
	 */
	handleCloseFileModal = () => {
		this.setState({ openFileModal: false });
	};
}

export default connect(null, { updateUserAvatar, updateUserStatus })(UserPanel);
