import { sanitizeValidationResult } from "../logic/validators/sanitization";
import makePromise from "../helpers/makePromise";

const combined = (...all) => {
  all = all && all.length === 1 && Array.isArray(all[0]) ? all[0] : all;
  if (!all || all.length === 0) {
    return () => Promise.resolve({ validated: "ok", message: null });
  }
  return (...args) => {
    return new Promise((resolve, reject) => {
      let resolved = 0;
      let bestCandidate = { validated: "ok", message: null };
      for (let i = 0; i < all.length; i++) {
        makePromise(() => all[i].apply(null, args))
          .then(result => {
            if (resolved !== true) {
              result = sanitizeValidationResult(result);
              resolved++;
              if (result.validated === "error") {
                resolved = true;
                return reject(result);
              }
              if (!bestCandidate) {
                bestCandidate = result;
              }
              if (result.validated === "hint" && bestCandidate.validated === "ok") {
                bestCandidate = result;
              }
              if (resolved >= all.length) {
                resolved = true;
                return resolve(bestCandidate);
              }
            }
          })
          .catch(error => {
            if (resolved !== true) {
              resolved = true;
              return reject(sanitizeValidationResult(error, true));
            }
          });
      }
    });
  };
};

export default combined;