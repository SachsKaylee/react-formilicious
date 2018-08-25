import { runValidator } from "./validation";
import { sanitizeValidationResult } from "./sanitization";

/**
 * Starts the task to update a value of an element. Pushes its progress to "pushUpdate". 
 * This function may abort at any time by throwing or simply ignore the push.
 * The push may include "undefined" if the value has not yet been resolved.
 */
const startTask = pushUpdate => async (element, promise, options) => {
  // todo: timeout
  await pushUpdate({
    validated: "pending",
    message: null,
    value: undefined
  });
  await promise
    .then(async value => {
      await pushUpdate({
        validated: "pending",
        message: null,
        value
      });
      const validation = await runValidator(element.validator, value, options);
      await pushUpdate({
        validated: validation.validated,
        message: validation.message,
        value
      });
    })
    .catch(async error => {
      error = await sanitizeValidationResult(error, true);
      await pushUpdate({
        validated: error.validated,
        message: error.message,
        value: undefined
      });
    });
};

export { startTask };