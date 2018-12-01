// react
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';

// app
import SidePanel from './side-panel/side-panel';
import MessageArea from './message-area/message-area';
import MetaPanel from './meta-panel/meta-panel';

class Chat extends Component {
	render() {
		const { currentUser } = this.props;

		return this.props.currentUser && (
			<section className="sc-chat">
				{/* Side Panel */}
				<div className="cd-row">
					<div className="cd-col sc-sidebar">
						<SidePanel currentUser={currentUser}/>
					</div>
				</div>

				<div className="cd-row">
					{/* Message Area */}
					<div className="cd-col cd-col-pm-m-8 cd-col-pm-s-9 cd-col-pm-t-9 sc-message-area">
						<MessageArea/>
					</div>

					{/* Meta Panel */}
					<div className="cd-col cd-col-pm-m-4 cd-col-pm-s-3 cd-col-pm-t-3 sc-meta-panel">
						<MetaPanel/>
					</div>
				</div>
			</section>
		);
	}
}

// props
const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Chat);
