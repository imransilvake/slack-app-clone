// react
import React, { Component } from 'react';

// app
import Icon from '@material-ui/core/es/Icon/Icon';

class MessagesHeader extends Component {
	render() {
		const { totalMessages, currentChannel } = this.props;

		return (
			<section className="sc-messages-header">
				<div className="cd-row">
					<div className="cd-col cd-col-pm-t-6">
						<h5># {currentChannel.name}</h5>
						<div className="sc-info">
							<span className="sc-icon">
								<span className="sc-value">{totalMessages}</span>
								<Icon>message</Icon>
							</span>
							<span className="sc-icon">
								<Icon>info</Icon>
							</span>
						</div>
					</div>
					<div className="cd-col cd-col-pm-t-6">

					</div>
				</div>
			</section>
		);
	}
}

export default MessagesHeader;
