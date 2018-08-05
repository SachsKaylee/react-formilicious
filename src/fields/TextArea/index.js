import * as React from "react";
import ValidationResult from "../../validators/ValidationResult";

export default class TextArea extends React.Component {
  static getDefaultValue() {
    return "";
  }

  render() {
    const {
      // Your element config expect type and key
      name, ignoreData, placeholder, lines,
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
        ? TextArea.getDefaultValue()
        : initialValue === undefined ? TextArea.getDefaultValue() : initialValue;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <textarea 
            className="textarea"
            onChange={e => onChange(e.target.value)}
            disabled={waiting}
            rows={lines}
            value={fieldValue}
            placeholder={placeholder} />
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}