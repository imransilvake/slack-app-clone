// app
import * as actionTypes from '../actions/ActionTypes';
import _ from 'lodash';

// init user state
const initUserState = {
	currentUser: null,
	status: null,
	colors: null,
	starred: null,
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
				currentUser: action.payload.currentUser
			};
		case actionTypes.UPDATE_USER_STATUS:
			return {
				...state,
				status: action.payload
			};
		case actionTypes.UPDATE_USER_COLORS:
			return {
				...state,
				colors: { ...state.colors, ...action.payload }
			};
		case actionTypes.UPDATE_USER_STARRED:
			// array
			if (Array.isArray(action.payload) || action.payload === null) {
				return {
					...state,
					starred: action.payload
				};
			}

			// object
			// remove
			if (!!(state.starred && _.find(state.starred, e => e.id === action.payload.id))) {
				return {
					...state,
					starred: state.starred.filter(e => e.id !== action.payload.id)
				}
			}

			// add
			return {
				...state,
				starred: [...state.starred, action.payload].sort((a, b) => {
					return a.timestamp - b.timestamp;
				})
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
