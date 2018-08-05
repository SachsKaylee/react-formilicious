import * as React from "react";
import ValidationResult from "../../validators/ValidationResult";

export default class TextField extends React.Component {
  static getDefaultValue() {
    return "";
  }

  render() {
    const {
      // Your element config expect type and key
      name, ignoreData, mode, placeholder,
      // System created properties just for this field
      field: { initialValue, value, validated, message },
      // System properties which are the same for all fields
      system: { waiting },
      // Change handler
      onChange
    } = this.props;

    const fieldValue = value !== undefined
      ? value
      : ignoreData
        ? TextField.getDefaultValue()
        : initialValue === undefined ? TextField.getDefaultValue() : initialValue;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <input
            className="input"
            onChange={e => onChange(e.target.value)}
            type={mode || "text"}
            disabled={waiting}
            value={fieldValue}
            placeholder={placeholder} />
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}