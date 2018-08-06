const pass = after => new Promise((res, rej) => setTimeout(res, after, "timeout"));
const fail = after => new Promise((res, rej) => setTimeout(rej, after, "timeout"));

const mustResolveWithin = (promise, timespan) => Promise.race([promise, fail(timespan)]);

export {
  pass, fail,
  mustResolveWithin
};