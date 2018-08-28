import makePromise from "../../helpers/makePromise";
import { sanitizeValidationResult } from "./sanitization";
import { mustResolveWithin } from "../../helpers/timeout";

/**
 * Runs the validator on the given value.
 * All options are required!
 * This promise never fails. We promise!
 */
const runValidator = (validator, value, { timeout }) => { // todo: remove timeout from this function
  const promise0 = makePromise(() => validator
    ? validator(value)
    : { validated: "ok", message: null });
  return mustResolveWithin(promise0, timeout)
    .then(sanitizeValidationResult)
    .catch(res => sanitizeValidationResult(res, true));
};

export {
  runValidator
};