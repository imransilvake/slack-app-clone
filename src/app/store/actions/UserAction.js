// action types
import * as actionTypes from './ActionTypes';

// set user
export const setUser = (user) => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		payload: user
	};
};

// update user avatar
export const updateUserAvatar = (user) => {
	return {
		type: actionTypes.UPDATE_USER_AVATAR,
		payload: user
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

// update user starred
export const updateUserStarred = (star) => {
	return {
		type: actionTypes.UPDATE_USER_STARRED,
		payload: star
	};
};

// clear user
export const clearUser = () => {
	return {
		type: actionTypes.CLEAR_USER
	}
};
