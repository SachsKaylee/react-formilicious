import { runValidator } from "./validation";
import { pass, fail } from "../../helpers/timeout";

const makeOptions = ({ timeout = 3000 } = {}) => ({ timeout });

const run = () => {
  test("Run sync passing validator", () => {
    const validator = () => ({ validated: "ok", message: "" });
    const value = "Hello World";
    const options = makeOptions();
    return runValidator(validator, value, options).then(res => expect(res.validated).toEqual("ok"));
  });

  test("Run sync failing validator", () => {
    const validator = () => ({ validated: "error", message: "" });
    const value = "Hello World";
    const options = makeOptions();
    return runValidator(validator, value, options).then(res => expect(res.validated).toEqual("error"));
  });

  test("Run async passing validator", () => {
    const validator = () => pass(300).then(() => ({ validated: "ok", message: "" }));
    const value = "Hello World";
    const options = makeOptions();
    return runValidator(validator, value, options).then(res => expect(res.validated).toEqual("ok"));
  });

  test("Run async failing validator", () => {
    const validator = () => pass(300).then(() => ({ validated: "error", message: "" }));
    const value = "Hello World";
    const options = makeOptions();
    return runValidator(validator, value, options).then(res => expect(res.validated).toEqual("error"));
  });

  test("Run async timeout validator", () => {
    const validator = () => pass(300).then(() => ({ validated: "ok", message: "" }));
    const value = "Hello World";
    const options = makeOptions({ timeout: 100 });
    return runValidator(validator, value, options).then(res => expect(res).toEqual({
      validated: "error",
      message: "timeout"
    }));
  });

  test("Run zero timeout sync passing validator", () => {
    const validator = () => ({ validated: "ok", message: "" });
    const value = "Hello World";
    const options = makeOptions({ timeout: 0 });
    return runValidator(validator, value, options).then(res => expect(res.validated).toEqual("ok"));
  });

  test("Run zero timeout async passing validator", () => {
    const validator = () => pass(0).then(() => ({ validated: "ok", message: "" }));
    const value = "Hello World";
    const options = makeOptions({ timeout: 0 });
    return runValidator(validator, value, options).then(res => expect(res.validated).toEqual("error"));
  });
};

run();