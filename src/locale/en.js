import * as validationResult from "../validators/ValidationResult";
import * as defaultButtons from "../defaultButtons";

const en = () => {
  validationResult.text.pending = "Please wait...";
  validationResult.text.timeout = "This field took longer to validate than expected. Please try again later.";
  validationResult.text.invalid = "Invalid value";

  defaultButtons.submit.name = "Submit";
  defaultButtons.reset.name = "Reset";
};

export default en;