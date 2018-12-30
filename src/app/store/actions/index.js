// app
import * as actionTypes from './types';

// =================
// USER Action Types
// =================

// set user
export const setUser = (user) => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: {
			currentUser: user
		}
	};
};

// update user avatar
export const updateUserAvatar = (user) => {
	return {
		type: actionTypes.UPDATE_USER_AVATAR,
		payload: {
			currentUser: user
		}
	};
};

// update user status
export const updateUserStatus = (status) => {
	return {
		type: actionTypes.UPDATE_USER_STATUS,
		payload: status
	};
};

// update user colors
export const updateUserColors = (colors) => {
	return {
		type: actionTypes.UPDATE_USER_COLORS,
		payload: colors
	};
};

// clear user
export const clearUser = () => {
	return {
		type: actionTypes.CLEAR_USER
	}
};


// ====================
// Channel Action Types
// ====================

export const setChannel = (channel) => {
	return {
		type: actionTypes.SET_CURRENT_CHANNEL,
		payload: {
			currentChannel: channel
		}
	};
};


// =====================
// Messages Action Types
// =====================

export const setMessages = (messages) => {
	return {
		type: actionTypes.SET_MESSAGES,
		payload: messages
	};
};
