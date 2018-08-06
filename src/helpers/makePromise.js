const makePromise = value => {
  try {
    return Promise.resolve(value());
  } catch (e) {
    return Promise.reject(e);
  }
}

const thenCatch = (promise, fn) => promise.then(res => fn(res, true)).catch(error => fn(error, false));

export {
  thenCatch
};
export default makePromise;