const makePromise = value => {
  try {
    return Promise.resolve(value());
  } catch (e) {
    return Promise.reject(e);
  }
}

const thenCatch = (promise, fn) => promise.then(fn).catch(fn);

export {
  thenCatch
};
export default makePromise;