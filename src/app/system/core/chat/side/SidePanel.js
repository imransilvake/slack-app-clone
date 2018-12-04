// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import ColorPanel from './ColorPanel';
import UserPanel from './UserPanel';
import Channels from './Channels';

class SidePanel extends Component {
	render() {
		const { currentUser, isMobileView } = this.props;
		const sidePanelClass = classNames({
			'cd-col sc-side-panel': true,
			'sc-view-fixed': isMobileView
		});

		return (
			<section className="sc-side-panel-wrapper">
				{/* Color Area */}
				<div className="sc-color-panel-wrapper">
					<ColorPanel/>
				</div>

				{/* Content Area */}
				<div className={sidePanelClass}>
					{/* Header */}
					<header className="sc-header">
						<UserPanel currentUser={currentUser}/>
					</header>

					{/* Content */}
					<Channels currentUser={currentUser}/>
				</div>
			</section>
		);
	}
}

export default SidePanel;
