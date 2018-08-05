import { sanitizeValidationResult } from ".";
import makePromise from "../helpers/makePromise";

const combined = (...all) => {
  all = all.length === 1 && Array.isArray(all[0]) ? all[0] : all;
  return (...args) => {
    return new Promise((res, rej) => {
      let resolved = 0;
      let bestCandidate = { validated: "ok", message: null };
      for (let i = 0; i < all.length; i++) {
        makePromise(() => all[i].apply(null, args))
          .then(res => {
            if (resolved !== true) {
              res = sanitizeValidationResult(res);
              resolved++;
              if (res.validated === "error") {
                resolved = true;
                return rej(res);
              }
              if (!bestCandidate) {
                bestCandidate = res;
              }
              if (res.validated === "hint" && bestCandidate.validated === "ok") {
                bestCandidate = res;
              }
              if (resolved >= all.length) {
                resolved = true;
                return res(bestCandidate);
              }
            }
          })
          .catch(res => {
            if (resolved !== true) {
              resolved = true;
              return rej(sanitizeValidationResult(res, true));
            }
          });
      }
    });
  };
};

export default combined;