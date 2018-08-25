import makePromise from "../../helpers/makePromise";
import { sanitizeValidationResult } from "./sanitization";
import { mustResolveWithin } from "../../helpers/timeout";

/**
 * Runs the validator on the given value.
 * All options are required!
 * This promise never fails. We promise!
 */
const runValidator = (validator, value, { timeout }) => {
  const promise0 = makePromise(() => validator
    ? validator(value)
    : { validated: "ok", message: null });
  const promise1 = timeout >= 0 ? mustResolveWithin(promise0, timeout) : promise0;
  return promise1.then(sanitizeValidationResult).catch(res => sanitizeValidationResult(res, true));
};

export {
  runValidator
};