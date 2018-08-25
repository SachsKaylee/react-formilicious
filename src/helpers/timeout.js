const pass = (after, arg = "timeout") => new Promise((res, rej) => setTimeout(res, after, arg));
const fail = (after, arg = "timeout") => new Promise((res, rej) => setTimeout(rej, after, arg));
const never = () => new Promise(Function.prototype);

const mustResolveWithin = (promise, timespan) => timespan >= 0
  ? Promise.race([promise, fail(timespan)])
  : promise;

export {
  pass, fail, never,
  mustResolveWithin
};