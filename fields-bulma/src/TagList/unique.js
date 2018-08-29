const unique = array => {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
};

export default unique;