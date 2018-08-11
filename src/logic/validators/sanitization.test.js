import { sanitizeValidationResult } from "./sanitization";
import * as React from "react";

/**
 * The unit tests are modelled after the validation spec that can be seen here:
 * https://github.com/PatrickSachs/react-formilicious/wiki/Valid-Validator-Validation-Values
 */

const run = () => {
  test("Validate null", () => {
    const input = null;
    const result = sanitizeValidationResult(input);
    expect(result).toHaveProperty("validated", "ok");
  });

  test("Validate undefined", () => {
    const input = undefined;
    const result = sanitizeValidationResult(input);
    expect(result).toHaveProperty("validated", "ok");
  });

  test("Validate empty string", () => {
    const input = "";
    const result = sanitizeValidationResult(input);
    expect(result).toHaveProperty("validated", "ok");
  });

  test("Validate timeout string", () => {
    const input = "timeout";
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: "timeout"
    });
  });

  test("Validate non-empty string", () => {
    const input = "Hello World";
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: "Hello World"
    });
  });

  test("Validate react node", () => {
    const input = (<p>Hello World</p>);
    const result = sanitizeValidationResult(input);
    expect(result).toHaveProperty("validated", "error");
    expect(result).toHaveProperty("message", input);
  });

  test("Validate zero length array", () => {
    const input = [];
    const result = sanitizeValidationResult(input);
    expect(result).toHaveProperty("validated", "ok");
  });

  test("Validate one length empty array", () => {
    const input = ["Hello World"];
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input
    });
  });

  test("Validate multiple length empty array", () => {
    const input = ["Hello World", (<p>Hello World</p>), "Hello Chupacabra"];
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input
    });
  });

  test("Validate non-thrown Error", () => {
    const error = new Error("Error!");
    const result = sanitizeValidationResult(error);
    expect(result).toEqual({
      validated: "error",
      message: error.message
    });
  });

  test("Validate Error", () => {
    try {
      throw new Error("Error!");
    } catch (error) {
      const result = sanitizeValidationResult(error);
      expect(result).toEqual({
        validated: "error",
        message: "Error!"
      });
    }
  });

  test("Validate ReferenceError", () => {
    try {
      invalid.reference;
    } catch (error) {
      const result = sanitizeValidationResult(error);
      expect(result).toEqual({
        validated: "error",
        message: "invalid is not defined"
      });
    }
  });

  test("Validate idiomatic passed object", () => {
    const input = {
      validated: "ok",
      message: null
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual(input);
  });

  test("Validate idiomatic failed object", () => {
    const input = {
      validated: "error",
      message: "Failure message."
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual(input);
  });

  test("Validate idiomatic hint object", () => {
    const input = {
      validated: "hint",
      message: "Hint: This is a unit test"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual(input);
  });

  // We explictly do not test for pending. If pending is allowed or not is undocumented and may change any time.
  // Users are heavily discouraged from using it.

  test("Validate idiomatic invalid object", () => {
    const input = {
      validated: "invalid",
      message: "Invalid"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input.message
    });
  });

  test("Validate error true object", () => {
    const input = {
      error: true,
      message: "Error"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input.message
    });
  });

  test("Validate error truthy object", () => {
    const input = {
      error: 1,
      message: "Error"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input.message
    });
  });

  test("Validate error false object", () => {
    const input = {
      error: false,
      message: "Passed"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: input.message
    });
  });

  test("Validate error falsy object", () => {
    const input = {
      error: 0,
      message: "Passed"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: input.message
    });
  });

  test("Validate message object", () => {
    const input = {
      message: "Error"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input.message
    });
  });

  test("Validate name object", () => {
    const input = {
      name: "Error"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: input.name
    });
  });

  test("Validate object with multiple failing validation properties", () => {
    const input = {
      validated: "error",
      error: true,
      message: "Error message",
      name: "Error name"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: "Error message"
    });
  });

  test("Validate object with multiple passing validation properties", () => {
    const input = {
      validated: "ok",
      error: false,
      message: "Pass message",
      name: "Pass name"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: "Pass message"
    });
  });

  test("Validate object with conflicting failing validation properties", () => {
    const input = {
      validated: "error",
      error: false,
      message: "Fail message",
      name: "Pass name"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: "Fail message"
    });
  });

  test("Validate object with conflicting passing validation properties", () => {
    const input = {
      validated: "ok",
      error: true,
      message: "Pass message",
      name: "Fail name"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: "Pass message"
    });
  });

  test("Validate object with unknown properties", () => {
    const input = {
      doYouKnowMe: "no",
      whoAmI: "none of your business"
    };
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: null
    });
  });

  test("Validate empty object", () => {
    const input = {};
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: null
    });
  });

  test("Validate true", () => {
    const input = true;
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "ok",
      message: null
    });
  });

  test("Validate false", () => {
    const input = false;
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: null
    });
  });

  test("Validate unknown", () => {
    let consoleLog = [];
    console.warn = jest.fn((...args) => consoleLog = [...consoleLog, args]);
    const input = 7;
    const result = sanitizeValidationResult(input);
    expect(result).toEqual({
      validated: "error",
      message: null
    });
    expect(consoleLog).toEqual([["[react-formilicious] Invalid form validation result", 7]]);
  });
};

run();
//export default run;