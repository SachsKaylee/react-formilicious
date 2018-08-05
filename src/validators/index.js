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
    key: ("key" in result && result.key) || null
  };
};

const sanitizeResultInvalid = result => {
  console.error("[react-formilicious] Invalid form validation result", result);
  return {
    validated: "error",
    message: null
  };
};

const sanitizeResultError = result => {
  return {
    validated: "error",
    message: result.message || result.stack || result.name || null
  };
};

const sanitizeResultBoolean = result => {
  return {
    validated: result ? "ok" : "error",
    message: null
  };
};

const sanitizeResultNull = () => {
  return {
    validated: "ok",
    message: null
  };
};

const sanitizeResultReactElement = react => {
  return {
    validated: react ? "error" : "ok",
    message: react || null
  };
};

const sanitizeResultObject = object => {
  return {
    validated: sanitizeResultObjectGetValidated(object),
    message: object.message || null
  };
};

// Objects can have the shorthand "error" property.
const sanitizeResultObjectGetValidated = ({ validated, error, message }) => {
  if (validated) return validated;
  if (error !== undefined && error) return "error";
  if (error !== undefined && !error) return "ok";
  if (message) return "error";
  return "ok";
};

export {
  sanitizeValidationResult,
  sanitizeOnSubmitResult
};