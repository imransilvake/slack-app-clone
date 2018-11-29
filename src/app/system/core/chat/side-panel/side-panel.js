// react
import React, { Component } from 'react';

// app
import UserPanel from './user-panel';
import Channels from './channels';

class SidePanel extends Component {
	render() {
		const { currentUser } = this.props;

		return (
			<section className="sc-user-panel">
				{/* Header */}
				<header>
					<UserPanel currentUser={currentUser}/>
				</header>

				{/* Content */}
				<Channels currentUser={currentUser}/>
			</section>
		);
	}
}

export default SidePanel;
