// react
import React, { Component } from 'react';

// redux
import connect from 'react-redux/es/connect/connect';

// firebase
import firebase from '../../../../../firebase';

// app
import Icon from '@material-ui/core/es/Icon/Icon';
import { updateUserStarred } from '../../../../store/actions/UserAction';
import _ from 'lodash';

class MessagesHeader extends Component {
	state = {
		usersRef: firebase.database().ref('users'),
		isChannelStarred: false
	};

	componentDidMount() {
		// validate channel starred
		this.validateChannelStarred();
	}

	render() {
		const { isChannelStarred } = this.state;
		const { currentChannel, totalMessages } = this.props;

		return (
			<section className="sc-messages-header">
				<div className="cd-row">
					{/* Information */}
					<div className="cd-col">
						{/* Title */}
						<h5 className="sc-title"># {currentChannel.name}</h5>

						{/* Icons */}
						<div className="sc-info">
							<span
								className="sc-icon sc-l2 sc-active-button"
								onClick={this.handleStarState}
								role="presentation">
								{!isChannelStarred && (<Icon>star_border</Icon>)}
								{isChannelStarred && (<Icon>star</Icon>)}
							</span>
							<span className="sc-icon sc-l1">
								<span className="sc-value">{totalMessages}</span>
								<Icon>mode_comment</Icon>
							</span>
						</div>
					</div>
				</div>
			</section>
		);
	}

	/**
	 * validate channel starred
	 */
	validateChannelStarred = () => {
		const { currentChannel, userStarred } = this.props;
		const isChannelStarred = !!(userStarred && _.find(userStarred, e => e.id === currentChannel.id));
		this.setState({ isChannelStarred });
	};

	/**
	 * set state: isChannelStarred
	 */
	handleStarState = () => {
		this.setState(prevState => ({
			isChannelStarred: !prevState.isChannelStarred
		}), () => this.toggleStarChannel());
	};

	/**
	 * star/un-star channel
	 */
	toggleStarChannel = () => {
		const { isChannelStarred, usersRef } = this.state;
		const { currentUser, currentChannel } = this.props;
		const star = {
			[currentChannel.id]: {
				id: currentChannel.id,
				name: currentChannel.name,
				details: currentChannel.details,
				timestamp: currentChannel.timestamp,
				createdBy: {
					name: currentUser.displayName,
					avatar: currentUser.photoURL
				}
			}
		};

		// star / un-star
		if (isChannelStarred) {
			usersRef
				.child(`${currentUser.uid}/starred`)
				.update(star)
				.then(() => {
					// update user star state in redux
					this.props.updateUserStarred(star[currentChannel.id]);
				});
		} else {
			usersRef
				.child(`${currentUser.uid}/starred`)
				.child(currentChannel.id)
				.remove()
				.then(() => {
					// update user star state in redux
					this.props.updateUserStarred(star[currentChannel.id]);
				})
		}
	};
}

export default connect(null, { updateUserStarred })(MessagesHeader);
