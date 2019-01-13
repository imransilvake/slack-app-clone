// app
import * as actionTypes from '../actions/ActionTypes';

// init channel state
const initChannelState = {
	currentChannel: null,
	channelTopUsers: []
};

// reducer: Channel
const channelReducer = (state = initChannelState, action) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_CHANNEL:
			return {
				...state,
				currentChannel: action.payload
			};
		case actionTypes.SET_CHANNEL_TOP_USERS:
			return {
				...state,
				channelTopUsers: [...state.channelTopUsers, action.payload]
			};
		default:
			return state;
	}
};

export default channelReducer;
