import { runValidator } from "./validation";
import { pass, fail } from "../../helpers/timeout";

const run = () => {
  test("Run sync passing validator", () => {
    const validator = () => ({ validated: "ok", message: "" });
    const value = "Hello World";
    return runValidator(validator, value).then(res => expect(res.validated).toEqual("ok"));
  });

  test("Run sync failing validator", () => {
    const validator = () => ({ validated: "error", message: "" });
    const value = "Hello World";
    return runValidator(validator, value).then(res => expect(res.validated).toEqual("error"));
  });

  test("Run async passing validator", () => {
    const validator = () => pass(300).then(() => ({ validated: "ok", message: "" }));
    const value = "Hello World";
    return runValidator(validator, value).then(res => expect(res.validated).toEqual("ok"));
  });

  test("Run async failing validator", () => {
    const validator = () => pass(300).then(() => ({ validated: "error", message: "" }));
    const value = "Hello World";
    return runValidator(validator, value).then(res => expect(res.validated).toEqual("error"));
  });

  test("Run async passing validator with rejected promise", () => {
    const validator = () => fail(300, { validated: "ok", message: "Rejected promises always fail." });
    const value = "Hello World";
    return runValidator(validator, value).then(res => expect(res).toEqual({
      validated: "error",
      message: "Rejected promises always fail."
    }));
  });
};

run();