// action types
import * as actionTypes from '../actions/ActionTypes';

// init user state
const initUserState = {
	currentUser: null,
	status: null,
	colors: null,
	isAnimationLoading: true
};

// reducer: User
const userReducer = (state = initUserState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload.currentUser,
				isAnimationLoading: false
			};
		case actionTypes.UPDATE_USER_AVATAR:
			return {
				...state,
				currentUser: action.payload.currentUser,
				isAnimationLoading: false
			};
		case actionTypes.UPDATE_USER_STATUS:
			return {
				...state,
				status: action.payload
			};
		case actionTypes.UPDATE_USER_COLORS:
			return {
				...state,
				colors: action.payload
			};
		case actionTypes.CLEAR_USER:
			return {
				...state,
				currentUser: null,
				isAnimationLoading: false
			};
		default:
			return state;
	}
};

export default userReducer;
