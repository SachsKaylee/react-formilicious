import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";
import { Input } from "@react-formilicious/core/inputs";

export default class TextField extends React.Component {
  static getDefaultValue() {
    return "";
  }

  getType(mode) {
    switch(mode) {
      case "datetime": return "datetime-local";
      case undefined: return "text";
      default: return mode;
    }
  }

  render() {
    const {
      name, mode, placeholder, step,
      field: { validated, message },
      system: { waiting },
      onChange, value
    } = this.props;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <Input
            className="input"
            onChange={e => onChange(e.target.value)}
            type={this.getType(mode)}
            disabled={waiting}
            value={value}
            step={step}
            placeholder={placeholder} />
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}
