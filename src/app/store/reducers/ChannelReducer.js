// action types
import * as actionTypes from '../actions/ActionTypes';

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

export default channelReducer;
