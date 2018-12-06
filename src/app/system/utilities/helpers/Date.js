// app
import moment from 'moment';

/**
 * change date format
 *
 * @param timestamp
 * @param format
 * @returns {string}
 */
export default function formatMessageTime(timestamp, format) {
	if (format) {
		return moment(timestamp).format(format);
	}

	return moment(timestamp).fromNow();
}
