import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";
import { TextArea as CoreTextArea } from "@react-formilicious/core/inputs";

export default class TextArea extends React.Component {
  static getDefaultValue() {
    return "";
  }

  render() {
    const {
      // Your element config expect type and key
      name, placeholder, lines = 3,
      // System created properties just for this field
      field: { validated, message },
      // System properties which are the same for all fields
      system: { waiting },
      // Change handler
      onChange, value
    } = this.props;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <CoreTextArea
            className="textarea"
            onChange={e => onChange(e.target.value)}
            disabled={waiting}
            rows={lines}
            value={value}
            placeholder={placeholder} />
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}