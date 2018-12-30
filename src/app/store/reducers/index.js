// redux
import { combineReducers } from 'redux';

// app
import userReducer from './UserReducer';
import channelReducer from './ChannelReducer';
import messageReducer from './MessageReducer';

// root reducer
const rootReducer = combineReducers({
	user: userReducer,
	channel: channelReducer,
	message: messageReducer
});

export default rootReducer;
