// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// app
import SidePanel from './side/SidePanel';
import MessagesPanel from './messages/MessagesPanel';
import Drawer from '@material-ui/core/Drawer/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton/IconButton';

class Chat extends Component {
	state = {
		mobileOpen: false
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleChangeOnResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleChangeOnResize);
	}

	render() {
		const { mobileOpen } = this.state;
		const { currentUser, currentChannel, userStatus, userColors, userStarred } = this.props;

		return currentUser && userStatus && userColors && userStarred && (
			<section className="cd-container-fluid sc-chat">
				{/*  Side Panel - Mobile */}
				<Drawer
					open={mobileOpen}
					onClose={this.handleDrawerToggle}>
					<SidePanel
						key={currentUser.uid}
						currentUser={currentUser}
						userStatus={userStatus}
						userColors={userColors}
						userStarred={userStarred}
						isMobileView={false}
					/>
				</Drawer>

				{/* Side Panel - Desktop */}
				<div className="cd-row">
					<div className="cd-hide-on-s-down">
						<SidePanel
							key={currentUser.uid}
							currentUser={currentUser}
							currentChannel={currentChannel}
							userStatus={userStatus}
							userColors={userColors}
							userStarred={userStarred}
							isMobileView
						/>
					</div>
					<div className="cd-hide-on-t-up cd-mobile-header">
						<IconButton onClick={this.handleDrawerToggle}>
							<MenuIcon/>
						</IconButton>
					</div>
				</div>

				{/* Message Panel */}
				<div className="cd-row">
					{
						currentChannel && (
							<MessagesPanel
								key={currentChannel.id}
								currentChannel={currentChannel}
								currentUser={currentUser}
								userStarred={userStarred}
							/>
						)
					}
				</div>
			</section>
		);
	}

	/**
	 * handle drawer toggle
	 *
	 * @returns {Function}
	 */
	handleDrawerToggle = () => {
		this.setState(state => ({ mobileOpen: !state.mobileOpen }));
	};

	/**
	 * handle change on resize
	 */
	handleChangeOnResize = () => {
		if (this.state.mobileOpen) {
			this.handleDrawerToggle();
		}
	}
}

// props
const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	currentChannel: state.channel.currentChannel,
	userStatus: state.user.status,
	userColors: state.user.colors,
	userStarred: state.user.starred
});

export default connect(mapStateToProps)(Chat);
