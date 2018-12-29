// react
import React, { Component } from 'react';

// app
import classNames from 'classnames/bind';
import ColorPanel from './ColorPanel';
import UserPanel from './UserPanel';
import Channels from './Channels';
import { connect } from 'react-redux';

class SidePanel extends Component {
	render() {
		const { currentUser, isMobileView, colors } = this.props;
		const sidePanelDarkStyle = { backgroundColor: colors.sidePanelBackground.primary };
		const sidePanelLightStyle = { backgroundColor: colors.sidePanelBackground.secondary };
		const sidePanelClass = classNames({
			'cd-col sc-side-panel': true,
			'sc-view-fixed': isMobileView
		});

		return (
			<section className="sc-side-panel-wrapper">
				{/* Color Area */}
				<div className="sc-color-panel-wrapper" style={sidePanelDarkStyle}>
					<ColorPanel
						currentUser={currentUser}
						colors={colors}/>
				</div>

				{/* Content */}
				<div className={sidePanelClass} style={sidePanelLightStyle}>
					{/* Header */}
					<header className="sc-header">
						<UserPanel
							currentUser={currentUser}
							colors={colors}/>
					</header>

					{/* Channels */}
					<Channels
						currentUser={currentUser}
						colors={colors}/>
				</div>
			</section>
		);
	}
}

// props
const mapStateToProps = state => ({
	colors: state.colors
});

export default connect(mapStateToProps)(SidePanel);
