// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import UserPanel from './user-panel';
import Channels from './channels';
import ColorPanel from '../color-panel/color-panel';

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
				<div className="cd-col sc-color-panel-wrapper">
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
