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
      // TextField props
      name, disabled, mode,
      // System props
      field, system, onChange, value,
      // Raw pass the rest.
      ...otherProps
    } = this.props;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <input
            {...otherProps}
            className="input"
            onChange={this.onChange}
            type={this.getType(mode)}
            disabled={system.waiting || disabled}
            value={value} />
        </div>
        <ValidationResult {...field} />
      </div>);
  }
}
