const min = array => Math.min.apply(null, array);
const max = array => Math.max.apply(null, array);
const tail = array => array.slice(1, array.length);
const head = array => array.slice(0, 1);

export { min, max, tail, head }