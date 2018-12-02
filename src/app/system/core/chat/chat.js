// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// app
import SidePanel from './side-panel/side-panel';
import MessagesPanel from './messages-panel/messages-panel';
import MetaPanel from './meta-panel/meta-panel';
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
		const { currentUser } = this.props;

		return this.props.currentUser && (
			<section className="cd-container-fluid sc-chat">
				{/*  Side Panel - Mobile */}
				<Drawer
					open={this.state.mobileOpen}
					onClose={this.handleDrawerToggle}>
					<SidePanel currentUser={currentUser} isMobileView={false}/>
				</Drawer>

				{/* Side Panel - Desktop */}
				<div className="cd-row">
					<div className="cd-hide-on-s-down">
						<SidePanel currentUser={currentUser} isMobileView/>
					</div>
					<div className="cd-hide-on-t-up cd-mobile-header">
						<IconButton onClick={this.handleDrawerToggle}>
							<MenuIcon/>
						</IconButton>
					</div>
				</div>

				<div className="cd-row">
					{/* Message Area */}
					<div className="cd-col cd-col-pm-m-8 cd-col-pm-s-9 cd-col-pm-t-9 sc-message-area">
						<MessagesPanel/>
					</div>

					{/* Meta Panel */}
					<div className="cd-col cd-col-pm-m-4 cd-col-pm-s-3 cd-col-pm-t-3 sc-meta-panel">
						<MetaPanel/>
					</div>
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
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Chat);
