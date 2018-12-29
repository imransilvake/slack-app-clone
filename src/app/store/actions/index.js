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

export const setMessages = (messages) => {
	return {
		type: actionTypes.SET_MESSAGES,
		payload: messages
	};
};


/* ---------------------
	COLORS Action Types
	-------------------
*/

export const setColor = (colorType, payload) => {
	let cType = null;

	switch (colorType) {
		case 0:
			cType = actionTypes.SET_SIDE_PANEL_COLORS;
			break;
		case 1:
			cType = actionTypes.SET_SIDE_PANEL_BACKGROUND;
			break;
		case 2:
			cType = actionTypes.SET_SIDE_PANEL_COLOR_PRIMARY;
			break;
		case 3:
			cType = actionTypes.SET_SIDE_PANEL_COLOR_SECONDARY;
			break;
		default:
			break;
	}

	return {
		type: cType,
		payload
	};
};
