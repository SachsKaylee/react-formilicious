const makePromise = value => {
  try {
    return Promise.resolve(typeof value === "function" ? value() : value);
  } catch (e) {
    return Promise.reject(e);
  }
}

export default makePromise;