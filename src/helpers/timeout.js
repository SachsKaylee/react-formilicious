const pass = after => new Promise((res, rej) => setTimeout(res, after, "timeout"));
const fail = after => new Promise((res, rej) => setTimeout(rej, after, "timeout"));
const never = () => new Promise(Function.prototype);

const mustResolveWithin = (promise, timespan) => timespan >= 0
  ? Promise.race([promise, fail(timespan)])
  : promise;

export {
  pass, fail, never,
  mustResolveWithin
};