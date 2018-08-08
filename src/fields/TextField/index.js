import * as React from "react";
import ValidationResult from "../../validators/ValidationResult";

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
      name, mode, placeholder,
      field: { validated, message },
      system: { waiting },
      onChange, value
    } = this.props;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <input
            className="input"
            onChange={e => onChange(e.target.value)}
            type={this.getType(mode)}
            disabled={waiting}
            value={value}
            placeholder={placeholder} />
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}
