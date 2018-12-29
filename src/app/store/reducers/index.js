// redux
import { combineReducers } from 'redux';

// app
import * as actionTypes from '../actions/types';

/* ---------------
	Reducer: User
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
		case actionTypes.UPDATE_USER:
			return {
				currentUser: action.payload.currentUser,
				isAnimationLoading: false
			};
		case actionTypes.CLEAR_USER:
			return {
				currentUser: null,
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
				currentChannel: action.payload.currentChannel
			};
		default:
			return state;
	}
};


/* ------------------
	Reducer: Message
	----------------
*/

// initial message state
const initialMessageState = [];

// reducer: Message
const messageReducer = (state = initialMessageState, action) => {
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


/* ---------------
	Reducer: Color
	--------------
*/

// initial color state
const initialColorState = {
	sidePanelBackground: {
		primary: null,
		secondary: null
	},
	sidePanelColorPrimary: null,
	sidePanelColorSecondary: null
};

// reducer: Color
const colorReducer = (state = initialColorState, action) => {
	switch (action.type) {
		case actionTypes.SET_SIDE_PANEL_COLORS:
			return action.payload;
		case actionTypes.SET_SIDE_PANEL_BACKGROUND:
			return {
				...state,
				sidePanelBackground: action.payload
			};
		case actionTypes.SET_SIDE_PANEL_COLOR_PRIMARY:
			return {
				...state,
				sidePanelColorPrimary: action.payload
			};
		case actionTypes.SET_SIDE_PANEL_COLOR_SECONDARY:
			return {
				...state,
				sidePanelColorSecondary: action.payload
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	user: userReducer,
	channel: channelReducer,
	message: messageReducer,
	colors: colorReducer
});

export default rootReducer;
