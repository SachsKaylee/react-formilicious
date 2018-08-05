import * as React from "react";
import ValidationResult from "../../validators/ValidationResult";

export default class Checkbox extends React.Component {
  static getDefaultValue() {
    return false;
  }

  render() {
    const {
      name, ignoreData,
      field: { initialValue, value, validated, message },
      system: { waiting },
      onChange
    } = this.props;

    const fieldValue = value !== undefined
      ? value
      : ignoreData
        ? Checkbox.getDefaultValue()
        : initialValue === undefined ? Checkbox.getDefaultValue() : initialValue;

    return (<div className="field">
      <div className="contol">
        <label className="checkbox">
          <input
            style={{ marginRight: 2 }}
            type="checkbox"
            disabled={waiting}
            checked={fieldValue}
            onChange={e => onChange(e.target.checked)} />
          <span>{name}</span>
        </label>
      </div>
      <ValidationResult validated={validated} message={message} />
    </div >);
  }
}