const find = (search, predicate) => {
  if (Array.isArray(search)) return search.find(predicate);
  return Object.keys(search).find(key => predicate(search[key], key));
};

export default find;