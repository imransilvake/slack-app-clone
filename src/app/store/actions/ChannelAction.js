// action types
import * as actionTypes from './ActionTypes';

// set channel
export const setChannel = (channel) => {
	return {
		type: actionTypes.SET_CURRENT_CHANNEL,
		payload: channel
	};
};

// set channel's top users
export const setChannelTopUsers = (channelTopUsers) => {
	return {
		type: actionTypes.SET_CHANNEL_TOP_USERS,
		payload: channelTopUsers
	};
};
