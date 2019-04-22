import * as React from "react";
import ValidationResult from "@react-formilicious/core/validators/ValidationResult";

export default class TextArea extends React.Component {
  static getDefaultValue() {
    return "";
  }

  render() {
    const {
      // TextArea props
      name, lines = 3, disabled,
      // System properties
      field, system, onChange, value, validator, ignoreData,
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
            disabled={system.waiting || disabled}
            rows={otherProps.rows || lines}
            value={value} />
        </div>
        <ValidationResult {...field} />
      </div>);
  }
}