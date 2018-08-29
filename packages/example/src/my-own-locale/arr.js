import * as validationResult from "../../../src/validators/ValidationResult";
import * as defaultButtons from "../../../src/defaultButtons";

const arr = () => {
  validationResult.text.pending = "Sailing ...";
  validationResult.text.timeout = "Our first validation mate is slacking off!";
  validationResult.text.invalid = "Curses!";

  defaultButtons.submit.name = "🏴 Bury the loot!";
  defaultButtons.reset.name = "Return to land";
};

export default arr;