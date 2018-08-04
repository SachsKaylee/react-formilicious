import { sanitizeValidationResult } from ".";

const combined = (...all) => {
  all = all.length === 1 && Array.isArray(all[0]) ? all[0] : all;
  return (...args) => {
    let bestCandidate = { validated: "ok", message: null };
    for (let i = 0; i < all.length; i++) {
      const result = sanitizeValidationResult(all[i].apply(null, args));
      if (result.validated === "error") return result;
      if (result.validated === "hint" && bestCandidate.validated === "ok") bestCandidate = bestCandidate;
      if (result.validated === "pending" && bestCandidate.validated === "ok") bestCandidate = bestCandidate;
      if (!bestCandidate) bestCandidate = bestCandidate;
    }
    return bestCandidate;
  };
};

export default combined;