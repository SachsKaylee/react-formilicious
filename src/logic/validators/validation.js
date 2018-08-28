import makePromise from "../../helpers/makePromise";
import { sanitizeValidationResult } from "./sanitization";

/**
 * Runs the validator on the given value.
 * This promise never fails. We promise!
 */
const runValidator = (validator, value) => {
  const promise = makePromise(() => validator ? validator(value) : { validated: "ok", message: null });
  return promise.then(sanitizeValidationResult).catch(res => sanitizeValidationResult(res, true));
};

export {
  runValidator
};