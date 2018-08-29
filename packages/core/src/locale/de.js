import * as validationResult from "../validators/ValidationResult";
import * as defaultButtons from "../defaultButtons";

const de = () => {
  validationResult.text.pending = "Bitte warten..."
  validationResult.text.timeout = "Dieses Feld hat zu lange gebraucht um ausgewertet zu werden. Bitte versuchen Sie es später erneut."
  validationResult.text.invalid = "Ungültige Eingabe";

  defaultButtons.submit.name = "Absenden";
  defaultButtons.reset.name = "Zurücksetzen";

};

export default de;