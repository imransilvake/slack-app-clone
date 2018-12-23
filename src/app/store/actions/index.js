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

// update user
export const updateUser = (user) => {
	return {
		type: actionTypes.UPDATE_USER,
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

export const setMessages = (data) => {
	return {
		type: actionTypes.SET_MESSAGES,
		payload: data
	};
};
