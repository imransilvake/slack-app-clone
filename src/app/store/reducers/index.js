// redux
import { combineReducers } from 'redux';

// app
import * as actionTypes from '../actions/types';

/* ---------------
	Reducer: USER
	-------------
*/

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

/* ------------------
	Reducer: Channel
	----------------
*/

// initial channel state
const initialChannelState = {
	currentChannel: null
};

// reducer: Channel
const channelReducer = (state = initialChannelState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CHANNEL:
			return {
				...initialChannelState,
				currentChannel: action.payload.currentChannel
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	user: userReducer,
	channel: channelReducer
});

export default rootReducer;
