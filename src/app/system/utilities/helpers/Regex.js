/**
 * regex: email validate
 *
 * @param value
 * @returns {boolean}
 * @constructor
 */
export function regexEmailValidity(value) {
	return /\S+@\S+\.\S+/.test(value);
}

/**
 * regex: lowercase, numbers, limit: 2-20, -
 *
 * @param value
 * @returns {boolean}
 * @constructor
 */
export function regexLNL(value) {
	return /^([a-zA-Z0-9-]){2,20}$/.test(value);
}

/**
 * regex: validate empty string
 *
 * @param string
 * @returns {boolean}
 */
export function regexEmptyString(string) {
	return string.replace(/\s+/, '').length;
}

/**
 * convert url to link
 *
 * @param text
 * @returns {*}
 */
export function regexConvertUrlsToLinks(text) {
	let replacedText;

	// URLs starting with http://, https://, or ftp://
	const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
	replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

	// URLs starting with "www." (without // before it, or it'd re-link the ones done above).
	const replacePattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
	replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

	// Change email addresses to mailto:: links.
	const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
	replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

	return replacedText;
}
