// app
import * as actionTypes from './types';

/* -------------------
	USER Action Types
	-----------------
*/

// set user
export const setUser = (user) => {
	return {
		type: actionTypes.SET_USER,
		payload: {
			currentUser: user
		}
	};
};

// clear user
export const clearUser = () => {
	return {
		type: actionTypes.CLEAR_USER
	}
};


/* ----------------------
	Channel Action Types
	--------------------
*/

export const setChannel = (channel) => {
	return {
		type: actionTypes.SET_CURRENT_CHANNEL,
		payload: {
			currentChannel: channel
		}
	};
};


/* -----------------------
	Messages Action Types
	---------------------
*/

export const setMessages = (channelId, messages, uniqueUsers, isInfiniteScrolling, keyReference) => {
	return {
		type: actionTypes.SET_MESSAGES,
		payload: {
			channelId: channelId,
			messages: messages,
			uniqueUsers: uniqueUsers,
			isInfiniteScrolling: isInfiniteScrolling,
			keyReference: keyReference
		}
	};
};
