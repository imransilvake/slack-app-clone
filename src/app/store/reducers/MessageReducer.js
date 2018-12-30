// action types
import * as actionTypes from '../actions/ActionTypes';

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

export default messageReducer;
