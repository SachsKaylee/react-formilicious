const filterObject = (obj, predicate) => Object.keys(obj)
  .filter(key => predicate(obj[key], key))
  .reduce((res, key) => (res[key] = obj[key], res), {});

const isNotUndefined = value => value !== undefined;

export {
  isNotUndefined
};
export default filterObject;