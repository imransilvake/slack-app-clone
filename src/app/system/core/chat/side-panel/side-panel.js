// react
import React, { Component } from 'react';

// app
import UserPanel from './user-panel';
import Channels from './channels';
import classNames from 'classnames/bind';

class SidePanel extends Component {
	render() {
		const { currentUser, isMobileView } = this.props;
		const sidePanelClass = classNames({
			'cd-col sc-sidebar': true,
			'sc-view-fixed': isMobileView
		});

		return (
			<section className="sc-side-panel">
				<div className={sidePanelClass}>
					<div className="sc-user-panel">
						{/* Header */}
						<header>
							<UserPanel currentUser={currentUser}/>
						</header>

						{/* Content */}
						<Channels currentUser={currentUser}/>
					</div>
				</div>
			</section>
		);
	}
}

export default SidePanel;
