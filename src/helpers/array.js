const min = array => Math.min.apply(null, array);
const max = array => Math.max.apply(null, array);
const tail = array => array.slice(1, array.length);
const head = array => array.slice(0, 1);
const first = array => array[0];
const last = array => array[array.length - 1];
const fraction = (array, percentage) => first(array) + (last(array) - first(array)) * percentage;

export { first, last, min, max, tail, head, fraction }