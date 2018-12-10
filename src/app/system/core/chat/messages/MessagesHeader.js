// react
import React, { Component } from 'react';

// app
import Icon from '@material-ui/core/es/Icon/Icon';
import Input from '@material-ui/core/Input';

class MessagesHeader extends Component {
	render() {
		const { currentChannel, uniqueUsers, totalMessages } = this.props;

		return (
			<section className="sc-messages-header">
				<div className="cd-row">
					{/* Information */}
					<div className="cd-col cd-col-pm-m-6 cd-col-pm-s-6">
						{/* Title */}
						<h5 className="sc-title">
							<span># </span>{currentChannel.name}
							<Icon>star_border</Icon>
						</h5>

						{/* Icons */}
						<div className="sc-info">
							<span className="sc-icon sc-l1">
								<span className="sc-value">{totalMessages}</span>
								<Icon>chat_bubble_outline</Icon>
							</span>
							<span className="sc-icon sc-l2">
								<span className="sc-value">{uniqueUsers && uniqueUsers.length}</span>
								<Icon>supervised_user_circle</Icon>
							</span>
							<span className="sc-icon sc-l2">
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
				</div>
			</section>
		);
	}
}

export default MessagesHeader;
