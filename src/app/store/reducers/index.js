// redux
import { combineReducers } from 'redux';

// app
import * as actionTypes from '../actions/types';

// =============
// Reducer: User
// =============

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


// ================
// Reducer: Channel
// ================

// init channel state
const initChannelState = {
	currentChannel: null
};

// reducer: Channel
const channelReducer = (state = initChannelState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CHANNEL:
			return {
				currentChannel: action.payload.currentChannel
			};
		default:
			return state;
	}
};


// ================
// Reducer: Message
// ================

// init message state
const initMessageState = [];

// reducer: Message
const messageReducer = (state = initMessageState, action) => {
	switch (action.type) {
		case actionTypes.SET_MESSAGES: {
			const matchedIndex = state.findIndex(x => x.channelId === action.payload.channelId);
			const lists = state;

			// validate channelId and then update to new state
			if (matchedIndex > -1) lists[matchedIndex] = action.payload;
			else lists.push(action.payload);

			return lists;
		}
		default:
			return state;
	}
};

// root reducer
const rootReducer = combineReducers({
	user: userReducer,
	channel: channelReducer,
	message: messageReducer
});

export default rootReducer;
