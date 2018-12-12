// react
import React, { Component } from 'react';

// app
import Icon from '@material-ui/core/es/Icon/Icon';
import Input from '@material-ui/core/Input';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames/bind';

class MessagesHeader extends Component {
	state = {
		menuOpen: null
	};

	render() {
		const { menuOpen } = this.state;
		const { currentChannel, uniqueUsers, totalMessages } = this.props;

		const activeClick = classNames({
			'sc-icon sc-l2': true,
			'sc-active-button': uniqueUsers.length
		});

		return (
			<section className="sc-messages-header">
				<div className="cd-row">
					{/* Information */}
					<div className="cd-col cd-col-pm-m-6 cd-col-pm-s-6">
						{/* Title */}
						<h5 className="sc-title">
							<span># </span>{currentChannel.name}
						</h5>

						{/* Icons */}
						<div className="sc-info">
							<span className="sc-icon sc-l2 sc-active-button">
								<Icon>star_border</Icon>
							</span>
							<span className="sc-icon sc-l1">
								<span className="sc-value">{totalMessages}</span>
								<Icon>chat_bubble_outline</Icon>
							</span>
							<span
								className={activeClick}
								onClick={(uniqueUsers.length && this.handleClickMenu) || null}
								role="presentation">
								<span className="sc-value">{uniqueUsers && uniqueUsers.length}</span>
								<Icon>supervised_user_circle</Icon>
							</span>
							<span className="sc-icon sc-l2 sc-active-button">
								<Icon>error_outline</Icon>
							</span>
						</div>
					</div>

					{/* Search */}
					<div className="cd-col cd-col-pm-m-6 cd-col-pm-s-6">
						<div className="sc-search">
							<Input
								id="search"
								name="search"
								onChange={this.handleInputChange}
								placeholder="Search"
							/>
							<Icon>search</Icon>
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
				</div>
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
}

export default MessagesHeader;
