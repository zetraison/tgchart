const min = array => Math.min.apply(null, array);
const max = array => Math.max.apply(null, array);
const tail = array => array.slice(1, array.length);
const head = array => array.slice(0, 1);
const clone = array => array.slice(0);

export { min, max, tail, head, clone }