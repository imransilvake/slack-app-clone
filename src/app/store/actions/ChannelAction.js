// action types
import * as actionTypes from './ActionTypes';

// set channel
const setChannel = (channel) => {
	return {
		type: actionTypes.SET_CURRENT_CHANNEL,
		payload: {
			currentChannel: channel
		}
	};
};

export default setChannel;
