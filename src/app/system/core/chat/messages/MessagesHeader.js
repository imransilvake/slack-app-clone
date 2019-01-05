// react
import React, { Component } from 'react';

// redux
import connect from 'react-redux/es/connect/connect';

// firebase
import firebase from '../../../../../firebase';

// app
import Icon from '@material-ui/core/es/Icon/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames/bind';
import i18n from '../../../../../assets/i18n/i18n';
import { updateUserStarred } from '../../../../store/actions/UserAction';

class MessagesHeader extends Component {
	state = {
		usersRef: firebase.database().ref('users'),
		menuOpen: null,
		isChannelStarred: false
	};

	componentDidMount() {
		const { currentChannel, userStarred } = this.props;

		// validate: channel is starred
		const isChannelStarred = userStarred && userStarred.some(e => e.id === currentChannel.id);
		this.setState({ isChannelStarred: isChannelStarred });
	}

	render() {
		const { menuOpen, isChannelStarred } = this.state;
		const { currentChannel, uniqueUsers, totalMessages } = this.props;
		const activeClick = classNames({
			'sc-icon sc-l2': true,
			'sc-active-button': uniqueUsers.length
		});

		return (
			<section className="sc-messages-header">
				<div className="cd-row">
					{/* Information */}
					<div className="cd-col">
						{/* Title */}
						<h5 className="sc-title">#{currentChannel.name}</h5>

						{/* Icons */}
						<div className="sc-info">
							<span className="sc-icon sc-l2 sc-active-button"
							      onClick={this.handleStarState}
							      role="presentation">
								{!isChannelStarred && (<Icon>star_border</Icon>)}
								{isChannelStarred && (<Icon>star</Icon>)}
							</span>
							<span className="sc-icon sc-l1">
								<span className="sc-value">{totalMessages}</span>
								<span>{i18n.t('CHAT.MESSAGES_PANEL.HEADER.MESSAGES')}</span>
							</span>
							<span
								className={activeClick}
								onClick={(uniqueUsers.length && this.handleClickMenu) || null}
								role="presentation">
								<span className="sc-value">{uniqueUsers && uniqueUsers.length}</span>
								<Icon>supervised_user_circle</Icon>
							</span>
						</div>
					</div>
				</div>

				{/* Menu - Users List */}
				<Menu
					className="sc-users-list-menu"
					onClick={this.handleCloseMenu}
					anchorEl={menuOpen}
					open={Boolean(menuOpen)}>
					{
						uniqueUsers && uniqueUsers.map(user => (
							<MenuItem key={user.id}>
								<div className="sc-item cd-row">
									<img className="sc-avatar" src={user.avatar} alt={user.name}/>
									<div className="sc-content">
										<h6 className="sc-name">{user.name}</h6>
										<p className="sc-email"><span/>{user.email}</p>
									</div>
								</div>
							</MenuItem>
						))
					}
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
	 * set state: isChannelStarred
	 */
	handleStarState = () => {
		this.setState(prevState => ({
			isChannelStarred: !prevState.isChannelStarred
		}), () => this.toggleStarChannel());
	};

	/**
	 * star/un-star channel
	 */
	toggleStarChannel = () => {
		const { isChannelStarred, usersRef } = this.state;
		const { currentUser, currentChannel } = this.props;
		const star = {
			[currentChannel.id]: {
				id: currentChannel.id,
				name: currentChannel.name,
				details: currentChannel.details,
				createdBy: {
					name: currentUser.displayName,
					avatar: currentUser.photoURL
				}
			}
		};

		// star / un-star
		if (isChannelStarred) {
			usersRef
				.child(`${currentUser.uid}/starred`)
				.update(star)
				.then(() => {
					// update in redux
					this.props.updateUserStarred(star[currentChannel.id]);
				});
		} else {
			usersRef
				.child(`${currentUser.uid}/starred`)
				.child(currentChannel.id)
				.remove(err => {
					if (err !== null) {
						console.error(err);
					}
				})
				.then(() => {
					// update in redux
					this.props.updateUserStarred(star[currentChannel.id]);
				})
		}
	};
}

export default connect(null, { updateUserStarred })(MessagesHeader);
