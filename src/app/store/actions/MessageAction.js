// action types
import * as actionTypes from './ActionTypes';

// set messages
const setMessages = (messages) => {
	return {
		type: actionTypes.SET_MESSAGES,
		payload: messages
	};
};

export default setMessages;
