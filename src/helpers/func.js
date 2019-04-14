const limit = (value, min, max) => value < min ? min : value > max ? max : value;
const relative = (value, min, max) => (value - min) / (max - min);

export {limit, relative}