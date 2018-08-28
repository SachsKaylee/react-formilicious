const makePromise = value => {
  try {
    return Promise.resolve(typeof value === "function" ? value() : value);
  } catch (e) {
    return Promise.reject(e);
  }
}

const thenCatch = (promise, fn) => promise.then(res => fn(res, true)).catch(error => fn(error, false));

/**
 * Waits for truly all passed promises the resolve or reject. If passed, all results will be 
 * returned in order. If a single failed, all failed results will be returned in order, 
 * inserting undefined for passed ones.
 */
const trulyAll = (promises) => {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise((resolve, reject) => {
    let count = 0;
    let resolved = null;
    let rejected = null;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(res => {
          if (!resolved) {
            resolved = new Array(promises.length)
          }
          resolved[i] = res;
        })
        .catch(err => {
          if (!rejected) {
            rejected = new Array(promises.length)
          }
          rejected[i] = err;
        })
        .then(() => {
          count++;
          if (count === promises.length) {
            if (rejected) {
              reject(rejected);
            } else {
              resolve(resolved);
            }
          }
        });
    }
  });
};

export {
  thenCatch,
  trulyAll
};
export default makePromise;