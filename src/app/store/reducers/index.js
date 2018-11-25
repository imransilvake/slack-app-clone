// redux
import { combineReducers } from 'redux';

// app
import * as actionTypes from '../actions/types';

// initial user state
const initialUserState = {
	currentUser: null,
	isAnimationLoading: true
};

// reducer: User
const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return {
				currentUser: action.payload.currentUser,
				isAnimationLoading: false
			};
		case actionTypes.CLEAR_USER:
			return {
				...initialUserState,
				isAnimationLoading: false
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({ user: userReducer });
export default rootReducer;
