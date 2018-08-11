import * as React from "react";

const sanitizeValidationResult = (result, forceError = false) => {
  const validation = sanitizeValidationResult0(result);
  if (forceError) {
    validation.validated = "error";
  }
  return validation;
};

const sanitizeValidationResult0 = (result) => {
  if (result === null || result === undefined || result === "") return sanitizeResultNull(result);
  if (result === "timeout") return sanitizeTimeout(result);
  if (typeof result === "string" || React.isValidElement(result) || Array.isArray(result)) return sanitizeResultReactElement(result);
  if (result instanceof Error) return sanitizeResultError(result);
  if (typeof result === "object") return sanitizeResultObject(result);
  if (typeof result === "boolean") return sanitizeResultBoolean(result);
  return sanitizeResultInvalid(result);
};

const sanitizeOnSubmitResult = result => {
  const validation = sanitizeValidationResult(result);
  return {
    ...validation,
    key: (result && "key" in result && result.key) || null
  };
};

const sanitizeResultObject = object => VALIDATION(sanitizeResultObjectGetValidated(object), object.message || object.name || null);
const sanitizeResultError = result => FAIL_VALIDATION(result.message || result.stack || result.name);
const sanitizeResultBoolean = result => result ? PASS_VALIDATION() : FAIL_VALIDATION();;
const sanitizeResultNull = () => PASS_VALIDATION();
const sanitizeTimeout = () => FAIL_VALIDATION("timeout");

const sanitizeResultInvalid = result => {
  console.warn("[react-formilicious] Invalid form validation result", result);
  return FAIL_VALIDATION();
};

const sanitizeResultReactElement = react => {
  if (!react) return PASS_VALIDATION();
  if (Array.isArray(react) && react.length === 0) return PASS_VALIDATION();
  return FAIL_VALIDATION(react);
};

// Objects can have the shorthand "error" property.
const sanitizeResultObjectGetValidated = ({ validated, error, message, name }) => {
  switch (validated) {
    case "ok": return "ok";
    case "hint": return "hint";
    case "error": return "error";
    case undefined: {
      if (error !== undefined && error) return "error";
      if (error !== undefined && !error) return "ok";
      if (message || name) return "error";
      return "ok";
    }
    default: return "error";
  }
};

const VALIDATION = (validated = "error", message = null) => ({ validated, message });
const PASS_VALIDATION = (message = null) => VALIDATION("ok", message);
const FAIL_VALIDATION = (message = null) => VALIDATION("error", message);

export {
  sanitizeValidationResult,
  sanitizeOnSubmitResult
};