// react
import React, { Component } from 'react';

// app
import UserPanel from './user-panel';

class SidePanel extends Component {
	render() {
		const { currentUser } = this.props;

		return (
			<section className="sc-user-panel">
				{/* Header */}
				<header>
					<UserPanel currentUser={currentUser}/>
				</header>
			</section>
		);
	}
}

export default SidePanel;
