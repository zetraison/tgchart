/**
 * Return min array value
 * @param array
 * @returns {number}
 */
const min = array => Math.min.apply(null, array);

/**
 * Return max array value
 * @param array
 * @returns {number}
 */
const max = array => Math.max.apply(null, array);

/**
 * Return new array from input as tail (all array values except first)
 * @param array
 * @returns {*}
 */
const tail = array => array.slice(1, array.length);

/**
 * Return first array value
 * @param array
 * @returns {*}
 */
const head = array => array.slice(0, 1);

/**
 * Return first array value
 * @param array
 * @returns {*}
 */
const first = array => array[0];

/**
 * Return last array value
 * @param array
 * @returns {*}
 */
const last = array => array[array.length - 1];

/**
 * Return array fraction by percentage value
 * @param array
 * @param percentage
 * @returns {*}
 */
const fraction = (array, percentage) => first(array) + (last(array) - first(array)) * percentage;

export { first, last, min, max, tail, head, fraction }