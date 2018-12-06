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
