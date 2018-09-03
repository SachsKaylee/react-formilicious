const filterObject = (obj, predicate) => Object.keys(obj)
  .filter(key => predicate(obj[key], key, obj))
  .reduce((res, key) => {
    res[key] = obj[key];
    return res;
  }, {});

const isNotUndefined = value => value !== undefined;

export {
  isNotUndefined
};
export default filterObject;