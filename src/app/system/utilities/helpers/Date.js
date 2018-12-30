// app
import moment from 'moment';

/**
 * change date format
 *
 * @param timestamp
 * @param format
 * @returns {string}
 */
const formatMessageTime = (timestamp, format) => {
	if (format) {
		return moment(timestamp).format(format);
	}
	return moment(timestamp).fromNow();
};

export default formatMessageTime;
