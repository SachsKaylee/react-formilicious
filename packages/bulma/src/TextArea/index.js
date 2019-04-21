import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";

export default class TextArea extends React.Component {
  static getDefaultValue() {
    return "";
  }

  render() {
    const {
      // Your element config expect type and key
      name, lines = 3, disabled,
      // System created properties just for this field
      field: { validated, message },
      // System properties which are the same for all fields
      system: { waiting },
      // Change handler
      onChange, value,
      // Raw pass the rest
      ...otherProps
    } = this.props;

    return (
      <div className="field">
        <label className="label">{name}</label>
        <div className="contol">
          <textarea
            {...otherProps}
            className="textarea"
            onChange={e => onChange(e.target.value)}
            disabled={waiting || disabled}
            rows={otherProps.rows || lines}
            value={value} />
        </div>
        <ValidationResult validated={validated} message={message} />
      </div>);
  }
}