import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";

export default class TextField extends React.Component {
  static getDefaultValue() {
    return "";
  }

  constructor(p) {
    super(p);
    this.onChange = this.onChange.bind(this);
  }

  getType(mode) {
    switch (mode) {
      case "datetime": return "datetime-local";
      case undefined: return "text";
      default: return mode;
    }
  }

  onChange(e) {
    let value = e.target.value;
    if (this.props.mode === "number") {
      // Try to parse number
      const parsed = Number.parseFloat(value);
      if (!Number.isNaN(parsed)) {
        value = parsed;
      }
    }
    this.props.onChange(value);
  }

  render() {
    const {
      name, mode, placeholder, step,
      field: { validated, message },
      system: { waiting },
      value
    } = this.props;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <input
            className="input"
            onChange={this.onChange}
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
